import nodemailer from 'nodemailer';
import emailConfig from './config';
const defaultSubject = 'Message from node server';

export default async (context) => {
  let transporter = nodemailer.createTransport(emailConfig);

  // verify connection configuration
  try {
    await transporter.verify((error) => {
      if (error) {
        console.log('Connection error: %s', error);
        return Promise.reject(error)
      } else {
        console.log('Server is ready to take our messages');
      }
    });

    let info = await transporter.sendMail({
      from: `Node server <${context.from}>`,
      to: context.to,
      subject: context.subject || defaultSubject,
      html: context.html,
      attachments: context.attachments ? context.attachments.map((a) => {
        return {
          filename: a.filename,
          path: a.path
        }
      }) : []
    });

    console.log('Message sent: %s', info.messageId);

  } catch (e) {
    return Promise.reject(e)
  }
};
