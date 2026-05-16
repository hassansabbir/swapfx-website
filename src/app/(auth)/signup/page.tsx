"use client";

import React from "react";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="relative w-full max-w-[850px] bg-white/10 backdrop-blur-2xl rounded-[3rem] p-10 md:p-14 shadow-2xl border border-white/20 flex flex-col items-center animate-in fade-in zoom-in duration-500 overflow-y-auto max-h-[92vh] custom-scrollbar">
      {/* Back Button */}
      <Link
        href="/verify-phone"
        className="absolute top-8 left-8 w-10 h-10 rounded-full bg-slate-400/50 flex items-center justify-center text-white hover:bg-slate-500/50 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </Link>

      <div className="w-full max-w-[650px] text-center mb-8">
        <h2 className="text-[1.8rem] font-bold text-slate-800">Sign Up</h2>
        <p className="text-[0.95rem] text-slate-500 font-medium mt-1">
          Welcome Back Swapr
        </p>
      </div>

      <div className="w-full max-w-[650px] space-y-5">
        {/* Name Row */}
        <div className="flex gap-4 w-full">
          <div className="space-y-2 w-[120px] shrink-0">
            <label className="text-[0.9rem] font-semibold text-slate-700">
              Title
            </label>
            <div className="relative flex items-center bg-white/40 border border-slate-200/50 rounded-xl px-4 py-3 shadow-sm cursor-pointer h-[52px]">
              <span className="text-[0.9rem] font-medium text-slate-400">
                MR.
              </span>
              <ChevronDown className="absolute right-4 w-4 h-4 text-slate-400" />
            </div>
          </div>
          <div className="space-y-2 flex-1">
            <label className="text-[0.9rem] font-semibold text-slate-700">
              First Name
            </label>
            <input
              type="text"
              placeholder="Fahim"
              className="w-full bg-white/40 border border-slate-200/50 rounded-xl px-4 py-3 h-[52px] text-[0.9rem] font-medium text-slate-800 placeholder:text-slate-300 focus:bg-white/60 outline-none transition-all shadow-sm"
            />
          </div>
          <div className="space-y-2 flex-1">
            <label className="text-[0.9rem] font-semibold text-slate-700">
              Last name
            </label>
            <input
              type="text"
              placeholder="Ahmed"
              className="w-full bg-white/40 border border-slate-200/50 rounded-xl px-4 py-3 h-[52px] text-[0.9rem] font-medium text-slate-800 placeholder:text-slate-300 focus:bg-white/60 outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[0.9rem] font-semibold text-slate-700">
            Swapper Name
          </label>
          <input
            type="text"
            placeholder="@fahim"
            className="w-full bg-white/40 border border-slate-200/50 rounded-xl px-4 py-3 h-[52px] text-[0.9rem] font-medium text-slate-800 placeholder:text-slate-300 focus:bg-white/60 outline-none transition-all shadow-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[0.9rem] font-semibold text-slate-700">
            E-mail
          </label>
          <input
            type="email"
            placeholder="Swapper@gmail.com"
            className="w-full bg-white/40 border border-slate-200/50 rounded-xl px-4 py-3 h-[52px] text-[0.9rem] font-medium text-slate-800 placeholder:text-slate-300 focus:bg-white/60 outline-none transition-all shadow-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[0.9rem] font-semibold text-slate-700">
              Password
            </label>
            <input
              type="password"
              placeholder="****************"
              className="w-full bg-white/40 border border-slate-200/50 rounded-xl px-4 py-3 h-[52px] text-[0.9rem] font-medium text-slate-800 placeholder:text-slate-300 focus:bg-white/60 outline-none transition-all shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[0.9rem] font-semibold text-slate-700">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="****************"
              className="w-full bg-white/40 border border-slate-200/50 rounded-xl px-4 py-3 h-[52px] text-[0.9rem] font-medium text-slate-800 placeholder:text-slate-300 focus:bg-white/60 outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            className="w-5 h-5 rounded-md border-slate-300 text-[#09A6A4] focus:ring-[#09A6A4] cursor-pointer"
          />
          <p className="text-[0.9rem] font-medium text-slate-500">
            By creating an account or signing you agree to our{" "}
            <Link href="/terms" className="text-[#09A6A4] hover:underline">
              Terms and Conditions
            </Link>
          </p>
        </div>

        <Link href="/verify-email" className="block pt-4">
          <Button variant="primary" className="w-full py-4 text-[1rem]">
            Continue
          </Button>
        </Link>
      </div>
    </div>
  );
}
