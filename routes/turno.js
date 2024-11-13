const express = require("express");
const turnoRouter = express.Router();

const { obtenerTurnosPorAgenda } = require("../controllers/turno");

turnoRouter.get("/", obtenerTurnosPorAgenda);

module.exports = turnoRouter;