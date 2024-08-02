import React from "react";
import { IoMdClose } from "react-icons/io";

const InputText = ({
  className,
  background,
  value,
  onChange,
  setValue,
  ...props
}) => {
  const valueLength = String(value).length;
  return (
    <div
      className={`relative flex items-center justify-between bg-black rounded-md px-3 ${
        className || ""
      } ${background ? background : "bg-black"} ${
        valueLength > 0 ? "border border-white" : "border border-black"
      }`}
    >
      <input
        {...props}
        onChange={onChange}
        maxLength={15}
        value={value}
        className={`w-full text-grey placeholder:text-grey text-sm py-2 h-full flex-1 bg-transparent outline-none`}
      />

      {valueLength > 0 && (
        <span
          className="text-white cursor-pointer"
          onClick={() => setValue("")}
        >
          <IoMdClose />
        </span>
      )}
    </div>
  );
};

export default InputText;
