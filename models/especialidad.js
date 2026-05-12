const { DataTypes } = require('sequelize');
const sequelize = require("../config/configbd");

const Especialidad= sequelize.define(
    'especialidad',
    {
        idEspecialidad: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nombreEspecialidad: {
            type: DataTypes.STRING,
            allowNull: false

        }
    },
    {
        tableName: 'especialidad',
        timestamps: false
    }
)



module.exports= Especialidad;

