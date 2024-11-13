const { DataTypes } = require('sequelize');
const sequelize = require("../config/configbd");
/* const Paciente = require("../models/paciente");
const Agenda = require("../models/agenda");
const EstadoTurno= require("../models/estadoturno") */

const Turno= sequelize.define(
    'turno',
    {
        idTurno: {
            primaryKey:true,
            type:DataTypes.INTEGER,
            allowNull: false
        },
        fechaTurno:{
            type:DataTypes.DATE,
            allowNull: false
        },
        horaTurno:{
            type:DataTypes.TIME,
            allowNull:false
        },
        motivo : {
            type: DataTypes.STRING,
            allowNull: true
        },
        idAgendaFK:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model: "agenda",
                key: 'idAgenda'
            }
        },
        dniPacienteFK:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model: "paciente",
                key: 'dni'
            }
        },
        idEstadoFK:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model: "estadoturno",
                key:'idEstado'
            }
        }

    },
    {
        tableName: 'turno',
        timestamps: false
    }
)


module.exports= Turno;