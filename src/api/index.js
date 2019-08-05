'use strict'

const   express   = require('express'),
        router    = express.Router();

let Operators = require('../models/operators');

// let operators = require('../../mock/operators.json');
// router.get('/operators', function(req,res){
//   res.json(operators);
// })


router.get('/operators', function(req, res) {
  Operators.find({}, function(err, operators) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ operators: operators });
  });
});

router.post('/operators', function(req, res){
  console.log(req.body);
  Operators.create(req.body, function(err){
    if(err){
      return res.status(500).json({ message: err.message });
    }
  })
})

module.exports = router;