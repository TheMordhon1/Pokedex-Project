import React from "react";
import useNavigation from "../hooks/useNavigation";
import InputText from "./InputText";

const Sidebar = ({ username, shown, setShown, handleToggle, handleLogout }) => {
  const { handleNavigateTo } = useNavigation();
  return (
    <>
      <aside
        className={`flex flex-col justify-between h-[calc(100vh-60px)] fixed z-50 w-[60%] bg-ligthblack border-l border-ligthblack/50 px-6 py-10 transition-all ease-linear duration-200 ${
          shown ? "right-0" : "-right-[100%]"
        }`}
      >
        <div>
          <InputText className="block sm:hidden" />
          <p className="text-grey text-lg mb-2">Menu</p>
          <ul className="grid gap-4">
            <li>
              <button
                className="hover:bg-slate-900 text-white font-bold py-2 px-4 rounded w-full text-left"
                onClick={() => {
                  handleNavigateTo("/favourite");
                  setShown(false);
                }}
              >
                Favourite
              </button>
            </li>
          </ul>
        </div>
        <div className="grid gap-4">
          <h4 className="text-white font-semibold text-xl">
            Hello, {username}
          </h4>
          <button
            className="bg-el_fighting text-white font-semibold rounded-md py-4"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>
      {shown && (
        <div
          className="bg-black/50 fixed z-20 top-0 left-0 right-0 bottom-0 w-full h-full"
          onClick={handleToggle}
        />
      )}
    </>
  );
};

export default Sidebar;
