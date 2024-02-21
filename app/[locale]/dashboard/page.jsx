import { checkSubscription } from "@/lib/subscription";
import { getXataClient } from "@/src/xata";
import { auth } from "@clerk/nextjs";
import PetsOwned from "../components/PetsOwned";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import SocialShare from "../components/SocialShare";

const Dashboard = async () => {
  const user = await currentUser();
  try {
    const { userId } = auth();
    const isPro = await checkSubscription();

    //recordar solo desplegar si es pro
    const xataClient = getXataClient();
    const subscriptions = await xataClient.db.firus
      .filter({ userId: userId })
      .getMany();

    const petPromises = subscriptions.map((subscription) =>
      xataClient.db.pets.filter({ id: subscription.models }).getMany()
    );

    const pets = await Promise.all(petPromises);
    const parsedData = pets.map((item, idx) => {
      const firuData = JSON.parse(item[0].firuData);

      // Crear un objeto Date desde la cadena de fecha
      const fechaObjeto = new Date(item[0].xata.updatedAt);

      // Obtener componentes de la fecha
      const dia = fechaObjeto.getDate();
      const mes = fechaObjeto.getMonth() + 1; // Los meses son indexados desde 0
      const anio = fechaObjeto.getFullYear();

      // Formatear la fecha según tus necesidades
      const fechaFormateada = `${dia}/${mes}/${anio}`;
      return [
        [
          firuData.name,
          firuData.raza,
          firuData.color,
          firuData.tamaño,
          firuData.edad,
          firuData.history,
        ],
        item[0].modelFiru.url,
        item[0].realFiru.url,
        item[0].id,
        fechaFormateada,
        item[0].petPhotos.map((photo) => photo.url),
        item[0].petVideos.map((video) => video.url),
      ];
    });

    const models = pets.flatMap((innerArray) =>
      innerArray.map((firu) => firu.model[0].url)
    );

    const modelFirus = pets.flatMap((innerArray) =>
      innerArray.map((firu) => firu.modelFiru.url)
    );

    const names = pets.flatMap((innerArray) =>
      innerArray.map((firu) => {
        try {
          const parsedFiruData = JSON.parse(firu.firuData);
          return parsedFiruData.name;
        } catch (error) {
          console.error("Error parsing firuData:", error);
          return null; // Handle the error or return a default value as needed
        }
      })
    );
    console.log(user);
    return (
      <>
        <div className="w-full justify-center items-center">
          <div>
            <PetsOwned modelData={parsedData} />
          </div>
        </div>
        {/*<div className="w-[98vw] h-screen flex justify-around items-center">
          <div className="grid grid-cols-3 gap-4">
            {modelFirus.map((model, idx) => (
              <div
                className="gallery w-48 h-40 flex justify-center items-center bg-lightPurple rounded-2xl"
                key={idx}
              >
                <Image
                  unoptimized
                  src={model}
                  alt={`Dog`}
                  width={150}
                  height={150}
                />
                <SocialShare url={model} />
              </div>
            ))}
          </div>

          <div className="flex items-start flex-col space-y-5 w-2/4">
            <h1 className="text-center font-bold text-4xl">
              ¡Bienvenido, {user.firstName}!
            </h1>
            <p className="text-justify text-lg">
              Estos son los adorables firus que actualmente estás apadrinando.
              Agradecemos sinceramente que formes parte de la familia Firulai y
              contribuyas a brindarles una calidad de vida mejor a estos
              animales que, lamentablemente, aún no han encontrado un hogar
              definitivo. Tu generosidad y apoyo hacen posible su bienestar y
              les ofrecen la esperanza de un futuro lleno de amor y cuidado.
            </p>
          </div>
            </div>*/}
        
      </>
    );
  } catch (error) {
    console.error("Error in Dashboard:", error);
    // Handle error appropriately, e.g., show an error message to the user.
    return <div>Error occurred while loading data.</div>;
  }
};

export default Dashboard;
