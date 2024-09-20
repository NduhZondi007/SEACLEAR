import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const WeatherContext = createContext();

const api = {
  key: "540cc3b264acd7f2069773355d068cad",
  base: "https://api.openweathermap.org/data/2.5/",
};

export const WeatherProvider = ({ children }) => {
  const [beaches, setBeaches] = useState([]);

  useEffect(() => {
    const fetchAndUpdateBeaches = () => {
      axios
        .get('https://seaclear-8.cs.uct.ac.za/api/beaches')
        .then((res) => {
          const beaches = res.data;
          setBeaches(beaches);
          beaches.forEach(beach => {
            fetchWeather(beach);
          });
        })
        .catch((err) => {
          console.error('Error fetching beach data!', err);
        });
    };

    const fetchWeather = (beach) => {
      const { latitude, longitude, id, name, location, amenities, waterQuality } = beach;

      fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((weatherData) => {
          const updatedWeather = {
            temperature: weatherData.main.temp,
            windSpeed: weatherData.wind.speed,
            humidity: weatherData.main.humidity,
            forecast: weatherData.weather[0].description,
            seaLevel: weatherData.main.sea_level
          };

          updateBeachWeather(id, name, location, latitude, longitude, amenities, updatedWeather, waterQuality);
        })
        .catch((error) => {
          console.error(`Error fetching weather for ${name}:`, error);
        });
    };

    const updateBeachWeather = (id, name, location, latitude, longitude, amenities, weather, waterQuality) => {
      axios.put(`https://seaclear-8.cs.uct.ac.za/api/beaches/${id}/`, {
        name,
        location,
        latitude,
        longitude,
        amenities,
        weather,
        waterQuality,
      })
      .catch(error => {
        console.error(`Error updating beach ${name}:`, error);
      });
    };

    fetchAndUpdateBeaches(); // Initial fetch
    const interval = setInterval(fetchAndUpdateBeaches, 25 * 60 * 1000); // Fetch every 25 minutes

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <WeatherContext.Provider value={{ beaches }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
