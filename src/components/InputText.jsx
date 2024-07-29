import React from "react";

const InputText = ({ className, onChange, ...props }) => {
  return (
    <input
      {...props}
      onChange={onChange}
      maxLength={15}
      className={`w-full rounded-md border-none text-grey placeholder:text-grey text-sm bg-black px-3 py-2 ${
        className || ""
      }`}
    />
  );
};

export default InputText;
