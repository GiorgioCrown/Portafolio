import React, { useState, useEffect } from 'react';
import PokemonCard from '../../components/Pokedex/PokemonCard';
import PokedexControls from '../../components/Pokedex/PokedexControls';

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);

  const pokemonsPerPage = 20;
  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);

  useEffect(() => {
    fetchAllPokemons();
  }, []);

  useEffect(() => {
    filterPokemons();
  }, [searchTerm, allPokemons]);

  useEffect(() => {
    paginatePokemons();
  }, [filteredPokemons, currentPage]);

  const fetchAllPokemons = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151'); // Primera generación
      const data = await response.json();
      setAllPokemons(data.results);
    } catch (err) {
      setError('Error al cargar los Pokémon');
    } finally {
      setLoading(false);
    }
  };

  const filterPokemons = () => {
    if (!searchTerm.trim()) {
      setFilteredPokemons(allPokemons);
      setCurrentPage(1);
    } else {
      const filtered = allPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemons(filtered);
      setCurrentPage(1);
    }
  };

  const paginatePokemons = () => {
    const startIndex = (currentPage - 1) * pokemonsPerPage;
    const endIndex = startIndex + pokemonsPerPage;
    setPokemons(filteredPokemons.slice(startIndex, endIndex));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    filterPokemons();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Pokédex</h1>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Pokédex</h1>
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Pokédex</h1>
        
        <PokedexControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />
        
        {filteredPokemons.length === 0 && searchTerm ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron Pokémon con "{searchTerm}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pokemons.map((pokemon, index) => (
              <PokemonCard 
                key={pokemon.name} 
                pokemon={pokemon} 
                index={(currentPage - 1) * pokemonsPerPage + index} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pokedex;