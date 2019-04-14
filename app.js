// in sublime
var express = require("express");
var firebase = require("firebase");
const User = require("./User.js");
var port = process.env.PORT || 3000;
var app = express();

const config = JSON.parse(process.env.firebaseConfig);
firebase.initializeApp(config);

app.get("/", function(req, res) {

	res.send("Hello World");
});

app.listen(port, function() {
  console.log(`Example app listening on port !`);
});
