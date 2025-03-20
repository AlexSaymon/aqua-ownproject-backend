import Joi from 'joi';

export const updateUserValidationSchema = Joi.object({
  name: Joi.string().required().min(2).max(20),
  email: Joi.string().required().min(2).max(40),
  sex: Joi.string().required().min(2).max(20),
  weight: Joi.string().required().min(2).max(20),
  activeTime: Joi.string().required().min(2).max(20),
  dailyNorm: Joi.string().required().min(2).max(20),
});
