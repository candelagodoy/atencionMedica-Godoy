const express = require("express");
const consultaAlergiaRouter = express.Router();
const { createConsultaAlergia, deleteConsultaAlergia } = require("../controllers/consultaAlergia");
const render = require("pug");

consultaAlergiaRouter.post("/:idConsulta", createConsultaAlergia);
consultaAlergiaRouter.delete("/:id", deleteConsultaAlergia);

module.exports = consultaAlergiaRouter;