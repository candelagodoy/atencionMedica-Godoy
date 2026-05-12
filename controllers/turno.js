const {Turno,Paciente,EstadoTurno,Persona, MedicoEspecialidad, Especialidad, Agenda } = require("../models/index");

/*const updateEstado = async (id) =>{
    
        const update = await Turno.update(
        {idEstadoFK: 3},
        {
            where: {
                idTurno: id
            }
        }
    )
    
    return update;
}
*/

const obtenerTurnosPorAgenda = async(req, res) =>{
    
    const user = req.session.usuario;
    const idMedicoFK = req.session.usuario.idMedicoFK;

    const agendas = await Agenda.findAll({ //busco todas las agendas del medico
        include: [
            {
                model: MedicoEspecialidad,
                as: 'medicoespecialidad',
                where: {
                    idMedicoFK: user.idMedicoFK
                }
            }
              
        ]
    });
    
    const idsAgendas = agendas.map(agenda => agenda.idAgenda); //saco los ids

    const turnoPorAgenda = await Turno.findAll(
        {
            where: {
                idAgendaFK: idsAgendas,
                fechaTurno: new Date('2026-10-04')
            },
            include: [
                {
                    model: Paciente,
                    as: 'paciente',
                    include: [
                        {
                            model: Persona, 
                            as: 'persona'
                        }
                    ]
                },
                {
                    model: EstadoTurno,
                    as: 'estadoturno'
                },
            ]
        }
    )


    const especialidades = await MedicoEspecialidad.findAll({//especialidad para llenar el select
        where: {
            idMedicoFK: idMedicoFK
        },
        include: [
            {
                model: Especialidad,
                as: 'especialidad'
            }
        ]

    })

    
    res.render("../views/turnos.pug", { turnoPorAgenda, especialidades })
    
}

const buscarTurnos = async (req, res) =>{
    const { fecha, idMedicoEspecialidad } = req.query;

    const whereTurno = {};
    if(fecha){
        whereTurno.fechaTurno = new Date(fecha);
    }

    const turnos = await Turno.findAll({
        where: whereTurno,
        include: [
            {
                model: Agenda,
                as: 'agenda',
                where: {
                    idMedicoEspecialidadFK: idMedicoEspecialidad
                },
                required: true
            },
            {
                model: Paciente,
                as: 'paciente',
                include: [
                    {
                        model: Persona,
                        as: 'persona'
                    }
                ]
            },
            {
                model: EstadoTurno,
                as: 'estadoturno'
            }
        ]
    });

    res.json(turnos);

}


module.exports = { obtenerTurnosPorAgenda ,  buscarTurnos }
