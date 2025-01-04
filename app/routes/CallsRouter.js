import {Router} from 'express';
import CallsController from '../controllers/CallsController.js';

const callsRouter = Router();

callsRouter.get('/', CallsController.getItems);
callsRouter.get('/:id', CallsController.getItem);
callsRouter.post('/', CallsController.createItem);
callsRouter.put('/:id', CallsController.updateItem);
callsRouter.delete('/:id', CallsController.deleteItem);

export default callsRouter;
