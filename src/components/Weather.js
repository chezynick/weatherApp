import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faCloudSun,
  faCloudRain,
  faSun,
  faSnowflake,
} from "@fortawesome/free-solid-svg-icons";

const Weather = ({ currentCity }) => {
  //weather states
  const [currentWeather, setCurrentWeather] = useState("");
  const [currentTemp, setCurrentTemp] = useState([]);
  const [currentWind, setCurrentWind] = useState([]);
  const [weatherImage, setWeatherImage] = useState(faCloudSun);

  //function to get current weather and to update state of weather
  const cityWeather = async (city) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=` +
          city +
          `,uk&units=metric&APPID=0e0753a2f64fab8fff2bdf392b098f58`
      );
      const weather = await response.json();
      setCurrentWeather(weather.weather[0].description);
      setCurrentTemp(weather.main.temp.toFixed(0));
      setCurrentWind(weather.wind.speed.toFixed(0));
      //change the weather icon depending on weather
      if (currentWeather === "Overcast" || "Cloudy") {
        setWeatherImage(faCloud);
      }
      if (currentWeather === "scattered clouds") {
        setWeatherImage(faCloudSun);
      }
      console.log(weather);
    } catch (err) {
      console.log(err, "not worked this");
    }
  };
  //call api get function
  // cityWeather(currentCity[0].name);

  return (
    <div className={"Weather"}>
      <h1 className="cityName">{currentCity[0].name}</h1>
      <h1 className="weatherType">{currentWeather}</h1>
      <FontAwesomeIcon
        className="weatherImage"
        size="10x"
        icon={weatherImage}
      />
      <h1 className="temp">{currentTemp}c</h1>
      <h1 className="wind">{currentWind}mph</h1>
    </div>
  );
};
export default Weather;
