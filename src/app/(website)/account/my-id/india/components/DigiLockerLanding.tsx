"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Lock } from "lucide-react";

interface DigiLockerLandingProps {
  onNext: () => void;
}

export default function DigiLockerLanding({ onNext }: DigiLockerLandingProps) {
  return (
    <div className="space-y-6 text-center animate-in fade-in duration-300">
      <div className="flex items-center justify-center gap-2">
        <span className="text-xl">🇮🇳</span>
        <span className="text-[0.72rem] text-slate-400 font-bold tracking-widest uppercase">
          Government of India
        </span>
      </div>

      <div className="flex flex-col items-center space-y-3 pt-2">
        <div className="relative w-20 h-20 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-xl shadow-blue-500/20">
          <div className="absolute inset-0.5 border border-white/20 rounded-xl" />
          <ShieldCheck className="text-white w-10 h-10" />
        </div>

        <div className="pt-1">
          <h2 className="text-[1.8rem] font-black tracking-tight leading-none text-slate-800">
            Digi<span className="text-[#09A6A4]">Locker</span>
          </h2>
          <p className="text-[0.72rem] text-slate-400 font-semibold pt-1">
            Your documents anytime, anywhere
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-5 text-left">
        <h3 className="text-[1rem] font-bold text-slate-800 text-center pb-1">
          Aadhaar DigiLocker Verification
        </h3>

        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E0F7F6] text-[#09A6A4] flex items-center justify-center font-bold text-sm shrink-0">
              1
            </div>
            <p className="text-slate-600 text-[0.88rem] leading-relaxed font-medium pt-0.5">
              Link your secure DigiLocker account instantly.
            </p>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E0F7F6] text-[#09A6A4] flex items-center justify-center font-bold text-sm shrink-0">
              2
            </div>
            <p className="text-slate-600 text-[0.88rem] leading-relaxed font-medium pt-0.5">
              Verify your identity using direct Aadhaar validation. No manual
              document uploads required.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button
          onClick={onNext}
          className="w-full py-4 rounded-xl text-[1rem] font-bold bg-[#09A6A4] text-white shadow-xl shadow-[#09A6A4]/20 hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Lock size={16} />
          <span>Proceed to DigiLocker</span>
        </Button>
      </div>
    </div>
  );
}
