import React, { useState } from "react";
import { Shield, CheckCircle2, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { User } from "./types";

interface ChatHeaderProps {
  participant: User;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ participant }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="bg-white/80 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 z-20 relative">
      <div className="flex items-center gap-3">
        <div className="relative shrink-0 w-11 h-11">
          <div className="w-full h-full rounded-full border border-white shadow-sm overflow-hidden flex items-center justify-center bg-slate-100">
            <img
              src={participant.avatarUrl}
              alt={participant.name}
              className="w-full h-full object-cover"
            />
          </div>
          {participant.isVerified && (
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#FFBF00] rounded-full border border-white flex items-center justify-center shadow-sm">
              <Shield size={9} className="text-white fill-current" />
            </div>
          )}
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <h4 className="text-[1.02rem] font-bold text-slate-800 leading-tight">
              {participant.name}
            </h4>
            {participant.isVerified && (
              <CheckCircle2 size={16} className="text-[#10B981] fill-current" />
            )}
          </div>
          <p
            className={`text-[0.8rem] font-bold leading-none ${
              participant.online ? "text-emerald-500" : "text-slate-400"
            }`}
          >
            {participant.online ? "Active now" : "Offline"}
          </p>
        </div>
      </div>

      {/* Dropdown Menu actions */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 shadow-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none"
          title="More Options"
        >
          <MoreHorizontal size={20} className="stroke-[2.5]" />
        </button>

        {showDropdown && (
          <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-1.5 animate-in fade-in zoom-in-95 duration-200">
            <Link
              href={`/swap/createswap?from=chat&swapper=${encodeURIComponent(
                participant.name
              )}`}
              onClick={() => setShowDropdown(false)}
              className="w-full block px-4 py-2.5 hover:bg-slate-50 text-[0.88rem] font-bold text-slate-700 text-left transition-colors"
            >
              Create Swap
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
