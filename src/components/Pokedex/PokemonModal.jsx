// portafolio/src/components/Pokedex/PokemonModal.jsx
import React from 'react';

/**
 * Modal que muestra información detallada de un Pokémon
 * Incluye estadísticas, tipos, habilidades, altura, peso y más
 * Se abre al hacer clic en una tarjeta de Pokémon
 */
const PokemonModal = ({ pokemon, isOpen, onClose }) => {
  // Si el modal no está abierto o no hay datos del Pokémon, no renderizar nada
  if (!isOpen || !pokemon) return null;

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

  /**
   * Función que retorna el color CSS para las barras de estadísticas
   * @param {string} statName - Nombre de la estadística
   * @returns {string} Clase CSS con el color de la estadística
   */
  const getStatColor = (statName) => {
    const colors = {
      hp: 'bg-red-500',
      attack: 'bg-orange-500',
      defense: 'bg-blue-500',
      'special-attack': 'bg-purple-500',
      'special-defense': 'bg-green-500',
      speed: 'bg-yellow-500'
    };
    return colors[statName] || 'bg-gray-500';
  };

  /**
   * Función que traduce los nombres de estadísticas al español
   * @param {string} statName - Nombre de la estadística en inglés
   * @returns {string} Nombre traducido al español
   */
  const getStatName = (statName) => {
    const names = {
      hp: 'HP',
      attack: 'Ataque',
      defense: 'Defensa',
      'special-attack': 'Ataque Especial',
      'special-defense': 'Defensa Especial',
      speed: 'Velocidad'
    };
    return names[statName] || statName;
  };

  return (
    /* Overlay del modal con fondo semi-transparente */
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      {/* Contenedor principal del modal */}
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header del modal */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 capitalize">{pokemon.name}</h2>
          {/* Botón de cerrar */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Contenido principal del modal */}
        <div className="p-6">
          
          {/* Sección de imagen y tipos */}
          <div className="text-center mb-6">
            {/* Contenedor de la imagen del Pokémon */}
            <div className="w-32 h-32 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
              <img 
                src={pokemon.sprites.front_default} 
                alt={pokemon.name}
                className="w-28 h-28"
              />
            </div>
            
            {/* Contenedor de tipos */}
            <div className="flex justify-center gap-2 mb-4">
              {pokemon.types.map((type) => (
                <span 
                  key={type.type.name}
                  className={`px-3 py-1 rounded-full text-sm text-white font-medium ${getTypeColor(type.type.name)}`}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
            
            {/* ID del Pokémon */}
            <p className="text-gray-600">#{String(pokemon.id).padStart(3, '0')}</p>
          </div>

          {/* Sección de estadísticas */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Estadísticas</h3>
            <div className="space-y-3">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name}>
                  {/* Nombre y valor de la estadística */}
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{getStatName(stat.stat.name)}</span>
                    <span className="text-gray-900 font-medium">{stat.base_stat}</span>
                  </div>
                  {/* Barra de progreso de la estadística */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getStatColor(stat.stat.name)}`}
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sección de información física */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Altura</h4>
              <p className="text-gray-600">{(pokemon.height / 10).toFixed(1)} m</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Peso</h4>
              <p className="text-gray-600">{(pokemon.weight / 10).toFixed(1)} kg</p>
            </div>
          </div>

          {/* Sección de habilidades */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-2">Habilidades</h4>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map((ability) => (
                <span 
                  key={ability.ability.name}
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    ability.is_hidden 
                      ? 'bg-purple-100 text-purple-800' // Habilidad oculta
                      : 'bg-blue-100 text-blue-800'     // Habilidad normal
                  }`}
                >
                  {ability.ability.name}
                  {ability.is_hidden && ' (Oculta)'}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer del modal */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;


