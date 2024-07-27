import { clerkClient } from "@clerk/nextjs";
import { headers } from "next/headers";
import Image from "next/image";
import { getXataClient } from "@/src/xata";
import Nofiru from "../components/Nofiru";

const page = async () => {
  const xataClient = getXataClient();
  const headerList = headers();
  const pathname = headerList.get("x-current-path");

  // Regex pattern to match and capture everything after /[locale]/
  const regex = /^\/[a-z]{2}\/(.*)$/;
  const match = pathname.match(regex);

  // Extract the part after /[locale]/
  const cleanedPathname = match ? match[1] : pathname;

  let user;
  try {
    const response = await clerkClient.users.getUserList({
      username: cleanedPathname,
    });

    // Verificar si la respuesta contiene usuarios
    if (response.length > 0) {
      user = response[0];
    } else {
      // Manejar el caso en que no se encontró el usuario
      return <div>Usuario no encontrado</div>;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return <div>Hubo un error al obtener los datos del usuario</div>;
  }

  // Obtener suscripciones del usuario
  const subscriptions = await xataClient.db.firus
    .filter({ userId: user.id })
    .getMany();

  // Obtener IDs únicos de modelos desde las suscripciones
  const subscriptionIds = new Set(subscriptions.flatMap((sub) => sub.models));

  // Consultar las mascotas asociadas a los IDs únicos de modelos
  const petPromises = Array.from(subscriptionIds).map((modelId) =>
    xataClient.db.pets.filter({ id: modelId }).getMany()
  );

  // Obtener datos de mascotas de las promesas
  const pets = await Promise.all(petPromises);

  // Procesar y formatear los datos de las mascotas
  const parsedData = pets.map((item) => {
    return item[0].modelFiru.url;
  });

  return (
    <>
      {parsedData.length < 1 ? (
        <Nofiru />
      ) : (
        <div className="flex flex-col items-center ">
          <div className="w-[95vw] h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center w-2/4 max-sm:w-[80vw] space-y-3">
              <h1 className="text-xs text-center text-gray-500">
                <span>{`Gracias, ${user.username}, `}</span>
                <Image
                  src={user.imageUrl}
                  alt="firulai"
                  className="rounded-full inline-block align-middle" // inline-block to align with text
                  width={20}
                  height={20}
                />
                <span>{` por apadrinar a ${parsedData.length} mascotas a través de Firulai. ¡Su ayuda hace una gran diferencia y llena de felicidad a estos adorables amigos peludos!`}</span>
              </h1>
            </div>

            <div className="w-full flex -space-x-24 max-sm:-space-x-10 justify-center overflow-hidden">
              {parsedData.map((firu, idx) => (
                <div key={idx} className="">
                  <Image
                    src={firu}
                    alt={`Dog ${firu}`}
                    className={`${
                      parsedData === 1 ? "max-sm:w-[300px]" : "max-sm:w-[120px]"
                    } max-w-[500px] min-w-[50px]`}
                    unoptimized
                    width={300} // Set the width of the image
                    height={300} // Adjust height to maintain aspect ratio
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
