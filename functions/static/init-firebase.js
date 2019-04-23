// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
  apiKey: "AIzaSyBbsYXMSVbJ8_Q7MQ65l7NuCgzZoUihr1o",
  authDomain: "cinemeet252.firebaseapp.com",
  databaseURL: "https://cinemeet252.firebaseio.com",
  projectId: "cinemeet252",
  storageBucket: "cinemeet252.appspot.com",
  messagingSenderId: "840336543404"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function postUser(EmailId, FullName, uid) {
  let data = { email: EmailId, fullName: FullName, userId: uid }; // Parameters being sent to server for coordinates

  let response = fetch("/auth", {
    method: "POST", // Since we are sending some data to the server
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

}
