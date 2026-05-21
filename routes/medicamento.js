const express = require('express');
const medicamentoRouter = express.Router();
const { createMedicamento, deleteMedicamento } = require("../controllers/medicamento");
const { render } = require("pug");
const autenticacion = require('../middlewares/autenticacion');

medicamentoRouter.post("/:idConsulta", autenticacion, createMedicamento);
medicamentoRouter.delete("/:id", autenticacion, deleteMedicamento);

module.exports = medicamentoRouter;