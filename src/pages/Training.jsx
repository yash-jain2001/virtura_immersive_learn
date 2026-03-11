import { useState, useRef, useEffect, useCallback } from "react";
import { createXRStore } from "@react-three/xr";
import XRScene from "../components/XRScene";
import Navbar from "../components/Navbar";

export default function Training() {
  const steps = [
    { instruction: "Click the orange box", target: "switch" },
    { instruction: "Click the blue box", target: "button" },
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [xrStoreReady, setXrStoreReady] = useState(false);

  const currentStep = steps[currentStepIndex];

  /* ── DOM overlay ref ─────────────────────────────────────────── */
  const overlayRef = useRef(null);
  const storeRef = useRef(null);

  /*
   * Create the XR store once the overlay div has mounted.
   * We keep it in a ref so it's stable across re-renders and
   * use a state flag to trigger a single re-render when ready.
   */
  useEffect(() => {
    if (overlayRef.current && !storeRef.current) {
      storeRef.current = createXRStore({
        optionalFeatures: ["hit-test", "dom-overlay", "local-floor"],
        domOverlay: { root: overlayRef.current },
      });
      setXrStoreReady(true);
    }
  }, []);

  /* ── Enter AR using the same store that powers <XR> ─────────── */
  const enterAR = useCallback(() => {
    if (storeRef.current) {
      storeRef.current.enterAR();
    }
  }, []);

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

  /* ── Training HUD — shown in both desktop & AR overlay ─────── */
  const TrainingHUD = (
    <>
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
          className={`text-sm font-medium px-2 py-1 rounded ${
            feedback.includes("✅")
              ? "bg-green-500/30 text-green-300"
              : feedback.includes("🎉")
                ? "bg-green-500/30 text-green-300"
                : "bg-red-500/30 text-red-300"
          }`}
        >
          {feedback}
        </p>
      )}
    </>
  );

  return (
    <div className="w-screen h-screen relative">
      {/* Navbar */}
      <Navbar />

      {/*
        DOM Overlay container — this div is registered as the WebXR
        domOverlay root, so everything inside it stays visible during
        the AR session on top of the camera pass-through.
      */}
      <div
        ref={overlayRef}
        className="absolute top-24 left-4 right-4 md:left-8 md:right-auto md:w-80 z-10 bg-black/60 backdrop-blur-md text-white p-4 rounded-xl border border-white/10 space-y-2 animate-fade-in-up"
      >
        {TrainingHUD}

        <button
          onClick={enterAR}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded mt-2"
        >
          View in AR
        </button>
      </div>

      {/* 3D Scene — only mount once the store is ready */}
      {xrStoreReady && (
        <XRScene onObjectClick={handleObjectClick} store={storeRef.current} />
      )}
    </div>
  );
}
