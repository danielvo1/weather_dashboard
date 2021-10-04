var forecast = $("#forecastBtn");

// personal api key 
var apiKey = "ff3dbe6a37f97b172f9338b03931d6bf";


function foreCast(lat,lon) {
	var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
	//fetching response from the api data 
	fetch(requestUrl)
	//We then convert the response into JSON and return the response
	.then(function (response) {
		return response.json();
	})
	.then(function(data) {
		console.log("data", data);
	});
}

function findCoord() {
	//reassigns the input value to city variable
	var city = $('#cityInput').val();

	//api url 
	var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +'&appid=' + apiKey;

//fetching response from the api data 
	fetch(requestUrl)
	//We then convert the response into JSON and return the response
	.then(function (response) {
		if (response.status >= 200 && response.status <= 299) {
				return response.json();
		} else {
			alert('Please try again.');
			throw Error(response.statusText);
		}
	})
	.then(function(data) {
		console.log(data);
		lat = data.coord.lat;
		lon = data.coord.lon;
		foreCast(lat,lon);
	});
}


forecast.click(findCoord);

