'use strict';

var Operators = require('./models/operators');

Operators.collection.deleteMany({});

var operators = [
  {
    name: "KPN",
    network: true,
    voice: true,
    catv: true,
    data: true
  },
  {
    name: "Vodafone",
    network: true,
    voice: true,
    catv: false,
    data: false
  },
  {
    name: "T-Mobile",
    network: true,
    voice: false,
    catv: false,
    data: false
  }
];

operators.forEach(function (operator, index) {
  Operators.find({ 'name': operator.name }, function(err, operators) {
  	if (!err && !operators.length) {
      Operators.create({ 
        name: operator.name,
        network: operator.network, 
        voice: operator.voice, 
        catv: operator.catv, 
        data: operator.data
      });
  	}
  });
});
