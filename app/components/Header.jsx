import React from "react";
import { auth, UserButton } from "@clerk/nextjs";
import BurguerMenu from "./BurguerMenu";

const Header = () => {
  const { userId } = auth();

  return (
    <>
      <nav className="bg-lightGray w-full h-[48px] fixed top-0 z-50">
        <BurguerMenu isLogged={userId === null} />
      </nav>
      {userId && (
        <div className="bg-lightGray w-[20vw] h-[48px] fixed top-0 right-0 z-50 p-2">
          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </>
  );
};

export default Header;
