import Joi from 'joi';

export const formTypesValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(255).required(),

    });
    return schema.validate(data, { abortEarly: false });
};
