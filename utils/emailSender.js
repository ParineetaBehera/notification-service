const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

// Setup transporter with Gmail and App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // should be "parineeta316@gmail.com"
    pass: process.env.EMAIL_PASS  // 16-character App Password
  }
});

/**
 * Sends an email
 * @param {String} to - recipient email
 * @param {String} subject - email subject
 * @param {String} text - email body
 */
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error.message);
    throw error;
  }
};

module.exports = sendEmail;
