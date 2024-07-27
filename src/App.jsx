import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main className="flex flex-col bg-black w-full">
      <Navbar />
      <div className="mx-auto max-w-xs md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl flex-1">
        <Outlet />
      </div>
    </main>
  );
}

export default App;
