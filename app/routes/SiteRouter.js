import {Router} from 'express';
import SiteController from '../controllers/SiteController.js';

const siteRouter = Router();

siteRouter.get('/', SiteController.index)

export default siteRouter;
