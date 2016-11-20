'use strict'

// REQUIRE THE THINGS
const db = require('./_db'),
	  Sequelize = require('sequelize');


// CREATE THE SCHEMA
const Team = db.define('team', {
	name: {
		type: Sequelize.STRING,
		defaultValue: 'Solomon'
	}
});


// EXPORT THE TEAM MODEL
module.exports = Team;
