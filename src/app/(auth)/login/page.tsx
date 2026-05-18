"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();

  const handleSignIn = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    window.dispatchEvent(new Event("storage"));
    router.push("/");
  };
  return (
    <div className="relative w-full max-w-[750px] bg-white/10 backdrop-blur-2xl rounded-[3rem] p-12 md:p-16 shadow-2xl border border-white/20 flex flex-col items-center animate-in fade-in zoom-in duration-500">
      {/* Close Button */}
      <Link
        href="/"
        className="absolute top-8 right-8 w-10 h-10 rounded-full bg-slate-400/50 flex items-center justify-center text-white hover:bg-slate-500/50 transition-colors"
      >
        <X className="w-6 h-6" />
      </Link>

      <div className="w-full max-w-[450px] text-center mb-10">
        <h2 className="text-[1.8rem] font-bold text-slate-800">Sign In</h2>
        <p className="text-[0.95rem] text-slate-500 font-medium mt-1">
          Welcome Back Swapr
        </p>
      </div>

      <div className="w-full max-w-[450px] space-y-6">
        <div className="space-y-2">
          <label className="text-[0.95rem] font-semibold text-slate-700">
            Phone / Email
          </label>
          <input
            type="text"
            placeholder="Swapper@gmail.com"
            className="w-full bg-white/40 border border-slate-200/50 rounded-xl px-4 py-3 h-[52px] text-[0.95rem] font-medium text-slate-800 placeholder:text-slate-300 focus:bg-white/60 outline-none transition-all shadow-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[0.95rem] font-semibold text-slate-700">
            Password
          </label>
          <input
            type="password"
            placeholder="****************"
            className="w-full bg-white/40 border border-slate-200/50 rounded-xl px-4 py-3 h-[52px] text-[0.95rem] font-medium text-slate-800 placeholder:text-slate-300 focus:bg-white/60 outline-none transition-all shadow-sm"
          />
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-[0.85rem] font-medium text-slate-600 hover:text-[#09A6A4] transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <div 
          onClick={handleSignIn}
          className="block pt-4 cursor-pointer"
        >
          <Button variant="primary" className="w-full py-4 text-[1rem]">
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
