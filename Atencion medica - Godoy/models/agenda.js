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
        fechaDesde:{
            type: DataTypes.DATE,
            allowNull: true
        },
        fechaHasta: {
            type: DataTypes.DATE,
            allowNull:true
        },
        matriculaFK: {
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
                model: "medicoespecialidad",
                key: 'matricula'
            }
        }
    },
    {
        tableName: 'agenda',  
        timestamps: false, 
    }
)

module.exports= Agenda;