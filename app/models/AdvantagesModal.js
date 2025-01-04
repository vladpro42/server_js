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
            validate: {
                len: [1, 50],
                notEmpty: true,
            }
        },
        description: {
            type: DataTypes.TEXT,
        },
        className: {
            type: DataTypes.STRING,
        },
        icon: {
            type: DataTypes.STRING,
        },
    },
    { sequelize, modelName: 'advantages' },
);
export { AdvantagesModal };

// (async () => {
//     await AdvantagesModal.sync({ force: true });
//     // Code here
// })();