const Medico = require("./medico");
const Especialidad = require("./especialidad");
const MedicoEspecialidad = require("./medicoEspecialidad");
const Agenda = require("./agenda");
const EstadoTurno = require("./estadoturno");
const Turno = require("./turno");
const Paciente = require("./paciente");
const Persona= require("./persona")
const Consulta = require("./consulta")
const Diagnostico = require("./diagnostico")
const Antecedentes = require("./antecedentes");
const Habito = require("./habito");
const Medicamento = require("./medicamento");
const Alergia= require("./alergia")
const ConsultaAlergia= require("./consultaalergia")
const Importancia= require("./importancia")
const Usuario= require("./usuario")
const Plantilla= require("./plantilla")


//Relacion persona-paciente
Persona.hasOne(Paciente, { foreignKey: 'idPersona', as: 'paciente' });
Paciente.belongsTo(Persona, { foreignKey: 'idPersona',as: 'persona'})

//Relacion persona - medico
Persona.hasOne(Medico, { foreignKey: 'idPersona', as: 'medico' });
Medico.belongsTo(Persona, { foreignKey: 'idPersona', as: 'persona'});

//Relacion usuario - medico
Medico.hasOne(Usuario, { foreignKey: 'idMedicoFK', as: 'usuario' });
Usuario.belongsTo(Medico, { foreignKey: 'idMedicoFK', as: 'medico'});

//Relacion medico- medicoEspecialidad
Medico.hasMany(MedicoEspecialidad, { foreignKey: 'idMedicoFK', as: 'medicoespecialidad' });
MedicoEspecialidad.belongsTo(Medico, { foreignKey: 'idMedicoFK', as: 'medico' });

//Relacion medicoEspecialidad - especialidad NaN
Especialidad.hasMany(MedicoEspecialidad, { foreignKey: 'idEspecialidadFK', as: 'medicoespecialidad' });
MedicoEspecialidad.belongsTo(Especialidad, { foreignKey: 'idEspecialidadFK', as: 'especialidad' });

//Relacion medico-especialidad - agenda
MedicoEspecialidad.hasMany(Agenda, { foreignKey: 'idMedicoespecialidadFK', as: 'agenda' });
Agenda.belongsTo(MedicoEspecialidad, { foreignKey: 'idMedicoespecialidadFK', as: 'medicoespecialidad' });

//Relacion turno-paciente
Paciente.hasMany(Turno,{foreignKey:'idPacienteFK',as: 'turno'})
Turno.belongsTo(Paciente,{foreignKey:'idPacienteFK', as: 'paciente'})

//Relacion turno-estadoTurno
EstadoTurno.hasMany(Turno, {foreignKey: 'idEstadoFK', as: 'turno'})
Turno.belongsTo(EstadoTurno,{foreignKey: 'idEstadoFK', as: 'estadoturno'})

//Relacion  turno-agenda
Agenda.hasMany(Turno, {foreignKey: 'idAgendaFK',as: 'turno'})
Turno.belongsTo(Agenda, {foreignKey: 'idAgendaFK', as: 'agenda'})

//Relacion turno-consulta
Turno.hasMany(Consulta,{foreignKey: 'idTurnoFK', as: 'consulta'})
Consulta.belongsTo(Turno, { foreignKey: 'idTurnoFK', as: 'turno' });

//Relacion consulta-diagnostico
Consulta.hasMany(Diagnostico,{foreignKey:'idConsultaFK', as: 'diagnosticos'})
Diagnostico.belongsTo(Consulta, {foreignKey: 'idConsultaFK', as: 'consulta' })

//Relacion consulta-antecedentes
Consulta.hasMany(Antecedentes,{foreignKey:'idConsultaFK', as: 'antecedentes'})
Antecedentes.belongsTo(Consulta, {foreignKey: 'idConsultaFK', as: 'consulta' })

//Relacion consulta-habito
Consulta.hasMany(Habito, {foreignKey:'idConsultaFK', as: 'habitos'}) 
Habito.belongsTo(Consulta,{foreignKey: 'idConsultaFK', as: 'consulta' })

//Relacion consulta-medicamento
Consulta.hasMany(Medicamento, {foreignKey:'idConsultaFK', as: 'medicamentos'}) 
Medicamento.belongsTo(Consulta,{foreignKey: 'idConsultaFK', as: 'consulta' })

// relacion consulta - consultaAlergia
Consulta.hasMany(ConsultaAlergia, {foreignKey: 'idConsultaFK', as: 'alergias'});
ConsultaAlergia.belongsTo(Consulta, {foreignKey: 'idConsultaFK', as: 'consulta'});

//Relacion consultaalergia - alergia
Alergia.hasMany(ConsultaAlergia, {foreignKey: 'idAlergiaFK', as: 'consultaalergia'});
ConsultaAlergia.belongsTo(Alergia, {foreignKey: 'idAlergiaFK', as: 'alergia'});

//Relacion consultaalergia - importancia
Importancia.hasMany(ConsultaAlergia, {foreignKey: 'idImportanciaFK', as: 'consultaalergia'});
ConsultaAlergia.belongsTo(Importancia, {foreignKey: 'idImportanciaFK', as: 'importancia'})

//relacion medico - plantilla 
Plantilla.belongsTo(Medico, { foreignKey: "idMedicoFK", as: "medico" });
Medico.hasMany(Plantilla, { foreignKey: "idMedicoFK", as: "plantillas" });


module.exports = {
    Medico,
    Especialidad,
    MedicoEspecialidad,
    Turno,
    EstadoTurno,
    Paciente,
    Agenda,
    Persona,
    Importancia,
    Alergia,
    ConsultaAlergia, 
    Consulta,
    Medicamento,
    Habito,
    Antecedentes,
    Diagnostico,
    Usuario,
    Plantilla
}