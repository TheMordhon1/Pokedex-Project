import axios from "axios";
import { useEffect, useState } from "react";
import { TfiRuler } from "react-icons/tfi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import BackTo from "../components/BackTo";
import TextH1 from "../components/TextH1";

import SuccessSound from "../assets/sound/success.wav";

const Detail = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [abilities, setAbilities] = useState([]);
  const { name } = useParams();
  async function getData() {
    setData({});
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );

      const abilitiesPromises = response?.data?.abilities?.map((item) =>
        getAbility(item.ability.url)
      );

      await Promise.all(abilitiesPromises);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function getAbility(abUrl) {
    if (!abUrl) return;
    try {
      const response = await axios.get(abUrl);
      const abilityData = response.data.effect_entries.filter(
        (d) => d.language.name === "en"
      );

      setAbilities(abilityData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const formatId = (id) => {
    return id?.toString().padStart(4, "0");
  };

  const elements = {
    el_undefined: "rgba(229, 231, 235, .7)",
    el_bug: "rgba(157, 193, 48, .7)",
    el_dark: "rgba(95, 96, 109, .7)",
    el_dragon: "rgba(7, 115, 199, .7)",
    el_electric: "rgba(237, 213, 63, .7)",
    el_fairy: "rgba(239, 151, 230, .7)",
    el_fighting: "rgba(217, 66, 86, .7)",
    el_fire: "rgba(252, 108, 109, .7)",
    el_flying: "rgba(155, 180, 232, .7)",
    el_ghost: "rgba(121, 117, 212, .7)",
    el_grass: "rgba(93, 190, 98, .7)",
    el_ground: "rgba(215, 133, 85, .7)",
    el_ice: "rgba(152, 216, 216, .7)",
    el_normal: "rgba(154, 157, 161, .7)",
    el_poison: "rgba(181, 99, 206, .7)",
    el_psychic: "rgba(248, 88, 136, .7)",
    el_rock: "rgba(195, 177, 98, .7)",
    el_steel: "rgba(184, 184, 208, .7)",
    el_water: "rgba(96, 165, 250, .7)",
  };

  const getColor = (type) => elements[type] || elements["el_undefined"];

  const getBackground = (types) => {
    if (types.length > 1) {
      const colors = types.map((type) => getColor(`el_${type?.type?.name}`));
      return `linear-gradient(80deg, ${colors.join(", ")})`;
    } else {
      return getColor(`el_${types[0].type.name}`);
    }
  };

  const handleSave = async () => {
    if (!data) return;
    await axios.post("http://localhost:3000/favourites", {
      name: data?.name,
      url: data?.url,
      username: localStorage.getItem("username"),
    });
    let audio = new Audio(SuccessSound);
    audio.play();
    withReactContent(Swal).fire({
      title: "Yeay !",
      html: (
        <>
          <strong className="capitalize">{data?.name}</strong> has been added to
          your favorites.
        </>
      ),
      icon: "success",
    });
  };

  return (
    <section className="py-10">
      <div className="grid gap-2">
        <BackTo text="Back to pokémon page" to={"/pokemon"} />
        <div className="flex justify-between items-center">
          <div className="grid gap-2">
            <TextH1 text={data?.name} />
            <span className="text-lg text-slate-300">
              #{formatId(data?.id)}
            </span>
          </div>
          <div className="flex">
            <button
              className="bg-el_grass/80 hover:bg-el_grass font-medium text-white px-4 py-2 rounded flex-1"
              onClick={handleSave}
            >
              Add to Favourite
            </button>
          </div>
        </div>
      </div>
      <div className="relative h-[60vh]">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2"
        />

        <div className="grid absolute top-1/2 -translate-y-1/2 w-28 right-0">
          <div className=" bg-ligthblack rounded-md flex flex-col justify-center items-center flex-1 gap-1 text-center p-8">
            <TfiRuler className="text-white text-lg" />
            <span className="text-white text-sm">{data.height} m</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-8 grid gap-2">
          <div className="flex items-center">
            {data.types?.map((type, index) => (
              <span key={index} className="text-base text-slate-300">
                {index > 0 ? `, ${type?.type?.name}` : type?.type?.name}
              </span>
            ))}
          </div>

          <div className="flex items-center">
            {data?.types?.map((type, index) => {
              const element = type.type.name;
              return (
                <div
                  key={index}
                  className={`${
                    index === 0 ? "h-8 w-8" : "h-5 w-5 -ml-1"
                  } border-white border rounded-full`}
                  style={{ background: elements[`el_${element}`] }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-10 bg-ligthblack px-8 py-4 w-full md:w-1/2 rounded-md">
        <ul className="flex flex-col gap-2">
          {abilities.map((item, index) => (
            <li key={index} className="grid gap-2">
              <h4 className="text-white font-semibold text-base">
                {item.short_effect}
              </h4>
              <p className="text-grey text-sm">{item.effect}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Detail;
