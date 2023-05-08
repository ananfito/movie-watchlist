import apiKey from "./config.js"

const watchlist = document.getElementById('watchlist')
const watchlistArr = []
if (localStorage.getItem('movieWatchList')) {
    let localStorageArr = JSON.parse(localStorage.getItem('movieWatchList'))
    localStorageArr.forEach(element => watchlistArr.push(element))
}

// event listener for remove btn
document.addEventListener('click', removeFromWatchlist)

// function to remove movie from watchlist
function removeFromWatchlist(e) {
    function isMovie(movieObj) { 
        if (movieObj.Title === e.target.dataset.movieTitle) { 
            return movieObj.Title 
        } 
    }
    if (e.target.dataset.movieTitle) {
        const movieIndex = watchlistArr.findIndex(isMovie)
        watchlistArr.splice(movieIndex, 1)
        renderWatchlist()
    }
    if (watchlistArr.length === 0) {
        localStorage.clear()
    }
}

// function to render movie watchlist
function renderWatchlist() {
    if (watchlistArr.length > 0) {
        watchlist.innerHTML = ''
        watchlistArr.forEach(movie => {
            watchlist.innerHTML += `
                <div class="card">
                    <div class="movie-poster">
                        <img id="movie-poster-img" src="${movie.Poster}" alt="">
                    </div>
                    <div class="movie-info">
                        <div class="movie-info__header">
                            <p class="movie-title">${movie.Title}</p>
                            <div class="ratings-star-container"><img id="ratings-star" src="./star.png" alt="yellow star"></div>
                            <p class="movie-rating">${movie.imdbRating}</p>
                        </div>
                        <div class="movie-info__metadata">
                            <p class="movie-runtime spacing">${movie.Runtime}</p>
                            <p class="movie-genre spacing">${movie.Genre}</p>
                            <button id="${movie.imdbID}" data-movieid="${movie.imdbID}" data-movie-title="${movie.Title}"><i class="fa-solid fa-circle-minus"></i> Remove</button>
                        </div>
                        <p class="movie-info__plot">${movie.Plot}</p>
                    </div>
                </div>
                <hr>
            `
        });
    } else {
        watchlist.innerHTML = `
            <div class="container">
                <p class="default">Your watchlist is looking a little empty...</p>
                <p id="add-movies-text"><a id="watchlist-add-movies-link" href="./index.html"><i class="fa-solid fa-circle-plus" id="watchlist-circle-plus"></i>Let's add some movies!</a></p>
            </div>
        `
    }
}

renderWatchlist()
