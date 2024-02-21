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
      <div className="w-full md:w-1/4 h-[80vh] bg-lightGreen rounded-2xl flex justify-center items-center relative flex-col p-10 space-y-5  text-darkGreen shadow-2xl">
        {selectedPet && (
          <>
            <h1 className="font-bold text-2xl">{selectedPet.firuData.name}</h1>
            <div className="w-24 h-24 bg-blanco rounded-full flex items-center justify-center relative">
              <Image
                src={selectedPet.firuData.realFiru}
                alt={`Dog ${selectedPet.firuData.name}`}
                className="rounded-full object-cover z-10"
                fill
              />
              {/* Position the second image at the bottom-right corner */}
              <div className="absolute bottom-0 -left-2 z-20">
                <Image
                  src={selectedPet.firuData.modelFiru}
                  alt={`Model Firu ${selectedPet.firuData.name}`}
                  width={40}
                  height={40}
                  className="rounded-md"
                />
              </div>
            </div>
            <h3 className="text-justify font-extralight text-sm">{selectedPet.firuData.history}</h3>
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
            <h1 className="w-full flex justify-center font-normal text-lg text-darkGreen bg-lightGreen p-2 rounded-lg shadow-2xl">
              {firu.firuData.name}
            </h1>
            <div className="md:w-32 md:h-32 w-20 h-20 bg-lightGreen rounded-full flex items-center justify-center relative modelFiruImage cursor-pointer">
              <Image
                src={firu.firuData.realFiru}
                alt={`Dog ${firu.firuData.name}`}
                className="rounded-full object-cover z-10"
                quality={100}
                fill
              />
              <div className="absolute bottom-0 -left-2 z-20 w-10 h-10 md:w-14 md:h-14">
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
