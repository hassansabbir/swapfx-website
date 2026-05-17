"use client";

import React from "react";

interface DisputeDetailsViewProps {
  disputeReason: string;
  disputeDescription: string;
}

export default function DisputeDetailsView({
  disputeReason,
  disputeDescription,
}: DisputeDetailsViewProps) {
  return (
    <div className="max-w-[720px] mx-auto w-full space-y-5 pt-4 animate-in fade-in duration-300">
      <div className="space-y-1">
        <h3 className="text-[1.38rem] font-semibold text-slate-800 tracking-tight leading-tight">
          Dispute Details
        </h3>
        <div className="flex items-center gap-1.5 text-[0.88rem] font-medium text-slate-400">
          <span>Dispute ID:</span>
          <span className="text-slate-800 font-semibold font-mono">
            #DSP-8492
          </span>
        </div>
      </div>

      {/* Status Box */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between">
        <span className="text-[0.88rem] font-medium text-slate-450">Status</span>
        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100/60 rounded-full px-3 py-1 text-[0.78rem] font-semibold text-amber-600 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Under Review
        </div>
      </div>

      {/* Swap Details Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
        <h4 className="text-[0.95rem] font-semibold text-slate-800 tracking-tight pb-0.5">
          Swap Details
        </h4>
        <div className="space-y-3.5 text-[0.88rem] font-medium text-slate-700">
          <div className="flex justify-between">
            <span className="text-slate-450">Swap ID</span>
            <span className="font-semibold text-slate-800">#SWP-3847</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-450">Date Submitted</span>
            <span className="font-semibold text-slate-800">March 24, 2026</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-450">Other Party</span>
            <span className="font-semibold text-slate-800">@swapper_user</span>
          </div>
        </div>
      </div>

      {/* Dispute Reason Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-2">
        <h4 className="text-[0.95rem] font-semibold text-slate-800 tracking-tight">
          Dispute Reason
        </h4>
        <p className="text-[0.85rem] font-medium text-slate-500 leading-relaxed">
          {disputeReason || "Item not as described"} -{" "}
          {disputeDescription ||
            "The item received did not match the description provided in the swap listing."}
        </p>
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
