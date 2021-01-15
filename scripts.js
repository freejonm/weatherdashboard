

var currentWeather = {
	"async": true,
	"crossDomain": true,
	"url": "https://community-open-weather-map.p.rapidapi.com/weather?q=London&units=imperial",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "dc28ad23b6msh135d38017d65631p1522a3jsndcf4ea383ce3",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
	}
};

var forecast = {
    "async": true,
    "crossDomain": true,
    "url": "https://community-open-weather-map.p.rapidapi.com/forecast?q=london&units=imperial",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "dc28ad23b6msh135d38017d65631p1522a3jsndcf4ea383ce3",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
	}
}



// call for current weather
$.ajax(currentWeather).done(function (response) {
    console.log(response);
    $("#currentTemp").text("Current: " + response.main.temp);
});

// call for tomorrow's forecast
// $.ajax(forecast).then(function (response) {
// 	console.log(response);
	
// 	console.log(response.list[1].dt_txt);

// 	$("#forcast-date").text(response.list[1].dt_txt);
	
	// $("#2day+1Forecast").text("High: " + response.list[1].main.temp_max + "Low: " + response.list[1].main.temp_min)
// });

