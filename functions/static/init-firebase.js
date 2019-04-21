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

async function postUser(EmailId, FullName) {
  let data = { email: EmailId, fullName: FullName }; // Parameters being sent to server for coordinates

  let response = await fetch("/auth", {
    method: "POST", // Since we are sending some data to the server
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  response = await response.json();
  console.log(response);
  // window.location.replace(response.redirect);
}
