var forecast = $("#forecastBtn");
var history_list = $("");
var city;


// personal api key 
var apiKey = "ff3dbe6a37f97b172f9338b03931d6bf";

//date today 
today = new Date().toLocaleDateString();
console.log(today);
$("#date").text(today);

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

		if (cur_uvi < 2) {
			$('#uvi_num').css({'background-color':'green'});
		} else if (cur_uvi > 2 && cur_uvi < 7) {
			$('#uvi_num').css({'background-color':'yellow'});
		} else { 
			$('#uvi_num').css({'background-color':'red'});
		}

		foreCast(data.daily);

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
	console.log(city_ns);
	console.log($("#Oakland").attr("id"));

	if (!$("#" + city_ns).attr('id')) {
		$('#history').append(
			'<button type="button" class="list-group-item list-group-item-action histoyBtn" id="'+ city_ns + '">' + city +'</button>');
			localStorage.setItem(city_ns, '['+ lat + ',' + lon + ']' );
			$(document).on('click', "#"+city_ns, load);
		
	} else {
		return;
	}
	

};


//loads the old data from local storage
function load() {
	console.log(this.id);
	city = this.id;
	console.log('city', city);
	var coordinates = JSON.parse(localStorage.getItem(this.id));
	console.log(coordinates);
	current(coordinates[0], coordinates[1]);
}

//loads in the daily forecast data into the cards 
function foreCast(data) {
	for (let i = 0; i < 5; i++) {
		var icon = data[i].weather[0].icon;
		var iconSrc = "https://openweathermap.org/img/w/" + icon + ".png";
		var temp = $('#temp' + i);
		var hum = $('#hum' + i);
		var hum_num = data[i].humidity;
		var temp_num = data[i].temp.day;

		$('#wicon' + i).attr('src', iconSrc);
		temp.text(temp_num + '°F');
		hum.text(hum_num + '%');

		var result = new Date();
		console.log(i);
		result.setDate(result.getDate() + (i+ 1));
		console.log(result);
		$('#date' + i).text(result.toLocaleDateString());

		
	}
	
}

forecast.click(findCoord);
