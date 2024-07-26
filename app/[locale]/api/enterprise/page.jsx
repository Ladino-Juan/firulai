import Image from "next/image";
import Enterprise1 from "@assets/enterprise-image-firus.webp";
import BgLanding from "@assets/background-enterprise2.png";
import BgLanding1 from "@assets/background-landing1.webp";
import Link from "next/link";
import { getlocales } from "../../../actions";
import Formulario from "../../components/Form";

export default async function Home({ params: lang }) {
  const { enterprise } = await getlocales(lang.locale);
  return (
    <>
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-around items-center overflow-hidden w-[90vw] h-[80vh] rounded-2xl mt-20 flex-col lg:flex-row bg-gradient-to-r from-red-500 to-orange-500">
        <div className="flex flex-col lg:w-2/5 w-[80vw] text-center lg:text-left space-y-4">
          <h1 className="text-6xl font-bold text-white lg:text-left max-sm:text-3xl text-center">
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
          src={Enterprise1}
          alt="Firulais dog AI"
          className="w-[500px] max-sm:w-[250px]"
        ></Image>
      </div>
      
      <div className="flex justify-center lg:justify-around items-center overflow-hidden lg:h-screen h-[80vh] w-[90vw] flex-col-reverse lg:flex-row">
        <Image
          src={BgLanding}
          alt="Firulais dog AI"
          className="lg:w-[500px] md:w-[300px] w-[200px]"
        ></Image>
        <div className="flex flex-col lg:w-2/4 w-[80vw] lg:text-left text-center">
          <h1 className="text-6xl font-bold text-gray-500 lg:text-left max-sm:text-4xl text-center mb-10">
            {enterprise.title2}
          </h1>
          <p className="text-xl text-gray-500 max-sm:text-sm">
            {enterprise.description2}
          </p>
        </div>
      </div>
      <div className="flex justify-between md:justify-center lg:justify-around items-center overflow-hidden flex-col lg:flex-row h-[60vh] max-sm:h-[85vh] w-[90vw]">
        <div className="flex flex-col lg:w-2/4 w-[80vw] text-center lg:text-center">
          <h1 className="text-6xl font-bold text-orange-500 lg:text-left max-sm:text-4xl text-center mb-10">
            {enterprise.title3}
          </h1>
          <p className="text-xl text-orange-500 lg:text-left max-sm:text-sm">
            {enterprise.description3}
          </p>
        </div>
        <Image
          src={BgLanding1}
          alt="Firulais dog AI"
          className="lg:w-[500px] md:w-[300px] max-sm:w-[200px] rounded-xl"
        ></Image>
      </div>
      <Formulario />
      </div>
    </>
  );
}
