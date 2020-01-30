// Dependencies
var orm = require('../config/orm');

var burger = {
	selectBurgers: function(callBack){
		orm.selectAll('burgers', function(result){
			callBack(result);
		});
	},

	insertBurger: function(value, callBack){
		orm.insertOne('burgers', ['burger_name'], [value], function(result){
			callBack(result);
		});
	},

	updateBurger: function(condition, callBack){
		orm.updateOne('burgers', {devoured: true}, condition, function(result){
			callBack(result);
		});
	}

}

module.exports = burger;