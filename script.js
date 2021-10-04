var apiKey = "ff3dbe6a37f97b172f9338b03931d6bf";
var city = "Oakland";

var forecast = $("#forecastBtn")



function requestWeather() {
	//api url 
	var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey;

//fetching response from the api data 
	fetch(requestUrl)
	//We then convert the response into JSON and return the response
	.then(function (response) {
		console.log("response", response)
		return response.json();
	})
	.then(function(data) {
		console.log("data", data)
	});
}










forecast.click(requestWeather);


