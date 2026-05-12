const { Plantilla } = require("../models");

const listarPlantillas = async (req, res) => {
    const idMedico = req.session.usuario.idMedicoFK;

    const plantillas = await Plantilla.findAll({
        where: {
            idMedicoFK: idMedico
        }
    });

    res.render("../views/plantillas.pug", { plantillas });

}

const crearPlantilla = async (req, res) => {
    const idMedico = req.session.usuario.idMedicoFK;
    const { nombrePlantilla, contenido } = req.body;

    await Plantilla.create({
        nombrePlantilla: nombrePlantilla,
        contenido: contenido,
        idMedicoFK: idMedico
    });

    res.redirect("/plantillas");
}

const eliminarPlantilla = async (req, res) => {
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

}

const nuevaPlantilla = (req, res) => res.render("../views/nuevaPlantilla");
//endpoint para el modal
const getPlantillasJSON = async (req, res) => {
    const idMedico = req.session.usuario.idMedicoFK;

    const plantillas = await Plantilla.findAll({
        where: {
            idMedicoFK: idMedico
        }
    });

    res.json(plantillas);
}

module.exports = { 
    listarPlantillas, 
    crearPlantilla, 
    eliminarPlantilla, 
    getPlantillasJSON,
    nuevaPlantilla
};