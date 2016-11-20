'use strict'

const db = require('./_db'),
	  Sequelize = require('sequelize');


const Hunter = db.define('hunter', {

	name: {
		type: Sequelize.STRING,
		validate: {
			notEmpty: true
		}
	},
	powers: {
		type: Sequelize.ARRAY(Sequelize.STRING),
		defaultValue: [],
		get: function() {
			return this.getDataValue('powers').join(', ');
		}
	},
	timesDeployed: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}

}, {

	getterMethods: { // `this` === THE INSTANCE
		mainPower: function() {
			return this.powers
				? this.getDataValue('powers')[0]
				: '';
		}
	},

	instanceMethods: { // `this` === THE INSTANCE
		isolateMainPower: function() {
			this.getDataValue('powers')[0];
		}
	},

	classMethod: { // `this` === THE MODEL/CLASS
		findByMainPower: function(power) {
			return this.findOne({ where: {
					mainPower: power
				}
			});
		}
	},

	hooks: { // DON'T USE `this`
		beforeUpdate: function(hunter) {
			++hunter.timesDeployed;
		}
	}

});



module.exports = Hunter;