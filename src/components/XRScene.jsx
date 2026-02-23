import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function SceneContent({ onObjectClick }) {
  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#777" />
      </mesh>

      {/* Switch (Object 1) */}
      <mesh
        position={[-1.5, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onObjectClick("switch");
        }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* Button (Object 2) */}
      <mesh
        position={[1.5, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onObjectClick("button");
        }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="skyblue" />
      </mesh>

      {/* Controls */}
      <OrbitControls />
    </>
  );
}

 function XRScene({ onObjectClick }) {
  return (
    <Canvas camera={{ position: [3, 3, 3], fov: 60 }}>
      <SceneContent onObjectClick={onObjectClick} />
    </Canvas>
  );
}

export default XRScene;
