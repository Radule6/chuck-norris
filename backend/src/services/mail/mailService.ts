import transporter from '../../config/mailConfig';

import { generateMailConfirmationJWT } from '../../utils/generateJWT';

const sendMailService = async (email: string) => {
  const linkToken = generateMailConfirmationJWT(email);

  const link = `${process.env.HOST}:${process.env.PORT}/api/confirmation/${linkToken}`;

  const mailOptions = {
    from: 'markotestradulovictest@gmail.com',
    to: email,
    subject: 'Account Email Confirmation',
    text: `Please confirm your email by clicking on the following link: ${link}`,
  };

  /* COMMENTED OUT FOR BETTER JEST EXP*/

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.error('Error sending email:', error);
  //   } else {
  //     console.log('Email sent:', info.response);
  //   }
  // });
  transporter.sendMail(mailOptions);
};

export { sendMailService };
