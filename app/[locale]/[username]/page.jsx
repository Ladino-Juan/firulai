import { clerkClient } from "@clerk/nextjs";
import { headers } from "next/headers";
import Image from "next/image";
import { getXataClient } from "@/src/xata";
import FiruGallery from "../components/FiruGallery";

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
    <div className="w-[95vw] h-screen flex flex-col justify-center items-center">
      <div className="flex gap-x-3 mt-24">
        <h1 className="font-bold text-3xl text-center text-gray-700">{`${user.firstName} ${user.lastName}`}</h1>
        <Image
          src={user.imageUrl}
          alt="firulai"
          className="rounded-full"
          width={50}
          height={50}
        />
      </div>
        <FiruGallery modelData={parsedData}/>
    </div>
  );
};

export default page;
