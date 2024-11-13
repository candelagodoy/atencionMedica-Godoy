const { Agenda, MedicoEspecialidad, Medico, Persona }= require("../models/index")

const datosMedico = async(req, res) => {
    const matricula= await Agenda.findOne({
        attributes: ['matriculaFK'],
        where: {
            idAgenda: 1
        }
    })
    
    const dni= await MedicoEspecialidad.findOne({
        attributes: [ 'dniFK' ],
        where: {
            matricula: matricula.matriculaFK
        },
       
    })

    const nombreApellido = await Persona.findOne({
        attributes: [ 'nombre', 'apellido'],
        where: {
            dni: dni.dniFK
        },
        
    }) 

    res.render("../views/agenda.pug", { matricula, dni, nombreApellido})
} 

module.exports= { datosMedico };