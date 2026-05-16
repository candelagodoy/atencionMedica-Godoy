const { DataTypes } = require('sequelize');
const sequelize = require("../config/configbd");


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
        idPacienteFK:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model: "paciente",
                key: 'idPersona'
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