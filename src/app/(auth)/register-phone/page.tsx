"use client";

import React from "react";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import Link from "next/link";

export default function RegisterPhonePage() {
  return (
    <div className="relative w-full max-w-[750px] bg-white/10 backdrop-blur-2xl rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-16 shadow-2xl border border-white/20 flex flex-col items-center animate-in fade-in zoom-in duration-500">
      {/* Back Button */}
      <IconButton href="/method" className="absolute top-5 left-5 sm:top-8 sm:left-8 bg-slate-400/50 hover:bg-slate-500/50">
        <ChevronLeft className="w-6 h-6" />
      </IconButton>

      <div className="w-full max-w-[450px] text-center mb-10 mt-8">
        <h2 className="text-[1.8rem] font-bold text-slate-800">Phone</h2>
        <p className="text-[0.95rem] text-slate-500 font-medium mt-1">
          Welcome Back Swapr
        </p>
      </div>

      <div className="w-full max-w-[450px] space-y-8">
        <div className="space-y-2">
          <label className="text-[0.95rem] font-semibold text-slate-700">
            Phone
          </label>
          <div className="flex items-center bg-white/40 border border-slate-200/50 rounded-xl px-3 sm:px-4 py-3 h-[52px] shadow-sm focus-within:bg-white/60 transition-all">
            <div className="flex items-center gap-2 border-r border-slate-300/50 pr-2 sm:pr-3 mr-2 sm:mr-3 cursor-pointer shrink-0">
              {/* Mock UAE Flag */}
              <div className="w-6 h-4 flex flex-col border border-slate-200">
                <div className="h-1/3 bg-black" />
                <div className="h-1/3 bg-white" />
                <div className="h-1/3 bg-green-600" />
              </div>
              <span className="text-[0.9rem] font-medium text-slate-600">
                +971
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
            <input
              type="tel"
              placeholder="00 000 0000"
              className="flex-1 min-w-0 bg-transparent text-[1rem] font-medium text-slate-800 placeholder:text-slate-300 outline-none"
            />
          </div>
        </div>

        <Link href="/verify-phone">
          <Button variant="primary" className="w-full py-4 text-[1rem]">
            Continue
          </Button>
        </Link>

        <div className="text-center pt-2">
          <p className="text-[0.9rem] font-medium text-slate-500">
            Already have an Account?{" "}
            <Link
              href="/login"
              className="text-[#09A6A4] hover:underline transition-all font-semibold"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
