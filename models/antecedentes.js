const { DataTypes } = require('sequelize');
const sequelize = require("../config/configbd");

const Antecedentes= sequelize.define(
    'antecedentes',
    {
        idAntecedente: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull:false,
            autoIncrement: true
        },
        descripcionAntecedente: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaDesdeAntecedente: {
            type: DataTypes.DATE,
            allowNull: true
        },
        fechaHastaAntecedente: {
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
        tableName: 'antecedentes',  
        timestamps: false,       
    }
    
)


module.exports=  Antecedentes;