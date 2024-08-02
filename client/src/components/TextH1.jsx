import React from "react";

const TextH1 = ({ text, className }) => {
  return (
    <h1
      className={`text-white text-2xl md:text-4xl font-bold ${className || ""}`}
    >
      {text}
    </h1>
  );
};

export default TextH1;
