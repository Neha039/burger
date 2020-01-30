// Dependencies
var connection = require('./connection');

/** Return a string of question marks to be used as placeholder in the insert query
	Arguments: 
	num: number of question marks
	ex: num = 3 return ?,?,?
*/
function printQuestionMarks(num) {
	var arr = [];
	for (var i = 0; i < num; i++) {
		arr.push('?');
	}
	return arr.toString();
}



/* Prepare an object to be used into a SET statement
	Arguments:
	ob: Object to be prepare
	Example
	Passing this object as argument {"burger_name": "burger", "devour": true}
	will return 
	{ 
	  fields: 'burger_name= ?,devour= ?',
  	  values: [ 'burger', true ] 
  	}
*/

function objToSql(ob) {
  	var obj = {};
  	var fields = [];
  	var values = [];

  	for (var key in ob) {
    	if (Object.hasOwnProperty.call(ob, key)) {

      		fields.push(key + "= ?");
      		values.push(ob[key]);
   	 	}
  	}
  	obj.fields = fields.toString();
  	obj.values = values;
  	return obj;
}

var orm = {
	/** Select all records from table
		Arguments:
		table: name of the table used in the query
		callBack: this function is called whit the result, when the query is done
	*/
	selectAll: function(table, callBack){
		var query = 'SELECT * FROM ' + table;

		connection.query(query, function(err, result){
			if(err) throw err;

			callBack(result);
		});
	},

	/** Insert one record in the table
		Arguments:
		table: name of the table used in the query
		fields: array of fields names of the table
		values: array of values inserted in the table
		callback: this function is called whit the result, when the query is done
	*/
	insertOne: function(table, fields, values, callBack){
		var query = 'INSERT INTO ' + table + ' (';
			query += fields.toString() + ') VALUES (';
			query += printQuestionMarks(values.length);
			query += ' )';

		 connection.query(query, [values], function(err, result){
		 	if(err) throw err

		 	callBack(result);
		 });
	},

	/** Update one record in the table
		Arguments: 
		table: table to be updated
		fieldsValues: Object containing field/value pairs, example {devour: true}
		condition: WHERE statement, example id = 3
		callBack: this function is called whit the result, when the query is done
	*/
	updateOne: function(table, fieldsValues, condition, callBack){
		var fieldsValues = objToSql(fieldsValues);

		var query = 'UPDATE ' + table + ' SET ';
			query += fieldsValues.fields;
			query += ' WHERE ' + condition;

	    connection.query(query, fieldsValues.values, function(err, result){
		 	if(err) throw err

		  	callBack(result);
		});
	}
}

module.exports = orm;