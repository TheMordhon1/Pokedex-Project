import React, { useEffect } from "react";
import TextH1 from "./TextH1";
import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";

const Popup = ({ isOpen, onClose, onConfirm, isFavorite, content }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  async function getDetailData() {
    if (!content?.url) return;
    try {
      const response = await axios.get(content?.url);
      setData(response?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isOpen && content) {
      getDetailData();
    }
  }, [isOpen, content]);

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
    if (types?.length > 1) {
      const colors = types.map((type) => getColor(`el_${type?.type?.name}`));
      return `linear-gradient(80deg, ${colors.join(", ")})`;
    } else {
      return getColor(`el_${types[0]?.type?.name}`);
    }
  };

  if (!isOpen) return null;
  if (isLoading)
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full bg-black/50 grid place-items-center">
        <Loading />
      </div>
    );
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 h-full w-full flex justify-center items-center">
      <div className="bg-black p-6 rounded-lg shadow-lg w-[80%] md:w-[50%] max-w-[26rem] relative z-[51]">
        <div
          className="relative grid place-items-center h-52 rounded-md"
          style={{
            background: getBackground(data?.types || []),
            border: `1px solid ${
              elements["el_" + data?.types[0]?.type?.name || []]
            }`,
          }}
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
            width={210}
            height={210}
          />

          <div className="absolute bottom-4 right-4 flex items-center">
            {data?.types?.map((type, index) => {
              const element = type?.type?.name;
              return (
                <div
                  key={index}
                  className={`${
                    index === 0 ? "h-4 w-4" : "h-3 w-3 -ml-1"
                  } border-white border rounded-full`}
                  style={{ background: elements[`el_${element}`] }}
                />
              );
            })}
          </div>
        </div>
        <div className="flex justify-between items-center  mt-6">
          <TextH1 text={data?.name} className="capitalize tracking-wider" />
          <span className="text-lg text-slate-300">#{formatId(data?.id)}</span>
        </div>
        <p className="mt-4 text-grey">Ini adalah teks konten dalam popup.</p>
        <div className="flex flex-col gap-4 mt-10">
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {!isFavorite ? "Save to Favourite" : "Delete Favourite"}
          </button>
          <button
            onClick={onClose}
            className="bg-el_dragon text-white px-4 py-2 rounded"
          >
            See more detail
          </button>
        </div>
      </div>
      <div
        className="absolute z-[50] inset-0 bg-ligthblack/75"
        onClick={onClose}
      />
    </div>
  );
};

export default Popup;
