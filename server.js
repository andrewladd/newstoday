// modules & set up ------------------------------------------------------------------
var express        = require('express');
var app            = express();
var morgan     = require('morgan');     
var bodyParser     = require('body-parser');
var port = process.env.PORT || 8080; // set our port

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// log all requests to the console 
app.use(morgan('dev'));

//for serving public folder
app.use(express.static(__dirname + '/public')); 

// routes ----------------------------------------------------------------------
require('./app/routesMain')(app); // pass our application into our routes

// start app -------------------------------------------------------------------
app.listen(port);	
console.log('Visit: ' + port); 	
exports = module.exports = app;