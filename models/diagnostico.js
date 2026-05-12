const { DataTypes } = require('sequelize');
const sequelize = require("../config/configbd");

const Diagnostico= sequelize.define(
    'diagnostico',
    {
        idDiagnostico: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull:false,
            autoIncrement: true
        },
        detalleDiagnostico: {
            type: DataTypes.STRING,
            allowNull:true
        },
        idConsultaFK: {
            type: DataTypes.INTEGER,
            references:{
                model: "consulta",
                key: 'idConsulta'
            }
        },
        tipoDiagnostico: {
            type: DataTypes.ENUM,
            values: ['preliminar', 'confirmado']
        }
    },
    {
        tableName: 'diagnostico',  
        timestamps: false,       
    }
)


module.exports = Diagnostico;