import Image from "next/image";
import Badge1 from "@assets/mascotas/badge1.svg";
import Badge2 from "@assets/mascotas/badge2.svg";
import Badge3 from "@assets/mascotas/badge3.svg";
import Badge4 from "@assets/mascotas/badge4.svg";
import Info from "@icons/info-icon.svg";
import { auth } from "@clerk/nextjs";
import CurrentPets from "../../components/CurrentPets";
import HomeExperience from "../../components/HomeExperience";
import crypto from "crypto";
import Link from "next/link";
import { getlocales } from "../../../actions";
import { currentUser } from "@clerk/nextjs/server";

export const metadata = {
  title: "Apadrinar",
};

async function generateUniqueReference(selected) {
  const { userId } = auth();
  // Generar una cadena única para la referencia
  const uniqueString = `${userId}-${selected}`;
  // Crear un hash SHA-256 de la cadena única
  const hash = crypto.randomBytes(8).toString("hex");
  // Retornar la referencia completa con el hash al final
  return `${uniqueString}-${hash}`;
}
async function Pets({ searchParams, params: lang }) {
  const { userId } = auth();
  const { pets } = await getlocales(lang.locale);
  const prices = [1000000, 2500000, 5000000];
  const integrityKey = process.env.INTEGRITY_KEY;

  const user = await currentUser();
  const primaryEmail = user?.emailAddresses.find(
    (email) => email.id === user?.primaryEmailAddressId
  )?.emailAddress;
  const fullName = `${user?.firstName} ${user?.lastName}`;

  const references = await Promise.all(
    prices.map(async (price) => {
      const reference = await generateUniqueReference(searchParams?.selected);
      const concatenatedText = reference + price + "COP" + integrityKey;
      const encodedText = new TextEncoder().encode(concatenatedText);
      const hashBuffer = await crypto.subtle.digest("SHA-256", encodedText);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      return { reference, hashHex };
    })
  );

  const getBackgroundColor = (index) => {
    switch (index) {
      case 0:
        return "bg-darkOrange hover:bg-orange-500 transition-all duration-300";
      case 1:
        return "bg-darkPurple hover:bg-blue-700 transition-all duration-300";
      case 2:
        return "bg-darkestGreen hover:bg-green-600 transition-all duration-300";
      default:
        return "bg-darkestGreen hover:bg-green-950 transition-all duration-300";
    }
  };

  return (
    <>
      <CurrentPets lang={lang.locale} />
      <div className="w-full flex justify-center items-center">
        <div>
          <header className="text-center my-5">
            <h1 className="md:text-white md:bg-green-500 shadow-inner text-white bg-green-500 p-2 rounded-lg flex justify-between items-center">
              <span className="mx-auto font-bold text-2xl max-sm:text-xl text-center w-full">
                {pets?.paymentTitle}
              </span>
              <div className="group absolute">
                <Image
                  src={Info}
                  alt="Info Firulai"
                  height={20}
                  width={20}
                  quality={100}
                />

                <span className="text-left absolute top-10 scale-0 rounded-lg bg-green-500 max-sm:w-[69vw] w-[40vw] p-2 text-xs text-white group-hover:scale-100">
                  {pets?.step1}
                  <br />
                  {pets?.step2}
                  <br />
                  {pets?.step3}
                  <br />
                  {pets?.step4}
                </span>
              </div>
            </h1>
          </header>
          <div className="flex gap-x-5 max-sm:flex-col">
            {prices.map((price, index) => (
              <div
                key={index}
                className={`${
                  index === 0
                    ? "bg-lightOrange text-white shadow-2xl"
                    : index === 1
                    ? "bg-lightPurple text-white shadow-2xl"
                    : "bg-green-500 text-white shadow-2xl"
                } mb-5 lg:mb-2 py-3 px-10 lg:px-10 lg:py-10 rounded-3xl lg:w-72 md:w-52 md:h-40 w-72  h-32 lg:h-56`}
              >
                <h3 className="md:text-center lg:text-left text-left">{`${
                  index === 0
                    ? "Firu Padrino"
                    : index === 1
                    ? "Firu Protector"
                    : "Firu Guardian"
                }`}</h3>

                <h2 className="lg:text-2xl md:text-xl md:text-center lg:text-left text-left text-2xl font-bold mb-2 md:mb-10">
                  {`${(price / 100).toLocaleString("es-CO")} COP`}
                </h2>

                <Link
                  href={"https://wa.link/y1roqm"}
                  className={`${getBackgroundColor(
                    index
                  )} text-white px-4 py-2 rounded-lg hover:scale-105`}
                >
                  {pets?.paymentButton}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center max-sm:flex-col-reverse my-20 text-darkGreen">
        <div className="max-sm:mt-20 md:w-2/4  w-[60vw] flex justify-center items-center h-[30vh]">
          <HomeExperience />
        </div>
        <div>
          <div className="flex items-center max-sm:justify-center">
            <Image
              src={Badge1}
              alt="Firulais App"
              className="w-[50px] md:w-[60px] lg:w-[100px] md:mx-5 max-sm:mr-4"
            ></Image>
            <h2 className="w-2/3 max-sm:text-sm">{pets?.joinUs}</h2>
          </div>
          <div className="flex items-center mt-5 max-sm:justify-center">
            <Image
              src={Badge2}
              alt="Firulais App"
              className="w-[50px] md:w-[60px] lg:w-[100px] md:mx-5 max-sm:mr-4"
            ></Image>
            <h2 className="w-2/3 max-sm:text-sm">{pets?.discoverFirulai}</h2>
          </div>
          <div className="flex items-center mt-5 max-sm:justify-center">
            <Image
              src={Badge3}
              alt="Firulais App"
              className="w-[50px] md:w-[60px] lg:w-[100px] md:mx-5 max-sm:mr-4"
            ></Image>
            <h2 className="w-2/3 max-sm:text-sm">{pets?.transformLives}</h2>
          </div>
          <div className="flex items-center mt-5 max-sm:justify-center">
            <Image
              src={Badge4}
              alt="Firulais App"
              className="w-[50px] md:w-[60px] lg:w-[100px] md:mx-5 max-sm:mr-4"
            ></Image>
            <h2 className="w-2/3 max-sm:text-sm">{pets?.keepInformed}</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pets;
