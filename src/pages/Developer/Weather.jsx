// portafolio/src/pages/Developer/Weather.jsx
import React, { useState } from 'react';
import Forecast from '../../components/Weather/Forecast';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ⚠️ REEMPLAZA CON TU API KEY REAL
  const API_KEY = '3859593eea050963749dbf1f1e729a76';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Ciudad no encontrada');
        } else {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      }

      const data = await response.json();
      setWeatherData(data);
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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 animate-gradient">
        {/* Partículas flotantes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full opacity-20 animate-float-slow"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full opacity-30 animate-float-medium"></div>
          <div className="absolute top-60 left-1/4 w-3 h-3 bg-white rounded-full opacity-15 animate-float-fast"></div>
          <div className="absolute top-80 right-1/3 w-1 h-1 bg-white rounded-full opacity-25 animate-float-slow"></div>
          <div className="absolute top-32 left-1/2 w-2 h-2 bg-white rounded-full opacity-20 animate-float-medium"></div>
          <div className="absolute top-96 left-20 w-1 h-1 bg-white rounded-full opacity-30 animate-float-fast"></div>
          <div className="absolute top-64 right-10 w-2 h-2 bg-white rounded-full opacity-15 animate-float-slow"></div>
          <div className="absolute top-48 left-3/4 w-1 h-1 bg-white rounded-full opacity-25 animate-float-medium"></div>
        </div>
        
        {/* Ondas decorativas */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/5 to-transparent"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center drop-shadow-lg">
            Weather App
          </h1>
          
          {/* Formulario de búsqueda */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/20">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ciudad"
                className="flex-1 min-w-0 px-6 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white/80 backdrop-blur-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="shrink-0 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? 'Buscando...' : 'Buscar'}
              </button>
            </form>
          </div>

          {/* Área de resultados */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <p className="text-red-800">{error}</p>
              </div>
            )}
            
            {loading && (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}
            
            {weatherData && (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {weatherData.name}, {weatherData.sys.country}
                </h2>
                
                <div className="flex items-center justify-center mb-8">
                  <img 
                    src={getWeatherIcon(weatherData.weather[0].icon)} 
                    alt={weatherData.weather[0].description}
                    className="w-24 h-24"
                  />
                  <div className="ml-6">
                    <p className="text-5xl font-bold text-gray-900">
                      {Math.round(weatherData.main.temp)}°C
                    </p>
                    <p className="text-xl text-gray-600 capitalize">
                      {weatherData.weather[0].description}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <p className="text-sm text-gray-600 mb-2">Sensación térmica</p>
                    <p className="text-xl font-semibold text-gray-900">{Math.round(weatherData.main.feels_like)}°C</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                    <p className="text-sm text-gray-600 mb-2">Humedad</p>
                    <p className="text-xl font-semibold text-gray-900">{weatherData.main.humidity}%</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
                    <p className="text-sm text-gray-600 mb-2">Viento</p>
                    <p className="text-xl font-semibold text-gray-900">{Math.round(weatherData.wind.speed)} km/h</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
                    <p className="text-sm text-gray-600 mb-2">Presión</p>
                    <p className="text-xl font-semibold text-gray-900">{weatherData.main.pressure} hPa</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mt-6">
                  Última actualización: {formatDate(weatherData.dt)}
                </p>
              </div>
            )}
            
            {!weatherData && !loading && !error && (
              <div className="text-center text-gray-500 py-12">
                <div className="text-6xl mb-4">🌤️</div>
                <p className="text-lg">Ingresa el nombre de una ciudad para ver el clima</p>
              </div>
            )}
          </div>

          {/* Componente de pronóstico extendido */}
          {weatherData && <Forecast city={city} apiKey={API_KEY} />}
        </div>
      </div>
    </div>
  );
};

export default Weather;