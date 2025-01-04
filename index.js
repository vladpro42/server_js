import express from 'express';
import userRouter from './app/routes/UserRouter.js';
import servicesRouter from './app/routes/ServicesRouter.js';
import newsRouter from './app/routes/NewsRouter.js';
import advantagesRouter from './app/routes/AdvantagesRouter.js';
import callsRouter from './app/routes/CallsRouter.js';
import formTypesRouter from './app/routes/FormTypesRouter.js';
import settingsSiteRouter from './app/routes/SettingsSiteRouter.js';
import siteRouter from './app/routes/SiteRouter.js';
const app = express();


app.use(express.json());
app.use('/images', express.static('static/images'));
app.use('/users', userRouter);
app.use('/services', servicesRouter);
app.use('/news', newsRouter);
app.use('/advantages', advantagesRouter);
app.use('/calls', callsRouter);
app.use('/form-types', formTypesRouter);
app.use('/settings-site', settingsSiteRouter);
app.use('/', siteRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
