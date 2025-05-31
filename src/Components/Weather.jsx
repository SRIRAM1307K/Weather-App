import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleCity = (evt) => {
    setCity(evt.target.value);
  };

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            appid: "8bb0fe6d93ec066068a7d57db1a0dc22",
            units: "metric", // Change to 'imperial' for Fahrenheit
          },
        }
      );
      setWeather(response.data);
      setError("");
      setCity("");
    } catch (err) {
      setError("Could not fetch weather. Please check the city name.");
      setWeather(null);
    }
    handleCity.value = "";
  };

  return (
    <div className="text-xl">
      <div className="bg-[#C4E1E6] md:w-1/2 mt-12 mx-auto p-12 rounded-xl">
        <h1 className="text-center font-bold text-3xl flex justify-center items-center gap-3">
          {/* <FontAwesomeIcon icon={faCloud} /> */}
          <img
            src="https://www.reshot.com/preview-assets/icons/VAUPX2QFJK/weather-VAUPX2QFJK.svg"
            alt="Weather Logo"
            className="flex w-20"
          />
          Weather Report
        </h1>
        <p className="text-center m-2">
          I can give you a weather report about your city!
        </p>
        <input
          onChange={handleCity}
          type="text"
          value={city}
          className="border border-[#8DBCC7] rounded-lg text-center flex mx-auto justify-center p-2 outline-none"
          placeholder="Enter Your City!"
        />
        <button
          onClick={getWeather}
          className="border p-2 rounded-lg flex m-2 mx-auto bg-[#A4CCD9] text-black font-bold border-[#8DBCC7] hover:cursor-pointer hover:bg-[#8DBCC7] hover:text-black transition"
        >
          Get Report
        </button>

        {error && <p className="text-red-600 text-center">{error}</p>}

        {weather && (
          <div className="text-center mt-4 border rounded-lg p-4 border-[#8DBCC7] w-full">
            <p className="flex items-center gap-2">
              <img
                src="https://www.reshot.com/preview-assets/icons/RDVC82WGXP/weather-RDVC82WGXP.svg"
                alt=""
                className="w-10"
              />
              <strong>Weather:</strong> {weather.weather[0].main}
            </p>
            <p className="flex items-center gap-2">
              <img
                src="https://www.reshot.com/preview-assets/icons/HA4RQLMUX8/temprature-HA4RQLMUX8.svg"
                alt="TempLogo"
                className="w-10"
              />
              <strong>Temperature:</strong> {weather.main.temp} °C
            </p>
            <p className="flex items-center gap-2">
              <img
                src="https://www.reshot.com/preview-assets/icons/MKCX5AE48L/weather-news-MKCX5AE48L.svg"
                alt="Desc"
                className="w-10"
              />
              <strong>Description:</strong> {weather.weather[0].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
