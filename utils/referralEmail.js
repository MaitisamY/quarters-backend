import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

const emailStyles = `
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin: 0 auto;
            padding: 20px;
            background-color: #f2f2f2;
            box-sizing: border-box;
        }
        .container {
            max-width: 500px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .logo {
            width: 100px;
            margin-bottom: 20px;
        }
        p {
            font-size: 16px;
            color: #000;
            line-height: 1.5;
            margin: 20px 0;
            text-align: left;
        }
        .code {
            font-family: monospace;
            font-size: 50px;
            background-color: #12b76a;
            color: #fff;
            font-weight: bold;
            padding: 10px 20px;
            border-radius: 5px;
            margin: 20px 0;
            text-align: center;
            width: fit-content;
        }
        .footer {
            font-size: 18px;
            color: #000000;
            font-weight: bold;
            margin-top: 25px;
            text-align: left;
        }
        .custom-button {
            text-decoration: none;
            width: 100%;
            height: auto;
            padding: 10px 15px;
            margin: 20px 0 0 0;
            border-radius: 25px;
            background-color: #12b76a;
            color: #fff !important;
            cursor: pointer;
            text-align: center;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.2s ease-in-out;
        }
        .custom-button:hover {
            background-color: #0f9b5a;
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        }
    </style>
`;

export const sendReferralEmail = (referrer, referredEmail, uniqueId) => {
  const subject = "You've been referred to Quarters!";
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${subject}</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${emailStyles}
    </head>
    <body>
      <div class="container">
        <img src="cid:logo" class="logo" alt="Quarters Logo">
        <p>Hi there,</p>
        <p>You have been referred by <strong>${referrer}</strong> to join Quarters.</p>
        <p>Your referral code is: <strong>${uniqueId}</strong></p>
        <p>Click the button below to sign up and start your journey with Quarters:</p>
        <a class="custom-button" href="https://myquarters.ca/" target="_blank">Sign Up</a>
      </div>
    </body>
    </html>
  `;

  const attachments = [{
    filename: 'logo.png',
    path: path.join(__dirname, '../public', 'logo.png'),
    cid: 'logo',
  }];

  const mailOptions = {
    from: 'Quarters <hello@myquarters.ca>',
    to: referredEmail,
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
