//in html create inputs for city + state
//inject variable into api fetch
//have results populate the blank html container(s)
var city 
var stateCode

var apiKey = "1fe79bd8dd8a82d706b58fa3e01f2279";
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}



function getWeatherData() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      "fargo" +
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
    });
}
getWeatherData();

