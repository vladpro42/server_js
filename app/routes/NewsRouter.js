import {Router} from 'express';
import NewsController from '../controllers/NewsController.js';

const newsRouter = Router();

newsRouter.get('/', NewsController.getNews);
newsRouter.get('/:id', NewsController.getService);
newsRouter.post('/', NewsController.createService);
newsRouter.put('/:id', NewsController.updateService);
newsRouter.delete('/:id', NewsController.deleteService);

export default newsRouter;
