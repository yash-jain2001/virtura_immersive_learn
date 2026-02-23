import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col bg-gray-900 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl font-bold">Welcome to Virtura ImmersiveLearn</h1>
        <p className="text-gray-300 max-w-xl text-center">
          Virtura ImmersiveLearn is a web-based AR/VR training platform that lets
          you learn through interactive 3D simulations directly in your browser.
        </p>

        <Link
          to="/training"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white font-semibold"
        >
          Go to Training
        </Link>
      </div>
    </div>
  );
}