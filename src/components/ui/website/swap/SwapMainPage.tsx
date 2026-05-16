"use client";

import React from "react";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SwapMainPage = () => {
  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1200px] mx-auto w-full animate-in fade-in duration-700">
      <GlassContainer className="max-w-[750px] p-4 md:p-10 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-[1.5rem] font-bold text-slate-800 tracking-tight">
            Swap
          </h1>
        </div>

        {/* Stats Row */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <div className="flex-1 max-w-[180px] bg-white/50 backdrop-blur-md rounded-3xl p-5 text-center border border-white/60 shadow-sm space-y-0.5">
            <h2 className="text-[1.8rem] font-bold text-[#001D3D]">20</h2>
            <p className="text-[0.8rem] font-medium text-slate-500">Complete</p>
          </div>
          <div className="flex-1 max-w-[180px] bg-white/50 backdrop-blur-md rounded-3xl p-5 text-center border border-white/60 shadow-sm space-y-0.5">
            <h2 className="text-[1.8rem] font-bold text-[#001D3D]">02</h2>
            <p className="text-[0.8rem] font-medium text-slate-500">Swappers</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-1">
          <Button
            variant="primary"
            className="px-10 py-4 text-[0.9rem] font-bold rounded-lg shadow-md shadow-[#09A6A4]/15 transition-transform hover:scale-[1.02]"
          >
            Create Market Swap
          </Button>
        </div>

        {/* Swap History */}
        <div className="space-y-3 pt-3">
          <h3 className="text-[1rem] font-bold text-slate-400">Swap History</h3>

          <div className="space-y-2.5">
            {[1, 2, 3].map((_, i) => (
              <SwapHistoryCard key={i} />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-1.5 pt-3">
          <button className="w-7 h-7 flex items-center justify-center text-slate-300 hover:text-slate-500 transition-colors">
            <ArrowLeft size={14} />
          </button>

          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[0.7rem] transition-all
                  ${num === 1 ? "bg-[#09A6A4] text-white shadow-sm shadow-[#09A6A4]/30" : "text-slate-400 hover:bg-white/50"}
                `}
              >
                {num}
              </button>
            ))}
            <span className="text-slate-300 mx-0.5 text-[0.7rem]">...</span>
            <button className="w-7 h-7 text-slate-400 font-bold hover:bg-white/50 rounded-full text-[0.7rem]">
              10
            </button>
          </div>

          <button className="w-7 h-7 flex items-center justify-center text-slate-300 hover:text-slate-500 transition-colors">
            <ArrowRight size={14} />
          </button>
        </div>
      </GlassContainer>
    </div>
  );
};

const SwapHistoryCard = () => (
  <div className="bg-white/40 backdrop-blur-md rounded-[1.2rem] p-3 md:px-6 md:py-4 border border-white/40 shadow-sm flex flex-row items-center justify-between gap-2 md:gap-4 hover:bg-white/60 transition-all cursor-pointer group">
    <div className="flex items-center gap-2 md:gap-3">
      <div className="relative shrink-0">
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-200 border border-white shadow-sm overflow-hidden flex items-center justify-center text-slate-400 font-bold text-[9px]">
          MB
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 md:w-3.5 md:h-3.5 bg-slate-100 rounded-full border border-white flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
        </div>
      </div>

      <div className="space-y-0 min-w-0">
        <h4 className="text-[0.8rem] md:text-[0.85rem] font-bold text-slate-800 leading-tight truncate max-w-[80px] sm:max-w-none">
          Mr. Bob Builder
        </h4>
        <div className="flex items-center gap-1 text-slate-400">
          <span className="text-[0.65rem] md:text-[0.7rem] font-bold">4.7</span>
          <span className="text-[0.6rem] md:text-[0.65rem] font-medium">
            (56)
          </span>
        </div>
      </div>
    </div>

    <div className="flex items-baseline gap-2 md:gap-3 md:flex-1 md:justify-center">
      <span className="text-[0.75rem] md:text-[0.85rem] font-bold text-slate-800 whitespace-nowrap">
        £200 GBP
      </span>
      <span className="text-[0.75rem] md:text-[0.85rem] font-bold text-[#09A6A4] whitespace-nowrap">
        $250 USD
      </span>
    </div>

    <div className="shrink-0">
      <div className="px-3 md:px-4 py-1 rounded-full bg-slate-200/50 text-[0.6rem] md:text-[0.65rem] font-bold text-slate-500 uppercase tracking-tight">
        Incomplete
      </div>
    </div>
  </div>
);

export default SwapMainPage;
