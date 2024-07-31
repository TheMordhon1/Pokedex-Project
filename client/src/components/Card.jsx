/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

function Card({ data, onClick, count }) {
  const types = data?.types;
  if (!types) {
    return null;
  }

  const formatId = (id) => {
    return id.toString().padStart(4, "0");
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

  return (
    <div
      className="relative block mb-2 flex-grow flex-shrink overflow-hidden rounded-md p-4 capitalize min-h-[130px] transition-all ease-linear duration-150 hover:shadow-sm hover:shadow-white hover:scale-[1.02] cursor-pointer"
      style={{
        background: getBackground(types),
        border: `1px solid ${elements["el_" + types[0]?.type.name]}`,
        flexBasis: "15rem",
      }}
      onClick={onClick}
    >
      <div className="flex flex-col gap-2 w-1/2 text-start">
        <span className="text-white text-xl">{data.name}</span>
        <span className="text-xs text-slate-300">#{formatId(data.id)}</span>
        <div className="flex items-center">
          {types?.map((type, index) => (
            <span key={index} className="text-xs text-slate-300">
              {index > 0 ? `, ${type?.type?.name}` : type?.type?.name}
            </span>
          ))}
        </div>

        <div className="flex items-center">
          {types?.map((type, index) => {
            const element = type.type.name;
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
      <div className="absolute right-3 top-2">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
          width={100}
          height={100}
        />
      </div>
      {count > 1 && (
        <span className="absolute bottom-2 right-2 text-sm bg-black shadow-sm shadow-white rounded-full h-8 w-8 text-white flex justify-center items-center">
          {count}x
        </span>
      )}
    </div>
  );
}

export default Card;
