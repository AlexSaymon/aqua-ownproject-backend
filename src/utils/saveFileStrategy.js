import { ENV_VARS } from '../constants/env.js';
import { getEnv } from './getEnv.js';
import { saveFileToCloudinary } from './saveFileToCloudinary.js';

export const saveFile = async (file) => {
  const strategy = getEnv(ENV_VARS.SAVE_FILE_STRATEGY);

  if (strategy === 'cloudinary') {
    return await saveFileToCloudinary(file);
  }
};
