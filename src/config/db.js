const { Sequelize } = require('sequelize');
const { PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_DATABASE } = require('./index');

const sequelize = new Sequelize(PG_DATABASE, PG_USER, PG_PASSWORD, {
  host: PG_HOST,
  port: PG_PORT,
  dialect: 'postgres',
  logging: false
});

module.exports = { sequelize };