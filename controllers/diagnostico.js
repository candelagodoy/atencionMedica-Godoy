const Diagnostico= require("../models/index");

const createDiagnostico = async (detalleD,idCFK) => {
    const diagnostico = await Diagnostico.create(
        {
            detalleDiagnostico: detalleD,
            idConsultaFK: idCFK 
        }
    )
    return diagnostico;
}

module.exports= createDiagnostico

