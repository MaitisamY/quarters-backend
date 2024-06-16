import nodemailer from "nodemailer";
import dotenv from "dotenv";

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

export const sendReferralEmail = (referrer, referredEmail, uniqueId) => {
  const subject = "You've been referred to Quarters!";
  const html = `
    <h1>Welcome to Quarters!</h1>
    <p>You have been referred by ${referrer} to join Quarters.</p>
    <p>Your referral code is: <strong>${uniqueId}</strong></p>
    <p>Click <a href="https://quarters.com/signup">here</a> to sign up!</p>
  `;

  const mailOptions = {
    from: '"Quarters" <tamur@myquarters.ca>',
    to: referredEmail,
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
