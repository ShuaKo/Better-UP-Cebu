const Sequelize = require('sequelize');

const connection = 'postgres://upcebu:upcebu@localhost:5433/updb';
const database = new Sequelize(connection);

module.exports = database;