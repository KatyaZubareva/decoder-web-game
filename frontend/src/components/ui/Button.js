import React from "react";

const Button = ({ children, className, onClick, variant }) => {
  const baseStyle = "px-4 py-2 rounded-xl font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30",
    secondary: "bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm",
    danger: "bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/30",
    ghost: "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;