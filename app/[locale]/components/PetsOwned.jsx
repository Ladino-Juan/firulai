"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Carousel from "./Carousel";
import LoaderIcon from "@assets/loader.gif";
import useEmblaCarousel from "embla-carousel-react";
import { getlocales } from "../../actions";
import { useRef } from "react";

import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/outline";

const PetsOwned = ({ modelData, lang }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading status

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
    async function fetchData() {
      setLoading(true); // Set loading to true when fetching starts

      try {
        const { dashboard } = await getlocales(lang);
        setDashboard(dashboard);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally, you can set an error state here to display an error message.
      } finally {
        setLoading(false); // Set loading to false when fetching is done
      }
    }
    fetchData();
  }, [lang]);


    // Show loading state
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Image src={LoaderIcon} alt="Firulais dog AI" width={50} height={50} />
        </div>
      );
    }

  const handlePetClick = (petId) => {
    onSelect(petId);
  };

  return (
    <>
      <div className="flex justify-center items-start h-[40vh] max-sm:mt-14">
        <div
          className={`overflow-hidden w-[98vw] lg:h-[80vh] h-[40vh] rounded-xl lg:-mt-14 `}
          ref={emblaRef}
        >
          <div
            className={`flex ${modelData.length < 3 ? "justify-center" : ""}`}
          >
            {modelData.map((firu, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col items-start space-y-5 embla__slide bg-gradient-to-t from-emerald-500 to-emerald-400 max-sm:bg-none rounded-xl mt-48 max-sm:mt-10 cursor-pointer group`}
                onClick={() => {
                  handlePetClick(firu[3]);
                }}
              >
                <div className="absolute max-sm:translate-x-0 max-sm:translate-y-0 max-sm:transform-none max-sm:mx-auto -translate-y-12 transition-transform duration-700 group-hover:scale-110">
                  <Image
                    src={firu[1]}
                    alt={`Mascota sin hogar ${firu[0][0]}`}
                    className="block max-sm:w-[250px] max-sm:h-[250px]"
                    priority
                    unoptimized
                    width={280} // Set the width of the image
                    height={280} // Adjust height to maintain aspect ratio
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-sm:min-h-min flex lg:mt-44 justify-end items-center space-x-4 relative max-sm:flex-col">
        {selectedPet && (
          <>
            <div className="md:w-screen w-[90vw] text-white text-center md:flex md:justify-end">
              <div
                className={`w-full lg:w-3/4 lg:h-[120vh] max-h-min max-sm:py-10 rounded-l-3xl max-sm:rounded-3xl shadow-2xl bg-green-500 space-y-4 flex flex-col justify-center items-end max-sm:flex-col max-sm:mb-20 max-sm:items-center mb-10`}
              >
                <h1 className="font-bold max-sm:text-white md:text-8xl text-5xl max-sm:w-[70vw] max-sm:font-bold opacity-80 max-sm:opacity-90 flex justify-start max-sm:justify-center lg:w-3/4 mr-32 max-sm:mr-0">
                  {selectedPet[0][0]}
                </h1>

                <p className="opacity-80 md:text-xl md:font-bold max-sm:text-sm text-white text-left lg:w-3/4  mr-32 max-sm:mr-0">
                  {`${dashboard?.shelter}: ${selectedPet[0][6]}`}
                </p>

                <div className="flex opacity-80 mr-32 max-sm:mr-0 space-x-5">
                  <div className="flex flex-col">
                    <h1 className="text-base  max-sm:text-sm font-semibold">
                      {dashboard?.age}
                    </h1>
                    <h2 className="text-sm  max-sm:text-xs">
                      {selectedPet[0][4]}
                    </h2>
                  </div>

                  <div className="flex flex-col">
                    <h1 className="text-base  max-sm:text-sm font-semibold">
                      {dashboard?.size}
                    </h1>
                    <h2 className="text-sm  max-sm:text-xs">
                      {selectedPet[0][3]}
                    </h2>
                  </div>

                  <div className="flex flex-col">
                    <h1 className="text-base  max-sm:text-sm font-semibold">
                      {dashboard?.state}
                    </h1>
                    <h2 className="text-sm  max-sm:text-xs">
                      {selectedPet[0][2]}
                    </h2>
                  </div>
                </div>
                <h3 className="text-justify text-lg opacity-80 lg:w-3/4 md:w-3/4 w-[80vw] max-sm:p-2 rounded-xl max-sm:bg-green-600 max-sm:shadow-inner mr-32 max-sm:mr-0 max-sm:text-xs">
                  {selectedPet[0][5]}
                </h3>
                <div className="md:h-64 h-28 flex justify-center w-full space-x-5 py-5">
                  <div className="md:w-2/6 w-[40%] h-full rounded-xl">
                    <Carousel mediaData={selectedPet[5]} type={"photo"} />
                  </div>
                  <div className="md:w-2/6 w-[40%] h-full rounded-xl">
                    <Carousel mediaData={selectedPet[6]} type={"video"} />
                  </div>
                </div>

                {/* Position the second image at the bottom-right corner */}
                <div className="absolute bottom-50 left-0 z-20">
                  <Image
                    src={selectedPet[1]}
                    alt="firulai recauda fondos para mascotas sin hogar"
                    unoptimized
                    width={600}
                    height={600}
                    className="rounded-md md:w-[400px] xl:w-[600px] lg:block hidden"
                  />
                </div>
                <div className="flex justify-center w-full">
                  <h1 className="w-[80vw] md:w-2/4 flex justify-center py-2 rounded-xl max-sm:text-xs">
                    {dashboard?.gratitude}
                  </h1>
                </div>
                <h1 className="opacity-80 w-2/4 mr-32 max-sm:mr-0 text-left pt-10 max-sm:text-sm max-sm:text-center max-sm:pt-2">{`${dashboard?.update}: ${selectedPet[4]}`}</h1>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PetsOwned;
