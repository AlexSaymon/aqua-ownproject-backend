import { ENV_VARS } from '../constants/env';
import { getEnv } from './getEnv';
import { saveFileToCloudinary } from './saveFileToCloudinary';

export const saveFile = async (file) => {
  const strategy = getEnv(ENV_VARS.SAVE_FILE_STRATEGY);

  if (strategy === 'cloudinary') {
    return await saveFileToCloudinary(file);
  }
};
