export class HttpError extends Error {
    constructor(message, statusCode, details = false) {
        super(message); // Устанавливаем сообщение ошибки
        this.name = this.constructor.name; // Устанавливаем имя ошибки
        this.statusCode = statusCode; // Устанавливаем статусный код
        this.details = details

        // Сохраняем стек вызовов (только если не в продакшене)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    // Статический метод для создания ошибки 404
    static notFound(message = 'Resource not found', details= false) {
        return new HttpError(message, 404, details);
    }

    // Статический метод для создания ошибки 400
    static badRequest(message = 'Bad request',details= false) {
        return new HttpError(message, 400,details);
    }

    // Статический метод для ошибки 500
    static internalServerError(message = 'Internal server error', details= false) {
        return new HttpError(message, 500, details);
    }
}

