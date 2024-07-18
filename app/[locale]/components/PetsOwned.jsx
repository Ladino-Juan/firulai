"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Carousel from "./Carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";

const PetsOwned = ({ modelData }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true } /*, [Autoplay()]*/
  );
  const handlePrevious = () => {
    emblaApi?.scrollPrev();
  };
  const handleNext = () => {
    emblaApi?.scrollNext();
  };
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedPet, setSelectedPet] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bgColor, setBgColor] = useState(
    "bg-gradient-to-tr from-emerald-700 to-green-300"
  );

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
    if (emblaApi) {
      emblaApi.on("select", () => {
        setCurrentIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  useEffect(() => {
    // Define los colores de fondo para cada índice de slide
    const colors = [
      "bg-gradient-to-r from-lime-500 to-lime-400",
      "bg-gradient-to-r from-lime-500 to-green-600",
      "bg-gradient-to-r from-blue-800 to-indigo-900",
      "bg-gradient-to-r from-red-500 to-orange-500"
      // Agrega más colores si tienes más slides
    ];

    setBgColor(colors[currentIndex % colors.length]);
  }, [currentIndex]);

  const handlePetClick = (petId) => {
    onSelect(petId);
  };

  return (
    <>
      <div className="flex justify-center items-center h-[80vh] max-sm:h-[60vh]">
        <div
          className={`embla w-[99vw] h-full min-h-min rounded-xl`}
          ref={emblaRef}
        >
          <div className={`embla__container ${modelData.length < 3 ? 'justify-center' : ''}`}>
            {modelData.map((firu, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col items-start space-y-5 embla__slide bg-gradient-to-t from-emerald-500 to-emerald-400 max-sm:bg-none rounded-xl mt-48 max-sm:mt-10 cursor-pointer group`}
                onClick={() => handlePetClick(firu[3])}
              >
                <div className="absolute transform -translate-x-10 max-sm:transform-none max-sm:mx-auto -translate-y-40 max-sm:-translate-y-20 transition-transform duration-700 max-sm:group-hover:scale-100 group-hover:scale-110">
                  <Image
                    src={firu[1]}
                    alt={`Dog ${firu[0][0]}`}
                    className="block max-sm:w-[250px] max-sm:h-[250px]"
                    unoptimized
                    width={300} // Set the width of the image
                    height={300} // Adjust height to maintain aspect ratio
                  />
                </div>
                <div className="w-[95%] h-[25vh] flex flex-col justify-center items-end mr-20 max-sm:hidden">
                  <h1 className="text-3xl font-bold text-white max-sm:text-4xl max-sm:text-center opacity-80">
                    {firu[0][0]}
                  </h1>
                  <br></br>
                  <p className="opacity-80 text-sm text-white text max-sm:hidden">
                    Fundación: Hogar Sarita Reyes
                  </p>
                  <p className="transition-transform max-sm:hidden duration-1000 text-white transform translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 underline">
                    Conoce más
                  </p>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-x-5">
        <button
          aria-label="go to previous slide"
          onClick={handlePrevious}
          className={`h-8 w-8 rounded-full flex items-center justify-center bg-none max-sm:opacity-95 opacity-50 hover:opacity-90 bg-opacity-40 z-10 shadow-md text-black`}
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <button
          aria-label="go to next slide"
          onClick={handleNext}
          className={`h-8 w-8 rounded-full flex items-center justify-center bg-none max-sm:opacity-95  opacity-50 hover:opacity-90 bg-opacity-40 z-10 shadow-md text-black`}
        >
          <ArrowRightIcon className={`w-5 h-5`} />
        </button>
      </div>
      <div className="w-full min-h-screen flex justify-end items-center space-x-4 relative max-sm:flex-col max-sm:mt-20">
        {selectedPet && (
          <>
            <div className="md:w-3/4 w-[90vw] text-white text-center">
              <div
                className={`w-full md:h-[90vh] h-[80vh] max-sm:h-[90vh] rounded-l-3xl max-sm:rounded-3xl bg-gradient-to-t from-emerald-500 to-emerald-400 space-y-4 flex flex-col justify-center items-end max-sm:flex-col max-sm:mb-20 max-sm:items-center`}
              >
                
                <h1 className="font-bold max-sm:text-white md:text-8xl text-6xl max-sm:font-bold opacity-80 max-sm:opacity-90 flex justify-start w-3/4 mr-32 max-sm:mr-0">
                  {selectedPet[0][0]}
                </h1>
                <p className="opacity-80 text-sm text-white md:hidden text-left w-3/4">
                    Fundación: Hogar Sarita Reyes
                  </p>
                <div className="flex opacity-80 mr-32 max-sm:mr-0 space-x-5">
                  <div className="flex flex-col">
                    <h1 className="text-base  max-sm:text-sm font-semibold">EDAD</h1>
                    <h2 className="text-sm  max-sm:text-xs">{selectedPet[0][4]}</h2>
                  </div>

                  <div className="flex flex-col">
                    <h1 className="text-base  max-sm:text-sm font-semibold">TAMAÑO</h1>
                    <h2 className="text-sm  max-sm:text-xs">{selectedPet[0][3]}</h2>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-base  max-sm:text-sm font-semibold">RAZA</h1>
                    <h2 className="text-sm  max-sm:text-xs" >{selectedPet[0][1]}</h2>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-base  max-sm:text-sm font-semibold">COLOR</h1>
                    <h2 className="text-sm  max-sm:text-xs">{selectedPet[0][2]}</h2>
                  </div>
                </div>
                <h3 className="text-justify opacity-80 w-3/4 mr-32 max-sm:mr-0 max-sm:text-sm">
                  {selectedPet[0][5]}
                </h3>
                <div className="w-full md:h-44 h-28 flex justify-end space-x-5 mr-10 mt-10">
                  <div className="md:w-1/5 w-[40%] h-full rounded-xl">
                    <Carousel mediaData={selectedPet[5]} type={"photo"} />
                  </div>
                  <div className="md:w-1/5 w-[40%] h-full rounded-xl">
                    <Carousel mediaData={selectedPet[6]} type={"video"} />
                  </div>
                </div>

                {/* Position the second image at the bottom-right corner */}
                <div className="absolute bottom-50 left-0 z-20">
                  <Image
                    src={selectedPet[1]}
                    alt="firulai"
                    unoptimized
                    width={600}
                    height={600}
                    className="rounded-md max-sm:hidden"
                  />
                </div>
              </div>

              <h1 className="text-lightGreen">{`Ultima actualizacion: ${selectedPet[4]}`}</h1>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PetsOwned;
