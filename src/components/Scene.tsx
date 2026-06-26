import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import Earth from "./Earth";
import Moon from "./Moon";
import Atmosphere from "./Atmosphere";

export default function Scene() {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight; // 1 screen scroll

    const t = Math.min(scrollY / maxScroll, 1);

    if (group.current) {
      group.current.scale.setScalar(1 - t * 0.3);
      group.current.position.y = t * 0.8;
    }
  });

  return (
    <group ref={group}>
      <Earth />
      <Atmosphere />
      <Moon />
    </group>
  );
}