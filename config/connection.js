// Dependencies
var mysql = require("mysql");

var connection;

// Create connection.
if(process.env.JAWSDB_URL){
    // Heroku
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    // Local host
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "jhon4bmd",
        port: '3306',
        database: "burgers_db"
    });
};

// Connect to database
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
});

// Export connection
module.exports = connection;