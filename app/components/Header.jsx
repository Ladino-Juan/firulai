import React from "react";
import { auth, UserButton } from "@clerk/nextjs";
import BurguerMenu from "./BurguerMenu";

const Header = () => {


  return (
    <>
      <nav className="bg-lightGray w-full h-[48px] fixed top-0 z-50">
      </nav>
        <div className="bg-lightGray w-[20vw] h-[48px] fixed top-0 right-0 z-50 p-2">
        </div>

    </>
  );
};

export default Header;
