const { DataTypes } = require('sequelize');
const sequelize = require("../config/configbd");


const Consulta = sequelize.define(
    'consulta',
    {
        idConsulta : {
            primaryKey:true,
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true
        },
        fechaAtencion : {
            type: DataTypes.DATE,
            allowNull:true
        },
        dniPacienteFK : {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: "paciente",
                key: 'dni'
            }
        },
        evolucion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idTurnoFK: {
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
                model: "turno",
                key: 'idTurno'
            }
        }

    },
    {
        tableName: 'consulta',  
        timestamps: false,       
    }
)



module.exports = Consulta;