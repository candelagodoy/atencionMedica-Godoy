const express = require("express");
const consultaRouter = express.Router();
const { findAllSelects , createConsulta , abrirConsulta, renderConsulta, finalizarConsulta, verHCL, guardarEvolucion } = require("../controllers/consulta");
const autenticacion = require("../middlewares/autenticacion");


consultaRouter.get("/", autenticacion, abrirConsulta);
consultaRouter.get("/hcl/:idPaciente", autenticacion, verHCL);
consultaRouter.post("/:idConsulta/finalizar", autenticacion, finalizarConsulta);
consultaRouter.post("/:idConsulta/guardarEvolucion", autenticacion, guardarEvolucion); // ← antes del GET genérico
consultaRouter.get("/:idConsulta", autenticacion, renderConsulta);


module.exports= consultaRouter;