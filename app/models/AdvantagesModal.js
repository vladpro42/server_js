import { sequelize } from '../db/postgresql.js';
import { DataTypes, Model } from 'sequelize';

class AdvantagesModal extends Model {}

AdvantagesModal.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        className: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        icon: {
            type: DataTypes.STRING,
        },
    },
    { sequelize, modelName: 'advantages' },
);
export { AdvantagesModal };

// (async () => {
//     await AdvantagesModal.sync({ alter: true });
//     // Code here
// })();