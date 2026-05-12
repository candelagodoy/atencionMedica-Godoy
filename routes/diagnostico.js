const express = require("express");
const diagnosticoRouter = express.Router();
const { createDiagnostico , deleteDiagnostico} = require("../controllers/diagnostico");
const { render } = require("pug");

diagnosticoRouter.post("/:idConsulta", createDiagnostico);
diagnosticoRouter.delete("/:id", deleteDiagnostico);

module.exports = diagnosticoRouter;