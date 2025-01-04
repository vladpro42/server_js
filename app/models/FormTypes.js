import { sequelize } from '../db/postgresql.js';
import { DataTypes, Model } from 'sequelize';

class FormTypes extends Model {}

FormTypes.init(
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
    },
    { sequelize, modelName: 'formTypes' },
);
export { FormTypes };
