
import Image from "next/image";
import Link from "next/link";
import FirulaisLogo from "@assets/firulaisLogo.webp";
import IgIcon from "@icons/instagram-icon.svg";
import { getlocales } from "../../actions";

const Footer =  async ({ lang }) => {
  const { footer } = await getlocales(lang);

  return (
    <footer
      className={`bottom-0 flex justify-around items-center w-full h-[40vh] rounded-t-3xl bg-darkGreen max-sm:flex-col max-sm:h-[50vh] `}
    >
      <Link href="/">
        <Image
          src={FirulaisLogo}
          alt="Firulais App"
          className="w-[200px] max-sm:w-[120px]"
          quality={100}
        />
      </Link>

      <div className="md:w-1/3 w-[80vw] text-center space-y-2 md:mr-40 text-white opacity-80">
        <h1 className=" text-base max-sm:text-sm">
          {footer?.missionTitle}
        </h1>
        <p className="text-xs">{footer?.missionDescription}</p>
        <h1 className="text-base max-sm:text-sm">{footer?.contact}</h1>
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
          href="https://www.instagram.com/firulai.co/"
          target="_blank"
          rel="noreferrer"
          aria-label="firulais whatsapp"
        >
          <Image
            src={IgIcon}
            alt="Whatsapp Firulais"
            className="max-sm:mt-5"
            width={30}
            quality={100}
          />
        </Link>
       
      </div>
    </footer>
  );
};

export default Footer;
