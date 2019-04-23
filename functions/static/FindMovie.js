async function getMovie(Movie) {
    let omdbKey = "6280f60";
    let movieData = await fetch(`http://www.omdbapi.com/?t=${Movie}&type=movie&apikey=46fcc81f`);
    movieData = await movieData.json();

    let movie = document.createElement("div");
    movie.setAttribute("id", "movie");

    let poster = document.createElement("img");
    poster.setAttribute("src", movieData["Poster"]);
    poster.setAttribute("alt", `Poster for ${movieData["Title"]}`);
    movie.appendChild(poster);
    let caption = document.createElement("p");
    let captionText = document.createTextNode(`${movieData["Title"]} (${movieData["Year"]}, Rated ${movieData["Rated"]}, ${movieData["Runtime"]})`);
    caption.appendChild(captionText);
    movie.appendChild(caption);
    movie.appendChild(document.createElement("br"));
    
    document.getElementById("movie-info").appendChild(movie);

    console.log(response);
}
