import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "./index.css";
import Detail from "./pages/Detail";
import Favourite from "./pages/Favourite";
import Home from "./pages/Home";
import PageError from "./pages/PageError";
import Pokemon from "./pages/Pokemon";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pokemon?",
        element: <Pokemon />,
      },
      {
        path: "/pokemon/:name?",
        element: <Detail />,
      },
      {
        path: "/:user/favourite",
        element: <Favourite />,
      },
      {
        path: "*",
        element: <PageError />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);
