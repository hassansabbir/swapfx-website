"use client";

import React from "react";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, Info, AlertCircle } from "lucide-react";
import Link from "next/link";

const MyIDPage = () => {
  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1000px] mx-auto w-full animate-in fade-in duration-700">
      <GlassContainer className="p-6 md:p-12 relative overflow-visible">
        {/* Back Button */}
        <Link 
          href="/account"
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-slate-400 text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-lg z-10"
        >
          <ChevronLeft size={24} />
        </Link>

        <div className="max-w-[550px] mx-auto space-y-8">
          <h1 className="text-center text-[1.8rem] font-bold text-slate-800 tracking-tight mb-4">
            My ID
          </h1>

          {/* Identity Verification Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-center text-[1.1rem] font-bold text-slate-800">
              Identity Verification
            </h3>
            
            <div className="flex items-center gap-3">
              <span className="text-[0.95rem] font-bold text-slate-700">Status:</span>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#DC2626] rounded-full text-white text-[0.85rem] font-bold">
                <AlertCircle size={14} />
                Not Verified
              </div>
            </div>

            <p className="text-slate-500 text-[0.9rem] leading-relaxed">
              Verification helps keep your account secure and unlocks full access to all features.
            </p>
          </div>

          {/* What to expect Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-2">
              <Info size={22} className="text-slate-400" />
              <h3 className="text-[1.1rem] font-bold text-slate-800">
                What to expect
              </h3>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E0F7F6] text-[#09A6A4] flex items-center justify-center font-bold text-sm shrink-0">
                  1
                </div>
                <p className="text-slate-600 text-[0.95rem] leading-relaxed font-medium">
                  You will be required to take clear photo of your ID.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#E0F7F6] text-[#09A6A4] flex items-center justify-center font-bold text-sm shrink-0">
                  2
                </div>
                <p className="text-slate-600 text-[0.95rem] leading-relaxed font-medium">
                  After submitting photo of the ID, you will need to complete facial verification to finish the identity check.
                </p>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <div className="flex justify-center pt-4">
            <Link href="/account/my-id/upload" className="w-full flex justify-center">
              <Button className="w-full py-4 rounded-xl text-[1rem] font-bold bg-[#09A6A4] text-white shadow-xl shadow-[#09A6A4]/20 hover:scale-[1.01] transition-transform">
                Start ID Verification
              </Button>
            </Link>
          </div>
        </div>
      </GlassContainer>
    </div>
  );
};

export default MyIDPage;
