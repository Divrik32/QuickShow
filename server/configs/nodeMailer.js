import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,             // or 465 if you want secure SSL
  secure: false,         // true for port 465, false for 587
  auth: {
    user: process.env.SMTP_USER, // Brevo SMTP user
    pass: process.env.SMTP_PASS, // Brevo SMTP password
  },
  tls: {
    rejectUnauthorized: false, // helps avoid some TLS issues
  },
});

const sendEmail = async ({ to, subject, body }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to,
      subject,
      html: body,
    });
    console.log("Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};

export default sendEmail;