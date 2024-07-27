import React from "react";
import TextH1 from "../components/TextH1";
import NavigateTo from "../components/NavigateTo";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleNavigateTo = () => {
    let audio = new Audio("../assets/sound/in.wav");
    audio.play();
    navigate("/favourite");
  };

  return (
    <section>
      <TextH1 text="Pokedex" />
      <button onClick={() => handleNavigateTo()}>favourite page</button>
    </section>
  );
};

export default Home;
