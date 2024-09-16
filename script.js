const apikey = "720d6c3ebca381a97da6414d14d08bb3";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector("#searchButton");
const weatherIcon = document.querySelector(".weather-icon"); // Correct variable name

async function checkWeather(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apikey}`);
    if (!response.ok) {
      throw new Error("Weather data not found");
    }
    const data = await response.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    }
  } catch (error) {
    console.error(error);
    alert("city name incorrect");
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value;
  if (city) {
    checkWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});
