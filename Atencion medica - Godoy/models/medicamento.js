const { DataTypes } = require('sequelize');
const sequelize = require("../config/configbd");

const Medicamento= sequelize.define(
    'medicamento',
    {
        idMedicamento: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull:false,
            autoIncrement: true
        },
        nombreMedicamento: {
            type: DataTypes.STRING,
            allowNull: true
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
        tableName: 'medicamento',  
        timestamps: false,       
    }
)

module.exports= Medicamento;