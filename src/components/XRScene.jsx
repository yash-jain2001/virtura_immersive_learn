import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { XR, useXRStore } from "@react-three/xr";
import xrStore from "../store/xrStore";

function SceneContent({ onObjectClick }) {
  // Detect if we are in an active XR session
  const xrSession = useXRStore((state) => state.session);
  const isInAR = !!xrSession;

  return (
    <>
      {/* Lights — stronger for AR so objects are visible against camera feed */}
      <ambientLight intensity={isInAR ? 1.5 : 0.7} />
      <directionalLight position={[5, 5, 5]} intensity={isInAR ? 2 : 1} />
      <directionalLight position={[-3, 3, -3]} intensity={isInAR ? 1 : 0.3} />

      {/*
        Place objects in a group at a fixed position in front of origin.
        In AR, the camera starts at (0,0,0), so objects at z = -1.5
        will be ~1.5m ahead of the user.
      */}
      <group position={[0, 0, -1.5]}>
        {/* Orange box (switch) — left side */}
        <mesh
          position={[-0.3, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onObjectClick("switch");
          }}
        >
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="orange" />
        </mesh>

        {/* Blue box (button) — right side */}
        <mesh
          position={[0.3, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onObjectClick("button");
          }}
        >
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="skyblue" />
        </mesh>
      </group>

      {/* Disable OrbitControls during AR — it hijacks the camera */}
      {!isInAR && <OrbitControls />}
    </>
  );
}

export default function XRScene({ onObjectClick }) {
  return (
    <Canvas camera={{ position: [0, 1, 3], fov: 60 }} gl={{ alpha: true }}>
      <XR store={xrStore}>
        <SceneContent onObjectClick={onObjectClick} />
      </XR>
    </Canvas>
  );
}
