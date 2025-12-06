import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import AnimatedBackground from "./components/AnimatedBackground.jsx";
import Home from "./pages/Home.jsx";
import Todos from "./pages/Developer/Todos.jsx";
import Weather from "./pages/Developer/Weather.jsx";
import Pokedex from "./pages/Developer/Pokedex.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Checkout from "./pages/Developer/Checkout.jsx";

const App = () => (
  <div className="min-h-screen flex flex-col relative">
    <AnimatedBackground />
    <div className="relative z-10 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/pokedex" element={<Pokedex />} />
      </Routes>
      </main>
      <footer className="footer">
        <div className="container" style={{ padding: "16px 24px" }}>
          <small>© {new Date().getFullYear()} Jorge — React + Tailwind + Shadcn</small>
        </div>
      </footer>
    </div>
  </div>
);

export default App;
