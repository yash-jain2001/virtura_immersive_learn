import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="pt-24 px-4 md:px-8 pb-8 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
          About Us
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed text-center">
          Virtura ImmersiveLearn is focused on building immersive, web-based
          training experiences using AR/VR technologies.
        </p>
      </div>
    </div>
  );
}
