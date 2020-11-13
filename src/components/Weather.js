import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faCloudSun,
  faCloudRain,
  faSun,
  faSnowflake,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";

const Weather = ({ currentCity }) => {
  //weather states
  const [currentWeather, setCurrentWeather] = useState("");
  const [currentTemp, setCurrentTemp] = useState([]);
  const [currentWind, setCurrentWind] = useState([]);
  const [weatherImage, setWeatherImage] = useState(faSnowflake);

  //function to get current weather and to update state of weather
  const cityWeather = async (city) => {
    console.log(city);
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=` +
          city +
          `&units=metric&APPID=84634c62ad44fa7c5c527c3f90102a59`
      );
      const weather = await response.json()
      setCurrentWeather(weather.weather[0].description);
        if (currentWeather === "Overcast" || "Cloudy") {
        setWeatherImage(faCloud);
      }
      if (currentWeather === "scattered clouds" || "few clouds") {
        setWeatherImage(faCloudSun);
      }
      if (currentWeather === "clear sky" || "clear") {
        setWeatherImage(faSun);
      } else {
        setWeatherImage(faCloud);
      }
     
      setCurrentTemp(weather.main.temp.toFixed(0));
      setCurrentWind(weather.wind.speed.toFixed(0));
      //change the weather icon depending on weather
      
      
      console.log(weather);
      console.log(currentWeather)
    } catch (err) {
      console.log(err, "not worked this");
    }
  };
  //call api get function
  useEffect(() => cityWeather(currentCity[0].name), [currentCity]);

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
