const express = require("express");
const consultaRouter = express.Router();
const { findAllSelects , createConsulta } = require("../controllers/consulta");

consultaRouter.get("/", findAllSelects);
consultaRouter.post("/:id", createConsulta )

module.exports= consultaRouter;