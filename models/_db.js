'use strict'

// *** MAKE SURE POSTGRES IS RUNNING ***

// REQUIRE SEQUELIZE
const Sequelize = require('sequelize');

// TELL SEQUELIZE WHERE THE DB IS LOCATED AND ITS NAME && EXPORT IT IN ONE LINE
module.exports = new Sequelize('postgres://localhost:5432/witchHunter', { logging: false });

// *** DON'T FORGET TO `createdb witchHunter` ***