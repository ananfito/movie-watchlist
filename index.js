import apiKey from "./config.js"

const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')
const searchResultsEl = document.getElementById('search-results')

searchBtn.addEventListener('click', getSearchResultsData)

document.getElementById('search-bar').reset()

let movieDataArr = []
const movieWatchList = []

document.addEventListener('click', addMovieToWatchlist)

// function add movie to watchlist 
async function addMovieToWatchlist(e) {
    if (e.target.dataset.movieid) {
        let imdbID = e.target.dataset.movieid
        document.getElementById(`${imdbID}`).disabled = true
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
        const data = await response.json()
        movieWatchList.push(data)
        localStorage.setItem('movieWatchList', JSON.stringify(movieWatchList))
    }
}

// function to get data from OMDB API based on user's search query
function getSearchResultsData(e) {
    e.preventDefault()
    const searchQuery = searchInput.value 
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`)
        .then (res => res.json())
        .then (data => {
            if (data.Response === "True") {
                data.Search.forEach(getMovieData)
            } else {
                searchResultsEl.innerHTML = `
                    <div class="container" >
                        <p class="default"><i class="fa-solid fa-face-frown-open" id="frowny-face"></i></p>
                        <p class="default">Sorry, movie not found. Try another search.</p>
                    </div>
                `
            }
        })      
}

// function to organize movie data and fetch specific movie titles from OMDB API
async function getMovieData(movieObj) {
    movieDataArr = []
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${movieObj.Title}`)
    const data = await response.json()
    movieDataArr.push(data)
    renderResults(movieDataArr)
}

// function to render search results
function renderResults(array) {
    searchResultsEl.innerHTML = ''
    array.forEach(movie => {
        if (movie.Response == "True") {
            searchResultsEl.innerHTML += `
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
                            <button id="${movie.imdbID}" data-movieid="${movie.imdbID}" data-movie-title="${movie.Title}"><i class="fa-solid fa-circle-plus"></i> Watchlist</button>
                        </div>
                        <p class="movie-info__plot">${movie.Plot}</p>
                    </div>
                </div>
                <hr>
        `
        }
        
    });
}
