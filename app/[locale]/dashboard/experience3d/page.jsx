import { checkSubscription } from "@/lib/subscription";
import { getXataClient } from "@/src/xata";
import { auth } from "@clerk/nextjs";
import FiruExperience from "../../components/FiruExperience";

const page = async () => {
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
    const models = pets.flatMap((innerArray) =>
      innerArray.map((firu) => firu.model[0].url)
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
    return (
      <div className="w-[98vw] h-screen flex justify-center items-center">
        <FiruExperience model={models} name={names} />
      </div>
    );
  } catch (error) {
    console.error("Error in Dashboard:", error);
    // Handle error appropriately, e.g., show an error message to the user.
    return <div>Error occurred while loading data.</div>;
  }
};

export default page;
