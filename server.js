// Express
var express = require("express");
var app = express();

var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it (HTML5)
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));

// Router
app.use('/', require('./controllers/burgers_controller'));

// Handle 404
app.use(function(req, res) {
     res.render('404');
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});