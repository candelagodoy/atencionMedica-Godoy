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
    
    res.render("../views/consulta.pug",{idTurno,error:false, isVisible: false})
} 



const createConsulta = async (req, res) => {
    const editorContent = req.body.editorContent; 
    const { id } = req.params;
    console.log(id);

    if(turno === null || turno === undefined){
        res.render("../views/consulta.pug", { error:true, isVisible: false, idTurno});
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

    if(consulta.idConsulta){
        res.render("../views/consulta.pug", { isVisible:true, error:false, idTurno});
    } else {
        res.render("../views/consulta.pug", { isVisible:false, error:true, idTurno});
    }

    
    
}





module.exports= { findAllSelects , createConsulta };