const { DataTypes } = require('sequelize');
const sequelize = require("../config/configbd");

const EstadoTurno= sequelize.define(
    'estadoturno',
    {
        idEstado:{
            primaryKey:true,
            type:DataTypes.INTEGER,
            allowNull:false
        },
        descripcionEstado:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        tableName: 'estadoturno',
        timestamps: false
    }
)



module.exports= EstadoTurno;