import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cities, setCities] = useState([
    'London', 'New York', 'Tokyo', 'Paris', 'Sydney', 
    'Berlin', 'Moscow', 'Dubai', 'Mumbai', 'Rio de Janeiro'
  ]);

  // OpenWeatherMap API instead of WeatherAPI
  const API_KEY = '5f472b7acba333cd8a035ea85a0d4d4c'; // OpenWeatherMap free API key
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeather = async (selectedCity) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await axios.get(API_URL, {
        params: {
          q: selectedCity,
          appid: API_KEY,
          units: 'metric'
        }
      });
      
      setWeather(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Error fetching weather data. Please try again.');
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
    fetchWeather(selectedCity);
  };

  // Function to convert from Celsius to Fahrenheit
  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9/5) + 32;
  };

  return (
    <div className="App">
      <div className="weather-container">
        <h1>Weather App</h1>
        
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        
        <div className="city-list">
          <h3>Popular Cities</h3>
          <div className="city-buttons">
            {cities.map((cityName, index) => (
              <button 
                key={index} 
                onClick={() => handleCitySelect(cityName)}
                className="city-button"
              >
                {cityName}
              </button>
            ))}
          </div>
        </div>
        
        {loading && <div className="loading">Loading...</div>}
        
        {error && <div className="error">{error}</div>}
        
        {weather && !loading && !error && (
          <div className="weather-info">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <div className="weather-details">
              <img 
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                alt={weather.weather[0].description}
                className="weather-icon"
              />
              <div className="temperature">
                <h3>{Math.round(weather.main.temp)}°C / {Math.round(celsiusToFahrenheit(weather.main.temp))}°F</h3>
                <p>{weather.weather[0].description}</p>
              </div>
            </div>
            <div className="additional-info">
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind: {weather.wind.speed} m/s</p>
              <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
