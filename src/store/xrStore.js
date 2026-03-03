import { createXRStore } from "@react-three/xr";

const xrStore = createXRStore({
  // Don't require hit-test as a mandatory feature — it blocks AR on
  // devices that don't support it. Keep it optional instead.
  optionalFeatures: ["hit-test", "dom-overlay", "local-floor"],
});

export default xrStore;
