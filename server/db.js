const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:7cfa37e368584d0785269f66d3c39c22@localhost:5432/workout-log");

module.exports = sequelize;