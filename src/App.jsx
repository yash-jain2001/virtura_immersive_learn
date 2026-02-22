import { useState } from "react";
import XRScene from "./components/XRScene";

function App() {
  // Training steps (very simple for now)
  const steps = [
    { instruction: "Click the orange cube", target: "switch" },
    { instruction: "Click the blue cube", target: "button" },
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [feedback, setFeedback] = useState("");

  const currentStep = steps[currentStepIndex];

  const handleObjectClick = (objectName) => {
    if (!currentStep) return;

    if (objectName === currentStep.target) {
      // Correct object
      setFeedback("✅ Correct!");

      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex((prev) => prev + 1);
      } else {
        // Training completed
        setFeedback("🎉 Training Complete!");
      }
    } else {
      // Wrong object
      setFeedback("❌ Wrong object. Try again.");
    }
  };

  return (
    <div className="w-screen h-screen relative">
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 z-10 bg-black/70 text-white px-4 py-2 rounded space-y-1">
        <p className="font-semibold">Virtura ImmersiveLearn — Step 4</p>

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

export default App;