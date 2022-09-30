// The searchBtn ID from our HTML
var searchBtn = document.getElementById('searchBtn');
// The searchBar ID from our HTML
var searchBar = document.getElementById('searchBar');
// The posterData ID, used to tell our HTML where to put this data 
var posterData = document.getElementById('poster');
// The titleData ID, used to tell our HTML where to put this data  (the movie poster)
var titleData = document.getElementById('title');
// The plotData ID, used to tell our HTML where to put this data  (the name of the title)
var plotData = document.getElementById('plot');
// The GenreData ID, used to tell our HTML where to put this data  (the name of the genre)
var genreData = document.getElementById('genre');
// The releaseDate ID, used to tell our HTML where to put this data  (the release date)
var releasedDate = document.getElementById('released');
// The rated ID, used to tell our HTML where to put this data  (the rating R, PG-13, G, etc)
var rated = document.getElementById('rated');
// The rating ID, used to tell our HTML where to put this data  (the rating out of 10)
var rating = document.getElementById('rating');
// The resultsData ID from our HTML, all of that data stored above on the webpage itself we will populate to the page
var resultsData = document.getElementById('movieResults');
// The wListDisplayID from our HTML, all of that data stored above on the webpage itself we will populate to the page
var wListDisplay = document.getElementById('watchListDisplay');
// Our Watch List button(s)
var addToWatchList = document.querySelector("#addToWatchList");
var listLocation = document.getElementById('listLocation');
var watchList = [];




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

// Fetch call gets our json from our API
fetch('./assets/dataS.json')
    .then(response => response.json())
    .then(function (data) {
        getResults(data);
    })

	// .catch(err => console.error(err));
    // Adds the data we need from the json that we'll later save and then add to page
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
// These functions actually propigate the page with all that data
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
    var addedMovie = 
        { title: titleData.textContent,
          poster: posterData.innerHTML,
        }
    console.log("watch", addedMovie);
    watchList.push(addedMovie);
    console.log(watchList);
    localStorage.setItem("myWatchList", JSON.stringify(watchList));
}


if (wListPage){
    addToWatchList.addEventListener("click", addMovie);
    }

init();

// RETURN TO INDEX
var homeBtn = document.getElementsByClassName('logo');
homeBtn[0].addEventListener("click", homeBound);
// this function sends the user back to index when the logo is clicked
function homeBound(){
window.location.replace("./index.html");}

// grabs the user's search and sends them to the results page
function grabSearch() {
    var resp = searchBar.value;
    console.log(resp);
    // window.location.replace("./results.html");
}
// 
searchBtn.addEventListener('click', grabSearch);
