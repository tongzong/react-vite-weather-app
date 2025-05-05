import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import cloud_icon from "../assets/cloud.png";
import humidity_icon from "../assets/humidity.png";
import strom_icon from "../assets/strom.png";
import sun_icon from "../assets/sun.png";
import weather_icon from "../assets/weather.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    1000: sun_icon,
    1003: sun_icon,
    1006: cloud_icon,
    1009: cloud_icon,
    1030: cloud_icon,
    1063: humidity_icon,
    1183: humidity_icon,
    1240: humidity_icon,
    1219: strom_icon,
    1282: strom_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `http://api.weatherapi.com/v1/current.json?&key=${
        import.meta.env.VITE_APP_ID
      }&q=${city}`;

      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok){
        if (data && data.error && data.error.message){
            alert(data.error.message);
        } else {
            alert("Error fetching data");
            console.error("API Error Response:", data)
        }
        
        return;
      }

      console.log("API Data:", data);

      const iconCode = data?.current?.condition?.icon
        ?.split("/")
        .pop()
        .split(".")[0]; // Correct extraction
      console.log("Icon Code", iconCode);
      const icon = allIcons[iconCode] || weather_icon; // Use the extracted iconCode as the key
      setWeatherData({
        humidity: data?.current?.humidity,
        windSpeed: data?.current?.wind_kph,
        temprature: Math.floor(data?.current?.temp_c),
        location: data?.location?.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data:", error);
    }
  };
  useEffect(() => {
    search("London");
  }, []);
  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src={search_icon}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData? <>
        <img src={weatherData.icon || sun_icon} alt="" className="weather_icon" />
      <p className="temprature">{weatherData.temprature} °C</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
          <div className="col">
            <img src={strom_icon} alt="" />
            <div>
              <p>{weatherData.windSpeed} Km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
      </div>
      </>:<> </>};
      
      
      
    </div>
  );
};

export default Weather;
