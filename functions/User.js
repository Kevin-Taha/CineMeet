var firebase = require("firebase");

class User {
  // Constructor without image
  constructor(FullName, EmailId, UserId) {
    this.FullName = FullName;
    this.EmailId = EmailId;
    this.UserId = UserId;
    this.Invites = [];
  }

  //Get Full Name of User
  getFullname() {
    return this.FullName;
  }

  // Set Full Name of User
  setFullname(name) {
    this.FullName = name;
  }

  // Get Email ID of User
  getEmailId() {
    return this.EmailId;
  }

  addInvite(movie, email, location) {
    // let data = { Movie: movie, Email: email, Location: location };
    // console.log(data);
    // this.Invites.push(data);
    // console.log(this.Invites.toString());
    let database = firebase.database();
    let dbRef = database.ref();
    // Get Node with all users
    let invitesRef = dbRef.child("users/" + this.UserId + "/Invites");
    let inviteKey = invitesRef.push().getKey();
    let inviteData = { Movie: movie, Email: email, Location: location };
    let inviteObject={}
    // Construct JSON Object for User
    inviteObject["/users/" + this.UserId + "/Invites/" + inviteKey] = inviteData;
    // Call Update on Object
    dbRef.update(inviteObject, function() {
      console.log("User Successfully Updated\n"); // Optional callback for success
    });
  }

  deleteInvite(movie, email) {
    for (let i = 0; i < this.Invites.length; i++) {
      if (this.Invites[i].Movie === movie && this.Invites[i].Email === email) {
        this.Invites.splice(i, 1);
        i--;
      }
    }
  }

  deleteAllInvite() {
    this.Invites = [];
  }

  // Set Email ID of User
  setEmailId(email) {
    this.EmailId = email;
  }

  getInvites(emailId = this.EmailId) {
    console.log("from get invites: " + emailId);
    let database = firebase.database();
    let dbRef = database.ref();
    // Get Node with all users
    let usersRef = dbRef.child("users");
    // Returns Promise
    return new Promise(function(resolve, reject) {
      // Order List by EmailId and search for email id of user
      console.log("from get invites2: " + emailId);
      usersRef
        .orderByChild("EmailId")
        .equalTo(emailId)
        .once("value", function(snapshot) {
          // For Each Snapshort Resolve Promise Firebase does not know if there is only entry after search
          snapshot.forEach(function(childSnapshot) {
            let value = childSnapshot.val();
            // Create User Object
            // Resolve Promise
            resolve(value.Invites);
          });
        });
    });
  }

  getUserID() {
    return this.UserId;
  }

  // To JSON
  toJSON() {
    return {
      FullName: this.FullName,
      EmailId: this.EmailId,
      UserId: this.UserId,
      Invites: this.Invites
    };
  }

  // New User to Firebase Database
  PushToUserDatabase() {
    console.log("Pushing to User Database\n");

    let database = firebase.database();
    let dbRef = database.ref();
    // Get Node with all users
    let usersRef = dbRef.child("users");
    // Get Unique Key for New User
    let newUserkey = this.UserId;
    console.log("From PushToUserDatabase \n" + this.toJSON());
    let userObject = {};
    // Construct JSON Object for User
    userObject["/users/" + newUserkey] = this.toJSON();
    // Call Update on Object
    dbRef.update(userObject, function() {
      console.log("User Successfully Updated\n"); // Optional callback for success
    });
  }

  // Change User in Firebase Database
  UpdateUserDatabase() {
    console.log("Updating to User Database\n");

    let database = firebase.database();
    let dbRef = database.ref();
    // Get Node with all users
    let usersRef = dbRef.child("users");
    // Get Unique Key for New User
    let newUserkey = this.UserId;
    let userObject = {};
    // Construct JSON Object for User
    userObject["/users/" + newUserkey] = this.toJSON();
    // Call Update on Object
    dbRef.update(userObject, function() {
      console.log("User Successfully Updated\n"); // Optional callback for success
    });
  }

  // Delete User in Firebase Database
  DeleteUserDatabase() {
    let database = firebase.database();
    let dbRef = database.ref();
    // Get Node with all users
    let usersRef = dbRef.child("users");
    // Get Unique Key for New User
    let newUserkey = this.UserId;
    let userObject = {};
    // Construct JSON Object for User
    userObject["/users/" + newUserkey] = null;
    // Call Update on Object
    dbRef.update(userObject, function() {
      console.log("User Successfully Updated\n"); // Optional callback for success
    });
  }

  // Get User Information from Database
  static getUserDatabase(emailId) {
    let database = firebase.database();
    let dbRef = database.ref();
    // Get Node with all users
    let usersRef = dbRef.child("users");
    // Returns Promise
    return new Promise(function(resolve, reject) {
      // Order List by EmailId and search for email id of user
      usersRef
        .orderByChild("EmailId")
        .equalTo(emailId)
        .once("value", function(snapshot) {
          if (snapshot.exists()) {
            snapshot.forEach(function(childSnapshot) {
              let value = childSnapshot.val();
              // Create User Object
              let user = new User(
                value.FullName,
                value.EmailId,
                value.UserId,
                value.Invites
              );
              // Resolve Promise
              resolve(user);
            });
          } else {
            resolve(null);
          }
        });
    });
  }
}

module.exports = User;
