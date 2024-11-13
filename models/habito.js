const { DataTypes } = require('sequelize');
const sequelize = require("../config/configbd");

const Habito= sequelize.define(
    'habito',
    {
        idHabito: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        descripcionHabito: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        fechaDesde: {
            type: DataTypes.DATE,
            allowNull: true
        },
        fechaHasta: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        idConsultaFK: {
            type: DataTypes.INTEGER,
            references:{
                model: "consulta",
                key: 'idConsulta'
            }
        }
    },
    {
        tableName: 'habito',  
        timestamps: false,       
    }
)

module.exports= Habito;