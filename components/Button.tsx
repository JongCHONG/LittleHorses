import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const colorClassMap: { [key: string]: string } = {
  indigo: "bg-indigo-600 hover:bg-indigo-700",
  red: "bg-red-800 hover:bg-red-900",
};

type ExtendedButtonProps = ButtonProps & { color?: keyof typeof colorClassMap };

const Button: React.FC<ExtendedButtonProps> = ({ children, color = "indigo", ...props }) => {
  const bgColorClass = colorClassMap[color] || colorClassMap["indigo"];

  return (
    <button
      {...props}
      className={`
        inline-block 
        rounded-lg
        ${bgColorClass}
        px-4 sm:px-6 md:px-8
        py-2 sm:py-3
        text-xs sm:text-sm md:text-base
        font-medium 
        text-white 
        transition-all
        duration-200
        hover:scale-105
        active:scale-95
        focus:ring-2
        focus:ring-offset-2
        focus:ring-opacity-50
        focus:outline-none
        cursor-pointer
        shadow-md
        hover:shadow-lg
        whitespace-nowrap
      `}
    >
      {children}
    </button>
  );
};

export default Button;
