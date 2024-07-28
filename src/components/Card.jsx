/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

function Card({ data }) {
  const types = data?.types;
  if (!types) {
    return null;
  }

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

  return (
    <div
      // className={`flex flex-row w-64 h-32 border-2 border-white rounded-md py-3 px-3`}
      className="relative block mb-2 flex-grow flex-shrink flex-[15rem] overflow-hidden rounded-md py-3 px-4 capitalize min-h-[120px]"
      style={{
        background: getBackground(types),
      }}
    >
      <div className="flex flex-col w-1/2 text-start">
        <span className="text-white text-xl">{data.name}</span>
        <div className="flex items-center">
          {types?.map((type, index) => (
            <span key={index} className="text-xs">
              {index > 0 ? `, ${type?.type?.name}` : type?.type?.name}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute right-3 top-2">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}

export default Card;
