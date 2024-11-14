const { Consulta, Turno } = require("../models/index")
const { findAllAlergias }= require("./alergias")
const { findAllImportancias } = require("./importancia") 



const findAllSelects = async (req, res) => {
    const idTur = req.query.id;
    const updateEstado = async (req,res) =>{
        
        const update = await Turno.update(
            {idEstadoFK: 1},
            {
                where: {
                    idTurno: idTur
                }
            }
        )
        return update;
    }
    await updateEstado(req, res);
    res.status(200).send('Estado actualizado correctamente');

    // res.render("../views/consulta.pug", {alergias: await findAllAlergias() , importancias: await findAllImportancias()})
} 





module.exports= { findAllSelects };