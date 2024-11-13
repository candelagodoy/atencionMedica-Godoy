const { Alergia }= require("../models/index")

const findAllAlergias = async (req,res) =>{
    const alergias = await Alergia.findAll();
    return alergias;

}




module.exports= { findAllAlergias };