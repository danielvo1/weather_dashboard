var forecast = $("#forecastBtn");
var history_list = $("");
var city;

// personal api key 
var apiKey = "ff3dbe6a37f97b172f9338b03931d6bf";



//this is where we get all the data we want
function foreCast(lat,lon) {
	var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
	//fetching response from the api data 
	fetch(requestUrl)
	//We then convert the response into JSON and return the response
	.then(function (response) {
		return response.json();
	})
	.then(function(data) {
		var cur = data.current;  
		var cur_name = city;
		var cur_uvi = cur.uvi; // current day uvi 
		var cur_temp = cur.temp; // current day temp
		var cur_wind = cur.wind_speed; // current day wind speed
		var cur_humidity = cur.humidity; // current day humidity
		var cur_icon = cur.weather[0].icon; // current day icon value

		console.log(cur_uvi);
		console.log(cur_temp);
		console.log(cur_wind);
		console.log(cur_humidity);
		console.log(cur_icon)
	});
	createList();
}

// converts the city name to lat and lon in 
// order to extract all the data we are looking for
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
		city = data.name; //returns the name with proper name
		lat = data.coord.lat;
		lon = data.coord.lon;
		foreCast(lat,lon);
	});
}

//creates a list of buttons that correspond to the user's click
function createList() {
	$('#history').append(
		'<button type="button" class="list-group-item list-group-item-action histoyBtn">' + city +'</button>')
	console.log(city)
};


forecast.click(findCoord);
