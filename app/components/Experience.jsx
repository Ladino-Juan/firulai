"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Husky } from "./Husky";

const Experience = () => {
  return (
    <>
      <Canvas camera={{ position: [5, 1.5, 8], fov: 50 }} shadows>
        <OrbitControls />
        <ambientLight />
        <directionalLight
          position={[-5, 5, 5]}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <group position={[0, -1, 0]}>

          <Husky />
        </group>
      </Canvas>
    </>
  );
};

export default Experience;
