import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

export default function ATSCard({ atsData }) {
  const isGoodScore = atsData.score >= 70;

  return (
    <div className={`rounded-2xl p-6 border ${isGoodScore ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
      <div className="flex items-center gap-3 mb-4">
         <div className={`p-2 rounded-lg ${isGoodScore ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
            {isGoodScore ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
         </div>
         <h3 className="text-xl font-bold text-slate-800">ATS Score - {atsData.score}/100</h3>
      </div>
      
      <p className="text-sm text-slate-700 mb-4 font-medium">How well does your resume pass through Applicant Tracking Systems?</p>
      
      <ul className="space-y-3">
        {atsData.checks.map((check, idx) => (
          <li key={idx} className="flex items-start gap-2">
            {check.status ? <CheckCircle2 className="text-emerald-500 mt-0.5" size={16} /> : <AlertTriangle className="text-yellow-500 mt-0.5" size={16} />}
            <span className="text-sm text-slate-700">{check.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}