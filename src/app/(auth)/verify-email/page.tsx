"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import Link from "next/link";

export default function EmailOTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    // Auto focus next
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="relative w-full max-w-[750px] bg-white/10 backdrop-blur-2xl rounded-[3rem] p-12 md:p-16 shadow-2xl border border-white/20 flex flex-col items-center animate-in fade-in zoom-in duration-500">
      {/* Back Button */}
      <IconButton href="/verify-phone" className="absolute top-8 left-8 bg-slate-400/50 hover:bg-slate-500/50">
        <ChevronLeft className="w-6 h-6" />
      </IconButton>

      <div className="w-full max-w-[500px] mt-8 text-center space-y-8">
        <div className="space-y-3">
          <h2 className="text-[1.5rem] font-bold text-slate-800">Email OTP</h2>
          <p className="text-[0.95rem] text-slate-500 max-w-[400px] mx-auto leading-relaxed">
            Your OTP has been sent to your registered email address. Enter it
            below to continue.
          </p>
        </div>

        <div className="flex justify-center items-center gap-3">
          {otp.map((digit, i) => (
            <React.Fragment key={i}>
              <input
                id={`otp-${i}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                className="w-12 h-12 md:w-14 md:h-14 bg-white/40 border border-slate-200/50 rounded-xl text-center text-[1.2rem] font-bold text-[#09A6A4] focus:bg-white/60 focus:border-[#09A6A4] outline-none transition-all shadow-sm"
              />
              {i === 2 && <span className="text-slate-300 mx-1">—</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6">
          <p className="text-[0.85rem] font-medium text-slate-400">
            Code expires in: <span className="text-slate-600">02:59</span>
          </p>

          <Link href="/set-pin" className="w-full">
            <Button variant="primary" className="w-full py-4 text-[1rem]">
              Verify
            </Button>
          </Link>

          <p className="text-[0.9rem] font-medium text-slate-500">
            Don't receive any code?{" "}
            <button className="text-[#09A6A4] hover:underline transition-all font-semibold">
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
