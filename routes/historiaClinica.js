const express = require("express");
const historiaClinicaRouter = express.Router();

const { find } = require("../controllers/historiaClinica");

historiaClinicaRouter.get("/", find)

module.exports = historiaClinicaRouter;