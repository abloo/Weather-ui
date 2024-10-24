import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faSun, faWind, faCloudRain, faBolt } from '@fortawesome/free-solid-svg-icons';
import './WeatherCard.css';

const WeatherCard = ({ data }) => {
    console.log(data)
  const temperature = data.dailyWeather.temperature.toFixed(1);
  const minTemperature = data.dailyWeather.minTemperature.toFixed(1);
  const maxTemperature = data.dailyWeather.maxTemperature.toFixed(1);
  const feelsLike = data.dailyWeather.feelsLike.toFixed(1);
  const humidity = data.dailyWeather.humidity;
  const pressure = data.dailyWeather.pressure;
  const visibility = (data.dailyWeather.visibility).toFixed(1); // Convert from meters to kilometers
  const windSpeed = (data.dailyWeather.windSpeed ).toFixed(1); // Convert from m/s to km/h
  const date = new Date(data.dailyWeather.date).toLocaleDateString();
  const time = data.dailyWeather.time; // Assuming the time is already in the desired format
  const weatherDescription = data.description.toLowerCase();
  
  // Determine messages based on conditions
  const messages = data.message;
  // Map weather descriptions to Font Awesome icons
  const getWeatherIcon = (description) => {
      if (description.includes("clear")) {
          return <FontAwesomeIcon icon={faSun} style={{ fontSize: '48px', color: '#FFD700' }} />;
      }
      if (description.includes("clouds")) {
          return <FontAwesomeIcon icon={faCloud} style={{ fontSize: '48px', color: '#B0C4DE' }} />;
      }
      if (description.includes("rain")) {
          return <FontAwesomeIcon icon={faCloudRain} style={{ fontSize: '48px', color: '#1E90FF' }} />;
      }
      if (description.includes("thunderstorm")) {
          return <FontAwesomeIcon icon={faBolt} style={{ fontSize: '48px', color: '#FF4500' }} />;
      }
      return <FontAwesomeIcon icon={faCloud} style={{ fontSize: '48px', color: '#A9A9A9' }} />; // Fallback icon
  };

  return (
      <Card style={{ padding: '16px', textAlign: 'center' }}>
          <CardContent>
              <div style={{ marginBottom: '16px' }}>
                  {getWeatherIcon(weatherDescription)}
              </div>
              <Typography variant="h5">{date}</Typography>
              <Typography variant="h6">{time}</Typography>
              <Typography variant="h4">{`${temperature} °C`}</Typography>
              <Typography variant="body1">{`Min: ${minTemperature} °C`}</Typography>
              <Typography variant="body1">{`Max: ${maxTemperature} °C`}</Typography>
              <Typography variant="body1">{`Feels like: ${feelsLike} °C`}</Typography>
              <Typography variant="body1">{`Humidity: ${humidity}%`}</Typography>
              <Typography variant="body1">{`Pressure: ${pressure} hPa`}</Typography>
              <Typography variant="body1">{`Visibility: ${visibility} km`}</Typography>
              <Typography variant="body1">{`Wind Speed: ${windSpeed} km/h`} <FontAwesomeIcon icon={faWind} /></Typography>
              {messages.length > 0 && (
                  <Typography variant="body2" color="warning.main">
                      {messages}
                  </Typography>
              )}
          </CardContent>
      </Card>
  );
};

export default WeatherCard;
