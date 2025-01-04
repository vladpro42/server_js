import { sequelize } from '../db/postgresql.js';
import { DataTypes, Model } from 'sequelize';
import { FormTypesModel } from './FormTypesModel.js';

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
            type: DataTypes.STRING,
        },
        formTypeId: {
            type: DataTypes.INTEGER,
            references: {
                model: FormTypesModel,
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    },
    { sequelize, modelName: 'calls' },
);
export { CallsModal };



// (async () => {
//     await CallsModal.sync({  });
// })();