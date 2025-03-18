import Joi from 'joi';

export const addWaterValidationSchema = Joi.object({
  volume: Joi.string().required(),
  date: Joi.date().required(),
});
