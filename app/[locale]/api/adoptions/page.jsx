import Nofiru from "../../components/Nofiru";
import Link from "next/link";

export const metadata = {
  title: "Adopta",
};

export default async function Adopt() {
  return (
    <div className="flex flex-col w-full h-[90vh] items-center justify-center space-y-5">
      <h1 className="font-bold text-2xl max-sm:text-xl text-center text-gray-700">
        Pronto podrás adoptar tu mascota ideal de manera fácil,{" "}
        <span className="text-green-500">segura</span> y rápida
      </h1>
      <Link
        href={`/api/pets`}
        className="bg-darkGreen text-center hover:bg-darkestGreen transition-all duration-300 text-white text-lg px-4 py-2 rounded-lg hover:scale-105 shadow-xl"
      >
        APADRINA
      </Link>
    </div>
  );
}
