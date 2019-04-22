var express = require("express");
const functions = require("firebase-functions");
var firebase = require("firebase");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var url = require("url");
var User = require("./User.js");
var port = process.env.PORT || 3000;
var path = require("path");
var app = express();

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

var config = {
  apiKey: "AIzaSyBbsYXMSVbJ8_Q7MQ65l7NuCgzZoUihr1o",
  authDomain: "cinemeet252.firebaseapp.com",
  databaseURL: "https://cinemeet252.firebaseio.com",
  projectId: "cinemeet252",
  storageBucket: "cinemeet252.appspot.com",
  messagingSenderId: "840336543404"
};
firebase.initializeApp(config);

// res.cookie('rememberme', 'yes', { httpOnly: false});
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/static/LoginScreen.html");
});

app.post("/auth", function(req, res) {
  let name = req.body.fullName;
  let email = req.body.email;
  let uid = req.body.userId;
  console.log(req.body);
  // user = new User(name, email, uid);
  // user.addInvite("DragonBall", "rawat.yatharth@gmail.com", {
  //   latitude: 355,
  //   longitude: 5454
  // });
  // user.addInvite("DragonBall1", "rawat.yatharth@gmail.com1", {
  //   latitude: 355,
  //   longitude: 54541
  // });
  // user.PushToUserDatabase();
  res.json({ success: true });
});

app.get("/Meet", function(req, res) {
  res.sendFile(__dirname + "/static/Meet.html");
});

app.get("/FindMovie", function(req, res) {
  res.sendFile(__dirname + "/static/FindMovie.html");
});

app.get("/Home", function(req, res) {
  res.sendFile(__dirname + "/static/Home.html");
});

app.get("/SendInvite", async function(req, res) {
  let email = req.query.search;
  let Movie = req.query.Movie;
  let Location = req.query.Location;
  let from = req.query.From;

  let user1 = await User.getUserDatabase(email);
  if (user1) {
    user1.addInvite(Movie, from, Location);
    res.redirect("/Home");
  } else {
    res.send("User Does not Exist");
  }
});

app.post("/Invites", async function(req, res) {
  let emailId = req.body.email;
  let user = await User.getUserDatabase(emailId);
  console.log(user);
  let invites = await user.getInvites();
  console.log(invites);
  res.json({ Invites: invites });
});

app.listen(port, function() {
  console.log(`Example app listening on port ` + port);
});

exports.app = functions.https.onRequest(app);
