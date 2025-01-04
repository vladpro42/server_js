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
            allowNull: false,
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
            defaultValue: true
        },

    },
    {sequelize, modelName: 'services'}
)
export  {ServicesModal}

// (async () => {
//     await ServicesModal.sync({ force: true });
// })();