import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { getEmailTemplate } from "./emailTemplates.js"; // New import

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendWelcomeEmail = (name, email, role, code) => {
  const { subject, html } = getEmailTemplate(name, role, code);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
