var forecast = $("#forecastBtn");
var history_list = $("");
var city;


// personal api key 
var apiKey = "ff3dbe6a37f97b172f9338b03931d6bf";


//this is where we get all the data we want
function current(lat,lon) {
	var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;
	//fetching response from the api data 
	fetch(requestUrl)
	//We then convert the response into JSON and return the response
	.then(function (response) {
		return response.json();
	})
	.then(function(data) {

		console.log(data.daily);
		var cur = data.current;  
		var cur_name = city;
		var cur_uvi = cur.uvi; // current day uvi 
		var cur_temp = cur.temp; // current day temp
		var cur_wind = cur.wind_speed; // current day wind speed
		var cur_humidity = cur.humidity; // current day humidity
		var cur_icon = cur.weather[0].icon; // current day icon value
		var iconKey = "https://openweathermap.org/img/w/" + cur_icon + ".png";

		$('#city_name').text(cur_name);
		$('#temperature_num').text(cur_temp + '°F');
		$('#wind_num').text(cur_wind + ' mph');
		$('#uvi_num').text(cur_uvi);
		$('#humidity_num').text(cur_humidity + '%');
		$('#wicon').attr('src', iconKey);

	});
	createList(lat, lon);
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
		current(lat,lon);
	});
}


//creates a list of buttons that correspond to the user's click
function createList(lat, lon) {
	var city_ns = city.replace(/ /g,'');
	$('#history').append(
		'<button type="button" class="list-group-item list-group-item-action histoyBtn" id="'+ city_ns +'">' + city +'</button>')
	$(document).on('click', "#" + city_ns, load);
	localStorage.setItem(city, '['+ lat + ',' + lon + ']' );

};


//loads the old data from local storage
function load() {
	city = this.id
	var coordinates = JSON.parse(localStorage.getItem(this.id));
	current(coordinates[0], coordinates[1]);
}

forecast.click(findCoord);
