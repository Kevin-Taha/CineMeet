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

//const config = JSON.parse(process.env.firebaseConfig);

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
  user = new User(name, email, uid);
  user.PushToUserDatabase();
  res.json({ success: true });
});

app.get("/Meet", function(req, res) {
  res.sendFile(__dirname + "/static/Meet.html");
});

app.get("/FindMovie", function(req, res) {
  res.sendFile(__dirname + "/static/FindMovie.html");
});

app.get("/Home", function(req, res) {
  console.log("Done\n");
  res.sendFile(__dirname + "/static/Home.html");
});

app.get("/SendInvite", function(req, res) {
  let database = firebase.database();
  let dbRef = database.ref();
  // Get Node with all users
  let usersRef = dbRef.child("invites");
  // Get Unique Key for New User
  return new Promise((resolve, reject) => {
    usersRef
      .orderByChild("EmailId")
      .equalTo(this.EmailId)
      .once("value", snapshot => {
        let userKey = null;
        if (snapshot.exists()) {
          return resolve(0);
        } else {
          let newUserkey = usersRef.push().key;
          let userObject = {};
          // Construct JSON Object for User
          userObject["/users/" + newUserkey] = this.toJSON();
          // Call Update on Object
          return dbRef.update(userObject, function() {
            console.log("User Successfully Updated\n"); // Optional callback for success
            return resolve(1);
          });
        }
      });
  });
});

app.post("/Invites", async function(req, res) {
  let emailId = req.body.email;
  let user = await User.getUserDatabase(emailId);
  let invites = await user.getInvites();
  res.json({Invites: invites});
});

app.listen(port, function() {
  console.log(`Example app listening on port ` + port);
});

exports.app = functions.https.onRequest(app);
