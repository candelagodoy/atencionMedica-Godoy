const express = require('express');
const plantillaRouter = express.Router();
const { listarPlantillas, crearPlantilla, eliminarPlantilla, getPlantillasJSON, nuevaPlantilla } = require("../controllers/plantilla");
const { render } = require("pug");

plantillaRouter.get("/api", getPlantillasJSON);
plantillaRouter.get("/", listarPlantillas);
plantillaRouter.get("/nueva", nuevaPlantilla);
plantillaRouter.post("/", crearPlantilla);
plantillaRouter.delete("/:id", eliminarPlantilla);



module.exports = plantillaRouter;