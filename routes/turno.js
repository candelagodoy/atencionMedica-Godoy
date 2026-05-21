const express = require("express");
const turnoRouter = express.Router();

const { obtenerTurnosPorAgenda, buscarTurnos } = require("../controllers/turno");
const autenticacion = require("../middlewares/autenticacion");

turnoRouter.get("/", autenticacion, obtenerTurnosPorAgenda);
turnoRouter.get("/buscar", autenticacion, buscarTurnos);


module.exports = turnoRouter;