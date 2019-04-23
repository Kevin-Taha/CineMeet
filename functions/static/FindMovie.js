var page = 1;

async function displayMovie(MovieName, Year) {
    // Get single movie result from OMDB API
    let omdbKey = "46fcc81f";
    let omdbURL = `http://www.omdbapi.com/?t=${MovieName}&type=movie`;
    if (Year !== null) {
        omdbURL += `&y=${Year}`;
    }
    omdbURL += `&apikey=${omdbKey}`;
    let movieData = await fetch(omdbURL);

    let movie = document.getElementById("movie-info");
    if (movieData.ok) {
        movieData = await movieData.json();
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
        movieData = await movieData.json();
        // Movie not found
        /*
            <div id="movie">
                <p>"${movie title}" not found!</p>
            </div>
        */
       let result = document.createElement("p");
       let resultText = document.createTextNode(`\"${MovieName}\" not found!`);
       result.appendChild(resultText);
       movie.appendChild(result);
    }
}

async function showMoreMovies() {
    let movieList = document.getElementById("movie-info-list");
    // Bring up the next 10 search results
    let urlParams = new URLSearchParams(window.location.search);
    let movieName;
    if (urlParams.has('search')) {
        movieName = urlParams.get('search');
    }
    else {
        alert(`Invalid Input, missing movie name`);
    }
    
    // TODO: Don't keep sending queries if no more results to show

    let omdbKey = "46fcc81f";
    let omdbURL = `http://www.omdbapi.com/?s=${movieName}&type=movie&page=${page}`;
    omdbURL += `&apikey=${omdbKey}`;
    let movies = await fetch(omdbURL);
    if (movies.ok) {
        movies = await movies.json();
        // Array of movies with title, year, type, poster, imdbID
        movies = movies["Search"]; // Array of movies
        // Add search results to list
        /*
            <ul id="movie-info-list">
                ...
                <li>${movie title} (${movie year})</li>
                ...
            </ul>
        */
        for (let i = 0; movies !== undefined && i < movies.length; i++) {
            
            let movieData = movies[i];
            console.log(movieData);
            let elem = document.createElement("li");
            elem.appendChild(document.createTextNode(`${movieData["Title"]} (${movieData["Year"]})`));
            movieList.appendChild(elem);
        }
    }
    else {
        // Do not add to list
    }

    page++;
}

function searchAgain() {
    // TODO: Redirect to specific user
    window.location.replace('/Home');

    
}