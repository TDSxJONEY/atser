import React from 'react';

export default function ScoreCard({ score }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const strokeColor = score >= 75 ? 'text-emerald-500' : score >= 50 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-6">
      <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} className="text-slate-100 stroke-current" strokeWidth="8" fill="transparent" />
          <circle
            cx="50" cy="50" r={radius}
            className={`${strokeColor} stroke-current transition-all duration-1000 ease-out`}
            strokeWidth="8" fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-800">{score}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider -mt-1">/100</span>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-1">Your Resume Score</h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          This overall score is calculated based on Tone & Style, Content, Structure, and ATS compatibility checks.
        </p>
      </div>
    </div>
  );
}