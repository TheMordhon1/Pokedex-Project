import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useNavigation from "../hooks/useNavigation";
import InputText from "./InputText";

const Navbar = () => {
  const { handleBackTo } = useNavigation();
  const navigate = useNavigate();
  const handleClick = () => {
   navigate('/pages/Favourite');
  }

  let { menu } = useParams();

  const [search, setSearch] = useState("");

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    navigate(`/${menu}?q=${search}`);
  };

  return (
    <header className="sticky top-0 flex items-center justify-between w-full bg-ligthblack/50 border-grey/20 border-b h-[60px] px-8 md:px-20">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => handleBackTo("/")}
      >
        <img src="./logo.png" alt="logo" className="w-10" />

        <div className="font-bold -skew-x-12 text-white mt-2 text-xl">
          POKÉDEX
        </div>

     
      </div>
{/*
      <button class="bg-ligthblack hover:bg-slate-900 text-white font-bold py-2 px-4 rounded">
        Favourite
        </button>
*/}

        <button 
        className="bg-lightblack hover:bg-slate-900 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Favourite
      </button>
      

      <form onSubmit={handleSubmitSearch} className="">
        <InputText
          placeholder="🔍 Search pokémon"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </header>
  );
};

export default Navbar;
