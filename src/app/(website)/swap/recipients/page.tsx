"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { ArrowLeft, Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import CancelModal from "@/app/(website)/swap/swap-payment/components/CancelModal";

export default function RecipientDetailsPage() {
  const router = useRouter();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancelSwapYes = () => {
    setShowCancelModal(false);
    router.push("/chat/bob-builder?offerCreated=true&cancelled=true");
  };

  // State for recipient details prefilled with '1322' as in mockup
  const [formData, setFormData] = useState({
    accountName: "1322",
    sortCode: "1322",
    accountNumber: "1322",
    bankName: "1322",
    iban: "1322",
  });

  const handleBack = () => {
    router.push("/swap/payment");
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/swap/swap-payment");
  };

  // Steps component for Step 3
  const renderSteps = () => {
    const steps = [
      { num: 1, label: "Swap" },
      { num: 2, label: "Fee" },
      { num: 3, label: "Recipients" },
      { num: 4, label: "Payment" },
      { num: 5, label: "Proof" },
      { num: 6, label: "Completed" },
    ];

    return (
      <div className="flex items-center justify-between max-w-[650px] mx-auto w-full pt-2 pb-8 animate-in fade-in duration-300">
        {steps.map((step, index) => {
          const isCompleted = step.num < 3;
          const isActive = step.num === 3;

          return (
            <React.Fragment key={step.num}>
              {/* Connector line */}
              {index > 0 && (
                <div
                  className={`flex-1 h-1 mx-1 sm:mx-2 rounded-full transition-colors duration-300 ${
                    step.num <= 3 ? "bg-[#09A6A4]" : "bg-slate-200"
                  }`}
                />
              )}

              {/* Step indicator circle */}
              <div className="flex flex-col items-center space-y-1 sm:space-y-1.5 relative shrink-0">
                <div
                  className={`w-6 h-6 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-[0.62rem] sm:text-[0.88rem] transition-all duration-300 ${
                    isActive || isCompleted
                      ? "bg-[#09A6A4] text-white shadow-md shadow-[#09A6A4]/25 scale-105"
                      : "bg-white border-2 border-slate-200 text-slate-400"
                  }`}
                >
                  {isCompleted ? <Check size={14} strokeWidth={3} /> : step.num}
                </div>
                <span
                  className={`text-[0.6rem] sm:text-[0.78rem] font-bold tracking-tight whitespace-nowrap leading-none transition-colors duration-300 ${
                    isActive || isCompleted
                      ? "text-[#09A6A4]"
                      : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1200px] mx-auto w-full animate-in fade-in duration-500">
      <div className="relative flex items-center justify-center min-h-[85vh]">
        {/* Circle Back Button */}
        <IconButton
          onClick={handleBack}
          className="absolute left-2 md:-left-12 top-2 w-11 h-11 bg-slate-400/85 shadow-md z-30"
        >
          <ArrowLeft size={20} />
        </IconButton>

        {/* Recipients Details Container */}
        <GlassContainer className="w-full overflow-hidden p-6 md:p-10 border border-white/50 bg-white/20 shadow-xl rounded-4xl flex flex-col relative space-y-4">
          {/* Close/Cross Button */}
          <IconButton
            onClick={() => router.push("/chat/bob-builder?offerCreated=true")}
            className="absolute top-6 right-6 shadow-lg z-30"
          >
            <X size={20} />
          </IconButton>

          <h2 className="text-[1.5rem] font-extrabold text-slate-800 text-center tracking-tight mt-8">
            Recipient's Detail
          </h2>

          {/* Step Progress Tracker */}
          {renderSteps()}

          {/* Details input form */}
          <form
            onSubmit={handleConfirm}
            className="space-y-6 max-w-[720px] mx-auto w-full animate-in fade-in duration-400"
          >
            <div className="bg-white rounded-3xl p-6 border border-slate-200/50 shadow-sm space-y-5">
              <h3 className="text-[1.15rem] font-extrabold text-slate-800 tracking-tight pb-2 border-b border-slate-100">
                Your Recipient's Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Account Name */}
                <div className="space-y-1.5">
                  <label className="text-[0.8rem] font-bold text-slate-500 pl-1">
                    Account Name
                  </label>
                  <input
                    type="text"
                    value={formData.accountName}
                    onChange={(e) =>
                      setFormData({ ...formData, accountName: e.target.value })
                    }
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-[0.85rem] font-semibold text-slate-700 text-center focus:outline-none focus:border-[#09A6A4] focus:bg-white transition-all"
                    required
                  />
                </div>

                {/* Sort Code */}
                <div className="space-y-1.5">
                  <label className="text-[0.8rem] font-bold text-slate-500 pl-1">
                    Sort Code
                  </label>
                  <input
                    type="text"
                    value={formData.sortCode}
                    onChange={(e) =>
                      setFormData({ ...formData, sortCode: e.target.value })
                    }
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-[0.85rem] font-semibold text-slate-700 text-center focus:outline-none focus:border-[#09A6A4] focus:bg-white transition-all"
                    required
                  />
                </div>

                {/* Account Number */}
                <div className="space-y-1.5">
                  <label className="text-[0.8rem] font-bold text-slate-500 pl-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        accountNumber: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-[0.85rem] font-semibold text-slate-700 text-center focus:outline-none focus:border-[#09A6A4] focus:bg-white transition-all"
                    required
                  />
                </div>

                {/* Bank Name */}
                <div className="space-y-1.5">
                  <label className="text-[0.8rem] font-bold text-slate-500 pl-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) =>
                      setFormData({ ...formData, bankName: e.target.value })
                    }
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-[0.85rem] font-semibold text-slate-700 text-center focus:outline-none focus:border-[#09A6A4] focus:bg-white transition-all"
                    required
                  />
                </div>

                {/* IBAN */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[0.8rem] font-bold text-slate-500 pl-1">
                    IBAN
                  </label>
                  <input
                    type="text"
                    value={formData.iban}
                    onChange={(e) =>
                      setFormData({ ...formData, iban: e.target.value })
                    }
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-[0.85rem] font-semibold text-slate-700 text-center focus:outline-none focus:border-[#09A6A4] focus:bg-white transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Confirm button */}
            <div className="flex justify-center pt-2">
              <Button type="submit" className="w-full">
                Confirm
              </Button>
            </div>
          </form>

          {/* Cancel Swap Button at the very bottom of the card */}
          <div className="w-full flex justify-center pt-2 border-t border-slate-100/50 mt-4">
            <button
              type="button"
              onClick={() => setShowCancelModal(true)}
              className="w-full max-w-[450px] py-3 bg-rose-50 border border-rose-200 text-rose-600 text-[0.92rem] font-semibold rounded-xl hover:bg-rose-100 transition-colors shadow-sm text-center cursor-pointer focus:outline-none"
            >
              Cancel Swap
            </button>
          </div>
        </GlassContainer>
      </div>

      {showCancelModal && (
        <CancelModal
          onClose={() => setShowCancelModal(false)}
          onConfirmYes={handleCancelSwapYes}
        />
      )}
    </div>
  );
}
