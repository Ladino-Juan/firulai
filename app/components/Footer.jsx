"use client";
import Image from "next/image";
import Link from "next/link";
import FirulaisLogo from "../../public/assets/firulaisLogo.webp";
import WppIcon from "../../public/icons/whatsapp-icon.svg";
import Xicon from "../../public/icons/twitter-icon.svg";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const router = usePathname();
  return (
    <footer
      className={`bottom-0 flex justify-around items-center w-full h-[40vh] rounded-t-3xl bg-lightGray max-sm:flex-col max-sm:h-[50vh] ${
        router == "/dashboard" ? "hidden" : ""
      }`}
    >
      <Link href="/">
        <Image
          src={FirulaisLogo}
          alt="Firulais App"
          className="w-[200px] max-sm:w-[120px]"
          quality={100}
        />
      </Link>

      <div className="w-1/3 text-center space-y-2">
        <h1 className="text-main text-base max-sm:text-sm">OUR MISSION</h1>
        <p className="text-xs">
          Juega con un propósito. Firulais fusiona mascotas virtuales con un
          cambio en el mundo real. Experimenta la diversión con un impacto
          significativo en la vida de los animales refugiados.
        </p>
        <h1 className="text-main text-base max-sm:text-sm">CONTACT</h1>
        <p className="text-xs">PEREIRA, RISARALDA</p>
        <Link
          className="text-xs"
          href="tel:+573205279852"
          target="_blank"
          rel="noreferrer"
          aria-label="firulais number phone"
        >
          +57 (320) 527-9852
        </Link>
      </div>

      <div className="flex justify-center items-center space-y-5 flex-col max-sm:flex-row max-sm:space-x-2">
        <Link
          href="https://wa.me/573205279852"
          target="_blank"
          rel="noreferrer"
          aria-label="firulais whatsapp"
        >
          <Image
            src={WppIcon}
            alt="Whatsapp Firulais"
            className="max-sm:mt-5"
            width={30}
            quality={100}
          />
        </Link>
        <Link
          href="https://twitter.com/firulaisVR"
          target="_blank"
          rel="noreferrer"
          aria-label="firulais twitter x"
        >
          <Image src={Xicon} alt="Twitter Firulais" width={30} quality={100} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
