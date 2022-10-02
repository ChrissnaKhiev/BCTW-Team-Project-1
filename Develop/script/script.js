console.log('script.js');
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

// The wListDisplayID from our HTML, all of that data stored above on the webpage itself we will populate to the page
var wListDisplay = document.getElementById('watchListDisplay');
// Our Watch List button(s)
var addToWatchList = document.querySelector("#addToWatchList");
var homeBtn = document.getElementsByClassName('logo');
var listLocation = document.getElementById('listLocation');
var navWatchList = document.getElementById("navWatchList");
var searchItem = '';
var movieBtn = document.getElementById('movieBtn');

// Fetch call gets our json from our API


    // Adds the data we need from the json that we'll later save and then add to page
function goMovie(data) {
    
    movieIMDB = data;
    console.log(movieIMDB);
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bcb27094bbmsh7b7553a9592aa3fp1aab16jsnab95279e6f03',
            'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
        }
    };
    //GETS THE DATA FOR MOVIES.HTML<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    fetch(`https://movie-database-alternative.p.rapidapi.com/?r=json&i=${movieIMDB}`, options)
        .then(response => response.json())
        .then(function (data) {
            try{
                getPoster(data);
                getPlot(data);
                getTitle(data);
                getRating(data);
                getGenre(data);
                getDate(data);
                getRate(data);
            }catch(error){
                console.log('wrong page' + error);
            }
    }).catch(error => console.log(error));
    var watchKey = 'Bo7G38cBwFygy0ksBIGcQOv4HaIc9OSz0xc7DBU2';
    fetch(`https://api.watchmode.com/v1/title/${movieIMDB}/sources/?apiKey=${watchKey}`)
        .then(response => response.json())
        .then(function (data) {
            try{
                console.log(data);
                getLocations(data);
            }catch(error){
                console.log('wrong page again bozo' + error);
            }
        }).catch(error => console.log(error));
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

function getLocations(data) {
    console.log(data);
    const set = new Set(); //checks array for dupes
    listLocation.innerHTML = data.map((newData) => {
        if(!set.has(newData.name)) {
            set.add(newData.name);
            return `<li>${newData.name}</li>`; //if the index is new data type return if not pass
        }
    }).join('');
}

function addMovie() {
    const watchList = localStorage.getItem('myWatchList');
    if(watchList == null) {
        var watchListJson = {
            movies: [
                {
                    movie : {
                        title: titleData.textContent,
                        poster: posterData.firstChild.src
                    }
                }
            ]
        }
        localStorage.setItem("myWatchList", JSON.stringify(watchListJson));
    } else {
        const parsed = JSON.parse(watchList);
        const movieJson = {
            movie : {
                title: titleData.textContent,
                poster: posterData.firstChild.src
            }
        }

        parsed.movies.push(movieJson)
        localStorage.setItem("myWatchList", JSON.stringify(parsed));
    }
}
// checks to see if the wishlist is on the page
if (wListPage) {
    addToWatchList.addEventListener("click", addMovie);
}

if(watchListPage) { //DO NOT CHANGE
    var watchList = JSON.parse(localStorage.getItem("myWatchList"));
    var watchListContainer = document.getElementById("watchListDisplay");
    watchList.movies.forEach((movie, index) => {
        console.log(movie.movie)
        const divContainer = document.createElement("div");
        divContainer.setAttribute("class", "col")
        const imgNode = document.createElement("img");
        imgNode.setAttribute("src", `${movie.movie.poster}`);
        const pNode = document.createElement("p");
        pNode.innerHTML = `${movie.movie.title}`
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = 'Remove';

    
        divContainer.appendChild(imgNode);
        divContainer.appendChild(pNode);
        divContainer.appendChild(removeBtn);
        
        removeBtn.addEventListener('click', e => {
            watchList.movies.splice(index, 1); //on current index removes 1 aka this the desired movie
            localStorage.setItem("myWatchList", JSON.stringify(watchList)); //updates the localstorage
            window.location.reload(); //reloads watchlist page to repopulate with new list
        })
        watchListContainer.appendChild(divContainer);
    })
}

// RETURN TO INDEX
// listens for user's click on the "logo"
homeBtn[0].addEventListener("click", homeBound);
// this function sends the user back to index when the logo is clicked
function homeBound() {
    window.location.replace("./index.html");
}

// grabs the user's search and sends them to the results page
async function grabSearch() {
    searchItem = searchBar.value;
    const options3 = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bcb27094bbmsh7b7553a9592aa3fp1aab16jsnab95279e6f03',
            'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
        }
    };
    //SEARCH RESULTS<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    await fetch(`https://movie-database-alternative.p.rapidapi.com/?s=${searchItem}&r=json&page=1`, options3)
        .then(response => response.json())
        .then(function (data) {
            console.log(data);
            localStorage.setItem('search', JSON.stringify(data)); //save to access on page change below
            window.location.assign("./results.html");
})
}
function checkData() { //on load checks if there is data and if there is go to the next function
    console.log('checkData');
    var data = localStorage.getItem('search');
    var parsed = JSON.parse(data);
    console.log('here is the data' + parsed);
    if (parsed !== null) {
        goResults(parsed);
    }
}
function checkData2() { //on load checks if there is data and if there is go to the next function
    console.log('checkData');
    var data = localStorage.getItem('movieId');
    var parsed = JSON.parse(data);
    console.log('here is the data' + parsed);
    if (parsed !== null) {
        goMovie(parsed);
    }
}
// function checkData3() { //on load checks if there is data and if there is go to the next function
//     console.log('checkData');
//     var data = localStorage.getItem('myWatchList');
//     var parsed = JSON.parse(data);
//     console.log('here is the data' + parsed);
//     if (parsed !== null) {
//         goWatchList(parsed);
//     }
// }
function goResults(data) { // this try catch will run the function even if there is an error
    try{
    getResults(data);
    }catch(error){
        console.log('wrong page' + error)
    }
}

function getResults(data) {
    // The resultsData ID from our HTML, all of that data stored above on the webpage itself we will populate to the page
    var resultsData = document.getElementById('movieResults');
    console.log(resultsData);
    data.Search.slice(0, 13).forEach((Search) => {
        const divContainer = document.createElement("div");
        divContainer.setAttribute("class", "col")
        const imgNode = document.createElement("img");
        imgNode.setAttribute("id", "movieBtn");
        imgNode.setAttribute("src", `${Search.Poster}`);
        const pNode = document.createElement("p");
        pNode.innerHTML = `${Search.Title}`
    
        divContainer.appendChild(imgNode);
        divContainer.appendChild(pNode);
    
        divContainer.addEventListener("click", e => setMovieId(`${Search.imdbID}`));
    
        resultsData.appendChild(divContainer);
    });
    localStorage.setItem('search', 'null');
}

function setMovieId(data) {
    localStorage.setItem('movieId', JSON.stringify(data));
    window.location.assign('./movie.html');
}
checkData();
checkData2();
// checkData3();
searchBtn.addEventListener('click', grabSearch);
