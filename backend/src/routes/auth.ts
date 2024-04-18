import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";
import { sendVerifyEmail } from "../helpers";
import "dotenv/config";

const router = express.Router();

// Register route - For testing purpose only
router.get("/register", async (req, res) => {
  let user = new User(req.body);
  await user.save();

  return res.status(200).json({ message: "user registered" });
});

// POST route - Allows a user to login
// example: localhost:3000/api/auth/login
/*
  body: {
    "email": "test@test.com",
    "password": "pakurumo"
  }
*/
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user email exists
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
      // Check if password is correct
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      // Generate token
      const token = jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" }
      );
      // Send token
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      res
        .status(200)
        .json({ userId: user._id, message: "Logged In successfully.", user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong." });
    }
  }
);

// GET route - Allows user to validate token
// example: localhost:3000/api/auth/validate-token
router.get(
  "/validate-token",
  verifyToken,
  async (req: Request, res: Response) => {
    const user_id = req.userId;

    try {
      const user = await User.findById(user_id);

      if (!user) res.status(500).send({ message: "Unauthorized" });

      res.status(200).send({ userId: req.userId, user });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
);

// POST route - Allows user to verify email
// example: localhost:3000/api/auth/forgot-password

router.post(
  "/forgot-password",
  [check("email", "Email is required").isEmail()],
  async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User doesn't exist" });
      }

      sendVerifyEmail(
        user.firstName,
        email,
        `${process.env.APP_URL}/auth/reset-password`
      );

      return res.status(200).json({ message: "Check your email." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong." });
    }
  }
);

// POST route - Allows user to logout
// example: localhost:3000/api/auth/logout
/*
  body: {}
*/
router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.json({ message: "Logged out successfully." });
});

export default router;
