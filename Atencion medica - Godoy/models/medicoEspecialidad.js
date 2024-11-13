const { DataTypes } = require('sequelize');
const sequelize = require("../config/configbd");

const MedicoEspecialidad= sequelize.define(
    'medicoespecialidad',
    {
        matricula: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idEspecialidadFK:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: "especialidad",
                key: 'idEspecialidad'
            }
        },
        dniFK: {
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
                model: "medico",
                key: 'dni'
            }
        }
    },
    {
        tableName: 'medicoespecialidad',  
        timestamps: false, 
    }
)

module.exports= MedicoEspecialidad;