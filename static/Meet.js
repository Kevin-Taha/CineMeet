async function getCoordinates(emailId, Movie) {
  let data = { email: emailId, movie: Movie }; // Parameters being sent to server for coordinates
  console.log(data);
  let response = await fetch("/coordinates", {
    method: "POST", // Since we are sending some data to the server
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  let responseJSON = await response.json();
  return responseJSON;
}

async function postCoordinates(EmailId, Movie, Coordinates) {
  let data = { email: EmailId, movie: Movie, coordinates: Coordinates }; // Parameters being sent to server for coordinates

  let response = await fetch("/Meet", {
    method: "POST", // Since we are sending some data to the server
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  response = await response.json();
  console.log(response);
  window.location.replace(response.redirect);
}
