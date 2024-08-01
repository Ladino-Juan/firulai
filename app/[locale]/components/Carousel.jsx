import { useState, useEffect } from "react";
import { ArrowRightIcon, ArrowLeftIcon, XIcon } from "@heroicons/react/outline";
import Image from "next/image";

const Carousel = ({ mediaData, type }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(
    Array(mediaData.length).fill(false)
  );
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    if (imagesLoaded.every((status) => status)) {
      setAllImagesLoaded(true);
    }
  }, [imagesLoaded]);

  const handleImageClick = (image, index) => {
    if (allImagesLoaded) {
      setSelectedImage(image);
      setCurrentIndex(index); // Set currentIndex to the index of the clicked image
    }
  };

  const handleImageLoad = (index) => {
    setImagesLoaded((prev) => {
      const newLoadedStatus = [...prev];
      newLoadedStatus[index] = true;
      return newLoadedStatus;
    });
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? mediaData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    if (type === "photo") {
      setSelectedImage(mediaData[newIndex]); // Update selectedImage for images
    }
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === mediaData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    if (type === "photo") {
      setSelectedImage(mediaData[newIndex]); // Update selectedImage for images
    }
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
    if (type === "photo") {
      setSelectedImage(mediaData[slideIndex]); // Update selectedImage for images
    }
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains("modal-background")) {
      setSelectedImage(null);
      setCurrentIndex(0); // Reset currentIndex if modal is closed
    }
  };

  return (
    <div className="h-full w-full m-auto relative group">
      {type === "photo" ? (
        <div
          style={{ backgroundImage: `url(${mediaData[0]})` }}
          className="w-full h-full cursor-pointer rounded-2xl bg-center bg-cover duration-300"
          onClick={ 
            nextSlide
          }
        ></div>
      ) : (
        <>
          <video
            controls
            className="w-full h-full rounded-2xl"
            src={mediaData[currentIndex]}
            type="video/mp4"
          ></video>
          {/* Left Arrow */}
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <ArrowLeftIcon onClick={prevSlide} className="w-5" />
          </div>
          {/* Right Arrow */}
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <ArrowRightIcon onClick={nextSlide} className="w-5" />
          </div>
        </>
      )}

      <div className="flex top-4 justify-center py-2">
        {mediaData.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <Image
              src="/icons/dot.svg"
              width={5}
              height={5}
              className="ml-1"
              alt="firulai"
            />
          </div>
        ))}
      </div>
      {selectedImage && (
        <div
          className="modal-background z-50 fixed top-0 left-0 w-full h-full bg-black/50 flex max-sm:items-start items-center justify-center"
          onClick={handleModalClick}
        >
          <div className="relative flex items-center justify-center max-w-full max-h-full">
            <img
              src={selectedImage}
              alt="firulai imagen"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-3xl max-sm:mt-20"
              onLoad={() => handleImageLoad(currentIndex)}
            />
            <button
              aria-label="Close"
              className="absolute top-2 max-sm:top-24 right-5 rounded-full bg-darkGreen hover:bg-darkestGreen duration-700 p-2 hover:bg-blanco z-10"
              onClick={() => {
                setSelectedImage(null);
                setCurrentIndex(0); // Reset currentIndex if modal is closed
              }}
            >
              <XIcon className="w-5 text-blanco text-3xl hover:text-white" />
            </button>

            {/* Left Arrow in Modal */}
            <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/50 text-white cursor-pointer z-10">
              <ArrowLeftIcon onClick={prevSlide} className="w-5" />
            </div>
            {/* Right Arrow in Modal */}
            <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/50 text-white cursor-pointer z-10">
              <ArrowRightIcon onClick={nextSlide} className="w-5" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
