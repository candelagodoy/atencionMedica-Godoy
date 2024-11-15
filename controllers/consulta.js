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

    if(turno === null || turno === undefined){
        res.render("../views/consulta.pug", { error:true, isVisible: false});
        return;
    }
    
    const consulta = await Consulta.create(
        {
            fechaAtencion: turno.fechaTurno,
            dniPacienteFK: turno.dniPacienteFK,
            evolucion: editorContent,
            idTurnoFK: turno.idTurno
        }
    )

    const isVisible = true; 
    res.render("../views/consulta.pug", { isVisible });
}





module.exports= { findAllSelects , createConsulta };