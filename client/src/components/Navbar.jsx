import React, { useState } from "react";
import { FaHeart, FaUser } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdMenu } from "react-icons/io";
import { PiEggCrackFill } from "react-icons/pi";
import Swal from "sweetalert2";
import Logo from "../assets/logo.png";
import useNavigation from "../hooks/useNavigation";
import InputText from "./InputText";
import Sidebar from "./Sidebar";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { handleBackTo, handleNavigateTo } = useNavigation();
  const username = localStorage.getItem("username");
  const [search, setSearch] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  const [sidebarShown, setSidebarShown] = useState(false);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    handleNavigateTo(`/pokemon?q=${search}`);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Do you want to leave?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        handleBackTo("/");
      }
    });
  };

  const handleToggleMenu = () => {
    setSidebarShown(!sidebarShown);
  };

  return (
    <>
      {/* Navbar Desktop */}
      <header className="sticky top-0 z-10 items-center justify-between w-full bg-ligthblack border-grey/20 border-b h-[60px] px-8 md:px-20 hidden md:flex">
        <div className="flex items-center gap-6">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleBackTo("/pokemon")}
          >
            <img src={Logo} alt="logo" className="w-10" />
            <div className="font-bold -skew-x-12 text-white mt-2 text-xl">
              POKÉDEX
            </div>
          </div>
          <form onSubmit={handleSubmitSearch} className="w-[15rem]">
            <InputText
              placeholder="🔍 Search pokémon"
              value={search}
              setValue={setSearch}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
        <nav className="flex items-center gap-4">
          <NavLink
            className={({ isActive }) =>
              `${
                isActive ? "text-yellow-300 bg-slate-900" : "text-white"
              } bg-lightblack hover:bg-slate-900 text-white font-bold py-3 px-2 rounded`
            }
            to={`egg-group`}
          >
            <PiEggCrackFill />
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `${
                isActive ? "text-el_fighting bg-slate-900" : "text-white"
              } bg-lightblack hover:bg-slate-900 text-white font-bold py-3 px-2 rounded`
            }
            to={`${username}/favourite`}
          >
            <FaHeart />
          </NavLink>

          <div className="relative">
            <button
              className="bg-black text-white font-bold py-2 px-4 rounded flex items-center gap-4"
              onClick={() => setShowLogout(!showLogout)}
            >
              <FaUser className="text-white text-xl" />
              {username}
              <IoMdArrowDropdown className="text-white text-sm" />
            </button>
            {showLogout && (
              <button
                className="absolute -bottom-12 right-0 bg-white text-black py-2 rounded-md px-8 transition ease-in duration-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Navbar Mobile */}
      <header className="sticky top-0 z-50 flex md:hidden items-center justify-between w-full bg-ligthblack border-grey/20 border-b h-[60px] px-8 md:px-20">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleBackTo("/pokemon")}
        >
          <img src={Logo} alt="logo" className="w-10" />
          <div className="font-bold -skew-x-12 text-white mt-2 text-xl">
            POKÉDEX
          </div>
        </div>

        <div className="flex items-center gap-4">
          <form
            onSubmit={handleSubmitSearch}
            className="w-[15rem] hidden sm:block"
          >
            <InputText
              placeholder="🔍 Search pokémon"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <IoMdMenu className="text-white text-xl" onClick={handleToggleMenu} />
        </div>
      </header>

      <Sidebar
        username={username}
        shown={sidebarShown}
        setShown={setSidebarShown}
        handleToggle={handleToggleMenu}
        handleSubmitSearch={handleSubmitSearch}
        handleLogout={handleLogout}
      />
    </>
  );
};

export default Navbar;
