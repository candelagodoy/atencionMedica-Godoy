const express = require("express");
const consultaRouter = express.Router();
const { findAllSelects , createConsulta , abrirConsulta, renderConsulta, finalizarConsulta, verHCL} = require("../controllers/consulta");
const { render } = require("pug");

consultaRouter.get("/", abrirConsulta);
consultaRouter.get("/:idConsulta", renderConsulta);
consultaRouter.post("/:idConsulta/finalizar", finalizarConsulta);
consultaRouter.get("/hcl/:idPaciente", verHCL);


//consultaRouter.post("/:id", createConsulta )

module.exports= consultaRouter;