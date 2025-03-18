import Joi from "joi";

export const updateWaterValidationSchema = Joi.object({
    name: Joi.string().required().min(2).max(20),
    sex: Joi.string().required().min(2).max(20),
    weight: Joi.string().required().min(2).max(20),
    activeTime: Joi.string().required().min(2).max(20),
    dailyNorm: Joi.string().required().min(2).max(20)
})
