import { sequelize } from '../db/postgresql.js';
import { DataTypes, Model } from 'sequelize';

class UserModal extends Model {

}

UserModal.init(
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
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.TEXT,
            defaultValue: 'user',
        },
    },
    { sequelize, modelName: 'users' },
);
export { UserModal };
//
// (async () => {
//     await sequelize.sync({ alter: true });
//     // Code here
// })();