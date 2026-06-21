"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Info, X } from "lucide-react";

interface ExpiredPaymentViewProps {
  setTimeLeft: React.Dispatch<React.SetStateAction<{ minutes: number; seconds: number }>>;
  onOpenDispute: () => void;
}

export default function ExpiredPaymentView({
  setTimeLeft,
  onOpenDispute,
}: ExpiredPaymentViewProps) {
  const router = useRouter();
  const [showReinstateModal, setShowReinstateModal] = useState(false);

  return (
    <div className="max-w-[720px] mx-auto w-full space-y-6 pt-4 animate-in zoom-in duration-300">
      {/* Alert Warning Circle with ! */}
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-rose-50/70 text-rose-500 flex items-center justify-center border-4 border-white shadow-md mx-auto">
          <div className="w-11 h-11 rounded-full border-2 border-rose-500 flex items-center justify-center">
            <span className="text-xl font-semibold select-none leading-none">!</span>
          </div>
        </div>
      </div>

      {/* Title & Paragraph */}
      <div className="text-center space-y-3">
        <h3 className="text-[1.48rem] font-semibold text-slate-800 tracking-tight leading-tight">
          Swap Time Expired
        </h3>
        <p className="text-[0.88rem] font-medium text-slate-500 leading-relaxed max-w-[620px] mx-auto px-1">
          The time window for this swap has ended, and one or both swappers didn't complete the required steps in time. If you've discussed and still want to proceed, you can reinstate this swap and continue from where you left off.
        </p>
      </div>

      {/* Swap Details Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-150 shadow-[0_4px_25px_rgba(0,0,0,0.015)] space-y-4">
        <h4 className="text-[0.98rem] font-semibold text-slate-800 tracking-tight pb-1">
          Swap Details
        </h4>

        <div className="space-y-3.5 text-[0.88rem] font-medium">
          {/* Swap ID */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Swap ID</span>
            <span className="text-slate-800 font-semibold">#SWP-4521</span>
          </div>

          {/* Amount */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Amount</span>
            <span className="text-slate-800 font-semibold">
              £200 GBP &rarr; $250 USD
            </span>
          </div>

          {/* Counterparty */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Counterparty</span>
            <div className="flex items-center gap-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                alt="Bob Builder"
                className="w-5 h-5 rounded-full object-cover shadow-sm border border-slate-100"
              />
              <span className="text-slate-855 font-semibold">Bob Builder</span>
            </div>
          </div>

          {/* Original Time */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Original Time</span>
            <span className="text-slate-800 font-semibold">3 hours</span>
          </div>

          {/* Extensions Used */}
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Extensions Used</span>
            <span className="text-slate-800 font-semibold">2/2</span>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-slate-400">Status</span>
            <span className="bg-rose-50 text-rose-500 border border-rose-100/50 rounded-full px-3.5 py-0.5 text-[0.78rem] font-semibold">
              Failed
            </span>
          </div>
        </div>
      </div>

      {/* Note Alert Container */}
      <div className="bg-[#E0F2FE]/40 border border-[#bae6fd] rounded-2xl p-4 text-[0.85rem] leading-relaxed text-slate-650">
        <span className="font-semibold text-[#0369a1]">Note:</span> Swap not completed within the agreed time window. Please reach out to the other swapper to resolve the delay. If you're unable to reach an agreement, raise a dispute ticket with the support team for assistance.
      </div>

      {/* Actions */}
      <div className="space-y-3 pt-3">
        <button
          onClick={() => setShowReinstateModal(true)}
          className="w-full py-3.5 bg-[#09A6A4] hover:bg-[#089593] text-white text-[0.95rem] font-semibold rounded-xl shadow-md shadow-[#09A6A4]/20 hover:scale-[1.01] transition-transform text-center cursor-pointer focus:outline-none"
        >
          Reinstate Swap
        </button>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
          <button className="w-full sm:flex-1 py-3 bg-white border border-slate-200 text-[#09A6A4] text-[0.92rem] font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-center cursor-pointer focus:outline-none">
            Contact Support
          </button>

          <button
            onClick={onOpenDispute}
            className="w-full sm:flex-1 py-3 bg-white border border-slate-200 text-[#09A6A4] text-[0.92rem] font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-center cursor-pointer focus:outline-none"
          >
            Open Dispute
          </button>
        </div>
      </div>

      {/* Reinstate Swap Confirmation Modal */}
      {showReinstateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[1.25rem] font-bold text-slate-800 flex items-center gap-2">
                <Info className="text-[#09A6A4]" size={20} />
                Reinstate Swap
              </h3>
              <button 
                onClick={() => setShowReinstateModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-full hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>
            
            <p className="text-[0.92rem] text-slate-600 leading-relaxed mb-6 font-medium">
              Time swap reinstate will begin and the timer will start from the very beginning like the initial time. 
              Also, you should contact the other swapper before reinstating the swap to ensure they are ready.
            </p>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.push("/chat/bob-builder")}
                className="w-full py-3.5 bg-[#09A6A4] hover:bg-[#089593] text-white text-[0.95rem] font-semibold rounded-xl transition-transform hover:scale-[1.01] shadow-md shadow-[#09A6A4]/20 text-center"
              >
                Contact Swapper
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
