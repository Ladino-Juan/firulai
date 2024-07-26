"use client";

import Image from "next/image";
import HeroDog from "@assets/HeroDog.gif";
import BgLanding from "@assets/background-landing.webp";
import BgLanding1 from "@assets/background-landing1.webp";
import Link from "next/link";
import { getlocales } from "../actions";
import CountUp from "react-countup";

export default async function Home({ params: lang }) {
  const { home } = await getlocales(lang.locale);
  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-around max-sm:justify-around items-center overflow-hidden w-[90vw] h-[80vh] md:h-[70vh] lg:h-[80vh] lg:flex-row rounded-2xl mt-20 flex-col bg-gradient-to-r from-green-600 to-emerald-500">
          <div className="lg:w-2/5 w-full md:p-5 p-5 lg:p-0 text-center lg:text-left space-y-4 lg:ml-24 ml-0">
            <h1 className="text-5xl font-bold text-white max-sm:text-4xl text-center lg:text-left">
              {home.title}
            </h1>
            <p className="text-lg text-white max-sm:text-sm">
              {home.description}
            </p>
            <br />
            <div className="w-full flex justify-center lg:justify-start">
              <Link
                href={`/api/pets`}
                className="bg-darkGreen w-full max-w-lg text-center hover:bg-darkestGreen transition-all duration-300 text-white text-lg px-5 py-2 rounded-lg hover:scale-105 shadow-xl"
              >
                {home.landingButton}
              </Link>
            </div>
          </div>
          <Image
            src={HeroDog}
            alt="Firulais dog AI"
            className="lg:w-[400px] md:w-[300px] w-[170px]"
            loading="lazy"
          />
        </div>
      </div>
    <div className="flex justify-center w-full">
    <div className="flex justify-around items-center overflow-hidden flex-col lg:flex-row h-screen md:h-[90vh] w-[80vw]">
        <div className="flex justify-center flex-col max-sm:w-[80vw] text-center space-y-4 text-darkGreen font-semibold lg:text-start text-6xl max-sm:text-5xl">
          <h1 className="font-bold lg:w-4/5 max-sm:w-[80vw]">{home.title2}</h1>
          <br></br>
          <div>
            +<CountUp end={1000} enableScrollSpy />
            <h2 className="text-xl font-normal">{home.meta1}</h2>
          </div>

          <div>
            +<CountUp end={100} enableScrollSpy />
            <h2 className="text-xl font-normal">{home.meta2}</h2>
          </div>

          <div>
            +<CountUp end={10} enableScrollSpy />
            <h2 className="text-xl font-normal">{home.meta3}</h2>
          </div>
        </div>
        <Image
          src={BgLanding}
          alt="Firulais dog AI"
          className="lg:w-[500px] md:w-[400px] w-[200px] -skew-y-12 rounded-xl"
        ></Image>
      </div>
    </div>
     <div className="w-full flex justify-center">
      <div className="flex lg:justify-between justify-center items-center overflow-hidden max-sm:h-[90vh] flex-col-reverse lg:flex-row h-screen w-[80vw]">
        <Image
          src={BgLanding1}
          alt="Firulais dog AI"
          className="w-[400px] max-sm:w-[200px] rounded-xl"
        ></Image>
        <div className="flex flex-col w-full lg:w-2/4 space-y-4 text-darkGreen text-center">
          <h1 className="font-black text-6xl text-emerald-600 max-sm:text-5xl">
            {home.infoTitle}
          </h1>
          <br></br>
          <p className="text-xl max-sm:text-sm">{home.infoText}</p>
        </div>
      </div>
      </div>
    </>
  );
}
