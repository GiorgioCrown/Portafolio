import React, { useState, useEffect } from 'react';
import PokemonModal from './PokemonModal';

/**
 * Componente que renderiza una tarjeta individual de Pokémon
 * Muestra imagen, nombre, tipos e ID del Pokémon
 * Al hacer clic abre un modal con detalles completos
 */
const PokemonCard = ({ pokemon, index }) => {
  // Estado para almacenar los datos detallados del Pokémon
  const [pokemonData, setPokemonData] = useState(null);
  // Estado para controlar el loading individual de cada tarjeta
  const [loading, setLoading] = useState(true);
  // Estado para controlar la apertura/cierre del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Efecto que se ejecuta cuando cambia la URL del Pokémon
  useEffect(() => {
    fetchPokemonDetails();
  }, [pokemon.url]);

  /**
   * Función que obtiene los datos detallados del Pokémon desde la API
   * Incluye estadísticas, tipos, habilidades, etc.
   */
  const fetchPokemonDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(pokemon.url);
      const data = await response.json();
      setPokemonData(data);
    } catch (error) {
      console.error('Error fetching pokemon details:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Manejador del clic en la tarjeta
   * Abre el modal solo si los datos del Pokémon están cargados
   */
  const handleCardClick = () => {
    if (pokemonData) {
      setIsModalOpen(true);
    }
  };

  // Renderizado del estado de carga
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
        <div className="text-center">
          {/* Skeleton loader para la imagen */}
          <div className="w-24 h-24 mx-auto mb-3 bg-gray-100 rounded-full animate-pulse"></div>
          {/* Skeleton loader para el nombre */}
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
        </div>
      </div>
    );
  }

  // Renderizado en caso de error al cargar los datos
  if (!pokemonData) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-gray-400">Error</span>
          </div>
          <h3 className="font-semibold text-gray-900 capitalize">{pokemon.name}</h3>
        </div>
      </div>
    );
  }

  /**
   * Función que retorna el color CSS correspondiente a cada tipo de Pokémon
   * @param {string} type - Nombre del tipo (ej: 'fire', 'water', etc.)
   * @returns {string} Clase CSS con el color del tipo
   */
  const getTypeColor = (type) => {
    const colors = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-200',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-400',
      psychic: 'bg-pink-500',
      bug: 'bg-green-400',
      rock: 'bg-yellow-800',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-700',
      dark: 'bg-gray-700',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300'
    };
    return colors[type] || 'bg-gray-400';
  };

  return (
    <>
      {/* Tarjeta principal del Pokémon */}
      <div 
        className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="text-center">
          {/* Contenedor de la imagen */}
          <div className="w-24 h-24 mx-auto mb-3 bg-gray-50 rounded-full flex items-center justify-center">
            <img 
              src={pokemonData.sprites.front_default} 
              alt={pokemon.name}
              className="w-20 h-20"
              onError={(e) => {
                // Si la imagen falla, ocultarla y mostrar el ID como fallback
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            {/* Fallback: ID del Pokémon si la imagen no carga */}
            <span className="text-gray-400 text-sm hidden">#{pokemonData.id}</span>
          </div>
          
          {/* Nombre del Pokémon */}
          <h3 className="font-semibold text-gray-900 capitalize mb-2">{pokemon.name}</h3>
          
          {/* Contenedor de tipos */}
          <div className="flex justify-center gap-1 mb-2">
            {pokemonData.types.map((type) => (
              <span 
                key={type.type.name}
                className={`px-2 py-1 rounded-full text-xs text-white font-medium ${getTypeColor(type.type.name)}`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
          
          {/* ID del Pokémon formateado */}
          <div className="text-xs text-gray-500">
            #{String(pokemonData.id).padStart(3, '0')}
          </div>
        </div>
      </div>

      {/* Modal de detalles del Pokémon */}
      <PokemonModal
        pokemon={pokemonData}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default PokemonCard;
