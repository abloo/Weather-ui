const BASE_URL = 'http://localhost:8080/api/weather';


const getWeatherData = async (city, isOfflineMode) => {
  try {
      if (!isOfflineMode) {
          const response = await fetch(`${BASE_URL}`);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();

          // Store the fetched data with a timestamp in localStorage
          const cacheEntry = {
              timestamp: Date.now(),
              data: data,
          };
          localStorage.setItem(`weather_${city}`, JSON.stringify(cacheEntry));
          return data;
      } else {
          const cachedEntry = localStorage.getItem(`weather_${city}`);
          if (cachedEntry) {
              const { timestamp, data } = JSON.parse(cachedEntry);
              // Check if the cache is older than 24 hours (86400000 milliseconds)
              if (Date.now() - timestamp < 86400000) {
                  return data;
              } else {
                  localStorage.removeItem(`weather_${city}`); // Clear old cache
              }
          } else {
              throw new Error('No offline data available');
          }
      }
  } catch (error) {
      console.error('Fetch error:', error);
      throw error;
  }
};

export { getWeatherData };
