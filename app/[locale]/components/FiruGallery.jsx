"use client";

import { useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/outline";

const FiruGallery = ({ modelData }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true } /*, [Autoplay()]*/
  );
  const handlePrevious = () => {
    emblaApi?.scrollPrev();
  };
  const handleNext = () => {
    emblaApi?.scrollNext();
  };

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setCurrentIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const handlePetClick = (petId) => {
    onSelect(petId);
  };

  return (
    <>
      <div className="flex justify-center items-center h-[75vh] max-sm:h-[40vh] max-sm:mt-24">
        <div
          className={`embla w-[98vw] h-full min-h-min rounded-xl`}
          ref={emblaRef}
        >
          <div
            className={`embla__container ${
              modelData.length < 3 ? "justify-center" : ""
            }`}
          >
            {modelData.map((firu, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col items-center embla__slide bg-gradient-to-t max-sm:bg-none rounded-xl max-sm:mt-10 cursor-pointer group`}
                onClick={() => handlePetClick(firu[3])}
              >
                <div className=" max-sm:mx-auto transition-transform duration-700 group-hover:scale-110">
                  <Image
                    src={firu}
                    alt={`Dog ${firu}`}
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
      <div
        className={`flex justify-center gap-x-5 ${
          modelData.length < 2 ? "hidden" : "visible"
        }`}
      >
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
    </>
  );
};

export default FiruGallery;
