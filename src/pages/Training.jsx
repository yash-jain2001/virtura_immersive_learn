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
      <div className="absolute top-16 left-4 z-10 bg-black/70 text-white px-4 py-2 rounded space-y-1">
        <p className="font-semibold">Training Module</p>

        {currentStep ? (
          <>
            <p>
              Step {currentStepIndex + 1} / {steps.length}
            </p>
            <p className="font-semibold">👉 {currentStep.instruction}</p>
          </>
        ) : (
          <p className="font-semibold text-green-400">Training Completed 🎉</p>
        )}

        {feedback && <p>{feedback}</p>}
      </div>

      {/* 3D Scene */}
      <XRScene onObjectClick={handleObjectClick} />
    </div>
  );
}