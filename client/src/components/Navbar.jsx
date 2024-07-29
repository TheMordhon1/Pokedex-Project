import React, { useState } from "react";
import useNavigation from "../hooks/useNavigation";
import InputText from "./InputText";

const Navbar = () => {
  const { handleBackTo, handleNavigateTo } = useNavigation();
  const [search, setSearch] = useState("");

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    handleNavigateTo(`/pokemon/${search}`);
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between w-full bg-ligthblack border-grey/20 border-b h-[60px] px-8 md:px-20">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => handleBackTo("/")}
      >
        <img src="./logo.png" alt="logo" className="w-10" />
        <div className="font-bold -skew-x-12 text-white mt-2 text-xl">
          POKÉDEX
        </div>
      </div>
      <button
        className="bg-lightblack hover:bg-slate-900 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleNavigateTo("/favourite")}
      >
        Favourite
      </button>

      <form onSubmit={handleSubmitSearch} className="w-[15rem]">
        <InputText
          placeholder="🔍 Search pokémon"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </header>
  );
};

export default Navbar;
