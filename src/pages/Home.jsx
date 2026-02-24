import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col bg-mesh text-white overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center space-y-8 px-6 text-center">
        <div className="animate-fade-in-up space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Welcome to{"  "}
            <span className="text-gradient">Virtura ImmersiveLearn</span>
          </h1>
          <h2 className="text-5xl font-bold underline underline-offset-4">Virtual Today. Skilled Tomorrow.</h2>
          <p className="text-white max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            A next-generation web-based AR/VR training platform. Experience
            interactive 3D simulations that make learning intuitive and
            immersive.
          </p>
        </div>

        <div className="animate-fade-in-up mt-10 [animation-delay:200ms]">
          <Link
            to="/training"
            className="group px-8 py-4 bg-blue-600 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse-glow"
          >
            <span className="relative z-10 border border-white px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center">
              Go to Training ➡️
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
