import Image from "next/image";
import LogoGif from "../public/assets/logoLoader.gif";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Image
        src={LogoGif}
        alt="Firulais loader"
        width={30}
        quality={100}
      ></Image>
    </div>
  );
}
