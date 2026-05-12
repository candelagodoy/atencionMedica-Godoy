const express = require("express");
const agendaRouter = express.Router();

const autenticacion = require("../middlewares/autenticacion");
const { datosAgenda }= require("../controllers/agenda")

agendaRouter.get("/", autenticacion, datosAgenda)

module.exports= agendaRouter;