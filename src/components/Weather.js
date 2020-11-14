import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faCloudSun,
  faSun,
  faWind,
  faSnowflake,
  faCloudRain,
  faTemperatureHigh,
} from "@fortawesome/free-solid-svg-icons";

const Weather = ({ currentCity }) => {
  //weather states
  const [currentWeather, setCurrentWeather] = useState("");
  const [currentTemp, setCurrentTemp] = useState([]);
  const [currentWind, setCurrentWind] = useState([]);
  const [weatherImage, setWeatherImage] = useState(faSnowflake);
  const [colorBkgrnd, setcolorBkgrnd] = useState("Weather");
  const [clouds, setClouds] = useState(50);
  const [cloudAnim, setCloudAnim] = useState(false)
  const [humidity, setHumidity] = useState(0);
  const [spinSun,setSpinSun] = useState (false);

  //function to get current weather and to update state of weather
  const cityWeather = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=` +
          city +
          `&units=metric&APPID=84634c62ad44fa7c5c527c3f90102a59`
      );
      const weather = await response.json();
      setCurrentWeather(weather.weather[0].description);
      setCurrentTemp(weather.main.temp.toFixed(0));
      setCurrentWind(weather.wind.speed.toFixed(0));
      setClouds(weather.clouds.all);
      setHumidity(weather.main.humidity);
    } catch (err) {
      console.log(err, "not worked this");
    }
  };
  //call api get function after changes made to state
  useEffect(() => cityWeather(currentCity[0].name), [currentCity]);
  useEffect(() => colorist(), [currentTemp]);
  useEffect(() => images(), [clouds]);

  const images = () => {
    //change the weather icon depending on weather

    if (clouds > 70 && humidity > 85) {
      setWeatherImage(faCloudRain);
      setCloudAnim(true);
      setSpinSun(false)
    } else if (clouds > 70) {
      setWeatherImage(faCloud);
      setCloudAnim(true);
      setSpinSun(false)
    } else if (clouds > 30 && clouds < 70) {
      setWeatherImage(faCloudSun);
      setCloudAnim(false);
      setSpinSun(false)
    } else if (clouds <= 30) {
      setWeatherImage(faSun);
      setSpinSun(true)
      setCloudAnim(false);
    } else {
      setWeatherImage(faCloud);
      setCloudAnim(false);
      setSpinSun(false)
    }
  };

  const colorist = () => {
    if (Number(currentTemp) < 10) {
      setcolorBkgrnd("WeatherCold");
    } else if (Number(currentTemp) > 20) {
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
        className={spinSun ? 'weatherImageSpin' :"weatherImage"}
        size="10x"
        icon={weatherImage}
      />
      <div className={cloudAnim ? '' : 'cloud2'}>
      <FontAwesomeIcon className='cloudVisible' size="9x" icon={weatherImage} />
      <FontAwesomeIcon className='cloudVisible2' size="8x" icon={weatherImage} />
      <FontAwesomeIcon className='cloudVisible3' size="7x" icon={weatherImage} />
      </div>
      <h1 className="temp"><FontAwesomeIcon className='windIcon' size="1x" icon={faTemperatureHigh} />{currentTemp}c</h1>
      <h1 className="wind">{currentWind}mph<FontAwesomeIcon className='windIcon' size="1x" icon={faWind} /></h1>
    </div>
  );
};
export default Weather;
