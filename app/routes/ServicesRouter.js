import {Router} from 'express';
import ServicesController from '../controllers/ServicesController.js';

const servicesRouter = Router();

servicesRouter.get('/', ServicesController.getServices);
servicesRouter.get('/:id', ServicesController.getService);
servicesRouter.post('/', ServicesController.createService);
servicesRouter.put('/:id', ServicesController.updateService);
servicesRouter.delete('/:id', ServicesController.deleteService);

export default servicesRouter;
