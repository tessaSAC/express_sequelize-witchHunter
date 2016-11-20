'use strict'

const express = require('express'),
	  app = express(),
	  morgan = require('morgan'),
	  bodyParser = require('body-parser'),
	  path = require('path'),
	  routes = require('./routes'),
	  Hunter = require('../models/hunter'),
	  Team = require('../models/team');



app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));
app.use('/files', express.static('/public/staticFiles'));



Hunter.sync()
.then(function() {
	Team.sync();
})
.then(function() {
	app.listen(3001, function() {
		console.log('Server is listening on port 3001!');
	});
});



app.use('/', routes);



app.get('/errEnd', function(request, response, next) {
	Hunter.findOne()
	.then(hunter => {
		if (!hunter) throw HTTPerror(404, 'Hunter not found!!');
	})
	.catch(next);
});



function HTTPerror (status, message) {
	const err = Error(message);
	err.status = status;
	return err;
}



app.use(function(err, request, response, next) {
	console.error(err);
	response.status(err.status || 500).send(err.message || "I have failed -- knock on wood!");
});



module.exports = app;