import { createXRStore } from "@react-three/xr";

const xrStore = createXRStore({
  requiredFeatures: ["hit-test"],
});

export default xrStore;
