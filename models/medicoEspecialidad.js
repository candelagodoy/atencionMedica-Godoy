const { DataTypes } = require('sequelize');
const sequelize = require("../config/configbd");

const MedicoEspecialidad= sequelize.define(
    'medicoespecialidad',
    {
        idMedicoEspecialidad: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        matricula: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        idEspecialidadFK:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: "especialidad",
                key: 'idEspecialidad'
            }
        },
        idMedicoFK: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "medico",
                key: 'idPersona'
              }
        }
    },
    {
        tableName: 'medicoespecialidad',  
        timestamps: false, 
    }
)

module.exports= MedicoEspecialidad;