import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { getVerificationEmailTemplate, getWelcomeEmailTemplate } from "./emailTemplates.js"; 

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = (name, email, verificationCode) => {
  const { subject, html } = getVerificationEmailTemplate(name, verificationCode);

  const mailOptions = {
    from: 'Quarters <hello@myquarters.ca>',
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

export const sendWelcomeEmail = (name, email, role) => {
  const { subject, html } = getWelcomeEmailTemplate(name, role);

  const mailOptions = {
    from: 'Quarters <hello@myquarters.ca>',
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
