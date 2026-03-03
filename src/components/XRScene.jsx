import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { XR } from "@react-three/xr";
import xrStore from "../store/xrStore";

function SceneContent({ onObjectClick }) {
  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Objects */}
      <mesh
        position={[-0.3, 0, -1]}
        onClick={(e) => {
          e.stopPropagation();
          onObjectClick("switch");
        }}
      >
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        position={[0.3, 0, -1]}
        onClick={(e) => {
          e.stopPropagation();
          onObjectClick("button");
        }}
      >
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="skyblue" />
      </mesh>

      {/* Only show OrbitControls in non-AR mode */}
      <OrbitControls />
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
