var page = 1;
var currentMovieJSON;

async function displayMovie(MovieName, Year = null) {
  // Get single movie result from OMDB API
  let omdbKey = "46fcc81f";
  let omdbURL = `https://www.omdbapi.com/?t=${MovieName}&type=movie`;
  if (Year !== null) {
    omdbURL += `&y=${Year}`;
  }
  omdbURL += `&apikey=${omdbKey}`;
  let movieResponse = await fetch(omdbURL);

  let movie = document.getElementById("movie-info");
  // Erase previous contents (if applicable)
  while (movie.firstChild) {
    movie.removeChild(movie.firstChild);
  }

  let movieData = await movieResponse.json();
  if (movieResponse.ok && movieData["Response"] === "True") {
    // Movie found
    /*
            <div id="movie-info">
                <img src=${movie poster url} alt="Movie Poster">
                <p>${movie title} (${movie year}, Rated {movie age rating}, ${movie duration})</p>
            </div>
        */

    // Update with new movie
    let poster = document.createElement("img");
    poster.setAttribute("src", movieData["Poster"]);
    poster.setAttribute("alt", `Movie Poster`);
    movie.appendChild(poster);

    let caption = document.createElement("p");
    let captionText = document.createTextNode(
      `${movieData["Title"]} (${movieData["Year"]}, Rated ${
        movieData["Rated"]
      }, ${movieData["Runtime"]})`
    );
    caption.appendChild(captionText);
    movie.appendChild(caption);
  } else {
    // Movie not found
    /*
            <div id="movie">
                <p>"${movie title}" not found!</p>
            </div>
        */
    let result = document.createElement("h1");
    result.setAttribute(
      "style",
      "color: white; margin-top:1em;margin-left:0.5em"
    );
    let resultText = document.createTextNode("No Information Available");
    result.appendChild(resultText);
    movie.appendChild(result);
  }
  currentMovieJSON = movieData;
}

async function showMoreMovies() {
  let movieList = document.getElementById("movie-info-list");
  // Bring up the next 10 search results
  let urlParams = new URLSearchParams(window.location.search);
  let movieName;
  if (urlParams.has("search")) {
    movieName = urlParams.get("search");
  } else {
    alert(`Invalid Input, missing movie name`);
  }

  // TODO: Don't keep sending queries if no more results to show

  let omdbKey = "46fcc81f";
  let omdbURL = `https://www.omdbapi.com/?s=${movieName}&type=movie&page=${page}`;
  omdbURL += `&apikey=${omdbKey}`;
  let movies = await fetch(omdbURL);
  if (movies.ok) {
    movies = await movies.json();
    // Array of movies with title, year, type, poster, imdbID
    movies = movies["Search"]; // Array of movies

    /*
            <ul id="movie-info-list">
                ...
                <li>
                    <a onclick="displayMovie(${movie title}, ${movie year})">${movie title} (${movie year})</a>
                </li>
                ...
            </ul>
        */
    // Add search results to list
    // i = 0 is current movie (don't show)
    for (let i = 1; movies !== undefined && i < movies.length; i++) {
      let movieData = movies[i];
      let elem = document.createElement("li");
      let link = document.createElement("a");
      link.setAttribute(
        "onclick",
        `updateMovie(\'${movieData["Title"]}\', \'${movieData["Year"]}\')`
      );
      link.innerText = `${movieData["Title"]} (${movieData["Year"]})`;
      elem.appendChild(link);
      movieList.appendChild(elem);
    }
  } else {
    // Do not add to list
  }

  page++;
}

function updateMovie(MovieName, Year) {
  // Change search parameters when link is clicked (no refresh)
  if (window.history.replaceState) {
    //prevents browser from storing history with each change:
    window.history.replaceState(window.history.state, "", `/FindMovie/?search=${MovieName}`);
  }

  displayMovie(MovieName, Year);
}

function searchAgain() {
  // TODO: Redirect to specific user
  window.location.replace("/Home");
}
