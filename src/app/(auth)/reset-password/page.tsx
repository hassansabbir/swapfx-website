"use client";

import React from "react";
import { ChevronLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="relative w-full max-w-[750px] bg-white/10 backdrop-blur-2xl rounded-[3rem] p-12 md:p-16 shadow-2xl border border-white/20 flex flex-col items-center animate-in fade-in zoom-in duration-500">
      {/* Back Button */}
      <IconButton href="/verify-forgot-password-otp" className="absolute top-8 left-8 bg-slate-400/50 hover:bg-slate-500/50">
        <ChevronLeft className="w-6 h-6" />
      </IconButton>

      <div className="w-full max-w-[450px] text-center mb-10">
        <h2 className="text-[1.8rem] font-bold text-slate-800">
          Set New Password
        </h2>
      </div>

      <div className="w-full max-w-[450px] space-y-6">
        <div className="space-y-2">
          <label className="text-[0.95rem] font-semibold text-slate-700">
            New Password
          </label>
          <input
            type="password"
            placeholder="****************"
            className="w-full bg-white/40 border border-slate-200/50 rounded-xl px-4 py-3 h-[52px] text-[0.95rem] font-medium text-slate-800 placeholder:text-slate-300 focus:bg-white/60 outline-none transition-all shadow-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[0.95rem] font-semibold text-slate-700">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="****************"
            className="w-full bg-white/40 border border-slate-200/50 rounded-xl px-4 py-3 h-[52px] text-[0.95rem] font-medium text-slate-800 placeholder:text-slate-300 focus:bg-white/60 outline-none transition-all shadow-sm"
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Info className="w-5 h-5 text-[#09A6A4] shrink-0" />
          <p className="text-[0.85rem] font-medium text-slate-500 leading-relaxed">
            Your password must be at least 8 characters. Include multiple words
            to make it more secure.
          </p>
        </div>

        <Link href="/reset-success" className="block pt-4">
          <Button variant="primary" className="w-full py-4 text-[1rem]">
            Continue
          </Button>
        </Link>
      </div>
    </div>
  );
}
