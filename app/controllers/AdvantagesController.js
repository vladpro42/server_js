import { AdvantagesModal } from '../models/AdvantagesModal.js';
import { HttpError } from '../classes/HttpError.js';
import { advantageValidation } from '../validations/advantages.js';
import MainController from '../classes/MainController.js';

class AdvantagesController extends MainController {
    constructor() {
        super();
        this.getIsProd = this.getIsProd.bind(this);
    }

    async getItems(req, res) {
        try {
            const items = await AdvantagesModal.findAll();

            if (!items) {
                throw HttpError.notFound(`This advantages don't exists`);
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
            const items = await AdvantagesModal.findByPk(id);
            if (!items) {
                throw HttpError.notFound(`This advantage with id = ${id} doesn't exists`);
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
            const { name, description, className, icon } = req.body;

            const { error: errValidate } = advantageValidation(req.body);
            if (errValidate) {
                const errorMessage = this.getIsProd()
                    ? 'Входные данные не прошли валидацию'
                    : errValidate.details.map(err => err.message);
                throw HttpError.badRequest(errorMessage);
            }
            const items = await AdvantagesModal.create({ name, description, className, icon });
            return res.json(items);
        } catch (err) {
            if (err instanceof HttpError) {
                return res.status(err.statusCode).json({ message: err.message });
            }
            res.status(500).json({ message: 'Ошибка серверва', err: err.message });
        }
    }

    async updateItem(req, res) {
        try {
            const { name, description, className, icon } = req.body;
            const { id } = req.params;

            const { error: errValidate } = advantageValidation(req.body);


            if (errValidate) {
                const errorMessage = this.getIsProd()
                    ? 'Входные данные не прошли валидацию'
                    : errValidate.details.map(err => err.message);
                throw HttpError.badRequest(errorMessage);
            }

            const item = await AdvantagesModal.findByPk(id);

            if (!item) {
                throw HttpError.notFound(`This advantage with id = ${id} doesn't exist`);
            }

            item.name = name;
            item.description = description;
            item.className = className;
            item.icon = icon;

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
            const item = await AdvantagesModal.findByPk(id);

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

export default new AdvantagesController();