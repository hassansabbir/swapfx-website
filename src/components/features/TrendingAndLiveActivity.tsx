import React from "react";
import { Check, Bell, ArrowRight } from "lucide-react";

export const TrendingAndLiveActivity = () => {
  return (
    <div className="space-y-10 mt-10">
      {/* Trending Section */}
      <section>
        <h3 className="text-[1.1rem] font-bold text-slate-800 mb-6 px-2">
          Trending
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Currency Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-50 flex flex-col items-center justify-center text-center space-y-3">
            <span className="text-[0.8rem] font-medium text-slate-500 uppercase tracking-wider">
              Currency
            </span>
            <div className="flex items-center gap-2 text-[1.2rem] font-bold text-slate-800">
              USD 🇺🇸
            </div>
          </div>
          {/* Corridor Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-50 flex flex-col items-center justify-center text-center space-y-3">
            <span className="text-[0.8rem] font-medium text-slate-500 uppercase tracking-wider">
              Corridor
            </span>
            <div className="flex items-center gap-2 text-[1.2rem] font-bold text-slate-800">
              USA <ArrowRight className="w-5 h-5 text-slate-400" /> PAK
            </div>
          </div>
        </div>
      </section>

      {/* Live Activity Feed Section */}
      <section>
        <h3 className="text-[1.1rem] font-bold text-slate-800 mb-6 px-2">
          Live activity feed
        </h3>
        <div className="space-y-4">
          {/* Swap Completed Item */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-50 flex items-start gap-4 transition-all hover:shadow-md cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-[#E0F7F7] flex items-center justify-center shrink-0">
              <Check className="w-6 h-6 text-[#1ACCC9]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-[0.95rem] text-slate-800">
                  Swap completed
                </h4>
                <span className="text-[0.7rem] text-slate-400 font-medium">
                  2 minutes ago
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-slate-50 rounded-md text-[0.85rem] font-bold text-slate-700 border border-slate-100">
                  £300
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300" />
                <span className="px-3 py-1 bg-slate-50 rounded-md text-[0.85rem] font-bold text-slate-700 border border-slate-100">
                  €345
                </span>
              </div>
            </div>
          </div>

          {/* New Request Item */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-50 flex items-start gap-4 transition-all hover:shadow-md cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-[#EBF3FF] flex items-center justify-center shrink-0">
              <Bell className="w-6 h-6 text-[#4A90E2]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-[0.95rem] text-slate-800">
                  New request
                </h4>
                <span className="text-[0.7rem] text-slate-400 font-medium">
                  Just now
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-slate-50 rounded-md text-[0.85rem] font-bold text-slate-700 border border-slate-100">
                  $200
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300" />
                <span className="px-3 py-1 bg-slate-50 rounded-md text-[0.85rem] font-bold text-slate-700 border border-slate-100">
                  NGN
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
