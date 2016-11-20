'use strict'

const Sequelize = require('sequelize');
module.exports = new Sequelize('postgres://localhost:5432/witchHunter', { logging: false });