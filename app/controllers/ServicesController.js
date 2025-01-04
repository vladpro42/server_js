import {ServicesModal} from '../models/ServicesModal.js';
import MainController from '../classes/MainController.js';
import {HttpError} from '../classes/HttpError.js';
import {serviceValidator, serviceValidatorUpdate} from '../validations/serviceValidator.js';
import * as fs from "fs";
import path from "path";
import {__dirname} from "../../index.js";

export const deleteFile = (filePath) => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(filePath)) {
           throw new Error("file doesn't exists")
        } else {
            fs.unlink(filePath, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('file deleted successfully')
                }
            })
        }
    })
}

class ServicesController extends MainController {
    async getServices(req, res) {
        try {
            const items = await ServicesModal.findAll();
            if (!items) {
                throw HttpError.notFound(`This service don't exists`);
            }
            return res.json(items);
        } catch (err) {
            if (err instanceof HttpError) {
                return res.status(err.statusCode).json({message: err.message});
            }
            return res.status(500).json({message: 'Error fetching services', err});
        }
    }

    async getService(req, res) {
        try {
            const {id} = req.params;
            const item = await ServicesModal.findByPk(id);
            if (!item) {
                throw HttpError.notFound(`This service with id = ${id} doesn't exists`);
            }
            return res.json(item);
        } catch (err) {
            if (err instanceof HttpError) {
                return res.status(err.statusCode).json({message: err.message});
            }
            res.status(500).json({message: 'Ошибка серверва', err: err.message});
        }
    }

    createService = async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({message: 'No file uploaded.'});
            }
            const {name, url, description, content} = req.body;

            // Если файл загружен, формируем путь к изображению
            const imagePath = req.file ? `/static/images/${req.file.filename}` : null;
            // Валидация данных
            const {error: errValidate} = serviceValidator({name, url, description, content});
            if (errValidate) {
                const str = 'Входные данные не прошли валидацию';
                const errorMessage = errValidate.details.map(err => err.message);
                throw HttpError.badRequest(errorMessage);
            }

            // Создаем запись в базе данных с учетом пути к изображению
            const items = await ServicesModal.create({
                name,
                image: imagePath,  // Сохраняем путь к изображению
                url,
                description,
                content
            });

            return res.json(items);
        } catch (err) {
            if (err instanceof HttpError) {
                return res.status(err.statusCode).json({message: err.message});
            }
            return res.status(500).json({message: 'Ошибка серверва', err: err.message});
        }
    };

     updateService = async (req, res) => {
        try {
            const { id } = req.params;
            const { error: errValidate } = serviceValidatorUpdate(req.body);

            if (errValidate) {
                const str = 'Входные данные не прошли валидацию';
                const errorMessage = this.getIsProd() ? str : errValidate.details.map(err => err.message);
                throw HttpError.badRequest(errorMessage);
            }

            const item = await ServicesModal.findByPk(id);

            if (!item) {
                throw HttpError.notFound(`This service with id = ${id} doesn't exist`);
            }

            const imagePath = req.file ? `/static/images/${req.file.filename}` : null;

            // Удаляем старую картинку, если новая не загружена
            if (req.file && item.image) {
                // Генерируем полный путь для старого изображения
                const oldImagePath = path.join(path.resolve(), item.image);
                await deleteFile(oldImagePath);
            }

            // Обновляем данные
            const updatableFields = ['name', 'image', 'url', 'description', 'content'];
            updatableFields.forEach(field => {
                if (req.body[field] !== undefined) {
                    item[field] = req.body[field];
                }
            });

            // Если новая картинка есть, заменяем её
            if (imagePath) {
                item.image = imagePath;
            }

            await item.save();

            return res.json({ message: 'Item updated successfully', item });
        } catch (err) {
            if (err instanceof HttpError) {
                return res.status(err.statusCode).json({ message: err.message });
            }
            return res.status(500).json({ message: 'Ошибка сервера', err: err.message });
        }
    };

    async deleteService(req, res) {
        try {
            const {id} = req.params;
            const item = await ServicesModal.findByPk(id);

            if (!item) {
                throw HttpError.notFound(`This advantage with id = ${id} doesn't exist`);
            }

            const deletedItem = await item.destroy();

            return res.json({message: 'Item updated successfully', deletedItem});
        } catch (err) {
            if (err instanceof HttpError) {
                return res.status(err.statusCode).json({message: err.message});
            }
            return res.status(500).json({message: 'Ошибка сервера', err: err.message});

        }
    }
}

export default new ServicesController();

