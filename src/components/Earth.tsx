import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef } from "react";
import * as THREE from "three";

export default function Earth() {
  const ref = useRef<THREE.Mesh>(null);

  const dayMap = useLoader(
    TextureLoader,
    "/textures/8k_earth_daymap.jpg"
  );

  const normalMap = useLoader(
    TextureLoader,
    "/textures/8k_earth_normal_map.jpg"
  );

  const specularMap = useLoader(
    TextureLoader,
    "/textures/8k_earth_specular_map.jpg"
  );

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <sphereGeometry args={[1, 80, 80]} />

      <meshPhongMaterial
        map={dayMap}
        normalMap={normalMap}
        specularMap={specularMap}
        specular={new THREE.Color(0x444444)}
        shininess={25}
      />
    </mesh>
  );
}