import apiKey from "./config.js"

const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')
const searchResultsEl = document.getElementById('search-results')

searchBtn.addEventListener('click', getSearchResultsData)

document.getElementById('search-bar').reset()

let movieDataArr = []

function getSearchResultsData(e) {
    e.preventDefault()
    const searchQuery = searchInput.value 
    console.log(searchQuery)
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`)
        .then (res => res.json())
        .then (data => {
            console.log('data from getSearchResults function:', data)
            getMovieData(data.Search) // replaced searchResultsArr with data.Search
        })
    renderResults(movieDataArr) // not sure where this should go; won't render properly
        
}

// function to organize movie data and fetch specific movie titles
// take each object in searchResultsArr and grab the 'Title' which then is used in a new fetch function
function getMovieData(array) {
    array.forEach(movie => {
        fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${movie.Title}`)
            .then (res => res.json())
            .then (data => {
                movieDataArr.push(data)
            })
    })
    console.log('movieDataArr', movieDataArr)
    
}

function renderResults(array) {
    searchResultsEl.innerHTML = ''
    array.forEach(movie => {
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
                            <button id="watchlist-btn"><i class="fa-solid fa-circle-plus"></i> Watchlist</button>
                        </div>
                        <p class="movie-info__plot">${movie.Plot}</p>
                    </div>
                </div>
        `
        
    });
}
