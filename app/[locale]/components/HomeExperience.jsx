"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { PetModel } from "./PetModel";
import { Rocky } from "./Rocky";

const HomeExperience = () => {
  return (
    <>
      <Canvas camera={{ position: [3, 2, 10], fov: 45 }} shadows>
        <OrbitControls />
        <ambientLight />
        <directionalLight
          position={[-5, 5, 5]}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <group position={[0, -4, 0]}>
          <Rocky model={'/models/Rocky.glb'}/>
        </group>
      </Canvas>
    </>
  );
};

export default HomeExperience;
