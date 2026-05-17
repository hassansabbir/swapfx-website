"use client";

import React from "react";
import { ChevronLeft, ChevronDown, Upload } from "lucide-react";

interface SafetyShieldClaimProps {
  safetySwapId: string;
  setSafetySwapId: (val: string) => void;
  safetyAmount: string;
  setSafetyAmount: (val: string) => void;
  safetyIssue: string;
  setSafetyIssue: (val: string) => void;
  safetyDetail: string;
  setSafetyDetail: (val: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export default function SafetyShieldClaim({
  safetySwapId,
  setSafetySwapId,
  safetyAmount,
  setSafetyAmount,
  safetyIssue,
  setSafetyIssue,
  safetyDetail,
  setSafetyDetail,
  onBack,
  onSubmit,
}: SafetyShieldClaimProps) {
  return (
    <div className="max-w-[700px] mx-auto w-full space-y-6 pt-4 relative animate-in fade-in duration-300">
      <button
        onClick={onBack}
        className="absolute top-2 left-0 w-10 h-10 rounded-full bg-[#949CA9] text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-20 focus:outline-none animate-in fade-in"
      >
        <ChevronLeft size={22} />
      </button>

      <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-3">
        Safety Shield Claim
      </h2>

      <div className="space-y-5 pt-4">
        
        {/* Swap ID */}
        <div className="space-y-2">
          <label className="text-[0.95rem] text-slate-800 font-semibold pl-1">
            Swap ID
          </label>
          <input
            type="text"
            value={safetySwapId}
            onChange={(e) => setSafetySwapId(e.target.value)}
            placeholder="Enter Swap ID"
            className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-[#F1F5F9]/40 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all leading-relaxed"
          />
        </div>

        {/* Swap Amount */}
        <div className="space-y-2">
          <label className="text-[0.95rem] text-slate-800 font-semibold pl-1">
            Swap Amount
          </label>
          <input
            type="text"
            value={safetyAmount}
            onChange={(e) => setSafetyAmount(e.target.value)}
            placeholder="Enter Swap Amount"
            className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-[#F1F5F9]/40 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all leading-relaxed"
          />
        </div>

        {/* What Went Wrong dropdown */}
        <div className="space-y-2 relative">
          <label className="text-[0.95rem] text-slate-800 font-semibold pl-1">
            What Went Wrong?
          </label>
          <div className="relative">
            <select
              value={safetyIssue}
              onChange={(e) => setSafetyIssue(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-[#F1F5F9]/40 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled>Select Issue</option>
              <option value="Escrow Release Failure">Partner did not release escrow</option>
              <option value="Payment Issue">Payment not received</option>
              <option value="Swap Dispute">Dispute during swap</option>
              <option value="Other">Other</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown size={18} className="text-slate-500" />
            </div>
          </div>
        </div>

        {/* Describe What Happened */}
        <div className="space-y-2">
          <label className="text-[0.95rem] text-slate-800 font-semibold pl-1">
            Describe What Happened
          </label>
          <textarea
            value={safetyDetail}
            onChange={(e) => setSafetyDetail(e.target.value)}
            placeholder="Provide Detailed Information About What Went Wrong"
            className="w-full min-h-[140px] p-4 rounded-xl border border-slate-200 bg-[#F1F5F9]/40 text-slate-600 font-medium placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all leading-relaxed"
          />
        </div>

        {/* Attachments */}
        <div className="space-y-2">
          <label className="text-[0.95rem] text-slate-800 font-semibold pl-1 block leading-tight">
            Upload evidence <span className="text-slate-400 font-medium text-[0.8rem] block sm:inline sm:pl-1">(Proof of payment, screenshots, chat history, bank confirmation)</span>
          </label>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-lg text-slate-700 text-[0.88rem] hover:bg-slate-50 transition-colors shadow-xs mt-1 focus:outline-none">
            <Upload size={16} />
            <span>Choose file</span>
          </button>
        </div>

        {/* Declaration */}
        <div className="pt-2 text-[0.85rem] text-slate-500 leading-relaxed font-semibold">
          <span className="text-slate-700 font-bold block pb-0.5">Declaration</span>
          By submitting this request, you confirm that all information provided is accurate and that you are requesting a reimbursement in accordance with the platform's Safety Shield Policy.
        </div>

        {/* Submit */}
        <div className="pt-6 flex justify-center">
          <button
            onClick={onSubmit}
            className="w-full sm:w-auto px-16 py-3.5 rounded-lg text-[0.95rem] font-bold bg-[#09A6A4] text-white shadow-lg shadow-[#09A6A4]/20 hover:scale-[1.02] transition-transform cursor-pointer focus:outline-none"
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
}
