

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://community-open-weather-map.p.rapidapi.com/weather?q=London&units=imperial",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "dc28ad23b6msh135d38017d65631p1522a3jsndcf4ea383ce3",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
    console.log(response);
    $("body").append("<div>" + response.main.temp + "</div>");
});

