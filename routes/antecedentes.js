const express = require('express');
const antecedentesRouter = express.Router();

const { createAntecedente, deleteAntecedente } = require("../controllers/antecedentes");
const { render } = require("pug");

antecedentesRouter.post("/:idConsulta", createAntecedente);
antecedentesRouter.delete("/:id", deleteAntecedente);

module.exports = antecedentesRouter;