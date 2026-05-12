const { Diagnostico } = require("../models/index");

const createDiagnostico = async (req, res) => {
    const { idConsulta } = req.params;
    const { diagnostico, tipoDiagnostico } = req.body;

    await Diagnostico.create({
        detalleDiagnostico: diagnostico,
        idConsultaFK: idConsulta,
        tipoDiagnostico: tipoDiagnostico
    });

    res.redirect(`/consulta/${idConsulta}`);
}

const deleteDiagnostico = async (req, res) => {
    const { id } = req.params;

    const diagnostico = await Diagnostico.findByPk(id);

    const idConsulta = diagnostico.idConsultaFK;

    await diagnostico.destroy();

    res.redirect(`/consulta/${idConsulta}`);
};

module.exports= { createDiagnostico , deleteDiagnostico};

