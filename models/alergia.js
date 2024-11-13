const { DataTypes } = require('sequelize');
const sequelize = require("../config/configbd");

const Alergia= sequelize.define(
    'alergia',
    {
        idAlergia: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull:false,
            autoIncrement: true
        },
        nombreAlergia:{
            type: DataTypes.STRING,
            allowNull:false
        },
        descripcionAlergia: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        tableName: 'alergia',  
        timestamps: false,       
    }
)

module.exports=Alergia;