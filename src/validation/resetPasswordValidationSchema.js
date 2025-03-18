import Joi from 'joi';

export const resetPasswordValidationSchema = Joi.object({
  email: Joi.string().required().min(1).max(30),
  token: Joi.string().required(),
});
