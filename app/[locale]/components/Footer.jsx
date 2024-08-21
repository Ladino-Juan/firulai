import Image from "next/image";
import Link from "next/link";
import FirulaisLogo from "@assets/firulaisLogo.webp";
import IgIcon from "@icons/instagram-icon.svg";
import WppIcon from "@icons/whatsapp-icon.svg";
import { getlocales } from "../../actions";

const Footer = async ({ lang }) => {
  const { footer } = await getlocales(lang);

  return (
    <footer
      className={`bottom-0 mt-10 flex justify-around items-center w-full h-[40vh] rounded-t-3xl bg-green-500 max-sm:flex-col max-sm:h-[50vh]`}
    >
      <Link href="/">
        <Image
          src={FirulaisLogo}
          alt="firulai logo"
          className="w-[200px] max-sm:w-[120px]"
          quality={100}
        />
      </Link>

      <div className="md:w-1/3 w-[80vw] text-center space-y-4 md:mr-40 text-white opacity-80">
        <h1 className=" text-base max-sm:text-sm">{footer?.missionTitle}</h1>
        <p className="text-xs">{footer?.missionDescription}</p>
        <Link
          href="/terms_and_conditions"
          aria-label="firulai términos y condiciones"
          className="text-xs block"
        >
          {footer?.terms_and_conditions}
        </Link>
      </div>

      <div className="flex justify-center items-center md:space-y-5  flex-col max-sm:flex-row max-sm:space-x-2">
        <Link
          href="https://www.instagram.com/firulai.co/"
          target="_blank"
          rel="noreferrer"
          aria-label="firulai instagram"
        >
          <Image
            src={IgIcon}
            alt="firulai instagram"
            width={30}
            quality={100}
          />
        </Link>
        <Link
          href="https://api.whatsapp.com/send?l=es&phone=573226646007"
          aria-label="firulai whatsapp"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={WppIcon}
            alt="firulai whatsapp"
            width={30}
            quality={100}
          ></Image>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
