import { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/outline";
import { ArrowLeftIcon } from "@heroicons/react/outline";

const Carousel = ({ mediaData, type }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? mediaData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === mediaData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="h-full w-full m-auto relative group">
      {type === "photo" ? (
        <div
          style={{ backgroundImage: `url(${mediaData[currentIndex]})` }}
          className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
        ></div>
      ) : (
        <video
          autoPlay
          controls
          className="w-full h-full rounded-2xl"
          src={mediaData[currentIndex]}
          type="video/mp4"
        ></video>
      )}

      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ArrowLeftIcon onClick={prevSlide} className="w-5" />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ArrowRightIcon onClick={nextSlide} className="w-5" />
      </div>
      <div className="flex top-4 justify-center py-2">
        {mediaData.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <img src="/icons/dot.svg" className="ml-1" alt="firulai"></img>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
