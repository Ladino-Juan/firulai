"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Carousel from "./Carousel";
import Link from "next/link";

const PetsOwned = ({ modelData }) => {
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
    const selected = modelData.find((firu) => firu[3] === petId);
    setSelectedPet(selected);
  };

  useEffect(() => {
    // Set the initial value of current to the first firu.id when the component mounts
    if (!searchParams.get("selected")) {
      onSelect(modelData[0][3]);
    } else {
      const selected = modelData.find(
        (firu) => firu[3] === searchParams.get("selected")
      );
      setSelectedPet(selected);
    }
  }, []);

  const handlePetClick = (petId) => {
    onSelect(petId);
  };

  return (
    <>
      <div className="w-full min-h-screen flex justify-around items-center space-x-4 relative max-sm:flex-col">
        {selectedPet && (
          <>
            <div className="w-full md:w-1/4 h-[80vh] bg-lightGreen rounded-2xl flex justify-center items-center flex-col p-10 space-y-5  text-darkGreen">
              <h1 className="font-bold text-2xl">{selectedPet[0][0]}</h1>
              <div className="w-28 h-24 flex items-center justify-center relative">
                <Image
                  src={selectedPet[2]}
                  alt="firulai"
                  unoptimized
                  className="object-contain z-10"
                  fill
                />
                {/* Position the second image at the bottom-right corner */}
                <div className="absolute bottom-0 -left-2 z-20">
                  <Image
                    src={selectedPet[1]}
                    alt="firulai"
                    unoptimized
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </div>
              </div>
              <h3 className="text-justify">{selectedPet[0][5]}</h3>
             {/* <Link
                   href="/dashboard/experience3d"
                className={`bg-darkGreen hover:bg-green-700 transition-all duration-300 text-white px-4 py-2 rounded-lg hover:scale-105`}
              >
                View firu in 3d
        </Link>*/}
            </div>
            <div className="md:w-2/4 w-[90vw] text-darkGreen text-center space-y-4">
              <div className="w-full h-64 rounded-xl bg-lightGreen flex justify-center items-center md:space-x-12 max-sm:flex-col max-sm:mt-10 max-sm:text-center">
                <div className="flex flex-col">
                  <h1 className="font-bold text-xl">EDAD</h1>
                  <h2>{selectedPet[0][4]}</h2>
                </div>
                <div className="flex flex-col">
                  <h1 className="font-bold text-xl">TAMAÑO</h1>
                  <h2>{selectedPet[0][3]}</h2>
                </div>
                <div className="flex flex-col">
                  <h1 className="font-bold text-xl">RAZA</h1>
                  <h2>{selectedPet[0][1]}</h2>
                </div>
                <div className="flex flex-col">
                  <h1 className="font-bold text-xl">COLOR</h1>
                  <h2>{selectedPet[0][2]}</h2>
                </div>
              </div>
              <h1 className="text-lightGreen">{`Ultima actualizacion: ${selectedPet[4]}`}</h1>
              <div className="w-full h-64 flex space-x-5">
                <div className="w-2/4 h-full bg-lightGreen rounded-xl">
                  <Carousel mediaData={selectedPet[5]} type={'photo'}/>
                </div>
                <div className="w-2/4 h-full bg-lightGreen rounded-xl">
                <Carousel mediaData={selectedPet[6]} type={'video'} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="h-[80vh] justify-center items-center ml-5 md:space-x-4 md:w-3/4 w-[90vw] grid md:grid-cols-6 grid-cols-2 gap-10 my-10">
        {modelData.map((firu, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center space-y-5"
            onClick={() => handlePetClick(firu[3])}
          >
            <h1 className="w-full flex justify-center font-bold text-lg text-darkGreen bg-lightGreen p-2 rounded-lg">
              {firu[0][0]}
            </h1>
            <div className="md:w-32 md:h-32 w-20 h-20 flex items-center justify-center relative modelFiruImage cursor-pointer">
              <Image
                src={firu[2]}
                alt={`Dog ${firu[0][0]}`}
                className="object-contain z-10"
                unoptimized
                quality={100}
                fill
              />
              <div className="absolute bottom-0 -left-2 z-20 w-10 h-10 md:w-14 md:h-14">
                <Image
                  src={firu[1]}
                  alt={`Model Firu ${firu[0][0]}`}
                  unoptimized
                  fill
                  className="rounded-md modelFiruImageInner"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PetsOwned;
