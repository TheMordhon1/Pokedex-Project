import React from "react";
import TextH1 from "../components/TextH1";
import useNavigation from "../hooks/useNavigation";

const Home = () => {
  const { handleNavigateTo } = useNavigation();

  return (
    <section>
      <TextH1 text="Pokedex" />
      <button onClick={() => handleNavigateTo("/favourite")}>
        favourite page
      </button>
    </section>
  );
};

export default Home;
