const { Plantilla } = require("../models");

const listarPlantillas = async (req, res) => {

    try {
        const idMedico = req.session.usuario.idMedicoFK;

        const plantillas = await Plantilla.findAll({
            where: {
                idMedicoFK: idMedico
            }
        });

        res.render("../views/plantillas.pug", { plantillas });

    } catch (error) {
        console.log(error);

        res.status(500).render("../views/plantillas.pug", {
            error: "Error al obtener las plantillas",
            plantillas: []
        });
    }
    

}

const crearPlantilla = async (req, res) => {

    try{
        const idMedico = req.session.usuario.idMedicoFK;
        const { nombrePlantilla, contenido } = req.body;

        await Plantilla.create({
            nombrePlantilla: nombrePlantilla,
            contenido: contenido,
            idMedicoFK: idMedico
        });

        res.redirect("/plantillas");   

    } catch(error){

        console.log(error);

        res.status(500).render("../views/nuevaPlantilla.pug", {
            error: "Error al crear la plantilla"
        });
    }

    
}

const eliminarPlantilla = async (req, res) => {
    try {
        const id = req.params.id;
        const idMedico = req.session.usuario.idMedicoFK;

        //where con id del medico p/ q otro no elimine la plantilla
        await Plantilla.destroy({
            where: {
                idPlantilla: id,
                idMedicoFK: idMedico
            }
        });

        res.redirect("/plantillas");

    } catch (error) {
        console.log(error);

        const plantillas = await Plantilla.findAll({
            where: {
                idMedicoFK: req.session.usuario.idMedicoFK
            }
        });

        res.status(500).render("../views/plantillas.pug", {
            error: "Error al eliminar plantilla"
        });
    }
    
};

const nuevaPlantilla = (req, res) => res.render("../views/nuevaPlantilla");

//endpoint para el modal
const getPlantillasJSON = async (req, res) => {
    try{
        const idMedico = req.session.usuario.idMedicoFK;

        const plantillas = await Plantilla.findAll({
            where: {
                idMedicoFK: idMedico
            }
        });

        res.json(plantillas);
    }catch(error){
        console.log(error);

        res.status(500).json({
            error: "Error al obtener las plantillas"
        });
    }
    
}

module.exports = { 
    listarPlantillas, 
    crearPlantilla, 
    eliminarPlantilla, 
    getPlantillasJSON,
    nuevaPlantilla
};