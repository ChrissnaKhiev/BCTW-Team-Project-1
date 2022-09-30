var wlist;
var homeSearchBtn = document.getElementById('searchBtn');
var posterData = document.getElementById('poster');
var titleData = document.getElementById('title');
var plotData = document.getElementById('plot');
var genreData = document.getElementById('genre');
var releasedDate = document.getElementById('released');
var rated = document.getElementById('rated');
var rating = document.getElementById('rating');
var resultsData = document.getElementById('movieResults');
var addToWatchList = document.querySelector("#addToWatchList");



var listLocation = document.getElementById('listLocation');




// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '1ca455037bmshf2d2d8bbbabf617p1190ecjsn3dd42c18b7d6',
//         'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
//     }
// };
// const options1 = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '1ca455037bmshf2d2d8bbbabf617p1190ecjsn3dd42c18b7d6',
//         'X-RapidAPI-Host': 'watchmode.p.rapidapi.com'
//     }
// };
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '1ca455037bmshf2d2d8bbbabf617p1190ecjsn3dd42c18b7d6',
// 		'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
// 	}
// };

fetch('./assets/dataS.json')
	.then(response => response.json())
	.then(function (data) {
        getResults(data);
    })
	// .catch(err => console.error(err));
function init() {
    fetch('./assets/data.json')
	.then(response => response.json())
	.then(function (data) {
        console.log(data);
        getPoster(data);
        getPlot(data);
        getTitle(data);
        getRating(data);
        getGenre(data);
        getDate(data);
        getRate(data);
    })
	// .catch(err => console.error(err));
    fetch('./assets/sample.json')
    .then(response => response.json())
    .then(function (data) {
        getLocations(data);
    })
    // .catch(err => console.error(err));
}

function getPoster(data) {
    posterData.innerHTML = `<img src="${data.Poster}">`;
}
function getPlot(data) {
    console.log(data);
    plotData.textContent = data.Plot;
}
function getTitle(data) {
    titleData.textContent = data.Title;
}
function getGenre(data) {
    genreData.textContent = data.Genre;
}
function getDate(data) {
    releasedDate.textContent = data.Released;
}
function getRating(data) {
    rating.textContent = 'IMDB ' + data.Ratings[0].Value;
}
function getRate(data) {
    rated.textContent = data.Rated;
}
function getResults(data) {
    resultsData.innerHTML = data.Search.map((Search, index) => {
        if (index < 13)
            return `<div class="col"><img src="${Search.Poster}"/><p>${Search.Title}</p></div>`;
    }).join('');
}
function getLocations(data) {
    console.log(data);
    listLocation.innerHTML = data.map((newData) => {
        console.log(newData.name)
        return `<li>${newData.name}</li>`;
    }).join('');
}

function addMovie() {
    console.log("movie title", titleData.textContent);
    console.log("movie poster", posterData.innerHTML);
    localStorage.setItem('movieTitle', titleData.textContent);
    localStorage.setItem('moviePoster', posterData.innerHTML);
    Hi Chriss
}

addToWatchList.addEventListener("click", addMovie);

init();

// RETURN TO INDEX
var homeBtn = document.getElementsByClassName('logo');
homeBtn[0].addEventListener("click", homeBound);
function homeBound(){
window.location.replace("./index.html");}
// 

function myClick() {
    window.location.replace("./results.html");
}
homeSearchBtn.addEventListener('click', myClick);