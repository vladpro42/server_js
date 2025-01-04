import { sequelize } from '../db/postgresql.js';
import { DataTypes, Model } from 'sequelize';

class NewsModal extends Model {

}

NewsModal.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.STRING,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
        },
    },
    {sequelize, modelName: 'news'}
)
export {NewsModal}

// (async () => {
//     await NewsModal.sync({  });
//     // Code here
// })();