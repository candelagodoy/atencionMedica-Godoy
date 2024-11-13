const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('am_prueba','root','',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });

module.exports = sequelize;