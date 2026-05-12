const { DataTypes } = require('sequelize');
const sequelize = require("../config/configbd");

const ConsultaAlergia= sequelize.define(
    'consultaalergia',
    {
        idConsultaAlergia: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull:false,
            autoIncrement: true
        },
        idConsultaFK: {
            primaryKey:true,
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: "consulta",
                key: 'idConsulta'
            }
        },
        idAlergiaFK: {
            primaryKey:true,
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: "alergia",
                key: 'idAlergia'
            }
        },
        fechaDesdeAlergia: {
            type: DataTypes.DATE,
            allowNull: true
        },
        fechaHastaAlergia: {
            type: DataTypes.DATE,
            allowNull: true
        },
        idImportanciaFK:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
                model: "importancia",
                key: 'idImportancia'
            }
        }

    },
    {
        tableName: 'consultaalergia',  
        timestamps: false,       
    }
)

module.exports= ConsultaAlergia;