import { Link } from "react-router-dom";

const Card = ({ title, children, footer }) => (
  <div
    className="
      bg-[--card] border border-[--border] rounded-[--radius]
      p-6 shadow-lg shadow-black/30
      transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl
    "
  >
    <h3 className="text-xl font-semibold mb-3 text-[--fg]">{title}</h3>
    <div className="text-[--muted]">{children}</div>
    {footer ? <div className="mt-4 text-sm text-[--muted]">{footer}</div> : null}
  </div>
);

// Item con animaciones: scale/translate + ring accesible + flecha deslizante
const Item = ({ to, label }) => (
  <Link
    to={to}
    className="
      group flex items-center justify-between rounded-lg
      border border-[--border] px-4 py-3
      transition-all duration-200
      bg-transparent
      hover:bg-white/10 hover:backdrop-blur-sm
      motion-safe:hover:translate-x-0.5 motion-safe:hover:scale-[1.01]
      active:scale-[0.99]
      focus-visible:outline-none
      focus-visible:ring-2 focus-visible:ring-indigo-500/60
      text-[--fg]
    "
  >
    <span className="font-medium">{label}</span>
    <span
      className="
        text-[--brand] text-sm
        motion-safe:transition-transform motion-safe:duration-200
        motion-safe:group-hover:translate-x-1
      "
    >
      Abrir →
    </span>
    
  </Link>
);

const Home = () => (
  <section className="container px-6 py-14">
    {/* Hero (nombre actualizado) */}
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
        Hola, soy <span style={{ color: 'var(--brand)' }}>Jorge!</span> 
      </h1>
    </div>

    {/* Grid de 2 columnas */}
    <div className="grid gap-6 sm:grid-cols-2">
      {/* Developer */}
      <Card title="Developer" footer="Más proyectos pronto. Por ahora, estos 4:">
        <ul className="grid gap-2">
          <li><Item to="/todos"   label="To-Do App (CRUD + filtros + localStorage)" /></li>
          <li><Item to="/weather" label="Weather App (OpenWeatherMap)" /></li>
          <li><Item to="/checkout" label="Checkout Simulator (validaciones + UX)" /></li>
          <li><Item to="/pokedex" label="Pokédex (PokéAPI)" /></li>
        </ul>
      </Card>

      {/* Data Analyst */}
      <Card title="Data Analyst">
        <ul>
          <li> <Item to="https://colab.research.google.com/drive/1SjPySh0j8cE25v9tHlXa-5NrkdnmY3_x?usp=sharing" label= "League of Leagends Analysis (Python + Pandas + Matplotlib)"/></li>
        </ul>

      </Card>
      
    </div>
  </section>
);

export default Home;

