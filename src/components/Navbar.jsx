import React from "react";
import useNavigation from "../hooks/useNavigation";

const Navbar = () => {
  const { handleBackTo } = useNavigation();
  return (
    <header className="flex items-center justify-between w-full bg-ligthblack/50 border-grey/20 border-b h-[60px] px-8">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => handleBackTo("/")}
      >
        <img src="./logo.png" alt="logo" className="w-10" />

        <div className="font-bold -skew-x-12 text-white mt-2 text-xl">
          POKÉDEX
        </div>
      </div>
    </header>
  );
};

export default Navbar;
