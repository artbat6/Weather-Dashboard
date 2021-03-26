//in html create inputs for city (+ state)
//inject variable into api fetch
//have results populate the blank html container(s)
var cityEl;
var apiKey = "1fe79bd8dd8a82d706b58fa3e01f2279";

function getCity() {
  cityEl = document.getElementById("location").value;
  console.log(cityEl);
  getTodayWeatherData();
}

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
      console.log(data.main.temp);
      //use query selector to get ID of where the temp data will be displayed
      var h1tempEl = document.querySelector("#h1temp");
      h1tempEl.innerText = data.main.temp + "º";
      populateCityName(data);

      return fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
          cityEl +
          "&units=imperial&appid=" +
          apiKey
      ) //convert response to JSON
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          var indicesForDaysINeed = [4, 12, 20, 28, 36];
          for (var i = 0; i < 5; i++) {
            var dayIndex = indicesForDaysINeed[i];
            console.log("DAY " + i);
            // get the date starting with tomorrow [1]
            var futureDateEl = response.list[dayIndex].dt_txt;
            // get temperature for the day
            var futureTemp = response.list[dayIndex].main.temp;
            console.log(futureDateEl);
            console.log(futureTemp);
            
            var iconCode = response.list[0].weather.O.icon;
            var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
            
            console.log iconCode;
            // var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            // console.log(response.list[0].main.temp);
            // console.log(response.list[0].dt_txt);
            //var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
            console.log(response);

            // I have futureDateEl, futureTemp and iconURL for day0, day1, day2, day3, day4.
            // document.getElementById('date'+i) and set it to futureDateEl
            // document.getElementById('temp'+i) and set it to futureTemp
            // same with the icon

            //use query selector to get ID of where the temp data will be displayed
          }
        });
    });

  function populateCityName(data) {
    var cityHeadingEl = document.getElementById("currentCity");
    cityHeadingEl.innerText = data.name;
  }

  // function populateFiveDay() {
}
