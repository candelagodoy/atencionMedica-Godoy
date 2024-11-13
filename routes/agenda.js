const express = require("express");
const agendaRouter = express.Router();

const { datosMedico }= require("../controllers/agenda")

agendaRouter.get("/", datosMedico)

module.exports= agendaRouter;