import { sequelize } from '../db/postgresql.js';
import { DataTypes, Model } from 'sequelize';
import { FormTypes } from './FormTypes.js';

class CallsModal extends Model {}

CallsModal.init(
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
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.TEXT,
        },
        formTypeId: {
            type: DataTypes.INTEGER,
            references: {
                model: FormTypes,
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    },
    { sequelize, modelName: 'calls' },
);
export { CallsModal };
