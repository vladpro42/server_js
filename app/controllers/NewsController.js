import { sequelize } from '../db/postgresql.js';
import { ServicesModal } from '../models/ServicesModal.js';
import { NewsModal } from '../models/NewsModal.js';

class NewsController {
    async getNews(req, res) {
        try {
            const news = await NewsModal.findAll();
            return res.status(200).json(news);
        } catch (error) {
            return res.status(500).json({ message: 'Error fetching services', error });
        }
    }

    async getService() {}

    async createService() {}

    async updateService() {}

    async deleteService(req, res) {
        const { id } = req.params;
    }
}

export default new NewsController();