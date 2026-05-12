const { DataTypes } = require('sequelize');
const sequelize = require("../config/configbd");

const Plantilla = sequelize.define (
    'plantilla',
    {
        idPlantilla : {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        nombrePlantilla : {
            type: DataTypes.STRING,
            allowNull: false
        },
        contenido : {
            type: DataTypes.TEXT,
            allowNull: false
        },
        idMedicoFK : {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "medico",
                key: 'idPersona'
              }
        }
    },
    {
        tableName: 'plantilla',  
        timestamps: false
    }
)


module.exports= Plantilla;