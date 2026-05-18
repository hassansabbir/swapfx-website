"use client";

import { MatchList } from "@/components/features/MatchList";
import { SwapEngine } from "@/components/features/SwapEngine";
import { TrendingAndLiveActivity } from "@/components/features/TrendingAndLiveActivity";
import { HowItWorks } from "@/components/features/HowItWorks";
import { SupportedCurrencies } from "@/components/features/SupportedCurrencies";
import { useState } from "react";

const HomeMainPage = () => {
  const [showMatches, setShowMatches] = useState(false);

  return (
    <div className="w-full max-w-[750px] mx-auto py-10">
      <h2 className="text-[1.25rem] font-bold text-slate-800 mb-4 px-2">
        Smart Swap Engine
      </h2>
      <div
        className="w-full rounded-xl p-6 shadow-xl overflow-hidden border border-cyan-300"
        style={{
          background:
            "linear-gradient(135deg, #09A6A4 0%, #BEF5F5 50%, #09A6A4 100%)",
        }}
      >
        <SwapEngine onFindMatch={() => setShowMatches(true)} />
        {showMatches && <MatchList />}
      </div>

      <TrendingAndLiveActivity />
      <HowItWorks />
      <SupportedCurrencies />
    </div>
  );
};

export default HomeMainPage;
