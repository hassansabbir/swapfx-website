"use client";

import React from "react";
import { Check } from "lucide-react";

interface KycCompleteProps {
  onContinue: () => void;
}

export default function KycComplete({ onContinue }: KycCompleteProps) {
  return (
    <div className="space-y-6 pt-6 pb-6 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
      <div className="relative w-28 h-28 flex items-center justify-center mb-2">
        <div className="absolute inset-0 w-full h-full animate-spin-slow">
          <div className="absolute top-0 left-1/2 w-1 h-3 bg-[#09A6A4] rounded-full rotate-45" />
          <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-amber-400 rounded-full" />
          <div className="absolute top-1/4 right-0 w-1.5 h-3 bg-blue-400 rounded-full -rotate-12" />
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-[#09A6A4] rounded-full" />
        </div>
        <div className="w-20 h-20 bg-[#09A6A4] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(9,166,164,0.3)] z-10">
          <Check className="text-white w-10 h-10" strokeWidth={4} />
        </div>
      </div>

      <div className="space-y-1">
        <h2 className="text-[1.4rem] font-bold text-slate-800 tracking-tight">
          Aadhaar Verified Successfully!
        </h2>
        <p className="text-[0.85rem] text-slate-400 font-semibold">
          Secure credentials retrieved and verified via DigiLocker
        </p>
      </div>

      <div className="w-full bg-white rounded-3xl p-6 border border-slate-100 shadow-xs text-left text-[0.88rem] space-y-3.5 max-w-[460px]">
        <h4 className="text-slate-400 font-bold text-[0.72rem] tracking-wider uppercase border-b border-slate-50 pb-2">
          Retrieved Identity Details
        </h4>

        <div className="grid grid-cols-3 gap-2">
          <span className="text-slate-400 font-bold col-span-1">Name:</span>
          <span className="text-slate-800 font-bold col-span-2">FAHIM AHMED</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <span className="text-slate-400 font-bold col-span-1">Aadhaar:</span>
          <span className="text-slate-800 font-bold col-span-2 tracking-widest">XXXX-XXXX-8901</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <span className="text-slate-400 font-bold col-span-1">Date of Birth:</span>
          <span className="text-slate-800 font-semibold col-span-2">12/08/1996</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <span className="text-[#09A6A4] font-bold col-span-1">Face Match:</span>
          <span className="text-[#09A6A4] font-bold col-span-2">98.4% (Biometrics Match)</span>
        </div>

        <div className="grid grid-cols-3 gap-2 col-span-3 border-t border-slate-50 pt-3">
          <span className="text-slate-400 font-bold col-span-1">Address:</span>
          <span className="text-slate-800 font-medium col-span-2 leading-relaxed">
            H-12, Sector 15, Dwarka, New Delhi, Delhi, 110075
          </span>
        </div>
      </div>

      <button
        onClick={onContinue}
        className="w-full max-w-[280px] py-4 mt-4 rounded-xl text-[1rem] font-bold bg-[#09A6A4] text-white shadow-xl shadow-[#09A6A4]/20 hover:scale-[1.01] transition-transform cursor-pointer"
      >
        Continue to Dashboard
      </button>
    </div>
  );
}
