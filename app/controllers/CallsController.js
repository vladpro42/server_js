import { CallsModal } from '../models/CallsModal.js';
import { HttpError } from '../classes/HttpError.js';
import MainController from '../classes/MainController.js';
import { callsValidator } from '../validations/callsValidator.js';
import { FormTypesModel } from '../models/FormTypesModel.js';

class CallsController extends MainController {
    constructor() {
        super();
    }

    async getItems(req, res) {
        try {
            const items = await CallsModal.findAll();

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
            const items = await CallsModal.findByPk(id);
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
            const { name, phone, email, formTypeId } = req.body;

            const { error: errValidate } = callsValidator(req.body);
            if (errValidate) {
                const errorMessage = this.getIsProd()
                    ? 'Входные данные не прошли валидацию'
                    : errValidate.details.map(err => err.message);
                throw HttpError.badRequest(errorMessage);
            }

            const formType = await FormTypesModel.findByPk(formTypeId);
            if(!formType) {
                throw HttpError.notFound(`This FormTypes with id = ${formTypeId} doesn't exists`);
            }
            const items = await CallsModal.create({ name, phone, email, formTypeId });
            return res.json(items);
        } catch (err) {
            if (err instanceof HttpError) {
                return res.status(err.statusCode).json({ message: err.message });
            }
            console.log(err)
            res.status(500).json({ message: 'Ошибка серверва', err: err.message });
        }
    };

    updateItem = async (req, res) => {
        try {
            const { name, phone, email, formTypeId } = req.body;
            const { id } = req.params;

            const { error: errValidate } = callsValidator(req.body);

            if (errValidate) {
                const errorMessage = this.getIsProd()
                    ? 'Входные данные не прошли валидацию'
                    : errValidate.details.map(err => err.message);
                throw HttpError.badRequest(errorMessage);
            }

            const item = await CallsModal.findByPk(id);

            if (!item) {
                throw HttpError.notFound(`This callsItem with id = ${id} doesn't exist`);
            }

            item.name = name;
            item.phone = phone;
            item.email = email;
            item.formTypeId = formTypeId;

            await item.save();

            return res.json({ message: 'Item updated successfully', item });
        } catch (err) {
            if (err instanceof HttpError) {
                return res.status(err.statusCode).json({ message: err.message });
            }
            return res.status(500).json({ message: 'Ошибка сервера', err: err.message });
        }
    };

    async deleteItem(req, res) {
        try {
            const { id } = req.params;
            const item = await CallsModal.findByPk(id);

            if (!item) {
                throw HttpError.notFound(`This callsItem with id = ${id} doesn't exist`);
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

export default new CallsController();