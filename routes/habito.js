const express = require('express');
const habitoRouter = express.Router();

const { createHabito, deleteHabito } = require("../controllers/habito");
const { render } = require("pug");

const autenticacion = require("../middlewares/autenticacion");

habitoRouter.post("/:idConsulta",autenticacion, createHabito);
habitoRouter.delete("/:id", autenticacion, deleteHabito);

module.exports = habitoRouter;