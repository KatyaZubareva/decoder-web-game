// src/components/ui/HistoryCard.js

import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

const HistoryCard = ({ entry }) => (
  <div className="bg-white rounded-xl p-3 shadow-xs border border-slate-200 hover:bg-slate-50 transition-colors">

    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-1.5">
        <div className={`w-2 h-2 rounded-full ${entry.team === 'blue' ? 'bg-blue-500' : 'bg-rose-500'}`}></div>
        <span className="text-[10px] font-bold text-slate-500 uppercase">
          {entry.team === 'blue' ? 'СИНИЕ' : 'КРАСНЫЕ'}
        </span>
      </div>
      <span className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-400 font-medium">
        Раунд {entry.round}
      </span>
    </div>

    <div className="flex gap-1 mb-2">
      {entry.hints.map((hint, i) => (
        <div key={i} className="flex-1 bg-slate-50 text-center py-1 rounded text-xs font-semibold text-slate-600 border border-slate-100 truncate px-1">
          {hint}
        </div>
      ))}
    </div>
    <div className={`flex justify-between items-center p-2 rounded-lg ${entry.isCorrect ? 'bg-green-50 border border-green-100' : 'bg-rose-50 border border-rose-100'}`}>
      <div className="flex flex-col">
        <span className="text-[9px] text-slate-400 font-bold uppercase mb-0.5">Код</span>
        <span className={`text-sm font-mono font-bold ${entry.isCorrect ? 'text-green-700' : 'text-rose-700'}`}>
          {entry.codeAttempt}
        </span>
      </div>
      
      {entry.isCorrect ? (
        <CheckCircle size={14} className="text-green-500" />
      ) : (
        <XCircle size={14} className="text-rose-500" />
      )}
    </div>
  </div>
);

export default HistoryCard;