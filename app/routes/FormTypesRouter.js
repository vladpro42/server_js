import {Router} from 'express';
import FormTypesController from '../controllers/FormTypesController.js';

const formTypesRouter = Router();

formTypesRouter.get('/', FormTypesController.getItems);
formTypesRouter.get('/:id', FormTypesController.getItem);
formTypesRouter.post('/', FormTypesController.createItem);
formTypesRouter.put('/:id', FormTypesController.updateItem);
formTypesRouter.delete('/:id', FormTypesController.deleteItem);

export default formTypesRouter;
