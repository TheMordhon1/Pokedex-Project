import React from "react";
import pikachu from "../assets/pikachu.png";
import TextH1 from "./TextH1";

const EmptyState = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={pikachu} alt="" width={100} />
      <div className="grid gap-4 mt-8 place-items-center">
        <TextH1 text={title} />
        <h3 className="text-grey text-base">{subtitle}</h3>
      </div>
    </div>
  );
};

export default EmptyState;
