const { Consulta, Turno } = require("../models/index")
const { findAllAlergias }= require("./alergias")
const { findAllImportancias } = require("./importancia") 
const { updateEstado }= require("./turno")


/* const findAllSelects = async (req, res) => {
    const idTur = req.query.id; // Obtienes el idTurno de la query
    console.log("idTur recibido:", idTur);  // Verifica que idTur tiene el valor esperado

    if (!idTur) {
        return res.status(400).send('ID de turno no proporcionado');
    }

    // Función para actualizar el estado del turno
    const updateEstado = async () => {
        console.log("Actualizando estado del turno...");
        const update = await Turno.update(
            { idEstadoFK: 1 }, // El valor de estado que quieres establecer
            {
                where: {
                    idTurno: idTur // El id del turno que recibes
                }
            }
        );
        console.log("Resultado de la actualización:", update);
        return update;
    };

    try {
        await updateEstado(); // Asegúrate de que la actualización se completa antes de continuar
        console.log("Redirigiendo a /consulta?id=" + idTur);
        res.redirect(`/consulta?id=${idTur}`); // Redirige correctamente después de la actualización
    } catch (error) {
        console.error("Error en la actualización:", error);
        res.status(500).send("Error al actualizar el turno");
    }
}; */

const findAllSelects = async (req, res) => {
    const idTur = req.query.id;
    
    await updateEstado(idTur)
    
    res.render("../views/consulta.pug")
} 





module.exports= { findAllSelects };