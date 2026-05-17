"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MOCK_SWAPS } from "./types";
import { SwapHistoryCard } from "./SwapHistoryCard";

const SwapMainPage = () => {
  const router = useRouter();

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1200px] mx-auto w-full animate-in fade-in duration-700">
      <GlassContainer className="p-4 md:p-10 space-y-8">
        {/* Header */}
        <div className="space-y-8 max-w-[750px] mx-auto">
          <div className="text-center">
            <h1 className="text-[1.5rem] font-bold text-slate-800 tracking-tight">
              Swap
            </h1>
          </div>

          {/* Stats Row */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <div className="flex-1 max-w-[180px] bg-white/50 backdrop-blur-md rounded-3xl p-5 text-center border border-white/60 shadow-sm space-y-0.5">
              <h2 className="text-[1.8rem] font-bold text-[#001D3D]">20</h2>
              <p className="text-[0.8rem] font-medium text-slate-500">
                Complete
              </p>
            </div>
            <div className="flex-1 max-w-[180px] bg-white/50 backdrop-blur-md rounded-3xl p-5 text-center border border-white/60 shadow-sm space-y-0.5">
              <h2 className="text-[1.8rem] font-bold text-[#001D3D]">02</h2>
              <p className="text-[0.8rem] font-medium text-slate-500">
                Swappers
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center pt-1">
            <Button
              variant="primary"
              onClick={() => router.push("/swap/agreement")}
              className="px-10 py-4 text-[0.9rem] font-bold rounded-lg shadow-md shadow-[#09A6A4]/15 transition-transform hover:scale-[1.02]"
            >
              Create Market Swap
            </Button>
          </div>

          {/* Swap History */}
          <div className="space-y-4 pt-3">
            <h3 className="text-[1.1rem] font-semibold text-slate-500 tracking-tight">
              Swap History
            </h3>

            <div className="space-y-4">
              {MOCK_SWAPS.map((swap, i) => (
                <SwapHistoryCard
                  key={i}
                  name={swap.name}
                  rating={swap.rating}
                  reviews={swap.reviews}
                  offerAmount={swap.offerAmount}
                  receiveAmount={swap.receiveAmount}
                  status={swap.status}
                  avatarUrl={swap.avatarUrl}
                  onClick={() => router.push(`/swap/swapdetails/${swap.id}`)}
                />
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 pt-6">
            <button className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
              <ArrowLeft size={16} />
            </button>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[0.8rem] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)]
                  ${
                    num === 1
                      ? "bg-[#09A6A4] text-white shadow-sm shadow-[#09A6A4]/30"
                      : "bg-white text-slate-600 border border-slate-100 hover:bg-slate-50 hover:shadow-md"
                  }
                `}
                >
                  {num}
                </button>
              ))}
              <span className="text-slate-400 mx-1 text-[0.8rem]">...</span>
              <button className="w-9 h-9 rounded-full bg-white text-slate-600 border border-slate-100 flex items-center justify-center font-bold text-[0.8rem] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:bg-slate-50 hover:shadow-md">
                10
              </button>
            </div>

            <button className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </GlassContainer>
    </div>
  );
};

export default SwapMainPage;
