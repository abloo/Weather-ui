// WeatherCard.js

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faSun, faUmbrella, faWind, faCloudRain, faBolt } from '@fortawesome/free-solid-svg-icons';
import './WeatherCard.css';

const WeatherCard = ({ item }) => {
  const temperature = (item.main.temp - 273.15).toFixed(1); // Convert from Kelvin to Celsius
  const minTemperature = (item.main.temp_min - 273.15).toFixed(1);
  const maxTemperature = (item.main.temp_max - 273.15).toFixed(1);
  const feelsLike = (item.main.feels_like - 273.15).toFixed(1);
  const humidity = item.main.humidity;
  const pressure = item.main.pressure;
  const visibility = (item.visibility / 1000).toFixed(1); // Convert from meters to kilometers
  const windSpeed = (item.wind.speed * 3.6).toFixed(1); // Convert from m/s to km/h
  const dateTime = new Date(item.dt_txt);
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const weatherDescription = item.weather[0].description.toLowerCase();

    // Determine messages based on conditions
    const messages = [];
    if (item.pop > 0.1) {
        messages.push("Carry an umbrella");
    }
    if (temperature > 40) {
        messages.push("Use sunscreen lotion");
    }
    if (windSpeed > 10) {
        messages.push("It's too windy, watch out!");
    }
    if (weatherDescription.includes("thunderstorm")) {
        messages.push("Don't step out! A Storm is brewing!");
    }

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
                {/* Add Weather Icon based on conditions */}
                <Typography variant="body1">
                    <FontAwesomeIcon icon={getWeatherIcon(item.weather[0].main)} />
                </Typography>
                {messages.length > 0 && (
                    <Typography variant="body2" color="warning.main">
                        {messages.join(' | ')}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default WeatherCard;
