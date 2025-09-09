import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const colorClassMap: { [key: string]: string } = {
  indigo: "bg-indigo-600",
  red: "bg-red-800",
};

type ExtendedButtonProps = ButtonProps & { color?: keyof typeof colorClassMap };

const Button: React.FC<ExtendedButtonProps> = ({ children, color = "indigo", ...props }) => {
  const bgColorClass = colorClassMap[color] || colorClassMap["indigo"];

  return (
    <button
      {...props}
      className={`
        inline-block 
        rounded-sm 
        ${bgColorClass}
        mr-3
        px-8 
        py-3 
        text-sm 
        font-medium 
        text-white 
        transition 
        hover:scale-110 
        hover:-rotate-2 
        focus:ring-3 
        focus:outline-hidden 
        cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default Button;
