const DataTypes = require('sequelize');
const sequelize = require("../config/configbd");
const e = require('express');

const Usuario= sequelize.define(
    'usuario',
    {
        idUsuario: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dniMedicoFK: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references:{
                model: "medico",
                key: 'dni'
            }
        }
    },
    {
        tableName: 'usuario',  
        timestamps: false,  
    }
)

module.exports= Usuario;

