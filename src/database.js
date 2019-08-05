'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/gaps', { useNewUrlParser: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log.bind(console, 'connected');
});