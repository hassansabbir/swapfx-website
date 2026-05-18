"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

interface DigiLockerOtpProps {
  otpCode: string;
  onChangeOtpCode: (val: string) => void;
  onNext: () => void;
}

export default function DigiLockerOtp({
  otpCode,
  onChangeOtpCode,
  onNext,
}: DigiLockerOtpProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-1 bg-linear-to-b from-orange-500 via-white to-green-600 rounded-full" />
          <span className="text-[0.9rem] font-bold text-slate-800">
            Verification
          </span>
        </div>
        <span className="text-[0.72rem] text-slate-400 font-bold uppercase tracking-wider">
          Authentication
        </span>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <label className="text-[0.88rem] text-slate-800 font-bold pl-0.5">
              6-Digit Mobile OTP
            </label>
            <span className="text-[0.7rem] text-slate-400 font-semibold">
              Sent to registered mobile
            </span>
          </div>
          <input
            type="text"
            maxLength={6}
            value={otpCode}
            onChange={(e) => onChangeOtpCode(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter 6-Digit OTP"
            className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-[#F1F5F9]/40 text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] tracking-widest text-center text-lg placeholder:tracking-normal placeholder:font-medium placeholder:text-sm"
          />
        </div>
      </div>

      <Button
        onClick={onNext}
        disabled={otpCode.length !== 6}
        className={`w-full text-center${
          otpCode.length === 6
            ? "bg-[#09A6A4] text-white shadow-[#09A6A4]/20 hover:scale-[1.01] cursor-pointer"
            : "bg-slate-200 text-black shadow-none cursor-not-allowed"
        }`}
      >
        Verify OTP
      </Button>
    </div>
  );
}
