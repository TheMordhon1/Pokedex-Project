import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import useNavigation from "./hooks/useNavigation";

function App() {
  const location = useLocation();
  const userLog = localStorage.getItem("username");
  const { handleNavigateNoAudio } = useNavigation();

  useEffect(() => {
    if (!userLog) {
      handleNavigateNoAudio("/");
    }
  }, []);
  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      <main className="max-w-screen-lg mx-auto px-8">
        <Outlet />
      </main>
    </>
  );
}

export default App;
