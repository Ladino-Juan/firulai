import { Stripe } from "stripe";
import ButtonCheckout from "../../components/ButtonCheckout";
import Image from "next/image";
import Badge1 from "@assets/mascotas/badge1.svg";
import Badge2 from "@assets/mascotas/badge2.svg";
import Badge3 from "@assets/mascotas/badge3.svg";
import Badge4 from "@assets/mascotas/badge4.svg";
import Perrito from "@assets/mascotas/perrito.png";
import { auth } from "@clerk/nextjs";
import { checkSubscription } from "@/lib/subscription";
import CurrentPets from "../../components/CurrentPets";
import SocialShare from "../../components/SocialShare";
import HomeExperience from "../../components/HomeExperience";
import crypto from "crypto";

async function generateUniqueReference(selected) {
  const { userId } = auth();
 // Generar una cadena única para la referencia
 const uniqueString = `${userId}-${selected}`;
 // Crear un hash SHA-256 de la cadena única
 const hash = crypto.randomBytes(8).toString("hex");;
 // Retornar la referencia completa con el hash al final
 return `${uniqueString}-${hash}`;
}
async function Pets({ searchParams }) {

  const prices = [1000000, 2500000, 5000000];
  const integrityKey = process.env.INTEGRITY_KEY;

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
      <CurrentPets />
      <div className="w-full flex justify-center items-center">
        <div>
          <header className="text-center my-5">
            <h1 className=" md:text-white md:bg-green-500 shadow-inner text-white bg-green-500 p-2 rounded-lg flex justify-between items-center">
              <span className="mx-auto font-bold text-2xl">
                ¿Cómo apadrinar?
              </span>
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
                } mb-2 p-10 rounded-3xl w-72 h-40 md:h-56`}
              >
                <h3>{`${
                  index === 0
                    ? "Firu Padrino"
                    : index === 1
                    ? "Firu Protector"
                    : "Firu Guardian"
                }`}</h3>

                
                  <h2 className="text-2xl font-bold mb-2 md:mb-10">
                    {`${(price / 100).toLocaleString("es-CO")} COP`}
                  </h2>
             
                <form action="https://checkout.wompi.co/p/" method="GET">
                  <input
                    type="hidden"
                    name="public-key"
                    value={process.env.WOMPI_PUBLIC_KEY}
                  />
                  <input type="hidden" name="currency" value="COP" />
                  <input type="hidden" name="amount-in-cents" value={price} />
                  <input
                    type="hidden"
                    name="reference"
                    value={references[index].reference}
                  />
                  <input
                    type="hidden"
                    name="signature:integrity"
                    value={references[index].hashHex}
                  />
                    <input type="hidden" name="redirect-url" value={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`} />

                  <button
                    className={`${getBackgroundColor(
                      index
                    )} text-white px-4 py-2 rounded-lg hover:scale-105`}
                    type="submit"
                  >
                    APADRINA
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center max-sm:flex-col-reverse my-20 text-darkGreen">
        <div className="max-sm:mt-20 md:w-2/4  w-[80vw] flex justify-center items-center h-[60vh]">
          <HomeExperience />
        </div>
        <div>
          <div className="flex items-center max-sm:justify-center">
            <Image
              src={Badge1}
              alt="Firulais App"
              className="w-[100px] max-sm:w-[50px] md:mx-5 max-sm:mr-4"
            ></Image>
            <h2 className="w-2/3 max-sm:text-sm">
              ¡Únete a nosotros para promover la protección y el cuidado
              adecuado de los animales sin hogar!
            </h2>
          </div>
          <div className="flex items-center mt-5 max-sm:justify-center">
            <Image
              src={Badge2}
              alt="Firulais App"
              className="w-[100px] max-sm:w-[50px] md:mx-5 max-sm:mr-4"
            ></Image>
            <h2 className="w-2/3 max-sm:text-sm">
              Descubre Firulai, la nueva forma de apadrinar. El 100% del valor que dones se destina directamente a la mascota que elijas.
              Recibirás actualizaciones semanales con videos, fotos y hasta una
              mascota virtual inspirada en la tuya.
            </h2>
          </div>
          <div className="flex items-center mt-5 max-sm:justify-center">
            <Image
              src={Badge3}
              alt="Firulais App"
              className="w-[100px] max-sm:w-[50px] md:mx-5 max-sm:mr-4"
            ></Image>
            <h2 className="w-2/3 max-sm:text-sm">
              Nuestro objetivo es transformar las vidas de las mascotas sin
              hogar, mejorando su bienestar y contribuyendo al bienestar general
              de los animales.
            </h2>
          </div>
          <div className="flex items-center mt-5 max-sm:justify-center">
            <Image
              src={Badge4}
              alt="Firulais App"
              className="w-[100px] max-sm:w-[50px] md:mx-5 max-sm:mr-4"
            ></Image>
            <h2 className="w-2/3 max-sm:text-sm">
              Mantenemos a nuestros usuarios completamente informados sobre
              nuestras operaciones, impacto y el uso de recursos, así como el
              estado de la mascota que están apadrinando en todo momento.
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pets;
