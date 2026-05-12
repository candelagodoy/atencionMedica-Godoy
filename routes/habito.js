const express = require('express');
const habitoRouter = express.Router();

const { createHabito, deleteHabito } = require("../controllers/habito");
const { render } = require("pug");

habitoRouter.post("/:idConsulta", createHabito);
habitoRouter.delete("/:id", deleteHabito);

module.exports = habitoRouter;