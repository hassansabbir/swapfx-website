"use client";

import React from "react";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { X, Check } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const IDSuccessPage = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "id";

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1000px] mx-auto w-full animate-in fade-in duration-700 h-[80vh] flex items-center">
      <GlassContainer className="p-10 md:p-16 relative overflow-visible max-w-[600px]">
        {/* Close Button */}
        <IconButton href="/account" className="absolute top-6 right-6">
          <X size={24} />
        </IconButton>

        <div className="flex flex-col items-center text-center space-y-8 mt-8">
          {/* Animated Checkmark Circle */}
          <div className="relative">
            {/* Confetti particles - simulated with CSS */}
            <div className="absolute inset-0 animate-pulse">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-75" />
              <div className="absolute bottom-0 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-150" />
              <div className="absolute top-1/4 -left-4 w-3 h-1 bg-teal-300 rounded-full rotate-45 animate-bounce delay-300" />
              <div className="absolute top-1/2 -right-6 w-1 h-3 bg-teal-500 rounded-full -rotate-12 animate-bounce delay-500" />
            </div>

            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#09A6A4] flex items-center justify-center shadow-2xl shadow-[#09A6A4]/30 animate-in zoom-in duration-500 border-4 border-white">
              <Check size={48} className="text-white md:w-16 md:h-16" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-[1.8rem] md:text-[2.2rem] font-bold text-slate-800 tracking-tight capitalize">
              {type === "passport" ? "Passport" : "ID"} uploaded successfully.
            </h1>
          </div>

          {/* Facial Verification Button */}
          <div className="w-full max-w-[350px] pt-4">
            <Link href="/account/my-id/selfie" className="w-full flex justify-center">
              <Button className="w-full py-4 rounded-xl text-[1rem] font-bold bg-[#09A6A4] text-white shadow-xl shadow-[#09A6A4]/20 hover:scale-[1.01] transition-transform">
                Facial Verification
              </Button>
            </Link>
          </div>
        </div>
      </GlassContainer>
    </div>
  );
};

export default IDSuccessPage;
