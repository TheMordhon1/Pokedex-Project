import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="max-w-screen-lg mx-auto px-8">
        <Outlet />
      </main>
    </>
  );
}

export default App;
