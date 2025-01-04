import { sequelize } from '../db/postgresql.js';
import { DataTypes, Model } from 'sequelize';

class SettingsSiteModal extends Model {}

SettingsSiteModal.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    },
    { sequelize, modelName: 'settingsSite' },
);
export { SettingsSiteModal };
