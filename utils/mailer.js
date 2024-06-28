import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { getVerificationEmailTemplate, getWelcomeEmailTemplate } from "./emailTemplates.js";
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false,
    },
    requireTLS: true,
    logger: true,
    debug: true,
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
});

const attachImages = (attachments, role) => {
  attachments.push({
    filename: 'logo.png',
    path: path.join(__dirname, '../public', 'logo.png'),  // Ensure this path is correct
    cid: 'logo',
  });

  switch (role) {
    case 'renter':
      attachments.push({
        filename: 'renter-image.png',
        path: path.join(__dirname, '../public', 'renter-image.png'),  // Ensure this path is correct
        cid: 'renter-image',
      });
      break;
    case 'landlord':
      attachments.push({
        filename: 'landlord-image.png',
        path: path.join(__dirname, '../public', 'landlord-image.png'),  // Ensure this path is correct
        cid: 'landlord-image',
      });
      break;
    case 'agent':
      attachments.push({
        filename: 'agent-image.png',
        path: path.join(__dirname, '../public', 'agent-image.png'),  // Ensure this path is correct
        cid: 'agent-image',
      });
      break;
  }
};

export const sendVerificationEmail = (name, email, verificationCode) => {
  const { subject, html } = getVerificationEmailTemplate(name, verificationCode);
  const attachments = [];
  attachImages(attachments);

  const mailOptions = {
    from: 'Quarters <hello@myquarters.ca>',
    to: email,
    subject,
    html,
    attachments,
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
  const attachments = [];
  attachImages(attachments, role);

  const mailOptions = {
    from: 'Quarters <hello@myquarters.ca>',
    to: email,
    subject,
    html,
    attachments,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
