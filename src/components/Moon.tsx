import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef } from "react";
import * as THREE from "three";

export default function Moon() {
  const ref = useRef<THREE.Mesh>(null);

  const moonMap = useLoader(
    TextureLoader,
    "/textures/8k_moon.jpg"
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (ref.current) {
      // orbit radius
      const radius = 2;

      // orbit speed
      const speed = 0.4;

      // tilted orbit (makes it look realistic)
      const tilt = 0.2;

      ref.current.position.x = Math.cos(t * speed) * radius;
      ref.current.position.z = Math.sin(t * speed) * radius;
      ref.current.position.y = Math.sin(t * speed) * tilt;

      // self rotation (moon spin)
      ref.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={ref} position={[2.2, 0.3, 0]}>
      <sphereGeometry args={[0.14, 32, 32]} />
      <meshStandardMaterial map={moonMap} />
    </mesh>
  );
}