'use strict'

const db = require('./_db'),
	  Sequelize = require('sequelize');


const Team = db.define('team', {
	name: {
		type: Sequelize.STRING,
		defaultValue: 'Solomon'
	}
});



module.exports = Team;
