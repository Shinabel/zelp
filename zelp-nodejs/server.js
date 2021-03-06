var express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config({ path: "./.env" });

const PORT = process.env.PORT || 4000;
const CONNECTION_URI =
  process.env.MONGODB_URI || "mongodb://localhost/webdev-summer1-2018";

mongoose.connect(CONNECTION_URI);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://cs4550-zelp-angular.herokuapp.com"
  );
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

var session = require("express-session");
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "any string"
  })
);

app.get("/", function(req, res) {
  res.send("Zelp Node.js Back-end");
});

app.get("/api/session/set/:name/:value", setSession);
app.get("/api/session/get/:name", getSession);
// app.get('/api/session/get',
//   getSessionAll);
// app.get('/api/session/reset',
//   resetSession);

function setSession(req, res) {
  var name = req.params["name"];
  var value = req.params["value"];
  req.session[name] = value;
  res.send(req.session);
}

function getSession(req, res) {
  var name = req.params["name"];
  var value = req.session[name];
  res.send(value);
}

var userService = require("./services/user.service.server");
userService(app);
var responseService = require("./services/response.service.server");
responseService(app);
var postService = require("./services/post.service.server");
postService(app);
var restaurantService = require("./services/restaurant.service.server");
restaurantService(app);
var yelpService = require("./services/yelp.service.server");
yelpService(app);
var favoriteService = require("./services/favorite.service.server");
favoriteService(app);

app.listen(PORT);
