import React from "react";
import { auth, UserButton } from "@clerk/nextjs";
import NavLinks from "./NavLinks";

const NavBar = ({ lang }) => {
  const { userId } = auth()
  
  return (
    <>
      <nav className="bg-white w-full h-[48px] fixed top-0 z-50 shadow-lg">
        <NavLinks isLogged={userId === null} lang={lang}/>
      </nav>
      {userId && (
        <div className="bg-white w-[20vw] h-[48px] fixed top-0 right-0 z-50 p-2">
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </>
  );
};

export default NavBar;
