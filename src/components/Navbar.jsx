import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-900/40 backdrop-blur-md border-b border-white/10 px-8 py-4 flex justify-between items-center transition-all duration-300">
      {/* Logo / Title */}
      <div className="text-2xl font-extrabold tracking-tight group cursor-pointer">
        <span className="text-white group-hover:text-blue-400 transition-colors duration-300">
          Virtura
        </span>
        <span className="text-gradient"> Immersive Learn</span>
        <span className="ml-1 animate-float inline-block">🧑‍💻</span>
      </div>

      {/* Nav Links */}
      <div className="flex items-center space-x-8">
        {[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Contact", path: "/contact" },
        ].map((link) => (
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
          <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:scale-105 transition-transform duration-500"></span>
          <span className="relative">Start Training</span>
        </Link>
      </div>
    </nav>
  );
}
