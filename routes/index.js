'use strict'

const express = require('express'),
	  router = express.Router(),
	  Hunter = require('../models/hunter'),
	  Team = require('../models/team');

Hunter.belongsTo(Team, { as: 'agent' });
Team.hasMany(Hunter);



router.get('/hunters', function(request, response, next) {
	Hunter.findAll()
	.then(function(hunters) {
		response.json(hunters);
	})
	.catch(next);
});



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



router.get('/hunters/:id', function(request, response, next) {
	Hunter.findById(request.params.id)
	.then(function(foundHunter) {
		foundHunter
			? response.send(foundHunter)
			: response.sendStatus(404);
	})
	.catch(next);
});



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



// {
// 	name: 'Robin Sena'
// }
router.put('/hunters/:id', function(request, response, next) {
	Hunter.update(request.body, {
		where: { id: request.params.id },
		returning: true
	})
	.spread(function(numRows, updatedRows) {
		response.send(updatedRows[0]);
	})
	.catch(next);
});



module.exports = router;