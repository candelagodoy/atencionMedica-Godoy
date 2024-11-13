const { Consulta } = require("../models/index")
const { findAllAlergias }= require("./alergias")
const { findAllImportancias } = require("./importancia")


 const findAllSelects = async (req, res) => {
    res.render("../views/consulta.pug", {alergias: await findAllAlergias() , importancias: await findAllImportancias()})
} 

const createConsulta= async (req,res)=>{
    const consulta= await Consulta.create({
        
    })
}



module.exports= { findAllSelects };