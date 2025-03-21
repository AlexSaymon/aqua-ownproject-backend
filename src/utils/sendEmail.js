import nodemailer from 'nodemailer';
import { ENV_VARS } from '../constants/env.js';
import { getEnv } from './getEnv.js';
import createHttpError from 'http-errors';

const transport = nodemailer.createTransport({
  host: getEnv(ENV_VARS.SMTP_HOST),
  port: getEnv(ENV_VARS.SMTP_PORT),
  auth: {
    user: getEnv(ENV_VARS.SMTP_USER),
    pass: getEnv(ENV_VARS.SMTP_PASS),
  },
});

export const sendEmail = async (options) => {
  try {
    return await transport.sendMail({
      to: options.to,
      subject: options.subject,
      from: options.from,
      html: options.html,
    });
  } catch (err) {
    console.error(err);
    throw createHttpError(500, 'Failed to send email, please try again later');
  }
};
