"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { ShieldCheck } from "lucide-react";

interface DobVerificationProps {
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  setDobDay: (val: string) => void;
  setDobMonth: (val: string) => void;
  setDobYear: (val: string) => void;
  onNext: () => void;
}

export default function DobVerification({
  dobDay,
  dobMonth,
  dobYear,
  setDobDay,
  setDobMonth,
  setDobYear,
  onNext,
}: DobVerificationProps) {
  return (
    <div className="space-y-6 text-center animate-in fade-in duration-300">
      <div className="flex flex-col items-center space-y-2 pt-2">
        <div className="w-12 h-12 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg">
          <ShieldCheck className="text-white w-6 h-6" />
        </div>
        <div>
          <h2 className="text-[1.3rem] font-black tracking-tight leading-none text-slate-800">
            Digi<span className="text-indigo-600">Locker</span>
          </h2>
          <p className="text-[0.55rem] text-slate-400 font-semibold pt-0.5">
            Your documents anytime, anywhere
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md space-y-6 text-left max-w-[480px] mx-auto">
        <div className="space-y-1">
          <h3 className="text-[1.05rem] font-extrabold text-slate-800">
            Verify your date of birth
          </h3>
          <p className="text-[0.82rem] text-slate-400 font-semibold">
            Enter your Date of Birth
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <select
            value={dobDay}
            onChange={(e) => setDobDay(e.target.value)}
            className="h-11 px-3 border border-slate-200 bg-slate-50/50 rounded-xl text-[0.88rem] text-slate-700 font-semibold focus:outline-none focus:border-[#09A6A4] cursor-pointer"
          >
            <option value="">Date</option>
            {Array.from({ length: 31 }, (_, i) => {
              const d = String(i + 1).padStart(2, "0");
              return (
                <option key={d} value={d}>
                  {d}
                </option>
              );
            })}
          </select>

          <select
            value={dobMonth}
            onChange={(e) => setDobMonth(e.target.value)}
            className="h-11 px-3 border border-slate-200 bg-slate-50/50 rounded-xl text-[0.88rem] text-slate-700 font-semibold focus:outline-none focus:border-[#09A6A4] cursor-pointer"
          >
            <option value="">Month</option>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <select
            value={dobYear}
            onChange={(e) => setDobYear(e.target.value)}
            className="h-11 px-3 border border-slate-200 bg-slate-50/50 rounded-xl text-[0.88rem] text-slate-700 font-semibold focus:outline-none focus:border-[#09A6A4] cursor-pointer"
          >
            <option value="">Year</option>
            {Array.from({ length: 65 }, (_, i) => {
              const y = String(2015 - i);
              return (
                <option key={y} value={y}>
                  {y}
                </option>
              );
            })}
          </select>
        </div>

        <div className="pt-2 flex justify-center">
          <Button
            onClick={onNext}
            disabled={!dobDay || !dobMonth || !dobYear}
            className="w-full py-3.5 rounded-xl text-[0.95rem] font-bold bg-[#09A6A4] text-white shadow-xl shadow-[#09A6A4]/15 hover:scale-[1.01] transition-transform cursor-pointer"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
