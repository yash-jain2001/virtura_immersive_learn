import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Disable body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] bg-gray-900/90 backdrop-blur-lg border-b border-white/10 px-4 md:px-8 py-4 flex justify-between items-center">
        {/* Logo / Title */}
        <Link
          to="/"
          className="text-xl md:text-2xl font-extrabold tracking-tight group cursor-pointer flex items-center relative z-[110]"
        >
          <span className="text-white group-hover:text-blue-400 transition-colors duration-300">
            Virtura
          </span>
          <span className="text-gradient pl-1"> Immersive Learn</span>
          <span className="ml-1 animate-float inline-block">🧑‍💻</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-300 hover:text-white font-medium transition-all duration-300 hover:-translate-y-0.5"
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/training"
            className="relative group px-6 py-2.5 rounded-full overflow-hidden font-bold text-white shadow-lg transition-all duration-300 active:scale-95"
          >
            <span className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 group-hover:scale-105 transition-transform duration-500"></span>
            <span className="relative">Start Training</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none relative z-[110] p-2"
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[9px]" : ""}`}
            ></span>
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 translate-y-[-9px]" : ""}`}
            ></span>
          </div>
        </button>
      </nav>

      {/* Mobile Menu Overlay - Moved OUTSIDE of the fixed nav for perfect behavior */}
      <div
        className={`fixed inset-0 w-full h-full bg-[#020617] flex flex-col items-center pt-32 px-6 transition-transform duration-300 md:hidden z-[105] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center space-y-12 w-full">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-4xl text-white font-black tracking-tight active:scale-95 transition-transform hover:text-blue-400"
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/training"
            onClick={() => setIsOpen(false)}
            className="w-full max-w-xs py-5 rounded-2xl bg-linear-to-r from-blue-600 to-purple-600 font-bold text-white text-center shadow-2xl shadow-blue-500/20 active:scale-95 transition-transform text-lg"
          >
            Start Training
          </Link>
        </div>

        <div className="mt-auto mb-10 text-gray-400 text-xs tracking-[0.3em] uppercase font-bold italic opacity-30">
          Virtura VR Simulations
        </div>
      </div>
    </>
  );
}
