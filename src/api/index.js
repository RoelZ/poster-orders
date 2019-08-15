'use strict'

const   express   = require('express'),
        router    = express.Router();

let Operators = require('../models/operators');
let WooCommerce = require('../woocommerce');

router.get('/operators', function(req, res) {
  Operators.find({}, function(err, operators) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ operators: operators });
  });
});

router.post('/operators', function(req, res){  
  Operators.create(req.body, function(err){
    if(err){
      return res.status(500).json({ message: err.message });
    }
    res.json({ operators: req.body, message: 'Operator aangemaakt' });
  })
});

router.put('/operators/:id', function(req, res){  

  let id = req.params.id;
  let operator = req.body;

  if(operator && operator._id !== id){
    return res.status(500).json({err: 'ID dont match'})
  }
  Operators.findByIdAndUpdate(id, operator, function(err, operator){
    if(err){
      return res.status(500).json({ message: err.message });
    }
    res.json({ operators: req.body, message: 'Operator geupdate' });
  })
});

router.get('/posters', function(req, res) {
  
  WooCommerce.get("orders", {
    status: "processing",
  })
  .then((response) => {
    res.json(response.data);
  })
  .catch((error) => {
    return res.status(500).json({ message: error.response.status });
  })
  .finally(() => {
  }); 

});




module.exports = router;