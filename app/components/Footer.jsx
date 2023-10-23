import Image from "next/image";
import Link from "next/link";
import FirulaisLogo from "../../public/assets/firulaisLogo.webp";
import WppIcon from "../../public/icons/whatsapp-icon.svg";
import Xicon from "../../public/icons/twitter-icon.svg";
import EmailIcon from "../../public/icons/email-icon.svg";

const Footer = () => {
  return (
    <div className="bottom-0 flex justify-around items-center w-full h-[40vh] rounded-t-3xl bg-lightGray max-sm:flex-col max-sm:h-[50vh]">
      <Link href="/">
        <Image
          src={FirulaisLogo}
          alt="Firulais App"
          className="w-[200px] max-sm:w-[120px]"
          quality={100}
        ></Image>
      </Link>

      <div className="w-1/3 text-center space-y-2">
        <h1 className="text-main text-base max-sm:text-sm">OUR MISION</h1>
        <p className="text-xs">
          Play for a purpose. Firulais merges virtual pets with real-world
          change. Experience fun with a meaningful impact on sheltered animals'
          lives
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
          ></Image>
        </Link>
        <Link
          href="https://twitter.com/firulaisVR"
          target="_blank"
          rel="noreferrer"
          aria-label="firulais twitter x"
        >
          <Image
            src={Xicon}
            alt="Twitter Firulais"
            width={30}
            quality={100}
          ></Image>
        </Link>
      
      </div>
    </div>
  );
};

export default Footer;
