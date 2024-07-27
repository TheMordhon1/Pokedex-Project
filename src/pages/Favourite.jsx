import React from "react";
import TextH1 from "../components/TextH1";
import useNavigation from "../hooks/useNavigation";

const Favourite = () => {
  const { handleBackTo } = useNavigation();
  return (
    <div>
      <TextH1 text="Favourite page" />
      <button onClick={() => handleBackTo("/")} className="text-white">
        Kembali
      </button>
    </div>
  );
};

export default Favourite;
