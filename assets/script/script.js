

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1ca455037bmshf2d2d8bbbabf617p1190ecjsn3dd42c18b7d6',
		'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
	}
};
const options1 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '1ca455037bmshf2d2d8bbbabf617p1190ecjsn3dd42c18b7d6',
        'X-RapidAPI-Host': 'watchmode.p.rapidapi.com'
    }
};

fetch('https://movie-database-alternative.p.rapidapi.com/?s=Avengers%20Endgame&r=json&page=1', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
fetch('https://watchmode.p.rapidapi.com/title/3173903/details/', options1)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));