"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="relative w-full max-w-[750px] bg-white/10 backdrop-blur-2xl rounded-[3rem] p-12 md:p-16 shadow-2xl border border-white/20 flex flex-col items-center animate-in fade-in zoom-in duration-500 text-center">
      {/* Close Button */}
      <Link
        href="/"
        className="absolute top-8 right-8 w-10 h-10 rounded-full bg-slate-400/50 flex items-center justify-center text-white hover:bg-slate-500/50 transition-colors"
      >
        <X className="w-6 h-6" />
      </Link>

      <div className="relative mb-10">
        {/* Confetti Particles (Mock) */}
        <div className="absolute -top-6 -left-6 w-3 h-3 bg-cyan-400 rounded-sm rotate-12 animate-pulse" />
        <div className="absolute top-0 -right-8 w-4 h-2 bg-teal-500 rounded-full -rotate-45 animate-bounce" />
        <div className="absolute -bottom-4 left-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
        <div className="absolute bottom-4 -right-6 w-2 h-4 bg-cyan-600 rounded-sm rotate-45" />

        {/* Success Icon */}
        <div className="w-24 h-24 rounded-full bg-[#09A6A4] flex items-center justify-center shadow-lg shadow-[#09A6A4]/20 relative z-10">
          <Check className="w-12 h-12 text-white stroke-[3px]" />
        </div>
      </div>

      <div className="space-y-4 mb-12">
        <h2 className="text-[1.4rem] md:text-[1.6rem] font-bold text-slate-800 leading-tight">
          Welcome to Silver! Your account is now ready.
        </h2>
        <p className="text-[1rem] text-slate-500 font-medium leading-relaxed max-w-[450px] mx-auto">
          Enjoy smoother swaps, better rates and faster matches.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[450px]">
        <Link href="/" className="flex-1">
          <Button variant="primary" className="w-full py-4 text-[0.95rem]">
            Complete Profile
          </Button>
        </Link>
        <Link href="/" className="flex-1">
          <Button
            variant="white"
            className="w-full py-4 text-[0.95rem] border-[#09A6A4] text-[#09A6A4]"
          >
            Skip For Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
