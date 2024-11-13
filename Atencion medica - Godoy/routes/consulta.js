const express = require("express");
const consultaRouter = express.Router();
const { findAllSelects } = require("../controllers/consulta");

consultaRouter.get("/", findAllSelects);

module.exports= consultaRouter;