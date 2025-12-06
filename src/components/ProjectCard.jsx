import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ProjectCard = ({ 
  title, 
  description, 
  technologies, 
  to, 
  preview, 
  external = false,
  gradient = "from-indigo-500 to-purple-600"
}) => {
  const PreviewComponent = preview;

  const content = (
    <div
      className="
        group relative
        bg-[--card] border border-[--border] rounded-1xl
        overflow-hidden
        transition-all duration-300
        hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20
        cursor-pointer
        h-full flex flex-col
      "
    >
      {/* Preview visual */}
      <div 
        className="
          relative h-48 overflow-hidden
          flex items-center justify-center
          rounded-t-1xl
        "
        style={{
          backdropFilter: 'blur(2px)',
          background: 'color-mix(in oklab, var(--bg) 40%, transparent)',
        }}
      >
        {/* Overlay con efecto hover */}
        <div className="
          absolute inset-0 
          bg-black/0 group-hover:bg-black/5
          transition-all duration-300
        " />
        
        {/* Contenido del preview */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {PreviewComponent ? (
            <PreviewComponent />
          ) : (
            <div className="text-[--fg] text-6xl">
              {title.charAt(0)}
            </div>
          )}
        </div>

        {/* Efecto de brillo animado */}
        <div className="
          absolute inset-0
          bg-gradient-to-r from-transparent via-white/20 to-transparent
          -translate-x-full group-hover:translate-x-full
          transition-transform duration-1000
        " />
      </div>

      {/* Contenido de la card */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold mb-2 text-[--fg] group-hover:text-[--brand] transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-[--muted] mb-4 flex-1 line-clamp-2">
          {description}
        </p>

        {/* Tecnologías */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="
                px-2 py-1 text-xs
                bg-[--border] text-[--muted]
                rounded-md
                border border-[--border]
              "
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Link/CTA */}
        <div className="
          flex items-center justify-between
          pt-4 border-t border-[--border]
        ">
          <span className="
            text-sm font-medium text-[--brand]
            group-hover:translate-x-1
            transition-transform duration-200
          ">
            {external ? "Ver proyecto →" : "Abrir →"}
          </span>
        </div>
      </div>

      {/* Borde brillante en hover */}
      <div className="
        absolute inset-0
        border-2 border-[--brand]
        rounded-1xl
        opacity-0 group-hover:opacity-20
        transition-opacity duration-300
        pointer-events-none
      " />
    </div>
  );

  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={to} className="block h-full">
      {content}
    </Link>
  );
};

// Componentes de preview para cada proyecto
export const TodosPreview = () => (
  <div className="w-full h-full p-6 flex flex-col items-center justify-center">
    {/* Icono de lista elegante - misma estructura que Weather App */}
    <div className="text-6xl mb-2">
      <svg 
        width="56" 
        height="56" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="var(--fg)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="opacity-90"
        style={{ display: 'inline-block', verticalAlign: 'middle' }}
      >
        <rect x="3" y="5" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="8" y1="10" x2="16" y2="10"></line>
        <line x1="8" y1="14" x2="16" y2="14"></line>
        <line x1="8" y1="18" x2="12" y2="18"></line>
      </svg>
    </div>
    {/* Solo las líneas de texto, sin círculos */}
    <div className="w-full flex flex-col gap-2">
      <div className="h-3 bg-[--fg] rounded opacity-80 w-full"></div>
      <div className="h-3 bg-[--fg] rounded opacity-60 w-4/5"></div>
      <div className="h-3 bg-[--fg] rounded opacity-80 w-full"></div>
    </div>
  </div>
);

export const WeatherPreview = () => (
  <div className="w-full h-full p-6 flex flex-col items-center justify-center">
    <div className="text-6xl mb-2">🌤️</div>
    <div className="w-20 h-1 bg-[--fg] rounded mb-2 opacity-80"></div>
    <div className="w-16 h-1 bg-[--fg] rounded opacity-60"></div>
  </div>
);

export const PokedexPreview = () => {
  const [pokemonImages, setPokemonImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonImages = async () => {
      try {
        // Cargar los primeros 6 Pokémon (Bulbasaur, Ivysaur, Venusaur, Charmander, Charmeleon, Charizard)
        const pokemonIds = [1, 2, 3, 4, 5, 6];
        const promises = pokemonIds.map(id =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => res.json())
            .then(data => data.sprites.front_default)
            .catch(() => null)
        );
        
        const images = await Promise.all(promises);
        setPokemonImages(images.filter(img => img !== null));
      } catch (error) {
        console.error('Error loading Pokemon images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonImages();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full p-6 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="w-14 h-14 bg-[--card] rounded-xl animate-pulse border border-[--border]"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-6 flex items-center justify-center">
      <div className="grid grid-cols-3 gap-3">
        {pokemonImages.map((imageUrl, index) => (
          <div
            key={index}
            className="w-14 h-14 bg-[--card] rounded-xl flex items-center justify-center border border-[--border] shadow-lg overflow-hidden"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={`Pokemon ${index + 1}`}
                className="w-full h-full object-contain p-1"
                style={{ filter: 'brightness(1.1)' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <span className="text-[--muted] text-xs">#{index + 1}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const CheckoutPreview = () => (
  <div className="w-full h-full p-6 flex flex-col gap-3 items-center justify-center">
    {/* Icono de tarjeta de crédito */}
    <div className="mb-2">
      <svg 
        width="48" 
        height="32" 
        viewBox="0 0 24 18" 
        fill="none" 
        stroke="var(--fg)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="opacity-90"
      >
        <rect x="1" y="4" width="22" height="14" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
        <line x1="5" y1="14" x2="8" y2="14"></line>
        <line x1="5" y1="16" x2="10" y2="16"></line>
      </svg>
    </div>
    {/* Simulación de tarjeta */}
    <div className="w-32 h-20 bg-[--card] rounded-lg border-2 border-[--border] p-3 flex flex-col justify-between shadow-lg">
      <div className="flex items-center gap-2">
        <div className="w-8 h-6 bg-[--brand] rounded opacity-80"></div>
        <div className="w-6 h-4 bg-[--fg] rounded opacity-40"></div>
      </div>
      <div className="space-y-1">
        <div className="h-2 bg-[--fg] rounded opacity-60 w-3/4"></div>
        <div className="h-2 bg-[--fg] rounded opacity-40 w-1/2"></div>
      </div>
    </div>
  </div>
);

export const DataAnalysisPreview = () => (
  <div className="w-full h-full p-6 flex items-center justify-center">
    <div className="w-full flex items-end justify-center gap-2 h-24">
      <div 
        className="w-7 bg-[--brand] rounded-t shadow-md" 
        style={{ 
          height: '40%',
          boxShadow: '0 0 10px rgba(99, 102, 241, 0.4)',
        }}
      ></div>
      <div 
        className="w-7 bg-[--brand] rounded-t shadow-md" 
        style={{ 
          height: '70%',
          boxShadow: '0 0 10px rgba(99, 102, 241, 0.4)',
        }}
      ></div>
      <div 
        className="w-7 bg-[--brand] rounded-t shadow-md" 
        style={{ 
          height: '50%',
          boxShadow: '0 0 10px rgba(99, 102, 241, 0.4)',
        }}
      ></div>
      <div 
        className="w-7 bg-[--brand] rounded-t shadow-md" 
        style={{ 
          height: '90%',
          boxShadow: '0 0 10px rgba(99, 102, 241, 0.4)',
        }}
      ></div>
      <div 
        className="w-7 bg-[--brand] rounded-t shadow-md" 
        style={{ 
          height: '60%',
          boxShadow: '0 0 10px rgba(99, 102, 241, 0.4)',
        }}
      ></div>
    </div>
  </div>
);

export default ProjectCard;

