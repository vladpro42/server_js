import Joi from 'joi';

export const serviceValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().max(255).optional(),
        url: Joi.string().min(1).max(255).required(),
        //image: Joi.string().max(255).optional(),
        description: Joi.string().max(65535).optional(),
        content: Joi.string().max(65535).optional(),
        isActive: Joi.boolean().optional(),
    });

    return schema.validate(data, {abortEarly: false});
};

export const serviceValidatorUpdate = (data) => {
    const schema = Joi.object({
        name: Joi.string().max(255).optional(),
        url: Joi.string().min(1).max(255).optional(),
        image: Joi.string().max(255).optional(),
        description: Joi.string().max(65535).optional(),
        content: Joi.string().max(65535).optional(),
        isActive: Joi.boolean().optional(),
    }).or('name', 'image', 'url', 'description', 'content');

    return schema.validate(data, {abortEarly: false});
};
