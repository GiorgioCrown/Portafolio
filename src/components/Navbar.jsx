import { NavLink } from "react-router-dom";

const base =
  "px-3 py-2 rounded-lg text-sm font-medium transition-colors";
const inactive =
  "text-[--muted] hover:bg-[--card] hover:text-[--fg] border border-transparent";
const active =
  "text-[--fg] bg-[--card] border border-[--border]";

const Navbar = () => (
  <header
    className="
      nav border-b border-[--border] sticky top-0 z-50
      backdrop-blur
    "
    // tu clase .nav ya aplica blur y fondo; dejamos border aquí
  >
    <div className="container nav__row">
      <a href="#/" className="nav__brand">Jorge.dev</a>
      <nav className="nav__menu" aria-label="Principal">
        <NavLink to="/" className={({isActive}) => `${base} ${isActive?active:inactive}`}>Inicio</NavLink>
        <NavLink to="/about" className={({isActive}) => `${base} ${isActive?active:inactive}`}>About</NavLink>
        <NavLink to="/contact" className={({isActive}) => `${base} ${isActive?active:inactive}`}>Contact</NavLink>
      </nav>
    </div>
  </header>
);

export default Navbar;
