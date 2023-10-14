import React from "react";

interface ButtonI {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  isSelected?: boolean;
  className?: string;
}

const Button: React.FC<ButtonI> = ({
  text,
  onClick,
  isSelected,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`border-[1px] px-4 py-2 border-black rounded-md ${
        isSelected && "bg-black text-white"
      } ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
