import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p>
          Virtura ImmersiveLearn is focused on building immersive, web-based
          training experiences using AR/VR technologies.
        </p>
      </div>
    </div>
  );
}