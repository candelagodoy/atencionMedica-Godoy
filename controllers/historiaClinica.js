const {Consulta,Paciente,Persona,Diagnostico,Antecedentes, Turno} = require("../models/index.js")

/* const findAll = async (req, res) =>{
    const consultas = await Consulta.findAll();
    res.render("../views/historiaClinica.pug",{ consultas })

} */

const find = async (req, res) => {
    const dni = req.query.dni;
    const historiaClinica = await Consulta.findAll({
        
        include: [{
            model: Paciente,
            as: 'paciente',
            where:{
                dni: dni
            },
            include: [
                {
                    model: Persona,
                    as: 'persona',  
                }
            ],
          
        },
        {
            model: Diagnostico,
            as: 'diagnosticos',
           
        },
        {
            model: Antecedentes,
            as: 'antecedentes'
        },
        {
            model:Turno,
            as: 'turno',

        }
        ] 
    });
   
    res.render("../views/historiaClinica.pug",{ historiaClinica })

}

module.exports= {
    find
}