const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expenses', 'root', 'Aman8624$', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
