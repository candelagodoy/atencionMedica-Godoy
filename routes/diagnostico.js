const express = require("express");
const diagnosticoRouter = express.Router();
const { createDiagnostico , deleteDiagnostico} = require("../controllers/diagnostico");
const { render } = require("pug");
const autenticacion = require("../middlewares/autenticacion");

diagnosticoRouter.post("/:idConsulta", autenticacion, createDiagnostico);
diagnosticoRouter.delete("/:id", autenticacion, deleteDiagnostico);

module.exports = diagnosticoRouter;