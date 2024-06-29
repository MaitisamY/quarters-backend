/* Email templates */

/* Email styles */ 
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
        .header-image {
            width: 100%;
            height: auto;
            object-fit: cover;
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
    </style>
`;

/* Verification email template function */
export const getVerificationEmailTemplate = (name, verificationCode) => {
    return {
        subject: 'Your Verification Code',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Your Verification Code</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                ${emailStyles}
            </head>
            <body>
            <div class="container">
                <img src="cid:logo" class="logo" alt="Quarters Logo">
                <p>Hi ${name},</p>
                <p>Thank you for signing up to Quarters. Use the code below to verify your email.</p>
                <h1><span class="code">${verificationCode}</span></h1>
            </div>
            </body>
            </html>
        `,
    };
};

/* Welcome email template function */
export const getWelcomeEmailTemplate = (name, role) => {
    let subject;
    let html;
    let imageCid;
  
    /* Role based email templates */
    /* Renter */
    switch (role) {
        case 'renter':
            subject = "Welcome to Quarters! Your Path to Smarter Renting Starts Here";
            imageCid = 'renter-image';
            html = `
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
                    <img src="cid:${imageCid}" class="header-image" alt="Welcome to Quarters">
                    <p>Hi ${name},</p>
                    <p>Welcome to Quarters, where your rental journey is about to get a whole lot better! We're thrilled to have you on board.</p>
                    <p>Here's a sneak peek at what you can expect when we launch:</p>
                    <p>Build Your Credit: We'll report your on-time rent payments to major credit bureaus, helping you build a strong credit history.</p>
                    <p>Flexible Payments: Whether you want to pay early and earn bonus cashback or need a bit more time, we've got you covered.</p>
                    <p>Cashback Rewards: Earn cashback for on-time payments, early payments, shopping with our partner brands, and more! Your Quarters Piggy Bank will help you save for your future home or next lease.</p>
                    <p>Exclusive Perks: Engage in our weekly interactive activities and refer friends to earn even more rewards.</p>
                    <p>We can't wait to help you make the most out of renting. Stay tuned for more updates and get ready to experience a new era of renting with Quarters!</p>
                    <p>Best regards,</p>
                    <div class="footer">The Quarters Team</div>
                </div>
            </body>
            </html>
            `;
        break;
        /* Landlord */
        case 'landlord':
            subject = "Welcome to Quarters! Maximize Your Rental Income with Us";
            imageCid = 'landlord-image';
            html = `
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
                    <img src="cid:${imageCid}" class="header-image" alt="Welcome to Quarters">
                    <p>Hi ${name},</p>
                    <p>Thank you for joining Quarters! We're excited to have you as part of our community.</p>
                    <p>Here's a glimpse of what's coming your way when we launch:</p>
                    <p>Comprehensive Screening: Access reliable and thorough screening tools, including credit reports, income verification, and more, to ensure you get the best tenants.</p>
                    <p>Rent Reporting: Benefit from both positive and negative rent reporting to promote tenant accountability and reduce late payments.</p>
                    <p>Cashback Rewards: Earn cashback for screening tenants, referring other landlords, and when your tenants move out using their Quarters Piggy Bank.</p>
                    <p>Tenant Replacement Services: Quickly fill vacant units and maintain steady rental income with our efficient tenant replacement service.</p>
                    <p>Marketing Support: Enhance your property's visibility and attract more tenants by being part of the Quarters Club.</p>
                    <p>We're here to help you maximize your rental income and streamline your property management. Stay tuned for our launch and get ready to transform your rental experience with Quarters!</p>
                    <p>Best regards,</p>
                    <div class="footer">The Quarters Team</div>
                </div>
            </body>
            </html>
            `;
        break;
        /* Agent */
        case 'agent':
            subject = "Welcome to Quarters! Unlock Global Potential and Boost Your Business";
            imageCid = 'agent-image';
            html = `
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
                    <img src="cid:${imageCid}" class="header-image" alt="Welcome to Quarters">
                    <p>Hi ${name},</p>
                    <p>Welcome to Quarters! We're thrilled to have you join our platform.</p>
                    <p>Here's a preview of what you can look forward to when we go live:</p>
                    <p>Comprehensive Screening: Confidently recommend clients with our extensive screening services, including credit reports, income verification, and more.</p>
                    <p>Global Applicant Access: Expand your pool of potential tenants with access to international applicants.</p>
                    <p>Cashback Rewards: Earn cashback for screening applicants, referring landlords and tenants, and when your clients join Quarters.</p>
                    <p>Applicant Dashboard: Manage all your screenings and client interactions efficiently with our user-friendly dashboard.</p>
                    <p>Flexible Payment Options: Choose to pay for screenings yourself or charge applicants directly, making the process seamless.</p>
                    <p>We're here to help you unlock global potential and take your business to the next level. Stay tuned for our launch and get ready to experience a smarter way of doing business with Quarters!</p>
                    <p>Best regards,</p>
                    <div class="footer">The Quarters Team</div>
                </div>
            </body>
            </html>
            `;
        break;
        default:
            subject = "Welcome to Our Service!";
            html = `<h1>Welcome!</h1><p>Thank you for registering with our service.</p>`;
            break;
    }
  
    return { subject, html };
};

  