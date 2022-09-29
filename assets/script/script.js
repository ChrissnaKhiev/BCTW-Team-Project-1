var wlist;
var homeSearchBtn = document.getElementById('homeSearchBtn');
var title = '';


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

function init() {
    fetch('./assets/data.json')
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
    fetch('./assets/sample.json')
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}

function generateSearch() {
    var homeSearch = document.getElementById('homeInput').value;
    title = homeSearch;
    console.log(title);
    init();
}

homeSearchBtn.addEventListener('click', generateSearch());
init();

