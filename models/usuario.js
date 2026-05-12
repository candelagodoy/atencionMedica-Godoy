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
        tableName: 'usuario',  
        timestamps: false,  
    }
)

module.exports= Usuario;

