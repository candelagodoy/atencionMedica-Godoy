const { Consulta, Turno, Diagnostico, Alergia, Importancia, ConsultaAlergia, Antecedentes, Habito, Medicamento, Paciente, Agenda, MedicoEspecialidad, Medico, Persona } = require("../models/index")
const { findAllAlergias }= require("./alergias")
const { findAllImportancias } = require("./importancia") 
const { updateEstado }= require("./turno")
const { Op } = require("sequelize");


const abrirConsulta = async (req, res) => {
    try{
        const idTurno = req.query.id;

        const turno = await Turno.findOne({
            where: {
                idTurno: idTurno
            }
        });

        if (!turno) {
            return res.send("Turno no encontrado");
        }

        let consulta = await Consulta.findOne({
            where: { idTurnoFK: idTurno }
        }); //para evitar que se dupliquen consultas

        if (!consulta) {
            consulta = await Consulta.create({
                fechaAtencion: turno.fechaTurno,
                evolucion: '',
                idTurnoFK: turno.idTurno
            });
        }

        res.redirect(`/consulta/${consulta.idConsulta}`);

    }catch(error){
        console.error("Error al abrir consulta:", error);
        res.status(500).send("Error al abrir la consulta");
    }

    /*const consulta = await Consulta.create({
        fechaAtencion: turno.fechaTurno,
        evolucion: '',
        idTurnoFK: turno.idTurno
    });*/
   
}

const renderConsulta = async (req, res) => {
    

    try {
        const {evolucion} = req.body;
        const {idConsulta} = req.params;

        const consulta = await obtenerConsultaCompleta(idConsulta);
        // Consultar si es necesarioooooooo
        if (!consulta) {

            return res.status(404).render("../views/consulta.pug", {
                error: true,
                errorMensaje: "Consulta no encontrada"
            });
        }

        if (!consulta.turno) {
            throw new Error("La consulta no tiene turno asociado");
        }

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
            alergias,
            evolucionTemp: evolucion
            
        });
    }catch (error) {
        console.log(error);

        res.status(500).render("../views/consulta.pug", {

            error: true,
            errorMensaje: "Error al cargar la consulta",

            consulta: null,
            historial: [],

            alergias: [],
            importancias: []
            
        });
    }
    

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
    try {
        
        const {idPaciente} = req.params;

        const consultas = await obtenerHistoriaClinica(idPaciente);

        res.render("../views/historiaClinica.pug", { consultas, idPaciente});

    } catch (error) {   
        
        res.status(500).render("../views/historiaClinica.pug", {
            error: "Error al obtener la historia clínica",
            consultas: [],
            idPaciente: null
        });

    }

    
}


const finalizarConsulta = async (req, res) => {
    const {idConsulta} = req.params;
    const {evolucion} = req.body;

    try{
        const consulta = await obtenerConsultaCompleta(idConsulta);

        if (!consulta) {
            return res.status(404).send("Consulta no encontrada");
        }

        const alergias = await Alergia.findAll();
        const importancias = await Importancia.findAll();
        const historial = await obtenerHistoriaClinica(consulta.turno.idPacienteFK, idConsulta);

        const renderError = (mensaje) =>
            res.render("../views/consulta.pug", {
                consulta,
                idConsulta,
                alergias,
                importancias,
                historial,
                error: true,
                isVisible: false,
                errorMensaje: mensaje,
                evolucionTemp: evolucion
            });
        
        if (!consulta.diagnosticos || consulta.diagnosticos.length === 0) {
            return renderError("Debe registrar al menos un diagnóstico antes de finalizar la consulta.");
        }

        if (!evolucion || evolucion.trim() === "" || evolucion.trim() === "<p><br></p>") {
            return renderError("Debe registrar una evolución antes de finalizar la consulta.");
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


    }catch(error){
        console.error("Error al finalizar consulta:", error);
        res.status(500).send("Error inesperado al finalizar la consulta");
    }


}

const obtenerConsultaCompleta = (idConsulta) => {
    return Consulta.findByPk(idConsulta, {
        include: [
            { 
                model: Diagnostico, 
                as: "diagnosticos" },
            { 
                model: Medicamento, 
                as: "medicamentos" },
            { 
                model: Antecedentes, 
                as: "antecedentes" },
            { 
                model: Habito, 
                as: "habitos" },
            { 
                model: ConsultaAlergia, 
                as: "alergias",
                include: [
                    { 
                        model: Alergia, 
                        as: "alergia" },
                    { 
                        model: Importancia, 
                        as: "importancia" }
                ]
            },
            { 
                model: Turno, 
                as: "turno" 
            }

        ],
        order: [["idConsulta", "DESC"]]  

    });
};

const guardarEvolucion = async (req, res) => {
    try {
        const { idConsulta } = req.params;
        const { evolucion } = req.body;

        await Consulta.update(
            { evolucion },
            { where: { idConsulta } }
        );

        res.json({ ok: true });

    } catch (error) {
        console.error("Error al guardar evolución:", error);
        res.status(500).json({ ok: false });
    }
};


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
    verHCL, 
    guardarEvolucion
};