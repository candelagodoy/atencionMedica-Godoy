const { DataTypes } = require('sequelize');
const sequelize = require("../config/configbd");

const Medico= sequelize.define(
    'medico',
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
        estado:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        tableName: 'medico',  
        timestamps: false, 
    }
)



module.exports= Medico;