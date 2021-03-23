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
      // create <h1> element
      var tempEl = document.createElement("h1");
      //set the element's source to the returned data from weather API
      tempEl.setAttribute("text", data.main.temp);
      console.log(tempEl);
      console.log(tempEl.getAttribute("text"));
      //Append the <h1> element with the data
      //h1tempEl.appendChild(tempEl.innerText);
      h1tempEl.innerText = tempEl.getAttribute("text");
    });
}
getWeatherData();
