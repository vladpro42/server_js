import {Router} from 'express';
import AdvantagesController from '../controllers/AdvantagesController.js';

const advantagesRouter = Router();

advantagesRouter.get('/', AdvantagesController.getItems);
advantagesRouter.get('/:id', AdvantagesController.getItem);
advantagesRouter.post('/', AdvantagesController.createItem);
advantagesRouter.put('/:id', AdvantagesController.updateItem);
advantagesRouter.delete('/:id', AdvantagesController.deleteItem);

export default advantagesRouter;
