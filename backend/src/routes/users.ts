import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import { generateRandomPassword, sendEmail } from "../helpers";
import verifyToken from "../middleware/auth";
import bcrypt from "bcryptjs";
import "dotenv/config";

const router = express.Router();

// GET route - Allows admin to fetch all users
// example: localhost:3000/api/user/users
router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find({ _id: { $ne: "661d06c3d72fa22226e42c95" } });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// POST route - Allows admin to create user
// example: localhost:3000/api/user/create
/*
  body: {
    "email": "test@test.com",
    "firstName": "pakurumo"
    "lastName": "dada",
    "isAdmin": false,
    "role": ["operations", "customer-service"]
  }
*/
router.post(
  "/create",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("isAdmin", "Admin status required").isBoolean(),
    check("role", "Role is required").isArray(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, firstName } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists!" });
      }

      let randomlyGeneratedPassword = generateRandomPassword();

      user = new User({ ...req.body, password: randomlyGeneratedPassword });
      await user.save();

      sendEmail(
        firstName,
        email,
        randomlyGeneratedPassword,
        `${process.env.APP_URL}/login`
      );

      return res
        .status(201)
        .json({ message: "User created successfully.", user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong." });
    }
  }
);

// DELETE route - Allows admin to delete user
// example: localhost:3000/api/user/delete/:id

router.delete("/delete/:id", async (req: Request, res: Response) => {
  const _id = req.params.id;
  try {
    let deletedUser = await User.findByIdAndDelete(_id);
    if (!deletedUser) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong." });
  }
});

// PUT route - Allows admin to update user
// example: localhost:3000/api/user/update/:id

/*
  body: {
    "email": "test@test.com",
    "firstName": "pakurumo"
    "lastName": "dada",
    "isAdmin": false,
    "role": ["operations", "customer-service"]
  }
*/
router.put(
  "/update/:id",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("isAdmin", "Admin status required").isBoolean(),
    check("role", "Role is required").isArray(),
  ],
  async (req: Request, res: Response) => {
    const _id = req.params.id;
    try {
      let updatedUser = await User.findByIdAndUpdate(_id, req.body, {
        new: true,
      });
      if (!updatedUser) {
        return res.status(400).json({ message: "User doesn't exist" });
      }
      return res
        .status(201)
        .json({ message: "User updated successfully", updatedUser });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong." });
    }
  }
);

// PATCH route - Allows user to reset password
// example: localhost:3000/api/user/reset-password

/*
  body: {
    "password": "password",
  }
*/
router.patch(
  "/reset-password",
  verifyToken,
  async (req: Request, res: Response) => {
    const _id = req.userId;

    try {
      let user = await User.findOne({ _id });
      if (user) {
        let notSame = bcrypt.compare(req.body.password, user.password);
        if (!notSame) {
          return res
            .status(400)
            .json({ message: "Password has been used before" });
        } else {
          let newPassword = await bcrypt.hash(req.body.password, 8);
          let userToReset = await User.findByIdAndUpdate(
            _id,
            { password: newPassword, logCount: user.logCount + 1 },
            {
              new: true,
            }
          );

          res.cookie("auth_token", "", {
            expires: new Date(0),
            sameSite: "none",
            secure: process.env.NODE_ENV === "production",
          });

          return res
            .status(201)
            .json({ message: "Password reset successful", userToReset });
        }
      }

      if (!user) {
        return res.status(400).json({ message: "User doesn't exist" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong." });
    }
  }
);

export default router;
