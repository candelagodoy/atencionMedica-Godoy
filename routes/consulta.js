const express = require("express");
const consultaRouter = express.Router();
const { findAllSelects , createConsulta , abrirConsulta, renderConsulta, finalizarConsulta, verHCL} = require("../controllers/consulta");


consultaRouter.get("/", abrirConsulta);
consultaRouter.get("/hcl/:idPaciente", verHCL);
consultaRouter.get("/:idConsulta", renderConsulta);
consultaRouter.post("/:idConsulta/finalizar", finalizarConsulta);



//consultaRouter.post("/:id", createConsulta )

module.exports= consultaRouter;