"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Check, X } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function SuccessPage() {
  const router = useRouter();

  const handleCompleteProfile = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    window.dispatchEvent(new Event("storage"));
    router.push("/account/personal-info");
  };

  const handleSkipForNow = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    window.dispatchEvent(new Event("storage"));
    router.push("/");
  };
  return (
    <div className="relative w-full max-w-[750px] bg-white/10 backdrop-blur-2xl rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-16 shadow-2xl border border-white/20 flex flex-col items-center animate-in fade-in zoom-in duration-500 text-center">
      {/* Close Button */}
      <IconButton href="/" className="absolute top-5 right-5 sm:top-8 sm:right-8 bg-slate-400/50 hover:bg-slate-500/50">
        <X className="w-6 h-6" />
      </IconButton>

      <div className="relative mb-10 mt-8">
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
        <div 
          onClick={handleCompleteProfile}
          className="flex-1 cursor-pointer"
        >
          <Button variant="primary" className="w-full py-4 text-[0.95rem]">
            Complete Profile
          </Button>
        </div>
        <div 
          onClick={handleSkipForNow}
          className="flex-1 cursor-pointer"
        >
          <Button
            variant="white"
            className="w-full py-4 text-[0.95rem] border-[#09A6A4] text-[#09A6A4]"
          >
            Skip For Now
          </Button>
        </div>
      </div>
    </div>
  );
}
