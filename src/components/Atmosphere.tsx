import * as THREE from "three";

export default function Atmosphere() {
  return (
    <>
      {/* Main atmosphere glow */}
      <mesh scale={1.06}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#4cc9ff"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer soft glow ring (your snippet) */}
      <mesh scale={1.14}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#4cc9ff"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
}