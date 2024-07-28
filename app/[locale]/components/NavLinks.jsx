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
  const [username, setUsername] = useState(null);
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

  useEffect(() => {
    if (props.username) {
      setUsername(props.username);
    }
  }, [props.username]);


  return (
    <>
      <div className="px-2 w-[95vw] flex md:justify-evenly lg:justify-around items-center h-full max-sm:flex-row-reverse max-sm:w-[55%] max-sm:justify-between">
        <Link href="/">
          <div className="flex items-center">
            <Image
              src={Logo}
              alt="Firulais icon"
              className="max-sm:w-[30px]"
              width={50}
              quality={100}
            ></Image>
            <span className="text-sm text-darkGreen hidden md:hidden lg:block">
              {navBar?.home}
            </span>
          </div>
        </Link>
        <div className="max-sm:hidden space-x-3 text-darkGreen">
          <Link
            href={`/api/pets`}
            className="hover:text-darkestGreen mr-1 text-sm"
          >
            {navBar?.pets}
          </Link>
          <span className="text-darkGreen">|</span>
          <Link
            href={`/api/enterprise`}
            className="hover:text-darkestGreen mr-1 text-sm"
          >
            {navBar?.enterprise}
          </Link>
          <span className="text-darkGreen">|</span>
          {props.isLogged ? (
            <Link
              href={`/sign-in`}
              className="hover:text-darkestGreen mr-1 text-sm"
            >
              {navBar?.mypets}
            </Link>
          ) : (
            <Link
              href={`/dashboard`}
              className="hover:text-darkestGreen mr-2 text-sm"
            >
              {navBar?.mypets}
            </Link>
          )}
    
          {username && (
            <>
                   <span className="text-darkGreen">|</span>
            <Link
              href={`/${username}`}
              className="hover:text-darkestGreen mr-1 text-sm"
            >
              {navBar?.share}
            </Link>
            </>
          )}
        </div>
        <div
          className="text-darkGreen outline-none p-2 rounded-md focus:border-darkGreen focus:border hidden max-sm:block"
          onClick={handleClick}
        >
          {!nav ? <MenuIcon className="w-5" /> : <XIcon className="w-5" />}
        </div>
        {props.isLogged ? (
          <div className="text-white space-x-4 max-sm:hidden text-sm">
            <button className="hover:text-white bg-darkGreen outline-1 rounded-lg shadow-xl border py-2 px-5 hover:bg-darkestGreen transition-all duration-500 hover:scale-105">
              <Link href="/sign-in">{navBar?.signin}</Link>
            </button>
            <button className="hover:text-white bg-darkGreen outline-1 rounded-lg shadow-xl border py-2 px-5 hover:bg-darkestGreen transition-all duration-500 hover:scale-105">
              <Link href="/sign-up">{navBar?.signup}</Link>
            </button>
          </div>
        ) : null}
      </div>
      <div
        className={
          !nav
            ? "hidden"
            : "absolute bg-darkestGreen w-screen px-8 py-12 rounded-b-xl text-white flex flex-col space-y-3"
        }
      >
        <Link
          href={`/api/pets`}
          className=" opacity-80"
          onClick={() => setNav(!nav)}
        >
          {navBar?.pets}
        </Link>
        <Link
          href={`/api/enterprise`}
          className=" opacity-80"
          onClick={() => setNav(!nav)}
        >
          {navBar?.enterprise}
        </Link>
        {props.isLogged ? (
          <Link
            href={`/sign-in`}
            className=" opacity-80"
            onClick={() => setNav(!nav)}
          >
            {navBar?.mypets}
          </Link>
        ) : (
          <Link
            href={`/dashboard`}
            className=" opacity-80"
            onClick={() => setNav(!nav)}
          >
            {navBar?.mypets}
          </Link>
        )}

        {username && (
          <Link
            href={`/${username}`}
            className=" opacity-80"
            onClick={() => setNav(!nav)}
          >
            {navBar?.share}
          </Link>
        )}

        {props.isLogged ? (
          <div className="text-white flex flex-col space-y-3 text-sm">
            <Link
              href="/sign-in"
              onClick={() => setNav(!nav)}
              className="hover:text-blanco outline-1 text-center rounded-lg border p-2 hover:bg-darkGreen transition-all duration-300"
            >
              {navBar?.signin}
            </Link>

            <Link
              href="/sign-up"
              onClick={() => setNav(!nav)}
              className="hover:text-blanco text-center outline-1 rounded-lg border p-2 hover:bg-darkGreen transition-all duration-300"
            >
              {navBar?.signup}
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default NavLinks;
