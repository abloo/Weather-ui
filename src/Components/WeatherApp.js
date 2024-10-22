import React, { useState } from 'react';
import WeatherCard from './WeatherCard/WeatherCard';
import './WeatherApp.css';
import { getWeatherData } from '../Services/weatherService';
import { TextField, Button, Typography, Grid, CircularProgress } from '@mui/material';
import OfflineToggle from './OfflineToogle/OfflineToogle';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOfflineMode, setIsOfflineMode] = useState(false);

    const validateInput = () => {
        if (!city.trim()) {
            setError('City name cannot be empty.');
            return false;
        }
        if (!/^[a-zA-Z\s]+$/.test(city)) {
            setError('City name can only contain letters and spaces.');
            return false;
        }
        setError('');
        return true;
    };

    const handleFetchWeather = async () => {
        if (!validateInput()) return;

        setLoading(true);
        setWeatherData(null); // Clear previous data

        try {
            const data = await getWeatherData(city, isOfflineMode);
            setWeatherData(data);
        } catch (err) {
            setError('Error fetching weather data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="weather-app">
            <OfflineToggle onToggle={setIsOfflineMode} />
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item>
                    <TextField
                        className="input-field"
                        label="City Name"
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value.toUpperCase()); // Set the value in uppercase
                          if (error) setError(''); // Clear error on input change
                      }}
                        variant="outlined"
                        margin="normal"
                        error={!!error}
                        helperText={error}
                    />
                </Grid>
                <Grid item>
                    <Button onClick={handleFetchWeather} variant="contained" color="primary" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Get Weather'}
                    </Button>
                </Grid>
            </Grid>
            {weatherData && weatherData.list && (
                <div>
                    <Typography variant="h5" className="city-title">{`Weather in ${weatherData.city.name}`}</Typography>
                    <Grid container spacing={2}>
                        {weatherData.list.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item.dt}>
                                <WeatherCard item={item} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
