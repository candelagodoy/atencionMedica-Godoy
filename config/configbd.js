const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_ADDON_DB || 'am_prueba' , process.env.MYSQL_ADDON_USER ||'root'  , process.env.MYSQL_ADDON_PASSWORD ||'',{

    host: process.env.MYSQL_ADDON_HOST || 'localhost',
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    port: process.env.MYSQL_ADDON_PORT || 3306
  });

module.exports = sequelize;