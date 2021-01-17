var cityHistory = [];
var maxHistory = 10;
var weatherKey = "76b919f90d91bc2b20cd335b8fcbe3a8";
var uviColors = {
  low: "#289500",
  moderate: "#f7e400",
  high: "#f85900",
  veryHigh: "#d80010",
  extreme: "#6b49c8"
};

// city history //
function renderHistory() {
  $("#history-container").empty();
  // append div for each city in history //
  cityHistory.forEach(function (city) {
    $("#history-container").append("<div class='past-city'>" + city + "</div>");
  });
  // click event runs query //
  $(".past-city").click(cityFromHistory);
}

// city history from local storage //
function loadHistory() {
  var loadedHistory = JSON.parse(localStorage.getItem("past-cities"));

  if (loadedHistory) {
    cityHistory = loadedHistory;
    renderHistory();
  }

  // query most recent city/hide results if none //
  if (cityHistory[0]) {
    queryCity(cityHistory[0]);
  } else {
    $("#result-col").addClass("hidden");
  }
}

/// save city //
function saveCity(city) {
  // don't add if already in list //
  if (cityHistory.indexOf(city) === -1) {
    // city to front of list //
    cityHistory.unshift(city);
    // trim history  //
    cityHistory = cityHistory.slice(0, maxHistory);
    // save history to storage //
    localStorage.setItem("past-cities", JSON.stringify(cityHistory));
    renderHistory();
  }
}

// query weather from history //
function cityFromHistory() {
  var city = $(this).text();
  queryCity(city);
}

// query weather from input field and save city to history //
function cityFromInput(event) {
  event.preventDefault();
  var city = $("#city-input").val().trim();

  $("#city-input").val("");

  if (city !== "") {
    queryCity(city);
  }
}

// update and style UVI entry  //
function updateUVI(uvi) {
  var bgColor;
  var textColor = "white";

  $("#current-uvi").text(uvi);
  if (uvi < 3) {
    bgColor = uviColors.low;
  } else if (uvi < 6) {
    bgColor = uviColors.moderate;
    textColor = "black";
  } else if (uvi < 8) {
    bgColor = uviColors.high;
  } else if (uvi < 11) {
    bgColor = uviColors.veryHigh;
  } else {
    bgColor = uviColors.extreme;
  }
  $("#current-uvi").css("background-color", bgColor);
  $("#current-uvi").css("color", textColor);
}

// update the forecast for a particular day //
function updateForecast(day, data) {
  var div = $("#forecast-day-" + day);

  div.children(".fc-date").text(moment().add(day, "days").format("M/D/YYYY"));
  div.children(".fc-icon").attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
  div.find(".fc-temp").text(parseFloat(data.temp.day).toFixed(1));
  div.find(".fc-humid").text(data.humidity);
}

// query Open Weather to retrieve UVI and 5-day forecast //
function queryOneCall(lon, lat) {
  var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=" + weatherKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function (response) {
    updateUVI(parseFloat(response.current.uvi));
    for (var i = 0; i < 5; i++) {
      updateForecast(i + 1, response.daily[i]);
    }
    // display results //
    $("#result-col").removeClass("hidden");
  });
}

// query a city and update the current weatherv+vthe lat/lon for UVI and forecast //
function queryCity(city) {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + weatherKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function (response) {
    // hide results //
    $("#result-col").addClass("hidden");
    $("#current-date").text(moment().format("M/D/YYYY"));
    $("#current-city").text(response.name);
    $("#current-temp").text(parseFloat(response.main.temp).toFixed(1));
    $("#current-humid").text(response.main.humidity);
    $("#current-wind").text(response.wind.speed);
    $("#current-icon").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");

    // use lat/lon to query UVI and 5-day forecast //
    queryOneCall(response.coord.lon, response.coord.lat);

    saveCity(response.name);
  });
}

// add click response to search button //
$("#search-btn").click(cityFromInput);

loadHistory();


