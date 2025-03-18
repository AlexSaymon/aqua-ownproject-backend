import cloudinary from 'cloudinary';
import { getEnv } from './getEnv';
import { ENV_VARS } from '../constants/env';
import fs from 'node:fs/promises';
import createHttpError from 'http-errors';

cloudinary.config({
  cloud_name: getEnv(ENV_VARS.CLOUDINARY_CLOUD_NAME),
  api_key: getEnv(ENV_VARS.CLOUDINARY_API_KEY),
  api_secret: getEnv(ENV_VARS.CLOUDINARY_API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  try {
    const res = await cloudinary.v2.uploader.upload(file.path);
    await fs.unlink(file.path);
    return res.secure_url;
  } catch (err) {
    console.log(err);
    throw createHttpError(500, 'Failed to upload image to cloudinary');
  }
};
