"use client";

import { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Logo from "../../public/assets/firulaisIcon.webp";
import Link from "next/link";

const NavBar = (props) => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <>
      <div className="px-2 flex justify-around items-center h-full max-sm:flex-row-reverse max-sm:w-[55%] max-sm:justify-between">
        <Link href="/">
          <Image
            src={Logo}
            alt="Firulais icon"
            width={30}
            quality={100}
          ></Image>
        </Link>
        <div className="max-sm:hidden space-x-4 text-gray-300">
          <Link href="/mascotas" className="hover:text-blanco mr-2 text-sm">
            MASCOTAS
          </Link>
         
        </div>
        <div
          className="text-main outline-none p-2 rounded-md focus:border-gray-400 focus:border hidden max-sm:block"
          onClick={handleClick}
        >
          {!nav ? <MenuIcon className="w-5" /> : <XIcon className="w-5" />}
        </div>
        {props.isLogged ? (
          <div className="text-gray-300 space-x-4 max-sm:hidden text-sm">
            <button className="hover:text-blanco outline-1 rounded border p-2 hover:bg-main transition-all duration-300">
              <Link href="/sign-in">Sign In</Link>
            </button>
            <button className="hover:text-blanco outline-1 rounded border p-2 hover:bg-main transition-all duration-300">
              <Link href="/sign-up">Sign Up</Link>
            </button>
          </div>
        ) : null}
      </div>
      <div
        className={
          !nav
            ? "hidden"
            : "absolute bg-lightGray w-screen px-8 py-12 rounded-b-xl text-blanco flex flex-col space-y-3"
        }
      >
        <Link href="/mascotas" onClick={() => setNav(!nav)}>
          MASCOTAS
        </Link>
       
        {props.isLogged ? (
          <div className="text-gray-300 flex flex-col space-y-3 text-sm">
            <Link
              href="/sign-in"
              onClick={() => setNav(!nav)}
              className="hover:text-blanco outline-1 text-center rounded-lg border p-2 hover:bg-main transition-all duration-300"
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              onClick={() => setNav(!nav)}
              className="hover:text-blanco text-center outline-1 rounded-lg border p-2 hover:bg-main transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default NavBar;
