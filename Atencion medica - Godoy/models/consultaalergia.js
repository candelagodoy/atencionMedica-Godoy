const { DataTypes } = require('sequelize');
const sequelize = require("../config/configbd");

const ConsultaAlergia= sequelize.define(
    'consultaalergia',
    {
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
        fechaInicio: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fechaFin: {
            type: DataTypes.DATE,
            allowNull: false,
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