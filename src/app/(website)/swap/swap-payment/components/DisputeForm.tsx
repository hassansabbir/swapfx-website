"use client";

import React, { useRef } from "react";
import { ChevronDown, Upload } from "lucide-react";

interface DisputeFormProps {
  disputeReason: string;
  setDisputeReason: (val: string) => void;
  disputeDescription: string;
  setDisputeDescription: (val: string) => void;
  disputeProofFile: File | null;
  setDisputeProofFile: (file: File | null) => void;
  onSubmit: () => void;
}

export default function DisputeForm({
  disputeReason,
  setDisputeReason,
  disputeDescription,
  setDisputeDescription,
  disputeProofFile,
  setDisputeProofFile,
  onSubmit,
}: DisputeFormProps) {
  const disputeFileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="max-w-[720px] mx-auto w-full space-y-6 pt-4 animate-in fade-in duration-300">
      {/* Dispute Reason */}
      <div className="space-y-2">
        <label className="text-[0.85rem] font-semibold text-slate-600 pl-1">
          Dispute Reason <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            value={disputeReason}
            onChange={(e) => setDisputeReason(e.target.value)}
            className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3.5 text-[0.88rem] font-medium text-slate-700 focus:outline-none focus:border-[#09A6A4]/60 focus:bg-white transition-all appearance-none cursor-pointer pr-10 shadow-sm"
          >
            <option value="" disabled>
              Select reason
            </option>
            <option value="Item not as described">Item not as described</option>
            <option value="Payment not received">Payment not received</option>
            <option value="Incorrect amount transferred">Incorrect amount transferred</option>
            <option value="Delayed/unresponsive counterpart">Delayed/unresponsive counterpart</option>
            <option value="Other">Other</option>
          </select>
          <ChevronDown
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-[0.85rem] font-semibold text-slate-600 pl-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={disputeDescription}
          onChange={(e) => setDisputeDescription(e.target.value.slice(0, 300))}
          placeholder="Please provide detailed information about the issue..."
          rows={6}
          className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3.5 text-[0.88rem] font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#09A6A4]/60 focus:bg-white transition-all resize-none shadow-sm"
        />
        <div className="flex justify-between items-center text-[0.75rem] font-medium text-slate-400 px-1 pt-0.5">
          <span>Minimum 20 characters</span>
          <span>{disputeDescription.length}/300</span>
        </div>
      </div>

      {/* Payment Proof (Optional) */}
      <div className="space-y-2">
        <label className="text-[0.85rem] font-semibold text-slate-600 pl-1">
          Payment Proof (Optional)
        </label>

        {/* Hidden input file */}
        <input
          type="file"
          ref={disputeFileInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setDisputeProofFile(file);
          }}
          className="hidden"
          accept="image/*"
        />

        {/* Dotted dropzone uploader container */}
        <div
          onClick={() => disputeFileInputRef.current?.click()}
          className="border border-slate-200 bg-white hover:bg-slate-50/50 hover:border-slate-350 transition-all rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer space-y-2 shadow-sm"
        >
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 shadow-inner">
            <Upload size={18} className="stroke-[2.2]" />
          </div>
          {disputeProofFile ? (
            <div className="space-y-0.5">
              <span className="text-[0.88rem] font-semibold text-emerald-600 block">
                ✓ File Selected
              </span>
              <span className="text-[0.78rem] font-medium text-slate-500 block">
                {disputeProofFile.name} ({(disputeProofFile.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          ) : (
            <div className="space-y-0.5">
              <span className="text-[0.88rem] font-semibold text-slate-700 block">
                Click to upload
              </span>
              <span className="text-[0.75rem] font-medium text-slate-400 block">
                PNG, JPG up to 5MB
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Tip alert box */}
      <div className="bg-[#E0F2FE]/40 border border-[#bae6fd] rounded-2xl p-4 text-[0.85rem] leading-relaxed text-slate-650 shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
        <span className="font-semibold text-[#0369a1] pr-1">Tip:</span>
        Provide as much detail as possible to help our team review your case faster. Include, screenshots of payment, conversations etc.
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          onClick={onSubmit}
          disabled={!disputeReason || disputeDescription.length < 20}
          className={`w-full py-3.5 rounded-2xl text-[0.98rem] font-semibold transition-all shadow-md text-center cursor-pointer focus:outline-none ${
            disputeReason && disputeDescription.length >= 20
              ? "bg-[#09A6A4] text-white hover:scale-[1.01] hover:bg-[#089290] shadow-[#09A6A4]/25"
              : "bg-slate-200 text-slate-400/90 cursor-not-allowed select-none shadow-none"
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
