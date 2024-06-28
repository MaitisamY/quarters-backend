import nodemailer from "nodemailer";
import dotenv from "dotenv";

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

export const sendReferralEmail = (referrer, referredEmail, uniqueId) => {
  const subject = "You've been referred to Quarters!";
  const html = `
    <div 
        style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        "
    >
    <h1>Welcome to Quarters!</h1>
    <p>You have been referred by ${referrer} to join Quarters.</p>
    <p>Your referral code is: <strong>${uniqueId}</strong></p>
    <p>Click <a href="https://quarters.com/signup">here</a> to sign up!</p>
    </div>
  `;

  const mailOptions = {
    from: 'Quarters - <no-reply@myquarters.ca>',
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
