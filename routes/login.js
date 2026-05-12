const express = require("express");
const { mostrarLogin, login, registro, mostrarRegistro, logout } = require("../controllers/login");
const loginRouter = express.Router();

loginRouter.get("/", mostrarLogin);
loginRouter.post("/", login);
loginRouter.get("/registro", mostrarRegistro);
loginRouter.post("/registro", registro);
loginRouter.get("/logout", logout);

module.exports = loginRouter;