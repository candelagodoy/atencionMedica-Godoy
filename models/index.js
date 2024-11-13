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


//Relacion medico-especialidad NaN
Medico.belongsToMany(Especialidad, { through: MedicoEspecialidad , as:'especialidad' });
Especialidad.belongsToMany(Medico, { through: MedicoEspecialidad , as: 'medico'});


//Relacion turno-estadoTurno
EstadoTurno.hasMany(Turno, {foreignKey: 'idEstadoFK', as: 'turno'})
Turno.belongsTo(EstadoTurno,{foreignKey: 'idEstadoFK', as: 'estadoturno'})

//Relacion turno-paciente
Paciente.hasMany(Turno,{foreignKey:'dniPacienteFK',as: 'turno'})
Turno.belongsTo(Paciente,{foreignKey:'dniPacienteFK', as: 'paciente'})

//Relacion  turno-agenda
Agenda.hasMany(Turno, {foreignKey: 'idAgendaFK',as: 'turno'})
Turno.belongsTo(Agenda, {foreignKey: 'idAgendaFK', as: 'agenda'})

//Relacion persona-paciente
Persona.hasOne(Paciente, { foreignKey: 'dni'})
Paciente.belongsTo(Persona, { foreignKey: 'dni',as: 'persona'})

//Relacion agenda - medico-especialidad
MedicoEspecialidad.hasMany(Agenda, { foreignKey: 'matriculaFK' });
Agenda.belongsTo(MedicoEspecialidad, { foreignKey: 'matriculaFK'});

//Relacion persona - medico
Persona.hasOne(Medico, { foreignKey: 'dni'});
Medico.belongsTo(Persona, { foreignKey: 'dni', as: 'persona'});

//Relacion paciente-consulta
Paciente.hasMany(Consulta,{foreignKey: 'dniPacienteFK'})
Consulta.belongsTo(Paciente, { foreignKey: 'dniPacienteFK' });

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

//Relacion consulta - alergia
Consulta.belongsToMany(Alergia, { through: ConsultaAlergia , as:'alergia' });
Alergia.belongsToMany(Consulta, { through: ConsultaAlergia , as: 'consulta'});

//Relacion consultaalergia - importancia
Importancia.hasMany(ConsultaAlergia, {foreignKey: 'idImportanciaFK', as: 'consultaalergia'});
ConsultaAlergia.belongsTo(Importancia, {foreignKey: 'idImportanciaFK', as: 'importancia'})

//Relacion turno-consulta
Turno.hasMany(Consulta,{foreignKey: 'idTurnoFK'})
Consulta.belongsTo(Turno, { foreignKey: 'idTurnoFK'});


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
    Diagnostico
}