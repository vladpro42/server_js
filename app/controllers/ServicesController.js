import { sequelize } from '../db/postgresql.js';
import { ServicesModal } from '../models/ServicesModal.js';

class ServicesController {
    async getServices (req,res) {
        try {
            const services = await ServicesModal.find();
            return res.status(200).json(services);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching services", error });
        }
    }

    async getService() {}
    async createService() {}
    async updateService() {}
    async deleteService(req, res) {
        const { id } = req.params;
        try {
            const result = await sequelize.query('DELETE from services WHERE id = $1', [id])
            if(result.rowCount === 0 ) {
                return res.statusCode(404).json({message: 'service not found'})
            }
            return res.status(200).json({ message: 'Service deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error', text: error.message});
        }
    }
}

export default new ServicesController();