import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';


// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')

// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: 'path/to/database.sqlite'
// });

export const sequelize = new Sequelize( process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
    host: process.env.PGHOST,
    dialect: 'postgres'
});

dotenv.config()

 /* const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});

pool.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к PostgreSQL:', err);
    } else {
        console.log('Успешное подключение к PostgreSQL');
    }
});

export {pool}*/

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


// (async () => {
//     await sequelize.sync();
//     // Code here
// })();