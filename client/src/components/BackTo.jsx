import React from "react";
import useNavigation from "../hooks/useNavigation";
import { FaArrowLeft } from "react-icons/fa";

const BackTo = ({ text, to, className }) => {
  const { handleBackTo } = useNavigation();
  return (
    <div
      className={`text-grey flex items-center gap-4 cursor-pointer hover:text-white/80 ${
        className || ""
      }`}
      onClick={() => handleBackTo(to)}
    >
      <FaArrowLeft className="text-lg" />
      <p className="text-lg">{text}</p>
    </div>
  );
};

export default BackTo;
