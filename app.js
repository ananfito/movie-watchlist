const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')
const searchResultsEl = document.getElementById('search-results')

searchBtn.addEventListener('click', getMovieData)

document.getElementById('search-bar').reset()

let searchResultsArr = []

function getMovieData(e) {
    e.preventDefault()
    const searchQuery = searchInput.value 
    console.log(searchQuery)
    fetch(`https://www.omdbapi.com/?apikey=afd50df&s=${searchQuery}`)
        .then (res => res.json())
        .then (data => {
            console.log(data)
            searchResultsArr = data.Search
            console.log(searchResultsArr)
            renderResults(searchResultsArr)
        })
}

function renderResults(array) {
    searchResultsEl.innerHTML = ''
    array.forEach(movie => {
        searchResultsEl.innerHTML += `
            <p>${movie.Title}</p>
        `
        
    });
    

}