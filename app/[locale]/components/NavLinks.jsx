"use client";

import { useEffect, useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Logo from "@assets/firulaisIcon.webp";
import Link from "next/link";
import { getlocales } from "../../actions";

const NavLinks = (props) => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  const [navBar, setNavBar] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { navBar } = await getlocales(props.lang);
        setNavBar(navBar);
      } catch (error) {
        console.error("Error fetching tools data:", error);
      }
    }
    if (!navBar) {
      fetchData();
    }
  }, [props.lang, navBar]);

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
        <div className="max-sm:hidden space-x-3 text-gray-500">
          <Link href={`/api/pets`} className="hover:text-blanco mr-2 text-sm">
          MASCOTAS
          </Link>
          <Link href={`/api/pets`} className="hover:text-blanco mr-2 text-sm">
          | TIENDA
          </Link>
          <Link href={`/api/pets`} className="hover:text-blanco mr-2 text-sm">
          | ACERCA
          </Link>

        </div>
        <div
          className="text-lightGreen outline-none p-2 rounded-md focus:border-gray-400 focus:border hidden max-sm:block"
          onClick={handleClick}
        >
          {!nav ? <MenuIcon className="w-5" /> : <XIcon className="w-5" />}
        </div>
        {props.isLogged ? (
          <div className="text-white space-x-4 max-sm:hidden text-sm">
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
            : "absolute bg-lightGreen w-screen px-8 py-12 rounded-b-xl text-blanco flex flex-col space-y-3"
        }
      >
        <Link href={`/api/pets`} onClick={() => setNav(!nav)}>
          {navBar?.pets}
        </Link>

        {props.isLogged ? (
          <div className="text-white flex flex-col space-y-3 text-sm">
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

export default NavLinks;
