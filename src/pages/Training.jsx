import { useState } from "react";
import XRScene from "../components/XRScene";
import Navbar from "../components/Navbar";

export default function Training() {
  const steps = [
    { instruction: "Click the switch", target: "switch" },
    { instruction: "Click the button", target: "button" },
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [feedback, setFeedback] = useState("");

  const currentStep = steps[currentStepIndex];

  const handleObjectClick = (objectName) => {
    if (!currentStep) return;

    if (objectName === currentStep.target) {
      setFeedback("✅ Correct!");

      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex((prev) => prev + 1);
      } else {
        setFeedback("🎉 Training Complete!");
      }
    } else {
      setFeedback("❌ Wrong object. Try again.");
    }
  };

  return (
    <div className="w-screen h-screen relative">
      {/* Navbar */}
      <Navbar />
      {/* UI Overlay */}
      <div className="absolute top-24 left-4 right-4 md:left-8 md:right-auto md:w-80 z-10 bg-black/60 backdrop-blur-md text-white p-4 rounded-xl border border-white/10 space-y-2 animate-fade-in-up">
        <p className="font-bold text-blue-400 tracking-wide uppercase text-xs">
          Training Module
        </p>

        {currentStep ? (
          <div className="space-y-1">
            <p className="text-sm text-gray-400">
              Step {currentStepIndex + 1} / {steps.length}
            </p>
            <p className="font-semibold text-lg md:text-xl">
              👉 {currentStep.instruction}
            </p>
          </div>
        ) : (
          <p className="font-bold text-green-400 text-lg">
            Training Completed 🎉
          </p>
        )}

        {feedback && (
          <p
            className={`text-sm font-medium px-2 py-1 rounded ${feedback.includes("✅") ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}
          >
            {feedback}
          </p>
        )}
      </div>

      {/* 3D Scene */}
      <XRScene onObjectClick={handleObjectClick} />
    </div>
  );
}
