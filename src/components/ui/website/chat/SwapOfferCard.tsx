import React from "react";
import { Star, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { User } from "./types";

interface SwapOfferCardProps {
  participant: User;
}

export const SwapOfferCard: React.FC<SwapOfferCardProps> = ({ participant }) => {
  return (
    <div className="flex gap-3 max-w-[85%] animate-in fade-in duration-300">
      {/* Sender Avatar */}
      <div className="relative shrink-0 w-9 h-9">
        <img
          src={participant.avatarUrl}
          alt={participant.name}
          className="w-full h-full rounded-full object-cover border border-white"
        />
        {participant.isVerified && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#FFBF00] rounded-full border border-white flex items-center justify-center shadow-sm">
            <Shield size={7} className="text-white fill-current" />
          </div>
        )}
      </div>

      {/* Message Column */}
      <div className="space-y-1.5 flex-1">
        {/* Sender Name */}
        <span className="text-[0.88rem] font-bold text-slate-800 pl-1 block">
          {participant.name}
        </span>

        {/* Dynamic Swap Offer Details Box */}
        <div className="bg-white rounded-[1.25rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] pt-5 pb-5 overflow-hidden flex flex-col space-y-4 max-w-[580px] w-full">
          
          {/* Centered Profile Header */}
          <div className="flex flex-col items-center justify-center space-y-1 text-center px-4">
            <h4 className="text-[1.05rem] font-bold text-slate-800 tracking-tight leading-tight">
              Bob Builder
            </h4>
            <div className="flex items-center justify-center gap-1.5 text-[0.82rem] text-slate-500 font-semibold select-none">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span>4.7 (56)</span>
            </div>
          </div>

          {/* Centered Currencies Display */}
          <div className="flex items-center justify-center gap-7 px-4 py-2">
            <h3 className="text-[1.25rem] font-extrabold text-slate-800 tracking-tight">
              £200 GBP
            </h3>
            <ArrowRight size={22} className="text-[#09A6A4] shrink-0" strokeWidth={2.5} />
            <h3 className="text-[1.25rem] font-extrabold text-[#09A6A4] tracking-tight">
              $250 USD
            </h3>
          </div>

          {/* Full-Width Gray Details bar */}
          <div className="bg-slate-50 border-y border-slate-100/60 px-5 py-2.5 flex justify-between items-center text-[0.78rem] tracking-wide">
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-slate-800">Rate:</span>
              <span className="font-semibold text-slate-500">1 GBP = 10.00 PKR</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-slate-800">Required:</span>
              <span className="font-semibold text-slate-500">&lt;1 hr</span>
            </div>
          </div>

          {/* Centered Teal View Details Button */}
          <div className="w-full flex justify-center px-6 pt-1">
            <Link href="/swap/confirmation?from=chat" className="w-[85%] max-w-[450px]">
              <button className="w-full py-3.5 rounded-xl bg-[#09A6A4] text-white text-[0.98rem] font-extrabold shadow-md shadow-[#09A6A4]/25 hover:scale-[1.01] transition-transform">
                View Details
              </button>
            </Link>
          </div>
        </div>

        {/* Right Aligned Timestamp */}
        <span className="text-[0.72rem] text-slate-400 font-semibold block text-right max-w-[580px] pr-2 pt-0.5">
          Oct 24, 14:32:01 UTC
        </span>
      </div>
    </div>
  );
};
