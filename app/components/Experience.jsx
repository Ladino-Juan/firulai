"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import dynamic from 'next/dynamic'
const ComponentA = dynamic(() => import('./Rocky').then(module => module.Rocky), {
  ssr: false,
});

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
          <ComponentA />
        </group>
      </Canvas>
    </>
  );
};

export default Experience;
