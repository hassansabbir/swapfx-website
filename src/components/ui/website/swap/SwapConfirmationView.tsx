import React from "react";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { ArrowLeft, ArrowDown, Shield, CheckCircle2, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const SwapConfirmationView = ({
  onBack,
  from = "swap",
}: {
  onBack: () => void;
  from?: string;
}) => {
  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1200px] mx-auto w-full animate-in fade-in duration-500">
      <GlassContainer className="p-6 md:p-12 relative overflow-visible">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 w-11 h-11 rounded-full bg-slate-400/85 text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-10 animate-in fade-in duration-300"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="space-y-5 max-w-[700px] mx-auto">
          {/* Card 1: User Profile Header Card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/60 flex items-center gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.01)] animate-in fade-in slide-in-from-top-3 duration-300">
            <div className="relative shrink-0 w-11 h-11">
              <div className="w-full h-full rounded-full border border-white shadow-sm overflow-hidden flex items-center justify-center bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&w=80"
                  alt="John Doe"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Gold Verification Badge on Avatar Corner */}
              <div className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 bg-[#FFBF00] rounded-full border border-white flex items-center justify-center shadow-sm">
                <Shield size={9} className="text-white fill-current" />
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <h4 className="text-[1rem] font-bold text-slate-800 leading-tight">
                  John Doe
                </h4>
                <CheckCircle2
                  size={15}
                  className="text-green-500 fill-current"
                />
              </div>
              <div className="flex items-center gap-1 text-[0.75rem] text-slate-400 font-semibold leading-none">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span>4.9 (128 reviews)</span>
              </div>
            </div>
          </div>

          {/* Card 2: Swap Confirmation Main Card */}
          <div className="bg-white rounded-4xl p-6 md:p-8 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-5 animate-in fade-in slide-in-from-top-4 duration-400">
            <h3 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pt-2">
              Swap Confirmation
            </h3>

            {/* I Will Receive Box */}
            <div className="flex items-center justify-between py-2 relative">
              <div className="space-y-1">
                <span className="text-[0.75rem] font-bold text-slate-400 tracking-wider block">
                  I WILL RECEIVE
                </span>
                <h2 className="text-[2rem] md:text-[2.2rem] font-extrabold text-slate-800 leading-tight tracking-tight">
                  200 GBP
                </h2>
              </div>
              <span className="flex items-center gap-2 px-3.5 py-1.5 bg-[#F8FAFC] border border-slate-100 rounded-full shadow-sm text-xs font-bold text-slate-700 select-none">
                <svg viewBox="0 0 74 39" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm border border-slate-100/50">
                  <rect width="74" height="39" fill="#ffffff" />
                  <rect width="74" height="3" y="0" fill="#b22234" />
                  <rect width="74" height="3" y="6" fill="#b22234" />
                  <rect width="74" height="3" y="12" fill="#b22234" />
                  <rect width="74" height="3" y="18" fill="#b22234" />
                  <rect width="74" height="3" y="24" fill="#b22234" />
                  <rect width="74" height="3" y="30" fill="#b22234" />
                  <rect width="74" height="3" y="36" fill="#b22234" />
                  <rect width="32" height="21" fill="#3c3b6e" />
                  <circle cx="4" cy="4" r="1" fill="#fff" />
                  <circle cx="10" cy="4" r="1" fill="#fff" />
                  <circle cx="16" cy="4" r="1" fill="#fff" />
                  <circle cx="22" cy="4" r="1" fill="#fff" />
                  <circle cx="28" cy="4" r="1" fill="#fff" />
                  <circle cx="7" cy="9" r="1" fill="#fff" />
                  <circle cx="13" cy="9" r="1" fill="#fff" />
                  <circle cx="19" cy="9" r="1" fill="#fff" />
                  <circle cx="25" cy="9" r="1" fill="#fff" />
                  <circle cx="4" cy="14" r="1" fill="#fff" />
                  <circle cx="10" cy="14" r="1" fill="#fff" />
                  <circle cx="16" cy="14" r="1" fill="#fff" />
                  <circle cx="22" cy="14" r="1" fill="#fff" />
                  <circle cx="28" cy="14" r="1" fill="#fff" />
                </svg>
                USD
              </span>
            </div>

            {/* Divider with circle arrow */}
            <div className="relative py-4 flex items-center justify-center">
              <div className="w-full border-t border-slate-100"></div>
              <div className="absolute w-10.5 h-10.5 rounded-full bg-linear-to-b from-[#4FD1C5] to-[#319795] text-white flex items-center justify-center shadow-lg shadow-[#4FD1C5]/20 z-10 border-4 border-white">
                <ArrowDown size={18} />
              </div>
            </div>

            {/* I Will Give Box */}
            <div className="flex items-center justify-between py-2 relative">
              <div className="space-y-1">
                <span className="text-[0.75rem] font-bold text-slate-400 tracking-wider block">
                  I WILL GIVE
                </span>
                <h2 className="text-[2rem] md:text-[2.2rem] font-extrabold text-[#09A6A4] leading-tight tracking-tight">
                  74,900 PKR
                </h2>
              </div>
              <span className="flex items-center gap-2 px-3.5 py-1.5 bg-[#F8FAFC] border border-slate-100 rounded-full shadow-sm text-xs font-bold text-slate-700 select-none">
                <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm border border-slate-100/50">
                  <rect width="30" height="20" fill="#115c30" />
                  <rect width="10" height="20" fill="#ffffff" />
                  <circle cx="20" cy="10" r="4.5" fill="#ffffff" />
                  <circle cx="21.5" cy="8.5" r="4.5" fill="#115c30" />
                  <polygon points="21,7 22,8.5 23.5,8 22.5,9.5 23.5,11 22,10.5 21,12 21,10.5 19.5,10 20.5,9.5" fill="#ffffff" />
                </svg>
                PKR
              </span>
            </div>
          </div>

          {/* Card 3: Proposed swap rate, Required & Note */}
          <div className="bg-white rounded-4xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden space-y-0.5 animate-in fade-in slide-in-from-top-5 duration-500">
            {/* Row 1: Proposed swap rate */}
            <div className="bg-[#F8FAFC] px-6 py-5 flex justify-between items-center">
              <div className="space-y-0.5">
                <span className="text-[0.92rem] font-semibold text-slate-500">
                  Proposed swap rate
                </span>
                <p className="text-[0.72rem] text-slate-400 leading-none">
                  (Market rate : 375 PKR)
                </p>
              </div>
              <span className="text-[1rem] font-bold text-slate-800">
                380 PKR
              </span>
            </div>

            {/* Row 2: Required */}
            <div className="px-6 py-5 flex justify-between items-center border-t border-slate-100/60">
              <span className="text-[0.92rem] font-semibold text-slate-500">
                Required
              </span>
              <span className="text-[1rem] font-bold text-slate-800">
                2 days
              </span>
            </div>

            {/* Row 3: Note from Swapper */}
            <div className="px-6 py-5 border-t border-slate-100/60 space-y-4">
              <span className="text-[0.92rem] font-semibold text-slate-500 block">
                Note from Swapper
              </span>
              <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-100/50 flex gap-4 items-start shadow-inner">
                <Quote
                  size={28}
                  className="text-slate-300 fill-slate-50 shrink-0 transform rotate-180"
                />
                <p className="text-[0.88rem] text-slate-600 font-medium leading-relaxed">
                  Need this swap urgently for a family matter. My funds are
                  ready in the US bank, looking for an immediate PKR transfer.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {from === "chat" ? (
            <div className="flex justify-center pt-4 max-w-[500px] mx-auto w-full animate-in fade-in slide-in-from-top-6 duration-600">
              <Link href="/swap/payment" className="w-full">
                <Button className="w-full py-4 rounded-xl text-[1rem] font-bold bg-[#09A6A4] text-white shadow-xl shadow-[#09A6A4]/20 hover:scale-[1.01] transition-transform border-b-4 border-[#078d8b]">
                  Confirm
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex gap-4 w-full pt-4 max-w-[500px] mx-auto animate-in fade-in slide-in-from-top-6 duration-600">
              <Link href="/chat?swapper=Bob Builder" className="flex-1">
                <Button className="w-full py-4 rounded-xl text-[1rem] font-bold bg-[#09A6A4] text-white shadow-xl shadow-[#09A6A4]/20 hover:scale-[1.01] transition-transform">
                  Contact Swapper
                </Button>
              </Link>
              <Button className="flex-1 py-4 rounded-xl text-[1rem] font-bold bg-[#09A6A4] text-white shadow-xl shadow-[#09A6A4]/20 hover:scale-[1.01] transition-transform">
                Counter Offer
              </Button>
            </div>
          )}
        </div>
      </GlassContainer>
    </div>
  );
};
