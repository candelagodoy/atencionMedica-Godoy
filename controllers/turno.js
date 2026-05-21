const {Turno,Paciente,EstadoTurno,Persona, MedicoEspecialidad, Especialidad, Agenda } = require("../models/index");

const obtenerTurnosPorAgenda = async(req, res) =>{
    
    try {
        const user = req.session.usuario;
        const idMedicoFK = req.session.usuario.idMedicoFK;

        const agendas = await Agenda.findAll({ 
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

        const hoy = new Date();


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


        const especialidades = await MedicoEspecialidad.findAll({
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

    } catch (error) {
        console.log(error);

        res.status(500).render("../views/turnos.pug", {
            error: "Error al obtener los turnos",
            turnoPorAgenda: [],
            especialidades: []
        });
    }
    
    
}

const buscarTurnos = async (req, res) =>{

    try {
        const { fecha, idMedicoEspecialidad } = req.query;

        if(!fecha && !idMedicoEspecialidad){
            const user = req.session.usuario;

            const agendas = await Agenda.findAll({
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

            const idsAgendas = agendas.map(
                agenda => agenda.idAgenda
            );

            const turnos = await Turno.findAll({
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
                    }
                ]
            });

            return res.json(turnos);
        }

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
        
    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Error al buscar turnos"
        });

    }


}


module.exports = { 
    obtenerTurnosPorAgenda ,  
    buscarTurnos 
}
