import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'markotestradulovictest@gmail.com',
    pass: 'zyutuvhvdjdfvqqy',
  },
});

export default transporter;
