import { getXataClient } from "@/src/xata";
import { auth } from "@clerk/nextjs";
import PetsOwned from "../components/PetsOwned";
import Nofiru from "../components/Nofiru";
const Dashboard = async ({params: lang}) => {
  try {
    const { userId } = auth();
    const xataClient = getXataClient();

    // Obtener suscripciones del usuario
    const subscriptions = await xataClient.db.firus
      .filter({ userId: userId })
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
      const firuData = JSON.parse(item[0].firuData);
      const fechaObjeto = new Date(item[0].xata.updatedAt);
      const dia = fechaObjeto.getDate();
      const mes = fechaObjeto.getMonth() + 1;
      const anio = fechaObjeto.getFullYear();
      const fechaFormateada = `${dia}/${mes}/${anio}`;

      return [
        [
          firuData[lang.locale].name, 
          firuData[lang.locale].raza,
          firuData[lang.locale].estado,
          firuData[lang.locale].tamaño,
          firuData[lang.locale].edad,
          firuData[lang.locale].history,
          firuData[lang.locale].fundacion
        ],
        item[0].modelFiru.url,
        item[0].realFiru.url,
        item[0].id,
        fechaFormateada,
        item[0].petPhotos.map((photo) => photo.url),
        item[0].petVideos.map((video) => video.url),
      ];
    });

    return (
      <>
        {parsedData.length === 0 ? (
          <Nofiru />
        ) : (
            <PetsOwned modelData={parsedData} lang={lang.locale}/>
        )}
      </>
    );
  } catch (error) {
    console.error("Error in Dashboard:", error);
    // Handle error appropriately, e.g., show an error message to the user.
    return <div>Error occurred while loading data.</div>;
  }
};

export default Dashboard;
