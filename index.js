import apiKey from "./config.js"

const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')
const searchResultsEl = document.getElementById('search-results')

searchBtn.addEventListener('click', getSearchResultsData)

document.getElementById('search-bar').reset()

let movieDataArr = []
const movieWatchList = []

document.addEventListener('click', addMovieToWatchlist)

// function add to watchlist 
// use imdbID or movie title to grab data from API
// store data in an array in local storage
async function addMovieToWatchlist(e) {
    if (e.target.dataset.movieid) {
        let imdbID = e.target.dataset.movieid
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
        const data = await response.json()
        movieWatchList.push(data)
        localStorage.setItem('movieWatchList', JSON.stringify(movieWatchList))
    }
}

function getSearchResultsData(e) {
    e.preventDefault()
    const searchQuery = searchInput.value 
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`)
        .then (res => res.json())
        .then (data => {
            data.Search.forEach(getMovieData)
        })      
}

// function to organize movie data and fetch specific movie titles
// take each object in searchResultsArr and grab the 'Title' which then is used in a new fetch function
async function getMovieData(movieObj) {
    movieDataArr = []
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${movieObj.Title}`)
    const data = await response.json()
    movieDataArr.push(data)
    renderResults(movieDataArr)
}

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
