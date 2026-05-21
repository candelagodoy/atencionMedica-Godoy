const express = require('express');
const antecedentesRouter = express.Router();
const autenticacion = require("../middlewares/autenticacion");

const { createAntecedente, deleteAntecedente } = require("../controllers/antecedentes");
const { render } = require("pug");

antecedentesRouter.post("/:idConsulta", autenticacion, createAntecedente);
antecedentesRouter.delete("/:id", autenticacion, deleteAntecedente);

module.exports = antecedentesRouter;