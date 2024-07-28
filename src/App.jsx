import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main className="flex flex-col bg-black w-full">
      <Navbar />
      <div className="flex-1 w-full md:px-20 px-8 py-10">
        <Outlet />
      </div>
    </main>
  );
}

export default App;
