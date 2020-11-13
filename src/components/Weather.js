import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faCloudSun,
  
  faSun,
  faSnowflake,
  faCloudRain,
  
} from "@fortawesome/free-solid-svg-icons";

const Weather = ({ currentCity }) => {
  //weather states
  const [currentWeather, setCurrentWeather] = useState("");
  const [currentTemp, setCurrentTemp] = useState([]);
  const [currentWind, setCurrentWind] = useState([]);
  const [weatherImage, setWeatherImage] = useState(faSnowflake);
  const [colorBkgrnd, setcolorBkgrnd] = useState("Weather");
  const [clouds,setClouds] = useState(50);
  const [cloudier, setCloudier] = useState('cloud2')
  

  //function to get current weather and to update state of weather
  const cityWeather = async (city) => {
    
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=` +
          city +
          `&units=metric&APPID=84634c62ad44fa7c5c527c3f90102a59`
      );
      const weather = await response.json();
      setCurrentWeather(weather.weather[0].description);
      setCurrentTemp(weather.main.temp.toFixed(0));
      setCurrentWind(weather.wind.speed.toFixed(0));
      setClouds (weather.clouds.all)
    } catch (err) {
      console.log(err, "not worked this");
    }
  };
  //call api get function after changes made to state
  useEffect(() => cityWeather(currentCity[0].name), [currentCity])
    useEffect(() => colorist(), [currentTemp])
    useEffect(() => images(), [clouds])

  const images = () => {
    //change the weather icon depending on weather
    
    if (clouds > 70) {
      setWeatherImage(faCloud);
      setCloudier('cloudVisible')
    }
   else if (clouds > 30 && clouds <70) {
      setWeatherImage(faCloudSun)
      setCloudier('cloud2')
    }
    else if (clouds <= 30 ) {
      setWeatherImage(faSun);
      setCloudier('cloud2')
    } else {
      setWeatherImage(faCloud);
      setCloudier('cloud2')
    }
  };

  const colorist = () => {
    
    if (Number(currentTemp) < 10) {
      setcolorBkgrnd("WeatherCold");
    }
     else if (Number(currentTemp) > 20) {
      setcolorBkgrnd("WeatherHot");
    } else {
      setcolorBkgrnd("Weather");
    }
  };
  return (
    <div className={colorBkgrnd}>
      <h1 className="cityName">{currentCity[0].name}</h1>
      <h1 className="weatherType">{currentWeather}</h1>
      <FontAwesomeIcon
        className="weatherImage"
        size="10x"
        icon={weatherImage}
      />
      <FontAwesomeIcon
        className={cloudier}
        size="7x"
        icon={faCloud}
      />
      <h1 className="temp">{currentTemp}c</h1>
      <h1 className="wind">{currentWind}mph</h1>
    </div>
  );
};
export default Weather;
