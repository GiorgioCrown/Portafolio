import ProjectCard, {
  TodosPreview,
  WeatherPreview,
  PokedexPreview,
  CheckoutPreview,
  DataAnalysisPreview,
} from "../components/ProjectCard.jsx";
import TechStackAnimation from "../components/TechStackAnimation.jsx";

const Home = () => {
  const developerProjects = [
    {
      title: "To-Do App",
      description: "Aplicación de tareas con CRUD completo, filtros avanzados y persistencia en localStorage",
      technologies: ["React", "localStorage", "Hooks"],
      to: "/todos",
      preview: TodosPreview,
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      title: "Weather App",
      description: "Aplicación del clima con integración de OpenWeatherMap API y pronóstico extendido",
      technologies: ["React", "API", "OpenWeatherMap"],
      to: "/weather",
      preview: WeatherPreview,
      gradient: "from-sky-400 to-blue-600",
    },
    {
      title: "Checkout Simulator",
      description: "Simulador de checkout con validaciones de formulario y experiencia de usuario optimizada",
      technologies: ["React", "Form Validation", "UX"],
      to: "/checkout",
      preview: CheckoutPreview,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      title: "Pokédex",
      description: "Explorador de Pokémon con búsqueda, paginación y detalles completos usando PokéAPI",
      technologies: ["React", "PokéAPI", "Pagination"],
      to: "/pokedex",
      preview: PokedexPreview,
      gradient: "from-yellow-500 to-orange-600",
    },
  ];

  const dataProjects = [
    {
      title: "League of Legends Analysis",
      description: "Análisis de datos de League of Legends usando Python, Pandas y Matplotlib",
      technologies: ["Python", "Pandas", "Matplotlib"],
      to: "https://colab.research.google.com/drive/1SjPySh0j8cE25v9tHlXa-5NrkdnmY3_x?usp=sharing",
      preview: DataAnalysisPreview,
      gradient: "from-purple-500 to-pink-600",
      external: true,
    },
  ];

  return (
    <section className="container px-6 py-14">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 
          className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4"
          style={{
            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            fontWeight: 300,
            letterSpacing: '-0.02em',
          }}
        >
          <span className="text-[--fg]">Jorge Laureano</span>
        </h1>
        <div className="mb-8 space-y-2">
          <div 
            className="text-xl md:text-2xl font-light text-[--brand]"
            style={{
              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 300,
              textShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
            }}
          >
            Full Stack Developer
          </div>
          <div 
            className="text-xl md:text-2xl font-light text-[--brand]"
            style={{
              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              fontWeight: 300,
              textShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
            }}
          >
            Data Analyst
          </div>
        </div>
        <div className="mb-16">
          <TechStackAnimation />
        </div>
      </div>

      {/* Sección Developer */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold text-[--fg]">Developer</h2>
          <div className="flex-1 h-px bg-[--border]"></div>
          <span className="text-sm text-[--muted]">{developerProjects.length} proyectos</span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {developerProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>

      {/* Sección Data Analyst */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold text-[--fg]">Data Analyst</h2>
          <div className="flex-1 h-px bg-[--border]"></div>
          <span className="text-sm text-[--muted]">{dataProjects.length} proyecto</span>
        </div>
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-1 max-w-2xl">
          {dataProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;

