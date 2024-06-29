import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import { 
    getVerificationEmailTemplate, 
    getWelcomeEmailTemplate 
} from "./emailTemplates.js";

dotenv.config();

/* Get absolute path to public folder */
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* Prepare email transporter */
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, /* true for 465, false for other ports */
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
    pool: true, /* Enable pooled connections - Won't close the connection until maxConnections is reached */
    maxConnections: 5,
    maxMessages: 100,
});

/* Attach images to email */
const attachImages = (attachments, role) => {
    attachments.push({
        filename: 'logo.png',
        path: path.join(__dirname, '../public/img', 'logo.png'),  /* Ensure this path is correct */
        cid: 'logo',
    });

    switch (role) {
        case 'renter':
        attachments.push({
            filename: 'renter-image.png',
            path: path.join(__dirname, '../public/img', 'renter-image.png'),  /* Ensure this path is correct */
            cid: 'renter-image',
        });
        break;
        case 'landlord':
        attachments.push({
            filename: 'landlord-image.png',
            path: path.join(__dirname, '../public/img', 'landlord-image.png'),  /* Ensure this path is correct */
            cid: 'landlord-image',
        });
        break;
        case 'agent':
        attachments.push({
            filename: 'agent-image.png',
            path: path.join(__dirname, '../public/img', 'agent-image.png'),  /* Ensure this path is correct */
            cid: 'agent-image',
        });
        break;
    }
};

/* Send verification email */
export const sendVerificationEmail = (name, email, verificationCode) => {
    const { subject, html } = getVerificationEmailTemplate(name, verificationCode);
    const attachments = [];
    attachImages(attachments);

    const mailOptions = {
        from: 'Quarters <hello@myquarters.ca>', /* Ensure this email is correct - won't work otherwise */
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

/* Send welcome email */
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
