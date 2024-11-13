const { DataTypes } = require('sequelize');
const sequelize = require("../config/configbd");

const Persona = require("./persona");

const Paciente = sequelize.define(
    'paciente',
    {
        dni: {
            type: DataTypes.STRING,
            primaryKey: true,
            references: {
              model: Persona,
              key: 'dni'
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

//Relations
/* Persona.hasOne(Paciente, { foreignKey: 'dni', as:'paciente' })
Paciente.belongsTo(Persona, { foreignKey: 'dni', as:'persona' })  */




module.exports = Paciente;