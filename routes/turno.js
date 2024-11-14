const express = require("express");
const turnoRouter = express.Router();

const { obtenerTurnosPorAgenda } = require("../controllers/turno");

turnoRouter.get("/", obtenerTurnosPorAgenda);
//turnoRouter.put("/actualizar-estado/:idTurno", updateEstado)

module.exports = turnoRouter;