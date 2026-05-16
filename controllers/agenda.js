const { Agenda, MedicoEspecialidad, Medico, Persona, Especialidad }= require("../models/index")

const datosAgenda = async(req, res) => {

    try{
        const {dni, nombre, apellido, idMedicoFK}= req.session.usuario;

        const especialidades = await MedicoEspecialidad.findAll({
            where: {
                idMedicoFK: idMedicoFK
            },
            include: [
                {
                    model: Especialidad,
                    as: "especialidad"
                }
            ]
        });

        res.render("../views/agenda.pug", {dni, nombre, apellido, especialidades, idMedicoFK});   
    }
    catch(error){
        res.render("../views/agenda.pug", {
            error: "No se pudo encontrar la agenda"
        });
    };

} 

module.exports= { datosAgenda };