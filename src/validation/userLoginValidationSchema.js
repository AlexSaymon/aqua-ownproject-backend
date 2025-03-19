import Joi from 'joi';

export const loginUserValidationSchema = Joi.object({
  email: Joi.string().required().min(3).max(40),
  password: Joi.string().required().min(3).max(20),
});
