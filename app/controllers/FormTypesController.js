import MainController from '../classes/MainController.js';
import { HttpError } from '../classes/HttpError.js';
import { FormTypesModel } from '../models/FormTypesModel.js';
import { advantageValidation } from '../validations/advantages.js';
import { formTypesValidator } from '../validations/formTypesValidator.js';

class FormTypesController extends MainController{
    constructor() {
        super();
    }
    async getItems(req, res) {
        try {
            const items = await FormTypesModel.findAll();

            if (!items) {
                throw HttpError.notFound(`This formTypes don't exists`);
            }
            return res.json(items);
        } catch (err) {
            if (err instanceof HttpError) {
                return res.status(err.statusCode).json({ message: err.message });
            }
            res.status(500).json({ message: 'Ошибка серверва', err: err.message });
        }
    }

    async getItem(req, res) {
        try {
            const { id } = req.params;
            const items = await FormTypesModel.findByPk(id);
            if (!items) {
                throw HttpError.notFound(`This formTypes with id = ${id} doesn't exists`);
            }
            return res.json(items);
        } catch (err) {
            if (err instanceof HttpError) {
                return res.status(err.statusCode).json({ message: err.message });
            }
            res.status(500).json({ message: 'Ошибка серверва', err: err.message });
        }
    }

     createItem = async (req, res) => {
        try {
            const { name } = req.body;

            const { error: errValidate } = formTypesValidator(req.body);
            if (errValidate) {
                const errorMessage = this.getIsProd()
                    ? 'Входные данные не прошли валидацию'
                    : errValidate.details.map(err => err.message);
                throw HttpError.badRequest(errorMessage);
            }
            const items = await FormTypesModel.create({ name});
            return res.json(items);
        } catch (err) {
            if (err instanceof HttpError) {
                return res.status(err.statusCode).json({ message: err.message });
            }
            res.status(500).json({ message: 'Ошибка серверва', err: err.message });
        }
    }

     updateItem = async (req, res) => {
        try {
            const { name } = req.body;
            const { id } = req.params;

            const { error: errValidate } = advantageValidation(req.body);

            if (errValidate) {
                const errorMessage = this.getIsProd()
                    ? 'Входные данные не прошли валидацию'
                    : errValidate.details.map(err => err.message);
                throw HttpError.badRequest(errorMessage);
            }

            const item = await FormTypesModel.findByPk(id);

            if (!item) {
                throw HttpError.notFound(`This advantage with id = ${id} doesn't exist`);
            }

            item.name = name;

            await item.save();

            return res.json({ message: 'Item updated successfully', item });
        } catch (err) {
            if (err instanceof HttpError) {
                return res.status(err.statusCode).json({ message: err.message });
            }
            return res.status(500).json({ message: 'Ошибка сервера', err: err.message });
        }
    }

    async deleteItem(req, res) {
        try {
            const { id } = req.params;
            const item = await FormTypesModel.findByPk(id);

            if (!item) {
                throw HttpError.notFound(`This advantage with id = ${id} doesn't exist`);
            }

            const deletedItem = await item.destroy();

            return res.json({ message: 'Item updated successfully', deletedItem });
        } catch (err) {
            if (err instanceof HttpError) {
                return res.status(err.statusCode).json({ message: err.message });
            }
            return res.status(500).json({ message: 'Ошибка сервера', err: err.message });

        }
    }
}

export default new FormTypesController();