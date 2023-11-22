import Image from "next/image";
import Badge1 from "../../public/assets/mascotas/badge1.svg";
import Badge2 from "../../public/assets/mascotas/badge2.svg";
import Badge3 from "../../public/assets/mascotas/badge3.svg";
import Badge4 from "../../public/assets/mascotas/badge4.svg";
import Perrito from "../../public/assets/mascotas/perrito.png";
import ARExperience from "../../public/assets/mascotas/ARExperience.png";
import Carousel from "../components/Carousel";
const page = () => {
  return (
    <>
      <div className="w-full h-screen flex max-sm:flex-col justify-center items-center">
        <div className="flex flex-col w-2/5 max-sm:w-[80vw] max-sm:text-center space-y-4 max-sm:mt-32">
          <h1 className="text-6xl font-bold text-main text-left max-sm:text-2xl max-sm:text-center">
            ¡TUS MASCOTAS VIRTUALES SON REALES!
          </h1>
          <p className="text-xl text-whitePearl max-sm:text-sm">
            En Firulais, nos esforzamos por otorgar identidad a las mascotas
            virtuales, ya que están inspiradas en animales reales que forman
            parte de una fundación en la ciudad de Pereira. Esto les brinda una
            conexión auténtica con la realidad y permite que los usuarios se
            relacionen con ellos de una manera más significativa.
          </p>
        </div>
        <Image
          src={ARExperience}
          alt="Firulais App"
          className="w-[400px] max-sm:w-[250px] md:ml-20 max-sm:mt-20"
          quality={100}
        ></Image>
      </div>
      <div className="h-screen w-full flex justify-center mt-20 items-center max-sm:flex-col max-sm:h-[120vh]">
        <div className="relative max-sm:mt-20 w-2/4">
          <Image
            src={Perrito}
            alt="Firulais App"
            className="w-[400px] max-sm:w-[250px] md:ml-20 max-sm:mb-20"
            quality={100}
          ></Image>
        </div>
        <div>
          <div className="flex items-center max-sm:justify-center">
            <Image
              src={Badge1}
              alt="Firulais App"
              className="w-[100px] max-sm:w-[50px] md:mx-20 max-sm:mr-4"
            ></Image>
            <h2 className="w-2/3 max-sm:text-sm">
              Devolver es nuestro nucleo. El 50% de los ingresos beneficia a
              mascotas reales, fusionando la compasión y el propósito en el
              corazón de nuestro juego.
            </h2>
          </div>
          <div className="flex items-center mt-5 max-sm:justify-center">
            <Image
              src={Badge2}
              alt="Firulais App"
              className="w-[100px] max-sm:w-[50px] md:mx-20 max-sm:mr-4"
            ></Image>
            <h2 className="w-2/3 max-sm:text-sm">
              Promovemos la protección y el cuidado adecuado de los animales en
              todos nuestros productos.
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
              hogar, mejorando su bienestar y el bienestar general de los
              animales.
            </h2>
          </div>
          <div className="flex items-center mt-5 max-sm:justify-center">
            <Image
              src={Badge4}
              alt="Firulais App"
              className="w-[100px] max-sm:w-[50px] md:mx-20 max-sm:mr-4"
            ></Image>
            <h2 className="w-2/3 max-sm:text-sm">
              Nos aseguramos de que nuestros seguidores, socios y jugadores
              estén completamente informados sobre nuestras operaciones, impacto
              y utilización de recursos.
            </h2>
          </div>
        </div>
      </div>
      <Carousel />
    </>
  );
};

export default page;
