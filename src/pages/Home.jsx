import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-mesh text-white overflow-x-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center space-y-8 px-4 md:px-6 py-20 text-center">
        <div className="animate-fade-in-up space-y-4 md:space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight">
            Welcome to{" "}
            <span className="text-gradient block md:inline">
              Virtura ImmersiveLearn
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-5xl font-bold underline underline-offset-4">
            Virtual Today. Skilled Tomorrow.
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-xl leading-relaxed">
            A next-generation web-based AR/VR training platform. Experience
            interactive 3D simulations that make learning intuitive and
            immersive.
          </p>
        </div>

        <div className="animate-fade-in-up mt-6 md:mt-10 [animation-delay:200ms]">
          <Link
            to="/training"
            className="group md:px-8 md:py-4 rounded-full font-bold text-base md:text-lg shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse-glow inline-block"
          >
            <span className="relative z-10 border border-white px-4 md:px-6 py-2 rounded-full bg-linear-to-r from-blue-600 to-purple-600 flex items-center">
              Go to Training ➡️
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
