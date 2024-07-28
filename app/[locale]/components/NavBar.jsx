import React from "react";
import { auth, UserButton } from "@clerk/nextjs";
import { currentUser } from '@clerk/nextjs/server';
import NavLinks from "./NavLinks";

const NavBar = async ({ lang }) => {
  const { userId } = auth()
  const user = await currentUser();

  
  return (
    <>
      <nav className="bg-white w-full h-[48px] fixed top-0 z-50 shadow-lg">
        <NavLinks isLogged={userId === null} lang={lang} username={user?.username}/>
      </nav>
      {userId && (
        <div className="bg-white w-[20vw] h-[48px] max-sm:-right-5 fixed top-0 right-0 z-50 p-2">
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </>
  );
};

export default NavBar;
