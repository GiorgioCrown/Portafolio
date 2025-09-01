// portafolio/src/components/Pokedex/PokedexControls.jsx
import React from 'react';

/**
 * Componente de controles para el Pokédex
 * Incluye barra de búsqueda y controles de paginación
 * Permite filtrar Pokémon por nombre y navegar entre páginas
 */
const PokedexControls = ({ 
  currentPage,      // Página actual
  totalPages,       // Total de páginas disponibles
  onPageChange,     // Función para cambiar de página
  searchTerm,       // Término de búsqueda actual
  onSearchChange,   // Función para actualizar el término de búsqueda
  onSearchSubmit    // Función para enviar la búsqueda
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      {/* Contenedor principal con layout responsive */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Sección de búsqueda */}
        <div className="flex-1 max-w-md">
          <form onSubmit={onSearchSubmit} className="relative">
            {/* Input de búsqueda */}
            <input
              type="text"
              value={searchTerm}
              onChange={onSearchChange}
              placeholder="Buscar Pokémon por nombre..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
            {/* Botón de búsqueda posicionado absolutamente */}
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors"
            >
              Buscar
            </button>
          </form>
        </div>

        {/* Sección de controles de paginación */}
        <div className="flex items-center gap-2">
          {/* Botón "Anterior" */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1} // Deshabilitado en la primera página
            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Anterior
          </button>
          
          {/* Indicador de página actual */}
          <span className="px-3 py-2 text-sm text-gray-700">
            Página {currentPage} de {totalPages}
          </span>
          
          {/* Botón "Siguiente" */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages} // Deshabilitado en la última página
            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokedexControls;
