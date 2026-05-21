const express = require("express");
const consultaAlergiaRouter = express.Router();
const { createConsultaAlergia, deleteConsultaAlergia } = require("../controllers/consultaAlergia");
const render = require("pug");
const autenticacion = require("../middlewares/autenticacion");

consultaAlergiaRouter.post("/:idConsulta", autenticacion, createConsultaAlergia);
consultaAlergiaRouter.delete("/:id", autenticacion, deleteConsultaAlergia);

module.exports = consultaAlergiaRouter;