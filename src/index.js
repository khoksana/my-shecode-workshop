//The current date and time using JavaScript: Tuesday 16:00
function currentTime() {
  let now = new Date();
  let hours = now.getHours().toString().padStart(2, "0");
  let minutes = now.getMinutes().toString().padStart(2, "0");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  let dayAndTime = `${day} ${hours}:${minutes}`;
  return dayAndTime;
}

let time = document.querySelector("#current-day-time");
time.innerHTML = `${currentTime()}`;

//Add a search engine, when searching for a city (i.e. Paris),
// display the city name on the page after the user submits the form.
function getWeatherByCity(response) {
  let temperature = document.querySelector("#current-temperature");
  let description = document.querySelector("#description");
  let precipitation = document.querySelector("#precipitation");
  let windSpeed = document.querySelector("#wind-speed");

  let temperatureRound = Math.round(response.data.main.temp);
  let descriptionValue = response.data.weather[0].description;
  let precipitationValue = response.data.main.humidity;
  let windSpeedValue = response.data.wind.speed;

  temperature.innerHTML = `${temperatureRound}`;
  description.innerHTML = `${descriptionValue}`;
  precipitation.innerHTML = `${precipitationValue} %`;
  windSpeed.innerHTML = `${windSpeedValue} km/h`;
}

function getCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input");
  let cityName = document.querySelector("#city-header");
  let apiKey = "2a2eaa51d996796495bf456e5b58adf4";
  let unit = "metric";
  let weatherUrlMetric = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${unit}&appid=${apiKey}`;
  console.log(weatherUrlMetric);
  cityName.innerHTML = `${cityInput.value}`;

  axios.get(weatherUrlMetric).then(getWeatherByCity);
}

let enterButton = document.querySelector("#search-form");
enterButton.addEventListener("submit", getCity);

//Bonus point:
//Add a Current Location button.
//When clicking on it, it uses the Geolocation API to get your GPS coordinates
// and display and the city and current temperature using the OpenWeather API.
function handlePosition(position) {
  let apiKey = "2a2eaa51d996796495bf456e5b58adf4";
  let unit = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);

  let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  console.log(currentWeatherUrl);

  axios.get(currentWeatherUrl).then(getWeatherByCity);
}

function refreshPage() {
  location.reload();
}

navigator.geolocation.getCurrentPosition(handlePosition);
let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", refreshPage);
