"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { PetModel } from "./PetModel";
import { dogs } from '../models'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PetsExperience = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSelect = (petId) => {
    const current = new URLSearchParams(searchParams);
    const value = petId.trim();

    if (!value) {
      current.delete("selected");
    } else {
      current.set("selected", petId);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  useEffect(() => {
    // Set the initial value of current to the first firu.id when the component mounts
    if (!searchParams.get("selected")) {
      onSelect('rec_cm2vdjr7qb0vcnhgaisg')
    }
  }, []);
  return (
    <div className="w-full flex justify-center space-x-4">
        {dogs.map((firu) => (
          <div
            key={firu.id}
            className="w-[10vw] h-[20vh] bg-slate-400 rounded-xl max-sm:h-[50vh] max-sm:w-[80vw] flex justify-center items-center cursor-pointer"
            onClick={() => onSelect(firu.id)}
          >
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
                
                <PetModel model={firu.url} />
             
              </group>
            </Canvas>
          </div>
        ))
      }
    </div>
  );
};

export default PetsExperience;
