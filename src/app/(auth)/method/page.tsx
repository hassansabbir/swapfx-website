import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import logo from "@/assets/logo.png";

export default function AuthMethodPage() {
  return (
    <div className="relative w-full max-w-[750px] bg-white/10 backdrop-blur-sm rounded-[3rem] p-16 shadow-2xl border border-white/20 flex flex-col items-center animate-in fade-in zoom-in duration-500">
      {/* Close Button */}
      <Link
        href="/"
        className="absolute top-8 right-8 w-10 h-10 rounded-full bg-slate-400/50 flex items-center justify-center text-white hover:bg-slate-500/50 transition-colors"
      >
        <X className="w-6 h-6" />
      </Link>

      {/* Logo */}
      <div className="mb-12">
        <Image
          src={logo}
          alt="SwapFX Logo"
          width={180}
          height={60}
          className="object-contain"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[450px]">
        <Link href="/login" className="flex-1">
          <Button variant="primary" className="w-full py-4 text-[1rem]">
            Sign In
          </Button>
        </Link>
        <Link href="/register-phone" className="flex-1">
          <Button variant="white" className="w-full py-4 text-[1rem]">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
}
