//----------------------- Selectors -----------------------//

const cityName = document.querySelector(".city");
const cityTemperature = document.querySelector(".temperature");
const temperatureImage = document.querySelector(".image");
const cityDescription = document.querySelector(".description");
const cityPressure = document.querySelector(".pressure");
const cityHumidity = document.querySelector(".humidity");
const cityWind = document.querySelector(".wind");
const citySearch = document.querySelector(".search-bar");
const searchButton = document.querySelector(".search-button");
const weatherContent = document.querySelector(".loading");
const displayError = document.querySelector(".error");
const card = document.querySelector(".card");

//------------------- Add Event Listeners -----------------//

searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    fetchWeather();
    citySearch.value = "";
})

citySearch.addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.key === "Enter") {
        fetchWeather();
        citySearch.value = "";
    }
})
 
//--------------------- Functions -------------------------//

let fetchWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&units=metric&appid=f9624de2e80491f88dc765d497200c4c`)
    .then(response => {
        if (response.status >= 200 && response.status <= 299) {
            displayError.innerHTML = "";
            weatherContent.style.display = "block";
            return response.json();
          } else {
            throw new Error("Something went wrong");
          }
    })
    .then(data => manipulateData(data))
    .catch(function(error) {
        weatherContent.style.display = "none";
        displayError.innerHTML = error ;
    });
}

let manipulateData = (data) => {
    weatherContent.classList.add(".loading");
    cityName.innerHTML = `Weather in ${data.name}`;
    cityTemperature.innerHTML = `${Math.trunc(data.main.temp)}°C`;
    temperatureImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    cityDescription.innerHTML = data.weather[0].description;
    cityPressure.innerHTML = `Pressure: ${data.main.pressure} hPa`;
    cityHumidity.innerHTML = `Humidity: ${data.main.humidity}%`;
    cityWind.innerHTML = `Wind speed: ${Math.trunc(data.wind.speed)} km/h`;
    document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${data.name})`;
    card.style.backgroundImage = `url(${gifs[data.weather[0].main]})`;
}

const gifs = {
    "Thunderstorm": "./gifs/thunderstorm.gif",
    "Drizzle": "./gifs/drizzle.gif",
    "Rain": "./gifs/rain.gif",
    "Snow": "./gifs/snow.gif",
    "Clear": "./gifs/clear.gif",
    "Clouds": "./gifs/clouds.gif",
    "Fog": "./gifs/fog.gif",
    "Mist": "./gifs/fog.gif",
    "Smoke": "./gifs/fog.gif",
    "Haze": "./gifs/fog.gif",
    "Dust": "./gifs/dust.gif",
    "Sand": "./gifs/dust.gif",
    "Ash": "./gifs/dust.gif",
    "Squall": "./gifs/tornado.gif",
    "Tornado": "./gifs/tornado.gif",
}