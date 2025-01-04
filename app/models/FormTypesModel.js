import { sequelize } from '../db/postgresql.js';
import { DataTypes, Model } from 'sequelize';

class FormTypesModel extends Model {}

FormTypesModel.init(
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
export { FormTypesModel };

// (async () => {
//     await FormTypesModel.sync({  });
//     // Code here
// })();