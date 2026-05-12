const { Medicamento } = require("../models/index");

const createMedicamento = async (req , res) =>{
    const { idConsulta } = req.params;
    const { medicamento } = req.body;

    await Medicamento.create({
        nombreMedicamento: medicamento,
        idConsultaFK: idConsulta    
    });

    res.redirect(`/consulta/${idConsulta}`);
}

const deleteMedicamento = async (req, res) => {
    const { id } = req.params;

    const medicamento = await Medicamento.findByPk(id);

    const idConsulta = medicamento.idConsultaFK;

    await medicamento.destroy();

    res.redirect(`/consulta/${idConsulta}`);
};

module.exports= { createMedicamento, deleteMedicamento };