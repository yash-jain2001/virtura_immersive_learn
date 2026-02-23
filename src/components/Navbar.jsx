import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo / Title */}
      <div className="text-xl font-bold">
        Virtura Immersive Learn 🧑‍💻
      </div>

      {/* Nav Links */}
      <div className="space-x-6">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>
        <Link to="/about" className="hover:text-blue-400">
          About
        </Link>
        <Link to="/contact" className="hover:text-blue-400">
          Contact
        </Link>
        <Link
          to="/training"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Start Training
        </Link>
      </div>
    </nav>
  );
}