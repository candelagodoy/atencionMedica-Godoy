const { DataTypes } = require('sequelize');
const sequelize = require("../config/configbd");

const Agenda= sequelize.define(
    'agenda',
    {
        idAgenda:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idMedicoespecialidadFK:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: "medicoespecialidad",
                key: 'idMedicoEspecialidad'
            }
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        tableName: 'agenda',  
        timestamps: false, 
    }
)

module.exports= Agenda;