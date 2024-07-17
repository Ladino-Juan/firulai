"use client";

import Image from "next/image";
import DogAI from "@assets/dogAI.gif";
import BgLanding from "@assets/background-landing.webp";
import BgLanding1 from "@assets/background-landing1.webp";
import Link from "next/link";
import { getlocales } from "../actions";
import CountUp from "react-countup";

export default async function Home({ params: lang }) {
  const { home } = await getlocales(lang.locale);
  return (
    <>
      <div className="flex justify-around max-sm:justify-center items-center overflow-hidden w-[90vw] h-[80vh] rounded-2xl mt-20 max-sm:flex-col bg-gradient-to-r from-emerald-700 to-emerald-500">
        <div className="flex flex-col w-4/5 max-sm:w-[80vw] max-sm:text-center space-y-4 ml-24 max-sm:ml-0">
          <h1 className="text-5xl font-bold text-white text-left max-sm:text-4xl max-sm:text-center">
            {home.title}
          </h1>
          <p className="text-lg text-white max-sm:text-sm">
            {home.description}
          </p>
          <br />
          <Link
            href={`/api/pets`}
            className="bg-darkGreen text-center hover:bg-darkestGreen transition-all duration-300 text-white text-lg px-4 py-2 rounded-lg hover:scale-105 shadow-xl"
          >
            {home.landingButton}
          </Link>
        </div>

        <Image
          src={DogAI}
          alt="Firulais dog AI"
          className="w-[620px] max-sm:w-[200px] max-sm:absolute max-sm:bottom-0 max-sm:right-0 mr-28"
        ></Image>
      </div>
      <div className="flex justify-around items-center overflow-hidden max-sm:flex-col h-screen w-full">
        <div className="flex flex-col max-sm:w-[80vw] max-sm:text-center space-y-4 text-darkGreen font-semibold text-start">
          <h1 className="font-bold text-5xl w-3/5 max-sm:w-[80vw]">
            {home.title2}
          </h1>
          <br></br>
          <div className="text-6xl">
            +<CountUp end={1000} enableScrollSpy />
            <h2 className="text-xl font-normal">{home.meta1}</h2>
          </div>

          <div className="text-6xl">
            +<CountUp end={100} enableScrollSpy />
            <h2 className="text-xl font-normal">{home.meta2}</h2>
          </div>

          <div className="text-6xl">
            +<CountUp end={10} enableScrollSpy />
            <h2 className="text-xl font-normal">{home.meta3}</h2>
          </div>
        </div>
        <Image
          src={BgLanding}
          alt="Firulais dog AI"
          className="w-[500px] max-sm:w-[200px] -skew-y-12 rounded-xl"
        ></Image>
      </div>
      <div className="flex justify-between items-center overflow-hidden max-sm:h-[120vh] max-sm:flex-col-reverse h-screen w-[90vw]">
        <Image
          src={BgLanding1}
          alt="Firulais dog AI"
          className="w-[500px] max-sm:w-[200px] rounded-xl max-sm:my-10"
        ></Image>
        <div className="flex flex-col w-2/4 max-sm:w-[80vw] max-sm:text-center space-y-4 text-darkGreen text-justify">
          <h1 className="font-bold text-5xl">{home.infoTitle}</h1>
          <br></br>
          <p className="text-xl max-sm:text-s text-justify">{home.infoText}</p>
        </div>
      </div>
    </>
  );
}
