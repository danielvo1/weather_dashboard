var forecast = $("#forecastBtn");
var history_list = $("");
var city;

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
	createList();
}

function findCoord() {
	//reassigns the input value to city variable
	city = $('#cityInput').val();

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
		console.log(data.name);
		city = data.name;
		lat = data.coord.lat;
		lon = data.coord.lon;
		foreCast(lat,lon);
	});
}

function createList() {
	$('#history').append(
		'<button type="button" class="list-group-item list-group-item-action histoyBtn">' + city +'</button>')
	console.log(city)
}


forecast.click(findCoord);

