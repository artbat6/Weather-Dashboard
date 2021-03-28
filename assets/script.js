var cityEl;
var apiKey = "1fe79bd8dd8a82d706b58fa3e01f2279";

function getCity() {
  cityEl = document.getElementById("location").value;
  console.log(cityEl);
  getTodayWeatherData();
}

//--------------------------------------------------------------------------

function getTodayWeatherData() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityEl +
      "&units=imperial&appid=" +
      apiKey
  )
    //convert response to JSON
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data.main.temp);
      // console.log(data);
      //use query selector to get ID of where the temp data will be displayed
      var h1tempEl = document.querySelector("#h1temp");
      h1tempEl.innerText = data.main.temp + "º";
      console.log(data);
      var iconCodeToday = data.weather[0].icon;
      var imgElToday = document.querySelector("#iconToday");
      imgElToday.src =
        "http://openweathermap.org/img/w/" + iconCodeToday + ".png";
      populateCityName(data);

      var humidityTodayEl = document.getElementById("humidityToday");

      humidityTodayEl.textContent = "Humidity: " + data.main.humidity + "%";

      var lat = data.coord.lat;
      var lon = data.coord.lon;
      console.log(lat);
      console.log(lon);

      return fetch(
        "http://api.openweathermap.org/data/2.5/uvi?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=" +
          apiKey
      );
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log("The UV index is:" + response.value);
      //
      var todayUvEl = document.getElementById("uvIndexToday");
      todayUvEl.textContent = "UV index: " + response.value;

      if (response.value <= 2) {
        $("span").attr("class", "btn btn-success disabled");
      }
      if (response.value > 2 && response.value <= 5) {
        $("span").attr("class", "btn btn-warning disabled");
      }
      if (response.value > 5) {
        $("span").attr("class", "btn btn-danger disabled");
      }
    });
  getFiveDayWeather();

  //----------------------------------------------------------------------------

  function getFiveDayWeather() {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        cityEl +
        "&units=imperial&appid=" +
        apiKey
    ) //convert response to JSON
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        var indicesForDaysINeed = [0, 8, 16, 24, 32];
        for (var i = 0; i < 5; i++) {
          var dayIndex = indicesForDaysINeed[i];
          // console.log("DAY " + i);
          // get the date starting with tomorrow [1]
          var futureDateEl = formatDate(response.list[dayIndex].dt_txt);
          // get temperature for the day
          var futureTemp = response.list[dayIndex].main.temp;
          console.log(response);
          var futureHumidity = response.list[dayIndex].main.humidity;
          var futureWind = response.list[dayIndex].wind.speed;
          console.log(futureDateEl);
          console.log(futureTemp);
          console.log(response);
          var humidityLabel = document.querySelector("#humidity" + i);
          humidityLabel.innerText = "Humidity: " + futureHumidity;
          console.log("Humidity: " + futureHumidity);

          var dateLabel = document.querySelector("#date" + i);
          dateLabel.innerText = futureDateEl;

          var tempLabel = document.querySelector("#temp" + i);
          tempLabel.innerText = futureTemp + "º";

          var windFiveEl = document.querySelector("#wind" + i)
          windFiveEl.textContent = "Wind:" + futureWind + "mph";

          var iconCode = response.list[dayIndex].weather[0].icon;
          var imgEl = document.querySelector("#icon" + i);
          imgEl.src = "http://openweathermap.org/img/w/" + iconCode + ".png";
          // console.log(iconCode)
        }
      });
  }
}

function formatDate(futureDateEl) {
  // console.log(dateString);
  var formattedDate = "";
  // split on empty space
  var chop1 = futureDateEl.split(" ");
  // console.log(chop1);
  chop2 = chop1[0].split("-");
  formattedDate = chop2[1] + "/" + chop2[2];
  return formattedDate;
  console.log(formattedDate); // return formattedDate;
}

function populateCityName(data) {
  var cityHeadingEl = document.getElementById("currentCity");
  cityHeadingEl.innerText = data.name;
}
