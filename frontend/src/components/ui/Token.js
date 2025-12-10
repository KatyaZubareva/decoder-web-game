// src/components/ui/Token.js

import React from "react";

const Token = ({ color, filled }) => {
    const styles = {
      white: filled ? "bg-slate-100 border-2 border-slate-300 shadow-md" : "bg-transparent border-2 border-slate-300 border-dashed opacity-50",
      black: filled ? "bg-slate-100 border-2 border-slate-300 shadow-md" : "bg-transparent border-2 border-slate-300 border-dashed opacity-50"
    };
    
    return (
      <div className={`w-8 h-8 rounded-full ${styles[color]} transition-all duration-300 flex items-center justify-center`}>
         {filled && <div className={`w-5 h-5 rounded-full border border-white/20 ${color === 'white' ? 'bg-white' : 'bg-gray-700'}`} />}
      </div>
    );
};

export default Token;