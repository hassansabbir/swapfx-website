"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="relative w-full max-w-[750px] bg-white/10 backdrop-blur-2xl rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-16 shadow-2xl border border-white/20 flex flex-col items-center animate-in fade-in zoom-in duration-500">
      {/* Back Button */}
      <IconButton href="/login" className="absolute top-5 left-5 sm:top-8 sm:left-8 bg-slate-400/50 hover:bg-slate-500/50">
        <ChevronLeft className="w-6 h-6" />
      </IconButton>

      <div className="w-full max-w-[450px] text-center mb-10 mt-8">
        <h2 className="text-[1.8rem] font-bold text-slate-800">
          Forget Password
        </h2>
        <p className="text-[0.95rem] text-slate-500 font-medium mt-1 leading-relaxed">
          Enter your registered email to get password reset instruction.
        </p>
      </div>

      <div className="w-full max-w-[450px] space-y-8">
        <div className="space-y-2">
          <label className="text-[0.95rem] font-semibold text-slate-700">
            Email/Phone
          </label>
          <input
            type="text"
            placeholder="Swapper@gmail.com"
            className="w-full bg-white/40 border border-slate-200/50 rounded-xl px-4 py-3 h-[52px] text-[0.95rem] font-medium text-slate-800 placeholder:text-slate-300 focus:bg-white/60 outline-none transition-all shadow-sm"
          />
        </div>

        <Link href="/verify-forgot-password-otp" className="block">
          <Button variant="primary" className="w-full py-4 text-[1rem]">
            Continue
          </Button>
        </Link>
      </div>
    </div>
  );
}
