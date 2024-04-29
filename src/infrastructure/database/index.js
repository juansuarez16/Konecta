const { Sequelize } = require('sequelize');
const setupModels = require('../../../db/importmodels');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST, // El host de tu base de datos
    port: process.env.DB_PORT, // El puerto de tu base de datos
    username: process.env.DB_USERNAME, // El nombre de usuario de tu base de datos
    password: process.env.DB_PASSWORD, // La contraseña de tu base de datos
    database: process.env.DB_NAME // El nombre de tu base de datos
});


sequelize.sync();
setupModels(sequelize);
module.exports = sequelize;