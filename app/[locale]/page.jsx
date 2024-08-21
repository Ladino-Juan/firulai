"use client";

import Image from "next/image";
import HeroDog from "@assets/HeroDog.gif";
import BgLanding from "@assets/background-landing.webp";
import adopt1 from "@assets/enterprise-image-firus.webp";
import Link from "next/link";
import { getlocales } from "../actions";
import CountUp from "react-countup";
import { useState, useEffect } from "react";
import LoaderIcon from "@assets/loader.gif";
import { motion } from "framer-motion";

export default function Home({ params: lang }) {
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const { home } = await getlocales(lang.locale);
        setHome(home);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally, you can set an error state here to display an error message.
      } finally {
        setLoading(false); // Set loading to false when fetching is done
      }
    }
    fetchData();
  }, [lang.locale]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={LoaderIcon} alt="firulai logo" width={50} height={50} />
      </div>
    );
  }

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
                className="bg-darkGreen w-full max-w-lg text-center hover:bg-darkestGreen transition-all duration-300 text-white text-lg px-5 py-2 rounded-lg hover:scale-105 shadow-xl animate-bounce"
              >
                {home.landingButton}
              </Link>
            </div>
          </div>
          <Image
            src={HeroDog}
            alt="firulai animación - Ayuda a las mascotas sin hogar"
            className="lg:w-[400px] md:w-[300px] w-[170px]"
            priority
          />
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="flex justify-around items-center overflow-hidden flex-col lg:flex-row h-screen md:h-[90vh] w-[80vw]">
          <div className="flex justify-center flex-col max-sm:w-[80vw] text-center space-y-4 text-darkGreen font-semibold lg:text-start text-6xl max-sm:text-5xl">
            <h1 className="font-bold lg:w-4/5 max-sm:w-[80vw]">
              {home.title2}
            </h1>
            <br></br>
            <div>
              +<CountUp end={1000} enableScrollSpy />
              <h2 className="text-xl font-normal">{home.meta1}</h2>
            </div>

            <div>
              +<CountUp end={50} enableScrollSpy />
              <h2 className="text-xl font-normal">{home.meta2}</h2>
            </div>

            <div>
              +<CountUp end={10} enableScrollSpy />
              <h2 className="text-xl font-normal">{home.meta3}</h2>
            </div>
          </div>
          <Image
            src={BgLanding}
            alt="mascota sin hogar Colombia - firulai"
            className="lg:w-[500px] md:w-[400px] w-[200px] -skew-y-12 rounded-xl"
            priority
          ></Image>
        </div>
      </div>

      <div className="flex justify-center w-full">
        <motion.div
          className="flex justify-around items-center overflow-hidden h-[80vh] mt-20 flex-col lg:flex-row bg-gradient-to-r from-red-500 to-orange-500"
          initial={{ width: "90vw", borderRadius: "1rem" }} 
          whileInView={{ width: "100vw", borderRadius: "0px" }} 
          transition={{ duration: 0.6, delay: 0.3, ease: "easeIn" }}
        >
          <Image
            src={adopt1}
            alt="Firulais dog AI"
            className="w-[500px] max-sm:w-[250px]"
          ></Image>
          <div className="flex flex-col lg:w-2/5 w-[80vw] text-center lg:text-left space-y-4">
            <h1 className="text-6xl font-bold text-white lg:text-left max-sm:text-3xl text-center">
              {home.adopt.title}
            </h1>
            <p className="text-xl text-white max-sm:text-sm">
              {home.adopt.description}
            </p>
            <br />
            <Link
              href="https://api.whatsapp.com/send?l=es&phone=573226646007"
              className="bg-orange-500 text-center hover:bg-red-500 transition-all duration-300 text-white px-4 py-2 rounded-lg hover:scale-105 shadow-xl"
              aria-label="firulai whatsapp"
              target="_blank"
              rel="noreferrer"
            >
              {home.adopt.adoptButton}
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
