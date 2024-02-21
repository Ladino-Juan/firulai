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

async function loadPrices() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });
  const prices = await stripe.prices.list();
  const sortedPrices = prices.data.sort(
    (a, b) => a.unit_amount - b.unit_amount
  );

  return sortedPrices;
}

async function Pets({ searchParams }) {
  const { userId } = auth();
  const prices = await loadPrices();

  // Create an array of promises for subscription checks
  const subscriptionChecks = prices.map((price) =>
    checkSubscription(searchParams?.selected, price.id)
  );

  // Wait for all subscription checks to resolve
  const isProArray = await Promise.all(subscriptionChecks);

  return (
    <>
      <CurrentPets />
      <div className="w-full flex justify-center items-center">
        <div>
          <header className="text-center my-5">
            <h1 className=" md:text-lightGreen md:bg-[#DDF3CD] text-white bg-lightOrange p-2 rounded-lg flex justify-between items-center">
              <span className="mx-auto font-bold text-2xl">¿Cómo apadrinar?</span>
              <SocialShare url={"http://localhost:3000/en/api/pets"} />
            </h1>
          </header>
          <div className="flex gap-x-5 max-sm:flex-col">
            {prices.map((price, index) => (
              <div
                key={price.id}
                className={`${
                  index === 0
                    ? "bg-lightOrange text-white"
                    : index === 1
                    ? "bg-lightPurple text-white"
                    : "bg-[#E3F1E2] text-lightGreen"
                } mb-2 p-10 rounded-3xl w-72 h-56`}
              >
                <h3>{`${
                  index === 0
                    ? "Firu Guardian"
                    : index === 1
                    ? "Firu Gold"
                    : "Firu Diamond"
                }`}</h3>
                <h2 className="text-3xl font-bold mb-10">
                  ${price.unit_amount / 100}
                  <span className="text-sm"> /month</span>
                </h2>
                <ButtonCheckout
                  priceId={price.id}
                  userId={userId}
                  petId={searchParams?.selected}
                  isPro={isProArray[index]} // Use the resolved value from the array
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center max-sm:flex-col-reverse my-20 text-lightGreen">
        <div className="max-sm:mt-20 md:w-2/4  w-[80vw] flex justify-center items-center h-[60vh]">
          <HomeExperience />
        </div>
        <div>
          <div className="flex items-center max-sm:justify-center">
            <Image
              src={Badge1}
              alt="Firulais App"
              className="w-[100px] max-sm:w-[50px] md:mx-20 max-sm:mr-4"
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
              className="w-[100px] max-sm:w-[50px] md:mx-20 max-sm:mr-4"
            ></Image>
            <h2 className="w-2/3 max-sm:text-sm">
              Descubre Firulai, la nueva forma de apadrinar. Por cada $10 que
              dones, $9 se destinan directamente a la mascota que elijas.
              Recibirás actualizaciones semanales con videos, fotos y hasta una
              mascota virtual inspirada en la tuya.
            </h2>
          </div>
          <div className="flex items-center mt-5 max-sm:justify-center">
            <Image
              src={Badge3}
              alt="Firulais App"
              className="w-[100px] max-sm:w-[50px] md:mx-20 max-sm:mr-4"
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
              className="w-[100px] max-sm:w-[50px] md:mx-20 max-sm:mr-4"
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
