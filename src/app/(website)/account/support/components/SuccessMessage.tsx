"use client";

import React from "react";
import { Check } from "lucide-react";

interface SuccessMessageProps {
  onContinue: () => void;
}

export default function SuccessMessage({ onContinue }: SuccessMessageProps) {
  return (
    <div className="max-w-[650px] mx-auto w-full space-y-6 pt-10 pb-4 animate-in zoom-in-95 duration-500 flex flex-col items-center text-center relative">
      
      {/* Confetti Animation Circle */}
      <div className="relative w-32 h-32 flex items-center justify-center mb-4">
        <div className="absolute inset-0 w-full h-full animate-spin-slow">
          <div className="absolute top-0 left-1/2 w-1.5 h-4 bg-[#09A6A4] rounded-full rotate-45" />
          <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-amber-400 rounded-full" />
          <div className="absolute top-1/4 right-0 w-1.5 h-3 bg-blue-400 rounded-full -rotate-12" />
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-[#09A6A4] rounded-full" />
          <div className="absolute top-1/3 left-0 w-2 h-2 bg-pink-400 rounded-full" />
        </div>
        <div className="w-24 h-24 bg-[#09A6A4] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(9,166,164,0.3)] z-10">
          <Check className="text-white w-12 h-12" strokeWidth={4} />
        </div>
      </div>

      <h2 className="text-[1.3rem] font-bold text-slate-800 tracking-tight max-w-[400px]">
        Your enquiry has been submitted
      </h2>
      
      <p className="text-[0.95rem] text-slate-500 font-medium max-w-[420px] leading-relaxed mb-8">
        Thanks for getting in touch. Our support team has received your request (<span className="font-bold text-slate-700">#TKT-2024-0325-7890</span>) and will get back to you within 72 hours. We'll notify you as soon as there's an update.
      </p>

      <button
        onClick={onContinue}
        className="w-full max-w-[280px] py-3.5 mt-4 rounded-lg text-[0.95rem] font-bold bg-[#09A6A4] text-white shadow-lg shadow-[#09A6A4]/20 hover:scale-[1.02] transition-transform cursor-pointer focus:outline-none"
      >
        Continue
      </button>

    </div>
  );
}
