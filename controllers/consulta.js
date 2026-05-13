const { Consulta, Turno, Diagnostico, Alergia, Importancia, ConsultaAlergia, Antecedentes, Habito, Medicamento, Paciente, Agenda, MedicoEspecialidad, Medico, Persona } = require("../models/index")
const { findAllAlergias }= require("./alergias")
const { findAllImportancias } = require("./importancia") 
const { updateEstado }= require("./turno")
const { Op } = require("sequelize");

var idTurno = '';
var turno = '';

const abrirConsulta = async (req, res) => {
    const idTurno = req.query.id;

    const turno = await Turno.findOne({
        where: {
            idTurno: idTurno
        }
    });

    if (!turno) {
        return res.send("Turno no encontrado");
    }
    
    /*let consulta = await Consulta.findOne({
        where: { idTurnoFK: idTurno }
    });*/ //para evitar que se dupliquen consultas

    /*if (!consulta) {
        consulta = await Consulta.create({
            fechaAtencion: turno.fechaTurno,
            evolucion: '',
            idTurnoFK: turno.idTurno
        });
    }*/

    const consulta = await Consulta.create({
        fechaAtencion: turno.fechaTurno,
        evolucion: '',
        idTurnoFK: turno.idTurno
    });

    res.redirect(`/consulta/${consulta.idConsulta}`);
}

const renderConsulta = async (req, res) => {
    const {idConsulta} = req.params;

    const consulta = await Consulta.findByPk(idConsulta, {
    include: [
        {
            model: Diagnostico,
            as: "diagnosticos"
        },
        {
            model: Medicamento,
            as: "medicamentos"
        },
        {
            model: Antecedentes,
            as: "antecedentes"
        },
        {
            model: Habito,
            as: "habitos"
        },
        {
            model: ConsultaAlergia,
            as: "alergias",
            include: [
                {
                    model: Alergia,
                    as: "alergia"
                },
                {
                    model: Importancia,
                    as: "importancia"
                }
            ]
        },
        {
            model: Turno,
            as: "turno"
        }
        ],
        order: [["idConsulta", "DESC"]]   
    });

    const idPaciente = consulta.turno.idPacienteFK;
    const historial = await obtenerHistoriaClinica(idPaciente, idConsulta);

    const alergias = await Alergia.findAll();
    const importancias = await Importancia.findAll();
    
    res.render("../views/consulta.pug", {
        consulta, 
        historial,
        idConsulta, 
        error: false, 
        isVisible: false, 
        importancias, 
        alergias
        
    });

    console.log("consulta encontrada:", consulta ? "SI" : "NULL");
}

//funcion para reutilizar 
const obtenerHistoriaClinica = async (idPaciente, excluirIdConsulta = null) => {
    return await Consulta.findAll({
        include: [
            {
                model: Diagnostico,
                as: "diagnosticos"
            },
            {
                model: Medicamento,
                as: "medicamentos"
            },
            {
                model: Antecedentes,
                as: "antecedentes"
            },
            {
                model: Habito,
                as: "habitos"
            },
            {
                model: ConsultaAlergia,
                as: "alergias",
                include: [
                    {
                        model: Alergia,
                        as: "alergia"
                    },
                    {
                        model: Importancia,
                        as: "importancia"
                    }
                ]
            },
            {
                model: Turno,
                as: "turno",
                where:{
                    idPacienteFK: idPaciente,
                },
                include: [
                    {
                        model: Agenda,
                        as: "agenda",
                        include: [
                            {
                                model: MedicoEspecialidad,
                                as: "medicoespecialidad",
                                include: [
                                    {
                                        model: Medico,
                                        as: "medico",
                                        include: [
                                            {
                                                model: Persona,
                                                as: "persona"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: Paciente,
                        as: "paciente"

                    }
                ]
            }
        ],
        where: excluirIdConsulta ? { idConsulta: { [Op.ne]: excluirIdConsulta } } : {},
        order: [["idConsulta", "DESC"]]
    })
    

}

const verHCL = async (req, res) => {
    const {idPaciente} = req.params;

    const consultas = await obtenerHistoriaClinica(idPaciente);

    res.render("../views/historiaClinica.pug", { consultas, idPaciente});
}


const finalizarConsulta = async (req, res) => {
    const {idConsulta} = req.params;
    const {evolucion} = req.body;

    const consulta = await Consulta.findByPk(idConsulta, {
        include: [
            { 
                model: Diagnostico, 
                as: "diagnosticos" 
            },
            {
                model: Turno,
                as: "turno"
            }
        ]
    });

    const alergias = await Alergia.findAll();
    const importancias = await Importancia.findAll();
    const historial = await obtenerHistoriaClinica(consulta.turno.idPacienteFK, idConsulta);

    if(!consulta.diagnosticos || consulta.diagnosticos.length === 0) {
        return res.render("../views/consulta.pug",{
            consulta, 
            idConsulta,
            alergias,
            importancias,
            historial,
            error: true,
            isVisible: false,
            errorMensaje: "Debe registrar al menos un diagnóstico antes de finalizar la consulta."
        });
    }

    if(!evolucion || evolucion.trim() === "" || evolucion.trim() === "<p><br></p>") {
        return res.render("../views/consulta.pug",{
            consulta, 
            idConsulta,
            alergias,
            importancias,
            historial,
            error: true,
            isVisible: false,
            errorMensaje: "Debe registrar una evolución antes de finalizar la consulta."
        
        });
    }

    await consulta.update({
        evolucion: evolucion,
        estadoConsulta: "Finalizada"
    });

    await Turno.update(
        {idEstadoFK: 3},
        {
            where: {
                idTurno: consulta.idTurnoFK
            }
        }
    )

    res.redirect("/turno");

}

/*const editarConsulta = async (req, res) => {
    
}





/*const verHCL = async (req, res) => {
    const { idPaciente } = req.params;
    const idMedico = req.session.usuario.idMedicoFK;

    const consultas = await Consulta.findAll({
        include: [
            {
                model: Turno,
                as: "turno",
                where: {
                    idPacienteFK: idPaciente
                },
                include: [
                    {
                        model: Agenda,
                        as: "agenda",
                        include: [
                            {
                                model: MedicoEspecialidad,
                                as: "medicoespecialidad",
                                include: [
                                    {
                                        model: Medico,
                                        as: "medico",
                                        include: [
                                            {
                                                model: Persona,
                                                as: "persona"
                                            }
                                        ]
                                    }
                                ]
                            }
                            
                        ]
                    },
                    {
                        model: Paciente,
                        as: "paciente"
                    }
                ]
            },
            {
                model: Diagnostico,
                as: "diagnosticos"
            },
            {
                model: Medicamento,
                as: "medicamentos"
            },
            {
                model: Antecedentes,
                as: "antecedentes"
            },
            {
                model: Habito,
                as: "habitos"
            },
            {
                model: ConsultaAlergia,
                as: "alergias",
                include: [
                    {
                        model: Alergia,
                        as: "alergia"
                    },
                    {
                        model: Importancia,
                        as: "importancia"
                    }
                ]
            }
        ],
        order: [
            ['fechaAtencion', 'DESC']
        ]
        
    });

    res.render("../views/historiaClinica.pug", { consultas, idPaciente, idMedico });
};

/*const findAllSelects = async (req, res) => {

    idTurno = req.query.id;
    const importancias = await Importancia.findAll();
    const alergias = await Alergia.findAll();

    turno = await Turno.findOne({
        where: {
            idTurno: idTurno
        }
    });
    
    await updateEstado(idTurno)
    

    res.render("../views/consulta.pug",{idTurno,error:false, isVisible: false, importancias, alergias});
} */



/*const createConsulta = async (req, res) => {
    const editorContent = req.body.editorContent; 
    const diagnostico = req.body.diagnostico;
    const tipoDiagnostico = req.body.tipoDiagnostico;
    const importancias = await Importancia.findAll();
    const alergias = await Alergia.findAll();
    const { alergia, importancia, fechaDesdeAlergia, fechaHastaAlergia } = req.body;
    const { antecedente, fechaDesdeAntecedente, fechaHastaAntecedente } = req.body;
    const { habito, fechaDesdeHabito, fechaHastaHabito } = req.body;
    const medicamentos = req.body.medicamento;
    const { id } = req.params;
    console.log(id);

    if(turno === null || turno === undefined){
        res.render("../views/consulta.pug", { error:true, isVisible: false, idTurno, importancias, alergias});
        return;
    }
    

    const consulta = await Consulta.create(
        {
            fechaAtencion: turno.fechaTurno,
            evolucion: editorContent,
            idTurnoFK: turno.idTurno
        }
    )

    if(consulta.idConsulta){
        for (let i = 0; i < diagnostico.length; i++) {
            if (diagnostico[i].trim() !== "") {
                await Diagnostico.create({
                    detalleDiagnostico: diagnostico[i],
                    tipoDiagnostico: tipoDiagnostico[i],
                    idConsultaFK: consulta.idConsulta
                });
            }
        }
        for (let i = 0; i < alergia.length; i++) {
            if (!alergia[i] || !importancia[i]) {
                await ConsultaAlergia.create({
                    idConsultaFK: consulta.idConsulta,
                    idAlergiaFK: alergia[i],
                    idImportanciaFK: importancia[i],
                    fechaDesdeAlergia: fechaDesdeAlergia[i] || null,
                    fechaHastaAlergia: fechaHastaAlergia[i] || null
                });
            }

        }
        for (let i = 0; i < antecedente.length; i++) {
            if(antecedente[i]) {
                await Antecedentes.create({
                    descripcionAntecedente: antecedente[i],
                    fechaDesdeAntecedente: fechaDesdeAntecedente[i] || null,
                    fechaHastaAntecedente: fechaHastaAntecedente[i] || null,
                    idConsultaFK: consulta.idConsulta
                });
            }
        }

        for (let i = 0; i < habito.length; i++) {
            if(habito[i]) {
                await Habito.create({
                    descripcionHabito: habito[i],
                    fechaDesdeHabito: fechaDesdeHabito[i] || null,
                    fechaHastaHabito: fechaHastaHabito[i] || null,
                    idConsultaFK: consulta.idConsulta
                });
            }
        }

        for (let i = 0; i < medicamentos.length; i++) {
            if(medicamentos[i]) {
                await Medicamento.create({
                    nombreMedicamento: medicamentos[i],
                    idConsultaFK: consulta.idConsulta
                });
            }
        }
        
        res.render("../views/consulta.pug", { isVisible:true, error:false, idTurno, importancias, alergias}); 

    } else {
        res.render("../views/consulta.pug", { isVisible:false, error:true, idTurno, importancias, alergias});
    }

    res.render("../views/consulta.pug", { isVisible:false, error:true, idTurno, importancias, alergias});

}*/



module.exports= { abrirConsulta, 
    renderConsulta, 
    finalizarConsulta, 
    verHCL 
};