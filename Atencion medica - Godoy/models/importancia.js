const { DataTypes } = require('sequelize');
const sequelize = require("../config/configbd");

const Importancia= sequelize.define(
    'importancia',
    {
        idImportancia: {
            primaryKey:true,
            type: DataTypes.INTEGER,
            allowNull:false
        },
        gradoImportancia: {
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        tableName: 'importancia',  
        timestamps: false,  
    }
)

module.exports= Importancia;