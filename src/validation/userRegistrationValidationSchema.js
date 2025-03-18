import Joi from 'joi';

export const registerUserValidationSchema = Joi.object({
  email: Joi.string().required().min(3).max(20),
  password: Joi.string().required().min(3).max(20),
});
