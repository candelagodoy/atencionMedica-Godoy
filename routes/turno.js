const express = require("express");
const turnoRouter = express.Router();

const { obtenerTurnosPorAgenda, buscarTurnos } = require("../controllers/turno");

turnoRouter.get("/", obtenerTurnosPorAgenda);
turnoRouter.get("/buscar", buscarTurnos);
//turnoRouter.put("/actualizar-estado/:idTurno", updateEstado)

module.exports = turnoRouter;