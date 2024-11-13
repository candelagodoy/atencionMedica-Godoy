const {Turno,Paciente,EstadoTurno,Persona} = require("../models/index");

const obtenerTurnosPorAgenda = async(req, res) =>{
    
    const turnoPorAgenda = await Turno.findAll({
        where: {
            idAgendaFK: 1,
            fechaTurno: new Date('2024-11-11') 

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
    })

    res.render("../views/turnos.pug", { turnoPorAgenda })
    
}


module.exports = { obtenerTurnosPorAgenda }
