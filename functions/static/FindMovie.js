async function displayMovie(Movie) {
    let movieData = await fetch(`http://www.omdbapi.com/?t=${Movie}&type=movie&apikey=46fcc81f`);

    let movie = document.getElementById("movie-info");
    movieData = await movieData.json();

    if (movieData.ok) {
        // Movie found
        /*
            <div id="movie-info">
                <img src=${movie poster url} alt="Poster for ${movie title}">
                <p>${movie title} (${movie year}, Rated {movie age rating}, ${movie duration})</p>
            </div>
        */
        let poster = document.createElement("img");
        poster.setAttribute("src", movieData["Poster"]);
        poster.setAttribute("alt", `Poster for ${movieData["Title"]}`);
        movie.appendChild(poster);

        let caption = document.createElement("p");
        let captionText = document.createTextNode(`${movieData["Title"]} (${movieData["Year"]}, Rated ${movieData["Rated"]}, ${movieData["Runtime"]})`);
        caption.appendChild(captionText);
        movie.appendChild(caption);
    }
    else {
        // Movie not found
        /*
            <div id="movie-info">
                <p>"${movie title}" not found!</p>
            </div>
        */
        const urlParams = new URLSearchParams(window.location.search);
        const movieName = urlParams.get("search");

        console.log(movie);

       let result = document.createElement("p");
       let resultText = document.createTextNode(`\"${movieName}\" not found!`);
       result.appendChild(resultText);
       movie.appendChild(result);
    }
}

function searchAgain() {
    // TODO: Redirect to specific user
    window.location.replace('/Home');
}
