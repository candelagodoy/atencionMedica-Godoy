const { Antecedentes } = require("../models/index");

const createAntecedente = async (req , res) =>{
    const { idConsulta } = req.params;
    const { descripcionAntecedente , fechaDesdeAntecedente , fechaHastaAntecedente} = req.body;

    await Antecedentes.create({
        descripcionAntecedente: descripcionAntecedente,
        idConsultaFK: idConsulta,
        fechaDesdeAntecedente: fechaDesdeAntecedente,
        fechaHastaAntecedente: fechaHastaAntecedente
    });

    res.redirect(`/consulta/${idConsulta}`);
}

const deleteAntecedente = async (req, res) => {
    const { id } = req.params;

    const antecedente = await Antecedentes.findByPk(id);

    const idConsulta = antecedente.idConsultaFK;

    await antecedente.destroy();

    res.redirect(`/consulta/${idConsulta}`);
}

module.exports = { createAntecedente , deleteAntecedente };