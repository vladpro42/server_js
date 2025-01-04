import { sequelize } from '../db/postgresql.js';
import { DataTypes, Model } from 'sequelize';

class ServicesModal extends Model {

}

ServicesModal.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        content: {
            type: DataTypes.TEXT,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
        },



    },
    {sequelize, modelName: 'services'}
)
export  {ServicesModal}

// (async () => {
//     await sequelize.sync({ alter: true });
//     // Code here
// })();