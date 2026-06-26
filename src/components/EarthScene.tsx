import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, ScrollControls } from "@react-three/drei";
import Scene from "./Scene";

export default function EarthScene() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen -z-10">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>

        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 2, 5]} intensity={3} />
        <directionalLight position={[-5, -2, -5]} intensity={0.5} />

        <Stars radius={120} depth={60} count={2000} factor={3} fade />

        <Scene />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.3}
        />

      </Canvas>
    </div>
  );
}