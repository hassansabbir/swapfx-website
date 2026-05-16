import React from "react";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MatchCardProps {
  name: string;
  username: string;
  want: string;
  offer: string;
  type: "perfect" | "close" | "partial";
  avatar: string;
  country: string;
}

export const MatchCard = ({
  name,
  username,
  want,
  offer,
  type,
  avatar,
  country,
}: MatchCardProps) => {
  const badgeStyles = {
    perfect: "bg-[#09A6A4] text-white",
    close: "bg-[#27AE60] text-white",
    partial: "bg-[#E67E22] text-white",
  };

  const badgeLabels = {
    perfect: "Perfect Match",
    close: "Close Match",
    partial: "Partial Match",
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm relative transition-all hover:shadow-md cursor-pointer group mb-4">
      <div className="absolute top-0 left-0">
        <span
          className={cn(
            "px-3 py-1 rounded-br-lg text-[0.7rem] font-medium inline-block",
            badgeStyles[type],
          )}
        >
          {badgeLabels[type]}
        </span>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-100">
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="font-bold text-[0.9rem] text-slate-800">{name}</h4>
            <CheckCircle2 className="w-4 h-4 text-[#39E75F] fill-[#39E75F]" />
          </div>
          <p className="text-[0.75rem] text-slate-500">
            {username} {country}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#09A6A4] transition-colors" />
      </div>

      <div className="mt-6 flex justify-between items-center text-[0.8rem]">
        <div className="flex items-center gap-1">
          <span className="text-slate-400">Want:</span>
          <span className="font-bold text-slate-700">{want}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-slate-400">Offer:</span>
          <span className="font-bold text-slate-700">{offer}</span>
        </div>
      </div>
    </div>
  );
};
