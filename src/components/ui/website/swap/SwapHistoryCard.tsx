import React from "react";
import { Shield } from "lucide-react";

export interface SwapHistoryCardProps {
  name?: string;
  rating?: string;
  reviews?: number;
  offerAmount?: string;
  receiveAmount?: string;
  status?: string;
  avatarUrl?: string;
  onClick?: () => void;
}

export const SwapHistoryCard = ({
  name = "Mr. Bob Builder",
  rating = "4.7",
  reviews = 56,
  offerAmount = "£200 GBP",
  receiveAmount = "$250 USD",
  status = "Incomplete",
  avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
  onClick,
}: SwapHistoryCardProps) => (
  <div
    onClick={onClick}
    className="bg-white rounded-3xl p-5 md:p-6 border border-slate-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col gap-4 hover:shadow-[0_12px_40px_rgb(0,0,0,0.05)] transition-all duration-300 cursor-pointer group"
  >
    {/* Top Row: User Info & Status */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative shrink-0 w-11 h-11 md:w-12 md:h-12">
          {/* Avatar Image */}
          <div className="w-full h-full rounded-full border border-white shadow-sm overflow-hidden flex items-center justify-center bg-slate-100">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-slate-400 font-bold text-xs uppercase">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
            )}
          </div>
          {/* Verification Badge */}
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#B0B8C4] rounded-full border border-white flex items-center justify-center shadow-sm">
            <Shield size={9} className="text-white fill-current" />
          </div>
        </div>

        <div className="space-y-0.5">
          <h4 className="text-[0.9rem] md:text-[0.95rem] font-bold text-slate-800 leading-tight">
            {name}
          </h4>
          <div className="text-[0.75rem] md:text-[0.8rem] text-slate-400 font-medium leading-none">
            {rating} ({reviews})
          </div>
        </div>
      </div>

      <div className="shrink-0">
        <div
          className={`px-3.5 py-1.5 rounded-full text-[0.7rem] md:text-[0.75rem] font-semibold transition-colors
          ${
            status === "Completed"
              ? "bg-green-50 text-green-600"
              : "bg-slate-100 text-slate-400"
          }
        `}
        >
          {status}
        </div>
      </div>
    </div>

    {/* Bottom Row: Currency Amounts */}
    <div className="flex items-baseline gap-2 sm:gap-4 pl-1">
      <span className="text-[0.95rem] sm:text-[1.15rem] md:text-[1.25rem] font-bold text-slate-800 tracking-tight whitespace-nowrap">
        {offerAmount}
      </span>
      <span className="text-[0.95rem] sm:text-[1.15rem] md:text-[1.25rem] font-bold text-[#09A6A4] tracking-tight whitespace-nowrap">
        {receiveAmount}
      </span>
    </div>
  </div>
);
