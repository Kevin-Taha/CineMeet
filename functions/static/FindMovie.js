async function getMovie(Movie) {
    let omdbKey = "6280f60";
    let response = await fetch(`http://www.omdbapi.com/?t=${Movie}&type=movie&apikey=46fcc81f`);
    response = await response.json();
    console.log(response);
}
