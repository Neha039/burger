// Dependencies
var express = require('express');
var burger = require('../models/burger');

//Create all our routes
var router = express.Router();

router.get('/', function(req, res){
	res.redirect("index");
});

router.get('/index', function(req, res){
	burger.selectBurgers(function(data){
		res.render("index", { burgers: data });
	});
});

router.post('/burgers/insertBurger', function(req, res){
	burger.insertBurger(req.body.burger_name, function(){
		res.redirect('/');
	});
});

router.put('/burgers/updateBurger/:id', function(req, res){
	var condition = 'id = ' + req.params.id;

	burger.updateBurger(condition, function(){
		res.redirect('/');
	});
});

// Export router
module.exports = router;