import Joi from 'joi';

const belarusPhonePattern  = /^(\+375|80)(25|29|33|44)\d{7}$/;
export const callsValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(255).required(),
        phone: Joi.string().regex(belarusPhonePattern).min(7).max(255).required(),
        email: Joi.string().email().max(255).required(),
        formTypeId: Joi.number().integer().positive().required()
    });
    return schema.validate(data, { abortEarly: false });
};
