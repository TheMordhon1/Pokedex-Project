import React from "react";
import TextH1 from "../components/TextH1";
import { useNavigate } from "react-router-dom";

const Favourite = () => {
  const navigate = useNavigate();
  const handleBackTo = () => {
    let audio = new Audio("../assets/sound/out.wav");
    audio.play();
    navigate("/");
  };
  return (
    <div>
      <TextH1 text="Favourite page" />
      <button onClick={handleBackTo} className="text-white">
        Kembali
      </button>
    </div>
  );
};

export default Favourite;
