import nodemailer from "nodemailer";
import "dotenv/config";
import fs from "fs";
import handlebars from "handlebars";
import users from "../routes/users";

export function generateRandomPassword(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let password = "";

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
}

export async function sendEmail(
  firstName: string,
  email: string,
  password: string,
  link: string
) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.email",
    secure: false,
    service: "gmail",
    auth: {
      user: "obiemmy123@gmail.com",
      pass: process.env.GMAIL_PASS,
    },
  });

  const source = fs.readFileSync("email_template.html", "utf-8").toString();
  const template = handlebars.compile(source);
  const replacements = {
    firstName,
    email,
    password,
    link,
  };

  const htmlToSend = template(replacements);

  await transporter
    .sendMail({
      from: "obiemmy123@gmail.com",
      to: email,
      subject: "Admin has sent in your credentials!!",
      text: `Dear ${firstName}, your temporary login credentials are Email:${email} and Password: ${password}. You must reset your password upon login, follow this link to do so ${link}`,
      html: htmlToSend,
    })
    .then((info) => {
      console.log("Email sent: " + info.response);
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function sendVerifyEmail(
  firstName: string,
  email: string,
  link: string
) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.email",
    secure: false,
    service: "gmail",
    auth: {
      user: "obiemmy123@gmail.com",
      pass: process.env.GMAIL_PASS,
    },
  });

  const source = fs.readFileSync("email_verify.html", "utf-8").toString();
  const template = handlebars.compile(source);
  const replacements = {
    firstName,
    link,
  };

  const htmlToSend = template(replacements);

  await transporter
    .sendMail({
      from: "obiemmy123@gmail.com",
      to: email,
      subject: `${firstName} please reset your password!`,
      html: htmlToSend,
      text: `Dear ${firstName}, Follow this link to reset your password: ${link}`,
    })
    .then((info) => {
      console.log("Email sent: " + info.response);
    })
    .catch((err) => {
      console.log(err);
    });
}
