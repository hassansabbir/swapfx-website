import React from "react";
import { ArrowRight, RefreshCcw, Users, TrendingUp } from "lucide-react";

export const TrendingAndLiveActivity = () => {
  return (
    <div className="space-y-10 mt-10">
      {/* Trending Section */}
      <section>
        <div className="flex items-center justify-between mb-5 px-2">
          <h2 className="text-[1.25rem] font-bold text-slate-800">Trending</h2>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-500 rounded-full text-[0.75rem] font-bold border border-rose-100 shadow-sm">
            <TrendingUp size={14} className="animate-pulse" /> Live
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          <div className="absolute inset-0 bg-linear-to-b from-[#09A6A4]/5 to-transparent rounded-4xl -z-10" />

          {/* Currency Card */}
          <div className="group relative bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-[0_8px_30px_rgb(9,166,164,0.12)] hover:-translate-y-1 overflow-hidden">
            <div className="space-y-3">
              <span className="text-[0.8rem] font-bold text-slate-400 uppercase tracking-widest">
                Top Currency
              </span>
              <div className="flex items-center justify-center text-[2.5rem] leading-none drop-shadow-sm">
                🇺🇸
              </div>
            </div>
          </div>

          {/* Corridor Card */}
          <div className="group relative bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-[0_8px_30px_rgb(9,166,164,0.12)] hover:-translate-y-1 overflow-hidden">
            <div className="space-y-3">
              <span className="text-[0.8rem] font-bold text-slate-400 uppercase tracking-widest">
                Top Corridor
              </span>
              <div className="flex items-center justify-center gap-5 text-[2.5rem] leading-none drop-shadow-sm">
                <span>🇺🇸</span>
                <ArrowRight
                  className="w-8 h-8 text-[#09A6A4] opacity-80"
                  strokeWidth={3}
                />
                <span>🇵🇰</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Activity Feed Section */}
      <section>
        <h2 className="text-[1.25rem] font-bold text-slate-800 mb-5 px-2">
          Live Activity Feed
        </h2>
        <div className="space-y-4 relative">
          {/* Subtle background glow effect */}
          <div className="absolute inset-0 bg-linear-to-b from-[#09A6A4]/5 to-transparent rounded-4xl -z-10" />

          {/* Stat Card 1 */}
          <div className="group relative bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(9,166,164,0.12)] hover:-translate-y-1">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-linear-to-b from-[#09A6A4] to-[#1ACCC9] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-11 h-11 rounded-xl bg-[#09A6A4]/10 flex items-center justify-center group-hover:bg-[#09A6A4] transition-colors duration-300 shadow-inner">
                <RefreshCcw className="w-5 h-5 text-[#09A6A4] group-hover:text-white transition-colors duration-300" />
              </div>
              <h4 className="font-bold text-[0.98rem] text-slate-700 group-hover:text-slate-900 transition-colors">
                Total swap completed this week
              </h4>
            </div>
            <span className="text-[1.25rem] font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#09A6A4] to-[#1ACCC9]">
              150
            </span>
          </div>

          {/* Stat Card 2 */}
          <div className="group relative bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(9,166,164,0.12)] hover:-translate-y-1">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-linear-to-b from-[#09A6A4] to-[#1ACCC9] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-11 h-11 rounded-xl bg-[#09A6A4]/10 flex items-center justify-center group-hover:bg-[#09A6A4] transition-colors duration-300 shadow-inner">
                <Users className="w-5 h-5 text-[#09A6A4] group-hover:text-white transition-colors duration-300" />
              </div>
              <h4 className="font-bold text-[0.98rem] text-slate-700 group-hover:text-slate-900 transition-colors">
                New swappers in this week
              </h4>
            </div>
            <span className="text-[1.25rem] font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#09A6A4] to-[#1ACCC9]">
              45
            </span>
          </div>

          {/* Stat Card 3 */}
          <div className="group relative bg-white/60 backdrop-blur-md rounded-2xl p-5 border border-white/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex items-center justify-between overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(9,166,164,0.12)] hover:-translate-y-1">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-linear-to-b from-[#09A6A4] to-[#1ACCC9] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-11 h-11 rounded-xl bg-[#09A6A4]/10 flex items-center justify-center group-hover:bg-[#09A6A4] transition-colors duration-300 shadow-inner">
                <TrendingUp className="w-5 h-5 text-[#09A6A4] group-hover:text-white transition-colors duration-300" />
              </div>
              <h4 className="font-bold text-[0.98rem] text-slate-700 group-hover:text-slate-900 transition-colors">
                Total amount swap happened in the platform
              </h4>
            </div>
            <span className="text-[1.25rem] font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#09A6A4] to-[#1ACCC9]">
              $50,000
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
