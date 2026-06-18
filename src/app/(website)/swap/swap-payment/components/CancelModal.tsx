"use client";

import React from "react";
import { X, AlertCircle } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";

interface CancelModalProps {
  onClose: () => void;
  onConfirmYes: () => void;
}

export default function CancelModal({
  onClose,
  onConfirmYes,
}: CancelModalProps) {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-[460px] w-full shadow-2xl relative flex flex-col items-center text-center space-y-5 animate-in zoom-in duration-300 border border-slate-100">
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          variant="light"
          className="absolute right-4 top-4 w-9 h-9"
        >
          <X size={18} strokeWidth={2.5} />
        </IconButton>

        {/* Warning Exclamation Circle */}
        <div className="w-16 h-16 rounded-2xl bg-rose-50/70 text-rose-500 flex items-center justify-center shadow-sm">
          <AlertCircle size={28} className="stroke-2" />
        </div>

        <div className="space-y-2">
          <h3 className="text-[1.32rem] font-semibold text-slate-800 tracking-tight leading-tight">
            Cancel This Swap?
          </h3>
          <p className="text-[0.88rem] font-medium text-slate-500 leading-relaxed px-2">
            If you cancel, this will not be refunded, the swap cannot be arranged as stated, and this may impact your trust score. The counter swapper must be informed and must approve the cancellation. Do you want to proceed?
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4 w-full pt-2">
          <button
            onClick={onConfirmYes}
            className="flex-1 py-3 rounded-xl bg-[#09A6A4] text-white text-[0.95rem] font-semibold shadow-md shadow-[#09A6A4]/25 hover:scale-[1.01] transition-transform cursor-pointer focus:outline-none"
          >
            Yes
          </button>
          
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-[#09A6A4] text-white rounded-xl font-semibold shadow-md shadow-[#09A6A4]/25 hover:scale-[1.01] transition-transform cursor-pointer focus:outline-none"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
