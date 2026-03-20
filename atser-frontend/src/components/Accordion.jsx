import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';

export default function Accordion({ title, score, issues, suggestions }) {
  const [isOpen, setIsOpen] = useState(false);
  const badgeColor = score >= 75 ? 'bg-emerald-100 text-emerald-700' : score >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';

  return (
    <div className="w-full">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition"
      >
        <div className="flex items-center gap-4">
          <h3 className="font-semibold text-slate-800">{title}</h3>
          <span className={`px-2 py-1 rounded text-xs font-bold flex items-center gap-1 ${badgeColor}`}>
            {score < 75 && <AlertTriangle size={12} />} {score}/100
          </span>
        </div>
        {isOpen ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
      </button>
      
      {isOpen && (
        <div className="p-5 bg-slate-50 border-t border-slate-100 space-y-4">
          {issues?.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-slate-700 mb-2">Issues Found:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {issues.map((issue, idx) => <li key={idx} className="text-sm text-slate-600">{issue}</li>)}
              </ul>
            </div>
          )}
          {suggestions?.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-slate-700 mb-2">Suggestions:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {suggestions.map((sug, idx) => <li key={idx} className="text-sm text-slate-600">{sug}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}