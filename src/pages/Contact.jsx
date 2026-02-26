import Navbar from "../components/Navbar";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="pt-24 px-4 md:px-8 pb-8 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
          Contact
        </h1>
        <p className="text-lg text-gray-300">Made by Iotrenetics</p>
      </div>
    </div>
  );
}
