

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
// $.ajax(currentWeather).done(function (response) {
//     console.log(response);
//     $("#currentTemp").text("Current: " + response.main.temp);
// });

// call for tomorrow's forecast
// $.ajax(forecast).done(function (response) {
//     console.log(response);
//     $("body").append(
//         "<div>" + response.list[1].dt_txt + "</div>" +
//         "<div>High: " + response.list[1].main.temp_max + "</div>" +
//         "<div>Low: " + response.list[1].main.temp_min + "</div>")
// });

