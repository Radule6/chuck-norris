import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const USERNAME = process.env.GMAIL_USERNAME;
const PASSWORD = process.env.GMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: USERNAME,
    pass: PASSWORD,
  },
});

export default transporter;
