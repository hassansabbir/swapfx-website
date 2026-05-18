"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

interface DigiLockerLoginProps {
  aadhaarOrMobile: string;
  onChangeAadhaarOrMobile: (val: string) => void;
  onNext: () => void;
}

export default function DigiLockerLogin({
  aadhaarOrMobile,
  onChangeAadhaarOrMobile,
  onNext,
}: DigiLockerLoginProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <div className="h-6 w-1 bg-linear-to-b from-orange-500 via-white to-green-600 rounded-full" />
          <span className="text-[0.9rem] font-bold text-slate-800">
            DigiLocker Login
          </span>
        </div>
        <span className="text-[0.72rem] text-slate-400 font-bold uppercase tracking-wider">
          Secured Portal
        </span>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-5">
        <div className="space-y-1 pb-1">
          <h3 className="text-[1.02rem] font-bold text-slate-800">
            Sign In with Aadhaar or Mobile
          </h3>
          <p className="text-[0.78rem] text-slate-400 font-semibold leading-relaxed">
            Provide your 12-digit Aadhaar number or registered mobile number to
            fetch your account profile
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-[0.88rem] text-slate-800 font-bold pl-0.5">
            Aadhaar / Mobile Number
          </label>
          <input
            type="text"
            maxLength={12}
            value={aadhaarOrMobile}
            onChange={(e) =>
              onChangeAadhaarOrMobile(e.target.value.replace(/\D/g, ""))
            }
            placeholder="Enter Aadhaar or Mobile"
            className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-[#F1F5F9]/40 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] tracking-widest text-center text-lg placeholder:tracking-normal placeholder:font-medium placeholder:text-sm"
          />
        </div>
      </div>

      <Button
        onClick={onNext}
        disabled={aadhaarOrMobile.length < 10}
        className={`w-full ${
          aadhaarOrMobile.length >= 10
            ? "bg-[#09A6A4] text-white shadow-[#09A6A4]/20 hover:scale-[1.01] cursor-pointer"
            : "bg-slate-200 text-slate-400 shadow-none cursor-not-allowed"
        }`}
      >
        Sign In with OTP
      </Button>
    </div>
  );
}
