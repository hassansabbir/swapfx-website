"use client";

import React from "react";
import { Check, ChevronRight } from "lucide-react";

interface DisputeSubmittedViewProps {
  onViewDetails: () => void;
}

export default function DisputeSubmittedView({
  onViewDetails,
}: DisputeSubmittedViewProps) {
  return (
    <div className="max-w-[720px] mx-auto w-full space-y-6 pt-4 animate-in fade-in duration-300">
      {/* Custom Teal circle checkmark */}
      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full bg-[#E0F2FE]/40 text-[#0369a1] flex items-center justify-center border-4 border-white shadow-md mx-auto">
          <Check size={28} className="stroke-[2.5]" />
        </div>
      </div>

      {/* Heading & Paragraphs */}
      <div className="text-center space-y-4">
        <h3 className="text-[1.38rem] font-semibold text-slate-800 tracking-tight leading-tight">
          Your dispute has been submitted
        </h3>
        <div className="text-[0.88rem] font-medium text-slate-500 leading-relaxed max-w-[620px] mx-auto px-1 space-y-4 text-center">
          <p>
            Our team will review your case within 72 hours. We'll notify you as soon as there's an update, and we may contact both swappers if we need more information.
          </p>
          <p>
            While we can't guarantee the completion of swaps or the successful resolution of every dispute, we'll support you throughout the process. We'll settle claims if the swap was covered under the Safety Shield protection.
          </p>
        </div>
      </div>

      {/* Dispute ID card redirector to details */}
      <div
        onClick={onViewDetails}
        className="bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 rounded-2xl p-4.5 flex items-center justify-between cursor-pointer transition-all shadow-sm active:scale-[0.99] select-none"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-[0.88rem] font-medium text-slate-400">
            Dispute ID
          </span>
          <span className="text-[0.88rem] font-semibold text-slate-800 font-mono">
            #DSP-8492
          </span>
        </div>
        <ChevronRight size={18} className="text-[#09A6A4] stroke-[2.2]" />
      </div>

      {/* Contact Support */}
      <div className="pt-2">
        <button className="w-full py-3.5 bg-[#09A6A4] hover:bg-[#089290] text-white text-[0.98rem] font-semibold rounded-2xl shadow-md shadow-[#09A6A4]/25 hover:scale-[1.01] transition-transform text-center cursor-pointer focus:outline-none">
          Contact Support
        </button>
      </div>
    </div>
  );
}
