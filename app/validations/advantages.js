import Joi from 'joi';

export const advantageValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(255).required(), // Длина строки от 1 до 255 символов, обязательное поле
        className: Joi.string().min(1).max(255).optional(), // Необязательное поле
        icon: Joi.string().min(1).max(255).optional(), // Необязательное поле
        description: Joi.string().optional(), // Необязательное поле
    });

    // Возвращаем результат валидации
    return schema.validate(data, { abortEarly: false }); // abortEarly: false для сбора всех ошибок
};
