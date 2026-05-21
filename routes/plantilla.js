const express = require('express');
const plantillaRouter = express.Router();
const { listarPlantillas, crearPlantilla, eliminarPlantilla, getPlantillasJSON, nuevaPlantilla } = require("../controllers/plantilla");
const { render } = require("pug");
const autenticacion = require("../middlewares/autenticacion");

plantillaRouter.get("/api",autenticacion, getPlantillasJSON);
plantillaRouter.get("/", autenticacion, listarPlantillas);
plantillaRouter.get("/nueva", autenticacion, nuevaPlantilla);
plantillaRouter.post("/", autenticacion, crearPlantilla);
plantillaRouter.delete("/:id", autenticacion, eliminarPlantilla);



module.exports = plantillaRouter;