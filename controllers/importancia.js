const { Importancia }= require("../models/index")

const findAllImportancias = async (req,res) =>{
    const importancias = await Importancia.findAll();
    return importancias;

}

module.exports= { findAllImportancias };