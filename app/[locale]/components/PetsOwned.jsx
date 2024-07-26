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
      "bg-gradient-to-r from-red-500 to-orange-500",
      // Agrega más colores si tienes más slides
    ];

    setBgColor(colors[currentIndex % colors.length]);
  }, [currentIndex]);

  const handlePetClick = (petId) => {
    onSelect(petId);
  };

  return (
    <>
      <div className="flex justify-center items-start h-[40vh] max-sm:mt-14">
        <div
          className={`overflow-hidden w-[98vw] lg:h-[50vh] h-[40vh] rounded-xl lg:-mt-14 `}
          ref={emblaRef}
        >
          <div
            className={`flex ${modelData.length < 3 ? "justify-center" : ""}`}
          >
            {modelData.map((firu, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col items-start space-y-5 embla__slide bg-gradient-to-t from-emerald-500 to-emerald-400 max-sm:bg-none rounded-xl mt-48 max-sm:mt-10 cursor-pointer group`}
                onClick={() => handlePetClick(firu[3])}
              >
                <div className="absolute max-sm:translate-x-0 max-sm:translate-y-0 max-sm:transform-none max-sm:mx-auto -translate-y-12 transition-transform duration-700 group-hover:scale-125">
                  <Image
                    src={firu[1]}
                    alt={`Dog ${firu[0][0]}`}
                    className="block max-sm:w-[250px] max-sm:h-[250px]"
                    unoptimized
                    width={300} // Set the width of the image
                    height={300} // Adjust height to maintain aspect ratio
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-sm:min-h-screen flex justify-end items-center space-x-4 relative max-sm:flex-col max-sm:mt-10">
        {selectedPet && (
          <>
            <div className="md:w-screen w-[90vw] text-white text-center">
              <div
                className={`w-full lg:h-[140vh] h-[100vh] rounded-3xl max-sm:rounded-3xl bg-gradient-to-r from-[#6A66FC] to-indigo-600 space-y-4 flex flex-col justify-center items-end max-sm:flex-col max-sm:mb-20 max-sm:items-center mb-10`}
              >
                <h1 className="font-bold max-sm:text-white md:text-8xl text-6xl max-sm:font-bold opacity-80 max-sm:opacity-90 flex justify-start lg:w-2/4 mr-32 max-sm:mr-0">
                  {selectedPet[0][0]}
                </h1>
                <p className="opacity-80 text-lg text-white text-left lg:w-2/4  mr-32 max-sm:mr-0">
                  Fundación: Hogar Sarita Reyes
                </p>

                <div className="flex opacity-80 mr-32 max-sm:mr-0 space-x-5">
                  <div className="flex flex-col">
                    <h1 className="text-base  max-sm:text-sm font-semibold">
                      EDAD
                    </h1>
                    <h2 className="text-sm  max-sm:text-xs">
                      {selectedPet[0][4]}
                    </h2>
                  </div>

                  <div className="flex flex-col">
                    <h1 className="text-base  max-sm:text-sm font-semibold">
                      TAMAÑO
                    </h1>
                    <h2 className="text-sm  max-sm:text-xs">
                      {selectedPet[0][3]}
                    </h2>
                  </div>

                  <div className="flex flex-col">
                    <h1 className="text-base  max-sm:text-sm font-semibold">
                      COLOR
                    </h1>
                    <h2 className="text-sm  max-sm:text-xs">
                      {selectedPet[0][2]}
                    </h2>
                  </div>
                </div>
                <h3 className="text-justify text-xl opacity-80 lg:w-2/4 md:w-3/4 w-[70vw] mr-32 max-sm:mr-0 max-sm:text-sm">
                  {selectedPet[0][5]}
                </h3>
                <div className="md:h-64 h-28 flex justify-center lg:w-2/3 w-full space-x-5 pt-5">
                  <div className="md:w-2/5 w-[40%] h-full rounded-xl">
                    <Carousel mediaData={selectedPet[5]} type={"photo"} />
                  </div>
                  <div className="md:w-2/5 w-[40%] h-full rounded-xl">
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
                    className="rounded-md md:w-[400px] xl:w-[600px] lg:block hidden"
                  />
                </div>
                <h1 className="opacity-80 w-2/4 mr-32 max-sm:mr-0 text-left pt-20 max-sm:text-sm max-sm:text-center max-sm:pt-2">{`Última actualización: ${selectedPet[4]}`}</h1>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PetsOwned;
