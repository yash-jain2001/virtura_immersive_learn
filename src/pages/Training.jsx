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
  const [feedbackKey, setFeedbackKey] = useState(0);
  const [xrStoreReady, setXrStoreReady] = useState(false);
  const [isInAR, setIsInAR] = useState(false);

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
      setIsInAR(true);
    }
  }, []);

  const handleObjectClick = (objectName) => {
    if (!currentStep) return;

    if (objectName === currentStep.target) {
      if (currentStepIndex < steps.length - 1) {
        setFeedback("✅ Correct!");
        setCurrentStepIndex((prev) => prev + 1);
      } else {
        setFeedback("🎉 Training Complete!");
      }
    } else {
      setFeedback("❌ Wrong object. Try again.");
    }

    /* bump key to force the DOM element to re-create,
       ensuring the AR overlay picks up the change */
    setFeedbackKey((k) => k + 1);
  };

  /* ── Training HUD — shown in both desktop & AR overlay ─────── */
  const TrainingHUD = (
    <div style={{ pointerEvents: "auto" }}>
      <p
        className="font-bold tracking-wide uppercase"
        style={{ color: "#60a5fa", fontSize: isInAR ? "16px" : "12px" }}
      >
        Training Module
      </p>

      {currentStep ? (
        <div style={{ marginTop: "8px" }}>
          <p
            style={{
              color: "#d1d5db",
              fontSize: isInAR ? "18px" : "14px",
            }}
          >
            Step {currentStepIndex + 1} / {steps.length}
          </p>
          <p
            className="font-semibold"
            style={{
              color: "#ffffff",
              fontSize: isInAR ? "22px" : "18px",
              marginTop: "4px",
            }}
          >
            👉 {currentStep.instruction}
          </p>
        </div>
      ) : (
        <p
          className="font-bold"
          style={{
            color: "#4ade80",
            fontSize: isInAR ? "22px" : "18px",
          }}
        >
          Training Completed 🎉
        </p>
      )}

      {feedback && (
        <p
          key={feedbackKey}
          style={{
            marginTop: "10px",
            padding: "8px 14px",
            borderRadius: "8px",
            fontSize: isInAR ? "20px" : "14px",
            fontWeight: 600,
            color: feedback.includes("❌") ? "#fca5a5" : "#86efac",
            backgroundColor: feedback.includes("❌")
              ? "rgba(239,68,68,0.5)"
              : "rgba(34,197,94,0.5)",
            border: feedback.includes("❌")
              ? "2px solid #ef4444"
              : "2px solid #22c55e",
          }}
        >
          {feedback}
        </p>
      )}
    </div>
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
        style={{
          position: "absolute",
          top: isInAR ? "20px" : "96px",
          left: isInAR ? "16px" : "16px",
          right: isInAR ? "16px" : "16px",
          zIndex: 9999,
          backgroundColor: isInAR
            ? "rgba(0, 0, 0, 0.85)"
            : "rgba(0, 0, 0, 0.6)",
          color: "#ffffff",
          padding: isInAR ? "20px" : "16px",
          borderRadius: "12px",
          border: isInAR
            ? "2px solid rgba(255,255,255,0.3)"
            : "1px solid rgba(255,255,255,0.1)",
          pointerEvents: "auto",
          maxWidth: isInAR ? "none" : "320px",
        }}
        className="backdrop-blur-md"
      >
        {TrainingHUD}

        {!isInAR && (
          <button
            onClick={enterAR}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded mt-2"
          >
            View in AR
          </button>
        )}
      </div>

      {/* 3D Scene — only mount once the store is ready */}
      {xrStoreReady && (
        <XRScene onObjectClick={handleObjectClick} store={storeRef.current} />
      )}
    </div>
  );
}
