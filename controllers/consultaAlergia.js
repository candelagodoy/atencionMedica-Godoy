const { ConsultaAlergia} = require("../models/index");

const createConsultaAlergia = async (req, res) => {
    const { idConsulta } = req.params;
    const { idAlergiaFK, idImportanciaFK, fechaDesdeAlergia, fechaHastaAlergia } = req.body;

    await ConsultaAlergia.create({
        idConsultaFK: idConsulta,
        idAlergiaFK: idAlergiaFK,
        idImportanciaFK: idImportanciaFK,
        fechaDesdeAlergia: fechaDesdeAlergia,
        fechaHastaAlergia: fechaHastaAlergia
    });

    res.redirect(`/consulta/${idConsulta}`);
}

const deleteConsultaAlergia = async (req, res) => {
    const { id } = req.params;

    const consultaAlergia = await ConsultaAlergia.findByPk(id);

    const idConsulta = consultaAlergia.idConsultaFK;

    await consultaAlergia.destroy();

    res.redirect(`/consulta/${idConsulta}`);
}

module.exports = { createConsultaAlergia, deleteConsultaAlergia };