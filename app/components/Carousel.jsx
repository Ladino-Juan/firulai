"use client"
import { useState } from 'react';
import { ArrowRightIcon } from "@heroicons/react/outline";
import { ArrowLeftIcon } from "@heroicons/react/outline";

const Carousel = () => {
    const slides = [
        {
          url: './assets/mascotas/mascota2.jpg',
        },
        {
          url: './assets/mascotas/mascota1.jpg',
        },
        {
          url: './assets/mascotas/mascota3.jpg',
        },
    
      ];
    
      const [currentIndex, setCurrentIndex] = useState(0);
    
      const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
      };
    
      const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
      };
    
      const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
      };
    
      return (
        <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group'>
          <div
            style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
            className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
          ></div>
          {/* Left Arrow */}
          <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <ArrowLeftIcon onClick={prevSlide} className='w-5'/>
          </div>
          {/* Right Arrow */}
          <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <ArrowRightIcon onClick={nextSlide} className="w-5"/>
          </div>
          <div className='flex top-4 justify-center py-2'>
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className='text-2xl cursor-pointer'
              >
                 <img
              src="./icons/dot.svg"
              className="ml-1"
              alt="firulais"
            ></img>
              </div>
            ))}
          </div>
        </div>
      );
}

export default Carousel