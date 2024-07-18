"use client";

import { dogs } from "../models";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const CurrentPets = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedPet, setSelectedPet] = useState(null);

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

    // Update selectedPet immediately after a new pet is selected
    const selected = dogs.find((firu) => firu.id === petId);
    setSelectedPet(selected);
  };

  useEffect(() => {
    // Set the initial value of current to the first firu.id when the component mounts
    if (!searchParams.get("selected")) {
      onSelect(dogs[0].id);
    } else {
      const selected = dogs.find(
        (firu) => firu.id === searchParams.get("selected")
      );
      setSelectedPet(selected);
    }
  }, []);

  const handlePetClick = (petId) => {
    onSelect(petId);
  };

  return (
    <div className="w-full min-h-screen flex justify-around items-center space-x-4 relative max-sm:flex-col">
      <div className="w-full md:w-1/4 h-[80vh] bg-green-500 rounded-3xl flex justify-center items-center relative flex-col p-10 space-y-5  text-white">
        {selectedPet && (
          <>
            <div className="absolute top-0 left-0 w-full h-[30vh]">
              <Image
                src={selectedPet.firuData.realFiru}
                alt={`Dog ${selectedPet.firuData.name}`}
                className="rounded-t-3xl object-cover"
                layout="fill"
              />
              <h1 className="font-bold text-7xl opacity-80 p-14 md:p-10">
                {selectedPet.firuData.name}
              </h1>
            </div>
            <div className="absolute w-full h-[50vh] p-10 bottom-5">
              <div className="absolute -bottom-24 max-sm:-bottom-16 -right-36 max-sm:right-0">
                <Image
                  src={selectedPet.firuData.modelFiru}
                  alt={`Model Firu ${selectedPet.firuData.name}`}
                  width={220}
                  height={220}
                  quality={100}
                  className="rounded-md max-sm:w-[150px]"
                />
              </div>
              <h3 className="text-justify font-extralight text-sm">
                {selectedPet.firuData.history}
              </h3>
            </div>
          </>
        )}
      </div>
      <div className="md:w-2/4 w-[90vw] grid md:grid-cols-3 grid-cols-2 gap-10 my-10">
        {dogs.map((firu) => (
          <div
            key={firu.id}
            className="flex flex-col items-center space-y-5"
            onClick={() => handlePetClick(firu.id)}
          >
            <h1 className="w-full flex justify-center font-normal text-xs text-white bg-green-500 p-2 rounded-lg shadow-inner">
              {firu.firuData.name}
            </h1>
            <div className="md:w-32 md:h-32 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center relative modelFiruImage cursor-pointer">
              <Image
                src={firu.firuData.realFiru}
                alt={`Dog ${firu.firuData.name}`}
                className="rounded-full object-cover z-10"
                quality={100}
                fill
              />
              <div className="absolute -bottom-5 md:bottom-0 -left-7 md:-left-9 z-20 w-14 h-16 md:w-20 md:h-24">
                <Image
                  src={firu.firuData.modelFiru}
                  alt={`Model Firu ${firu.firuData.name}`}
                  fill
                  className="rounded-md modelFiruImageInner"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentPets;
