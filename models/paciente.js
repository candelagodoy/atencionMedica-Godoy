const { DataTypes } = require('sequelize');
const sequelize = require("../config/configbd");

const Persona = require("./persona");

const Paciente = sequelize.define(
    'paciente',
    {
        idPersona: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "persona",
                key: 'idPersona'
              }
        },
        seguroMedico : {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'paciente',  
        timestamps: false,       
    }
)


module.exports = Paciente;