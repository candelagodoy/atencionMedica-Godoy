const express = require('express');
const medicamentoRouter = express.Router();
const { createMedicamento, deleteMedicamento } = require("../controllers/medicamento");
const { render } = require("pug");

medicamentoRouter.post("/:idConsulta", createMedicamento);
medicamentoRouter.delete("/:id", deleteMedicamento);

module.exports = medicamentoRouter;