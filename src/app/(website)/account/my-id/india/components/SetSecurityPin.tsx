"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, EyeOffIcon, EyeIcon } from "lucide-react";

interface SetSecurityPinProps {
  pinInputs: string[];
  onChangePin: (value: string, index: number) => void;
  onKeyDownPin: (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => void;
  showPin: boolean;
  setShowPin: (val: boolean) => void;
  pinRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  onNext: () => void;
}

export default function SetSecurityPin({
  pinInputs,
  onChangePin,
  onKeyDownPin,
  showPin,
  setShowPin,
  pinRefs,
  onNext,
}: SetSecurityPinProps) {
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
        <div className="space-y-2">
          <h3 className="text-[1.05rem] font-extrabold text-slate-800">
            Set Your Security PIN
          </h3>
          <p className="text-[0.78rem] text-slate-400 leading-normal font-semibold">
            Choose a secure PIN, avoid sequences (123456), mirrored numbers
            (123321), repeated sets (121212), repeated pairs (112233) or
            repeated patterns (131313).
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 py-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type={showPin ? "text" : "password"}
              maxLength={1}
              value={pinInputs[index]}
              ref={(el) => {
                pinRefs.current[index] = el;
              }}
              onChange={(e) => onChangePin(e.target.value, index)}
              onKeyDown={(e) => onKeyDownPin(e, index)}
              className="w-11 h-11 rounded-xl border border-slate-200 bg-slate-50/50 text-center font-extrabold text-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all"
            />
          ))}

          <button
            type="button"
            onClick={() => setShowPin(!showPin)}
            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-600 focus:outline-none"
          >
            {showPin ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>
        </div>

        <div className="pt-2">
          <Button
            onClick={onNext}
            disabled={pinInputs.some((p) => !p)}
            className="w-full"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
