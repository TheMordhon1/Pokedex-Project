import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <main className="bg-black h-screen">
        <Outlet />
      </main>
    </>
  );
}

export default App;
