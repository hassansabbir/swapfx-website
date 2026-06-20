"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import Link from "next/link";

export default function ConfirmPinPage() {
  const [pin, setPin] = useState(["", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);
    if (value && index < 3) {
      document.getElementById(`pin-${index + 1}`)?.focus();
    }
  };

  return (
    <div className="relative w-full max-w-[750px] bg-white/10 backdrop-blur-2xl rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-16 shadow-2xl border border-white/20 flex flex-col items-center animate-in fade-in zoom-in duration-500">
      {/* Back Button */}
      <IconButton href="/set-pin" className="absolute top-5 left-5 sm:top-8 sm:left-8 bg-slate-400/50 hover:bg-slate-500/50">
        <ChevronLeft className="w-6 h-6" />
      </IconButton>

      <div className="w-full max-w-[400px] mt-8 text-center space-y-12">
        <h2 className="text-[1.5rem] font-bold text-slate-800">Confirm PIN</h2>

        <div className="flex justify-center items-center gap-6">
          {pin.map((digit, i) => (
            <div key={i} className="relative">
              <input
                id={`pin-${i}`}
                type="password"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                className="w-12 h-12 bg-white/40 border border-slate-200/50 rounded-full text-center text-[1.5rem] font-bold text-[#09A6A4] focus:bg-white/60 focus:border-[#09A6A4] outline-none transition-all shadow-sm"
              />
              {!digit && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-3 h-3 rounded-full border border-slate-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        <Link href="/success" className="block w-full">
          <Button variant="primary" className="w-full py-4 text-[1rem]">
            Confirm
          </Button>
        </Link>
      </div>
    </div>
  );
}
