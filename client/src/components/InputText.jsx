import React from "react";

const InputText = ({ className, background, onChange, ...props }) => {
  return (
    <input
      {...props}
      onChange={onChange}
      maxLength={15}
      className={`w-full rounded-md border-none text-grey placeholder:text-grey text-sm px-3 py-2 ${
        background ? background : "bg-black"
      } ${className || ""}`}
    />
  );
};

export default InputText;
