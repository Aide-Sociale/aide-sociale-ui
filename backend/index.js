var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/config');

// Setup mongoose
require('./config/mongoose')(mongoose, config);

// Setup Express
var app = express();

app.use(require('./lib/ludwig')(mongoose, mongoose.model('Situation')));
app.use(require('./config/api'));

module.exports = app;
