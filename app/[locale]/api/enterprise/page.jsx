import Image from "next/image";
import DogAI from "@assets/background-enterprise.webp";
import BgLanding from "@assets/background-enterprise2.png";
import BgLanding1 from "@assets/background-landing1.webp";
import Link from "next/link";
import { getlocales } from "../../../actions";
import Formulario from "../../components/Form";

export default async function Home({ params: lang }) {
  const { enterprise } = await getlocales(lang.locale);
  return (
    <>
      <div className="flex justify-around items-center overflow-hidden w-[90vw] h-[80vh] rounded-2xl mt-20 max-sm:flex-col bg-gradient-to-r from-red-500 to-orange-500">
        <div className="flex flex-col w-2/5 max-sm:w-[80vw] max-sm:text-center space-y-4">
          <h1 className="text-6xl font-bold text-white text-left max-sm:text-4xl max-sm:text-center">
            {enterprise.title}
          </h1>
          <p className="text-xl text-white max-sm:text-sm">
            {enterprise.description}
          </p>
          <br />
          <Link
            href={`#contacto`}
            className="bg-orange-500 text-center hover:bg-red-500 transition-all duration-300 text-white px-4 py-2 rounded-lg hover:scale-105 shadow-xl"
          >
            {enterprise.enterpriseButton}
          </Link>
        </div>

        <Image
          src={DogAI}
          alt="Firulais dog AI"
          className="w-[500px] max-sm:w-[200px]"
        ></Image>
      </div>
      <div className="flex justify-around items-center overflow-hidden h-screen w-[90vw] max-sm:flex-col-reverse max-sm:h-[80vh]">
        <Image
          src={BgLanding}
          alt="Firulais dog AI"
          className="w-[500px]"
        ></Image>
        <div className="flex flex-col w-2/4 max-sm:w-[80vw] max-sm:text-center space-y-4">
          <h1 className="text-6xl font-bold text-gray-500 text-left max-sm:text-4xl max-sm:text-center">
            {enterprise.title2}
          </h1>
          <br></br>
          <p className="text-xl text-gray-500 max-sm:text-sm">
            {enterprise.description2}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center overflow-hidden max-sm:flex-col h-[60vh] w-[90vw]">
        <div className="flex flex-col w-2/4 max-sm:w-[80vw] max-sm:text-center space-y-4 max-sm:mb-10">
          <h1 className="text-6xl font-bold text-orange-500 text-left max-sm:text-4xl max-sm:text-center">
            {enterprise.title3}
          </h1>
          <p className="text-xl text-orange-500 max-sm:text-sm">
            {enterprise.description3}
          </p>
        </div>
        <Image
          src={BgLanding1}
          alt="Firulais dog AI"
          className="w-[500px] max-sm:w-[200px] rounded-xl"
        ></Image>
      </div>
      <Formulario />
    </>
  );
}
