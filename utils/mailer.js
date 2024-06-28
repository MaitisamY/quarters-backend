import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
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
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false,
    },
    requireTLS: true, // This ensures that STARTTLS is used if supported
    logger: true, // Logs to console
    debug: true, // Include SMTP traffic in the logs
    pool: true, // Enable pooled connections
    maxConnections: 5, // Maximum number of connections in the pool
    maxMessages: 100, // Maximum number of messages per connection
});

const attachImages = (attachments, role) => {
    attachments.push({
        filename: 'logo.png',
        path: path.join(__dirname, 'public', 'logo.png'),
        cid: 'logo',
    });

    switch (role) {
        case 'renter':
        attachments.push({
            filename: 'renter-image.png',
            path: path.join(__dirname, 'public', 'renter-image.png'),
            cid: 'renter-image',
        });
        break;
        case 'landlord':
        attachments.push({
            filename: 'landlord-image.png',
            path: path.join(__dirname, 'public', 'landlord-image.png'),
            cid: 'landlord-image',
        });
        break;
        case 'agent':
        attachments.push({
            filename: 'agent-image.png',
            path: path.join(__dirname, 'public', 'agent-image.png'),
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
