"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect, Suspense } from "react";
import { Rocky } from "./Rocky";

const Experience = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for demonstration purposes
    const timer = setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after a delay (you can replace this with your logic)
    }, 2000); // Change the delay time as needed

    // Clear timeout if component unmounts
    return () => clearTimeout(timer);
  }, []);
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
          <Suspense fallback={null}>
            {!isLoading && <Rocky />}{" "}
            {/* Render Rocky component when isLoading is false */}
          </Suspense>
        </group>
      </Canvas>
    </>
  );
};

export default Experience;
