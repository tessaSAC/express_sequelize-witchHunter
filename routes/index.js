'use strict'


// REQUIRE THE THINGS
const express = require('express'),
	  router = express.Router(),
	  Hunter = require('../models/hunter'),
	  Team = require('../models/team');



// ASSOCIATIONS
Hunter.belongsTo(Team, { as: 'agent' });
Team.hasMany(Hunter);



// FIND ALL THE HUNTERS
router.get('/hunters', function(request, response, next) {
	Hunter.findAll()
	.then(function(hunters) {
		response.json(hunters);
	})
	.catch(next);
});



// FIND THE TEAMMATES
router.get('/hunters/:id/teammates', function(request, response, next) {
	Hunter.findAll({
		where: {
			id: { $ne: request.params.id }
		}
	})
	.then(function(teammates) {
		response.send(teammates);
	})
	.catch(next);
});



// FIND A SINGLE HUNTER
router.get('/hunters/:id', function(request, response, next) {
	Hunter.findById(request.params.id)
	.then(function(foundHunter) {
		foundHunter
			? response.send(foundHunter)
			: response.sendStatus(404);
	})
	.catch(next);
});



// CREATE A NEW HUNTER
// {
// 	name: 'Robin',
// 	powers: ['pyrokinesis', 'force fields'],
// 	// defaultValue of timesDeployed: 0
// }
router.post('/hunters', function(request, response, next) {
	Hunter.create(request.body)
	.then(function(newHunter) {
		response.send(newHunter);
	})
	.catch(next);
}



// UPDATE AN EXISTING HUNTER
// {
// 	name: 'Robin Sena'
// }
router.put('/hunters/:id', function(request, response, next) {
	Hunter.update(request.body, {
		where: { id: request.params.id },
		returning: true
	})
	// RETURNS `[number of changed rows, the actual changed rows]`
	.spread(function(numRows, updatedRows) {
		response.send(updatedRows[0]);
	})
	.catch(next);
});



// EXPORT THE ROUTER
module.exports = router;