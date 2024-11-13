const { DataTypes } = require('sequelize');
const sequelize = require("../config/configbd");

const Persona = sequelize.define(
    'persona',
    {
        dni : {
            primaryKey:true,
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        nombre : {
            type: DataTypes.STRING,
            allowNull: true,
        },
        apellido : {
            type: DataTypes.STRING,
            allowNull: true,
        },
        numCelular : {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        direccion : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipo : {
            type: DataTypes.STRING,
            allowNull: true
        }
       
    },
    {
        tableName: 'persona',  
        timestamps: false,       
    }
);


module.exports = Persona ;