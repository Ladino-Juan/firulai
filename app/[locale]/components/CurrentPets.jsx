"use client";

import { dogs } from "../models";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const CurrentPets = ({ lang }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedPet, setSelectedPet] = useState(null);

  const targetSectionRef = useRef(null);
  
 const handleScrollToSection = () => {
    if (targetSectionRef.current) {
      targetSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  
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
    <div className="w-full min-h-screen flex justify-around items-center space-x-4 relative max-sm:flex-col max-sm:mt-20">
      <div className="w-full lg:w-1/4 md:w-2/4 h-[80vh]  bg-green-600 rounded-3xl flex justify-center items-center relative flex-col p-10 space-y-5  text-white">
        {selectedPet && (
          <>
            <div className="absolute -top-10 md:top-0 left-0 w-full h-[35vh]">
              <Image
                src={selectedPet.firuData.realFiru}
                alt={`Ayuda a ${selectedPet.firuData.name} a conseguir un hogar`}
                className="md:rounded-t-3xl object-cover"
                layout="fill"
                priority
              />
              <h1 className="font-bold text-7xl opacity-80 p-5 md:p-10 max-sm:text-5xl">
                {selectedPet.firuData.name}
              </h1>
            </div>
            <div className="absolute w-full h-[45vh] p-10 bottom-5">
              <div className="absolute -bottom-24 max-sm:-bottom-28 -right-36 max-sm:left-0 max-sm:-right-0">
                <Image
                  src={selectedPet.firuData.modelFiru}
                  alt={`Un hogar para ${selectedPet.firuData.name}`}
                  width={220}
                  height={220}
                  priority
                  className="rounded-md max-sm:w-[150px]"
                />
              </div>
              <h3 className="text-center text-sm">
              {selectedPet.firuData.history[lang]}
              </h3>
              <div className="w-full flex justify-center mt-2">
              <button onTouchStart={handleScrollToSection} onClick={handleScrollToSection} className="py-2 px-4 bg-darkGreen hover:scale-110  hover:bg-darkestGreen transition-all duration-700 shadow-inner rounded-lg max-sm:hidden">
                ¡Apadríname!
              </button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="lg:w-2/4 md:w-1/4 w-[90vw] grid lg:grid-cols-3 md:grid-cols-1 grid-cols-2 gap-10 my-10 max-sm:my-32">
        {dogs.map((firu) => (
          <div
            key={firu.id}
            className="flex flex-col items-center space-y-5"
            onClick={() => handlePetClick(firu.id)}
          >
            <h1 className="w-full flex justify-center font-normal text-xs text-white bg-green-500 p-2 rounded-lg shadow-inner">
              {firu.firuData.name}
            </h1>
            <div className="lg:w-32 lg:h-32 md:w-20 md:h-20 w-28 h-28 bg-green-500 rounded-full flex items-center justify-center relative modelFiruImage cursor-pointer">
              <Image
                src={firu.firuData.realFiru}
                alt={`Ayuda a ${firu.firuData.name} a conseguirle un hogar`}
                className="rounded-full object-cover z-10"
                quality={100}
                fill
                priority
              />
              <div  ref={targetSectionRef} className="absolute -bottom-5 md:bottom-0 -left-7 md:-left-9 z-20 w-16 h-20 md:w-14 md:h-16 lg:w-20 lg:h-24">
                <Image
                  src={firu.firuData.modelFiru}
                  alt={`Mascota sin hogar ${firu.firuData.name} Colombia`}
                  fill
                  className="rounded-md modelFiruImageInner"
                  priority
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
