const { Agenda, MedicoEspecialidad, Medico, Persona }= require("../models/index")

const datosAgenda = async(req, res) => {

    try{
        const {matricula, dni, nombre, apellido}= req.session.usuario;

        res.render("../views/agenda.pug", { matricula, dni, nombre, apellido });   
    }
    catch(error){
        console.log(error);
        res.status(500).send({error: "Error al obtener los datos de la agenda"});
    };

} 



module.exports= { datosAgenda };