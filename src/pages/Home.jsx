import TextH1 from "../components/TextH1";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Card from "../components/Card";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const handleNavigateTo = () => {
    let audio = new Audio("../assets/sound/in.wav");
    audio.play();
    navigate("/favourite");
  };
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");
      setData(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <section>
      <TextH1 text="Pokedex" />
      <button onClick={() => handleNavigateTo()}>favourite page</button>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 ">
        {data?.map((el) => <Card key={el.name} data={el}/>)}
      </div>
    </section>
  );
};

export default Home;
