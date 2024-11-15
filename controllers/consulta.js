const { Consulta, Turno } = require("../models/index")
const { findAllAlergias }= require("./alergias")
const { findAllImportancias } = require("./importancia") 
const { updateEstado }= require("./turno")

var idTurno = '';
var turno = '';
const findAllSelects = async (req, res) => {

    idTurno = req.query.id;

    turno = await Turno.findOne({
        where: {
            idTurno: idTurno
        }
    });
    
    await updateEstado(idTurno)
    
    res.render("../views/consulta.pug")
} 



const createConsulta = async (req, res) => {
    const editorContent = req.body.editorContent; 
    console.log(idTurno);
    console.log("aca" + editorContent);
    
    const consulta = await Consulta.create(
        {
            fechaAtencion: turno.fechaTurno,
            dniPacienteFK: turno.dniPacienteFK,
            evolucion: editorContent,
            idTurnoFK: idTurno
        }
    )

    const isVisible = true; 
    res.render("../views/consulta.pug", { isVisible });
}





module.exports= { findAllSelects , createConsulta };