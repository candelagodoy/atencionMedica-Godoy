const { Habito } = require("../models/index");


const createHabito = async (req , res) =>{
    const { idConsulta } = req.params;
    const { descripcionHabito, fechaDesdeHabito, fechaHastaHabito } = req.body;

    await Habito.create({ 
        descripcionHabito: descripcionHabito, 
        idConsultaFK: idConsulta, 
        fechaDesdeHabito: fechaDesdeHabito, 
        fechaHastaHabito: fechaHastaHabito 
    }); 

    res.redirect(`/consulta/${idConsulta}`);
}

const deleteHabito = async (req, res) => {
    const { id } = req.params;

    const habito = await Habito.findByPk(id);

    const idConsulta = habito.idConsultaFK;

    await habito.destroy();

    res.redirect(`/consulta/${idConsulta}`);
}

module.exports = { createHabito, deleteHabito };