import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // true for port 465 (SSL), false for 587 (STARTTLS)
    auth: {
        user: process.env.SMTP_USER?.trim(), // Trim extra spaces
        pass: process.env.SMTP_PASS?.trim(),
    },
    tls: {
        rejectUnauthorized: false // Self-signed certs ke liye (optional)
    },
    debug: true, // Test ke time true rakho, production false
    logger: true // Logs dekho error debug ke liye
});

const sendEmail = async ({ to, subject, body }) => {
    try {
        const response = await transporter.sendMail({
            from: `"No Reply" <${process.env.SENDER_EMAIL}>`, // Better format
            to,
            subject,
            html: body,
        });
        console.log('Email sent:', response.messageId);
        return response;
    } catch (error) {
        console.error('Email error:', error);
        throw error;
    }
};

export default sendEmail;
