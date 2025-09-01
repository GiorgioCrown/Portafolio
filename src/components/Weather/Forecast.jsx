// portafolio/src/components/Weather/Forecast.jsx
import React, { useState, useEffect } from 'react';

const Forecast = ({ city, apiKey }) => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (city && apiKey) {
      fetchForecast();
    }
  }, [city, apiKey]);

  const fetchForecast = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=es`
      );

      if (!response.ok) {
        throw new Error('Error al obtener el pronóstico');
      }

      const data = await response.json();
      setForecastData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener el icono del clima
  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  // Función para formatear la fecha
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('es-ES', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Función para obtener la hora
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Agrupar datos por día
  const groupByDay = (list) => {
    const grouped = {};
    list.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    });
    return grouped;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Pronóstico de 5 días</h3>
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Pronóstico de 5 días</h3>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  if (!forecastData) {
    return null;
  }

  const dailyData = groupByDay(forecastData.list);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Pronóstico de 5 días</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(dailyData).slice(0, 5).map(([date, items]) => {
          // Calcular promedios del día
          const avgTemp = Math.round(
            items.reduce((sum, item) => sum + item.main.temp, 0) / items.length
          );
          const avgHumidity = Math.round(
            items.reduce((sum, item) => sum + item.main.humidity, 0) / items.length
          );
          
          // Obtener el clima más común del día
          const weatherCounts = {};
          items.forEach(item => {
            const weather = item.weather[0].main;
            weatherCounts[weather] = (weatherCounts[weather] || 0) + 1;
          });
          const mostCommonWeather = Object.keys(weatherCounts).reduce((a, b) => 
            weatherCounts[a] > weatherCounts[b] ? a : b
          );
          
          // Encontrar el item con el clima más común para obtener el icono
          const representativeItem = items.find(item => 
            item.weather[0].main === mostCommonWeather
          );

          return (
            <div key={date} className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="font-semibold text-gray-900 mb-2">
                {formatDate(new Date(date))}
              </p>
              
              <div className="flex justify-center mb-3">
                <img 
                  src={getWeatherIcon(representativeItem.weather[0].icon)} 
                  alt={representativeItem.weather[0].description}
                  className="w-12 h-12"
                />
              </div>
              
              <p className="text-lg font-bold text-gray-900 mb-1">
                {avgTemp}°C
              </p>
              
              <p className="text-sm text-gray-600 mb-2">
                {representativeItem.weather[0].description}
              </p>
              
              <p className="text-xs text-gray-500">
                Humedad: {avgHumidity}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
