const { DataTypes } = require('sequelize');
const sequelize = require("../config/configbd");

const Medico= sequelize.define(
    'medico',
    {
        dni:{
            primaryKey: true,
            type:DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "persona",
                key: 'dni'
              }
        },
        estado:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'medico',  
        timestamps: false, 
    }
)



module.exports= Medico;