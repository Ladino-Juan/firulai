import Image from "next/image";
import DogAi from "../public/assets/dogAI.webp";
import CatShader from "../public/assets/catShader.webp";
import Rocky from "../public/assets/rockyReal.webp";
import CatAi from "../public/assets/catAI.webp";
import Planet1 from "../public/assets/planet1.svg";
import Planet2 from "../public/assets/planet2.svg";
import Planet3 from "../public/assets/planet3.svg";
import Planet4 from "../public/assets/planet4.svg";
import Planet5 from "../public/assets/planet5.svg";
import Plate1 from "../public/assets/plate1.svg";
import Plate2 from "../public/assets/plate2.svg";
import Plate3 from "../public/assets/plate3.svg";
import FrogHat from "../public/assets/store/frogHat.webp";
import FoxHat from "../public/assets/store/foxHat.webp";
import PixelGlasses from "../public/assets/store/pixelGlasses.webp";
import TennisBall from "../public/assets/store/tennisBall.webp";
import Bear from "../public/assets/store/bear.webp";
import Skate from "../public/assets/store/skate.webp";

import Link from "next/link";
import Experience from "./components/Experience";
import Loading from "./loading";
import { Suspense } from "react";

export default function Home() {
  const planets = [
    {
      src: Planet1,
      className:
        "right-24 absolute -z-10 animate-circle w-[120px] max-sm:w-[60px] max-sm:top-2/4",
    },
    {
      src: Planet2,
      className:
        "top-1/3 right-1/3 absolute -z-10 animate-spin-slow w-[80px] max-sm:w-[40px] max-sm:left-20 max-sm:top-[65vh]",
    },
    {
      src: Planet3,
      className:
        "bottom-36 right-96 absolute -z-10 animate-circle w-[120px] max-sm:w-[60px] max-sm:left-20 max-sm:top-2/4",
    },
    {
      src: Planet4,
      className:
        "top-32 right-64 absolute -z-10 animate-circle-fast w-[134px] max-sm:w-[120px] max-sm:top-3/4 max-sm:right-2/4",
    },
    {
      src: Planet5,
      className:
        "right-10 bottom-36 absolute -z-10 animate-circle-fast w-[134px] max-sm:w-[130px]",
    },
  ];
  return (
    <>
      <div className="flex justify-around items-center overflow-hidden h-[80vh] max-sm:flex-col mt-20">
        <div className="flex flex-col w-2/5 max-sm:w-[80vw] max-sm:text-center space-y-4">
          <h1 className="font-solaris text-7xl text-main text-left max-sm:text-4xl max-sm:text-center">
            fIrulaiS
          </h1>
          <p className="text-xl text-whitePearl max-sm:text-sm">
            Where virtual reality meets real-world impact! Join us on an
            immersive journey of compassion and care for sheltered pets as you
            dive into the exciting world of pet simulation.
          </p>
        </div>
        <Image
          src={DogAi}
          alt="Firulais dog AI"
          className="w-[400px] max-sm:w-[200px]"
          quality={100}
        ></Image>
        {planets.map((planet, index) => (
          <Image
            key={index}
            src={planet.src}
            alt="Firulais dog AI"
            className={planet.className}
          />
        ))}
      </div>
      <div className="w-full max-h[160vh] flex justify-center items-center max-sm:mt-[20vh]">
        <div className="w-[90%] h-[80%] rounded-xl grid grid-cols-2 max-sm:grid-cols-1 content-center justify-items-center">
          <div className="col-span-2 w-[80%] mb-5">
            <h1 className="text-lg text-main sm:text-2xl max-sm:text-center">
              PLAY WITH YOUR VIRTUAL FRIEND
            </h1>
          </div>

          <div className="w-[30vw] h-[40vh] bg-lightGray rounded-xl max-sm:h-[50vh] max-sm:w-[80vw]">
          <Suspense fallback={<Loading />}>
            <Experience />
            </Suspense>
          </div>
          <div className="w-[40vw] h-[40vh] l max-sm:h-[50vh] max-sm:w-[80%] grid grid-cols-3 gap-5 max-sm:grid-cols-2 max-sm:col-span-2 max-sm:mt-10">
            <div className="bg-lightGray rounded-xl flex items-center justify-center">
              <Image
                src={FrogHat}
                alt="Firulais App"
                className="w-full"
              ></Image>
            </div>
            <div className="bg-lightGray rounded-xl flex items-center justify-center">
              <Image src={FoxHat} alt="Firulais App" className="w-full"></Image>
            </div>
            <div className="bg-lightGray rounded-xl flex items-center justify-center">
              <Image
                src={PixelGlasses}
                alt="Firulais App"
                className="w-full"
              ></Image>
            </div>
            <div className="bg-lightGray rounded-xl flex items-center justify-center">
              <Image src={TennisBall} alt="Firulais App"></Image>
            </div>
            <div className="bg-lightGray rounded-xl flex items-center justify-center">
              <Image src={Bear} alt="Firulais App" className="w-full"></Image>
            </div>
            <div className="bg-lightGray rounded-xl flex items-center justify-center">
              <Image src={Skate} alt="Firulais App" className="w-full"></Image>
            </div>
          </div>
          <Link href="/dashboard">
            <button
              className="mt-5 flex px-8 py-2 hover:bg-main text-blanco font-semibold hover:text-white border border-white hover:border-transparent rounded-lg transition-all duration-300"
              aria-label="Firulais"
            >
              PLAY <span className="border border-white px-2 ml-2">BETA</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="h-screen w-full flex justify-center mt-20 items-center max-sm:flex-col">
        <div>
          <div className="flex items-center max-sm:justify-center">
            <h2 className="w-2/3 max-sm:text-sm">
              Play, care, and enjoy your virtual dog, inspired by a real-life
              rescued pet!
            </h2>
            <Image
              src={Plate1}
              alt="Firulais App"
              className="w-[100px] max-sm:w-[50px] ml-5"
            ></Image>
          </div>
          <div className="flex items-center mt-5 max-sm:justify-center">
            <h2 className="w-2/3 max-sm:text-sm">
              Personalize your virtual friend with trendy collars, toys,
              clothes, and more!
            </h2>
            <Image
              src={Plate2}
              alt="Firulais App"
              className="w-[100px] max-sm:w-[50px] ml-5"
            ></Image>
          </div>
          <div className="flex items-center mt-5 max-sm:justify-center">
            <h2 className="w-2/3 max-sm:text-sm">
              20% of the earnings generated from the game will be directly used
              to benefit sheltered pets
            </h2>
            <Image
              src={Plate3}
              alt="Firulais App"
              className="w-[100px] max-sm:w-[50px] ml-5"
            ></Image>
          </div>
        </div>
        <div className="relative max-sm:mt-20">
          <Image
            src={CatAi}
            alt="Firulais App"
            className="w-[400px] max-sm:w-[250px]"
            quality={100}
          ></Image>
          <Image
            src={CatShader}
            alt="Firulais App"
            className="w-[400px] max-sm:w-[250px] absolute top-0 left-0 animate-pulse"
          ></Image>
        </div>
      </div>
      <div className="w-full h-[70vh] flex justify-around items-center text-center max-sm:flex-col-reverse">
        <Image
          src={Rocky}
          alt="Firulais App"
          className="w-[300px] max-sm:w-[250px] rounded-xl"
          quality={100}
        ></Image>
        <div className="w-1/3 max-sm:w-[80vw]">
          <h1 className="text-main text-3xl max-sm:text-xl">
            BEYOND ENTERTAINMENT
          </h1>
          <p className="text-lg max-sm:text-sm mt-4">
            It's about making a difference in the lives of rescued pets. Every
            purchase you make in the game directly supports these animals,
            providing them with the love, care, and attention they truly
            deserve.
          </p>
        </div>
      </div>
    </>
  );
}
