"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { ArrowLeft, ArrowRight, Shield, Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import CancelModal from "@/app/(website)/swap/swap-payment/components/CancelModal";

type PaymentState = "summary" | "payment_method";

export default function FeePaymentPage() {
  const router = useRouter();
  const [pageState, setPageState] = useState<PaymentState>("summary");
  const [safetyShieldChecked, setSafetyShieldChecked] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"stripe" | "razorpay">(
    "stripe",
  );
  const [customNote, setCustomNote] = useState(
    "zxiahsfoihdoifoisajdpojaopskkkkkkkkkkkkkkkkkkkkkkkkkkasdasdf",
  );
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancelSwapYes = () => {
    setShowCancelModal(false);
    router.push("/chat/bob-builder?offerCreated=true&cancelled=true");
  };

  const totalPayable = safetyShieldChecked ? 150 : 100;

  const handleBack = () => {
    if (pageState === "payment_method") {
      setPageState("summary");
    } else {
      router.push("/chat/bob-builder?offerCreated=true");
    }
  };

  const handlePayFee = () => {
    setPageState("payment_method");
  };

  const handleFinalPay = () => {
    router.push("/swap/recipients");
  };

  // Steps component
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
          const isCompleted = step.num < 2;
          const isActive = step.num === 2;

          return (
            <React.Fragment key={step.num}>
              {/* Connector line */}
              {index > 0 && (
                <div
                  className={`flex-1 h-1 mx-1 sm:mx-2 rounded-full transition-colors duration-300 ${
                    step.num <= 2 ? "bg-[#09A6A4]" : "bg-slate-200"
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

        {/* Payment Main Frame */}
        <GlassContainer className="w-full overflow-hidden p-6 md:p-10 border border-white/50 bg-white/20 shadow-xl rounded-4xl flex flex-col relative space-y-4">
          {/* Close/Cross Button */}
          <IconButton
            onClick={() => router.push("/chat/bob-builder?offerCreated=true")}
            className="absolute top-6 right-6 shadow-lg z-30"
          >
            <X size={20} />
          </IconButton>

          <h2 className="text-[1.5rem] font-extrabold text-slate-800 text-center tracking-tight animate-in fade-in duration-400 mt-8">
            Fee Payment
          </h2>

          {/* Steps Breadcrumbs bar */}
          {renderSteps()}

          {pageState === "summary" ? (
            /* STATE 1: Fee Summary Screen */
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
              {/* Swap summary panel */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/50 shadow-sm space-y-4">
                <div className="flex items-center justify-between relative px-2">
                  {/* Bob Builder */}
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0 w-11 h-11">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                        alt="Bob Builder"
                        className="w-full h-full rounded-full object-cover border border-white shadow-sm"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#FFBF00] rounded-full border border-white flex items-center justify-center shadow-sm">
                        <Shield size={9} className="text-white fill-current" />
                      </div>
                    </div>
                    <span className="text-[0.92rem] font-extrabold text-slate-700">
                      Bob Builder
                    </span>
                  </div>

                  {/* Vertical separator */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-100 hidden sm:block" />

                  {/* Fahim Ahmed */}
                  <div className="flex items-center gap-3 sm:pl-8">
                    <div className="relative shrink-0 w-11 h-11">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop"
                        alt="Fahim Ahmed"
                        className="w-full h-full rounded-full object-cover border border-white shadow-sm"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#FFBF00] rounded-full border border-white flex items-center justify-center shadow-sm">
                        <Shield size={9} className="text-white fill-current" />
                      </div>
                    </div>
                    <span className="text-[0.92rem] font-extrabold text-slate-700">
                      Fahim Ahmed
                    </span>
                  </div>
                </div>

                {/* Amount Corridors */}
                <div className="bg-slate-50/70 rounded-2xl p-4 flex items-center justify-between border border-slate-100">
                  <span className="text-[1.05rem] font-extrabold text-slate-700">
                    200 GBP
                  </span>
                  <ArrowRight size={18} className="text-[#09A6A4] shrink-0" />
                  <span className="text-[1.05rem] font-extrabold text-[#09A6A4]">
                    74,900 PKR
                  </span>
                </div>

                {/* Swap ID label */}
                <div className="flex justify-between items-center px-1 text-[0.8rem]">
                  <span className="text-slate-400 font-semibold">Swap ID</span>
                  <span className="text-slate-700 font-extrabold">
                    #SWP-4521
                  </span>
                </div>
              </div>

              {/* Calculations Box */}
              <div className="bg-[#E0F2FE]/40 backdrop-blur-md rounded-3xl p-5 border border-[#BAE6FD]/40 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[0.9rem] font-semibold text-slate-600">
                    Platform Access Fee
                  </span>
                  <span className="text-[0.95rem] font-extrabold text-slate-800">
                    $100
                  </span>
                </div>

                {/* Interactive Safety Shield checkbox */}
                <label className="flex justify-between items-center cursor-pointer select-none py-1 group">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={safetyShieldChecked}
                        onChange={() =>
                          setSafetyShieldChecked(!safetyShieldChecked)
                        }
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
                          safetyShieldChecked
                            ? "bg-[#09A6A4] border-[#09A6A4]"
                            : "border-slate-300 bg-white group-hover:border-slate-400"
                        }`}
                      >
                        {safetyShieldChecked && (
                          <Check
                            size={13}
                            className="text-white"
                            strokeWidth={3}
                          />
                        )}
                      </div>
                    </div>
                    <span className="text-[0.9rem] font-semibold text-slate-600">
                      Safety Shield
                    </span>
                  </div>
                  <span className="text-[0.95rem] font-extrabold text-slate-800">
                    $50
                  </span>
                </label>

                <div className="h-px bg-slate-200/50 my-1" />

                <div className="flex justify-between items-center text-[#09A6A4]">
                  <span className="text-[1rem] font-extrabold">
                    Total Payable
                  </span>
                  <span className="text-[1.2rem] font-black">
                    ${totalPayable.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Pay Fee Action Button */}
              <div className="flex justify-center pt-2">
                <Button onClick={handlePayFee} className="w-full">
                  Pay Fee
                </Button>
              </div>

              {/* Prefilled Note Label Field */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[0.8rem] font-bold text-slate-400 pl-1">
                  Note
                </span>
                <input
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[0.82rem] font-medium text-slate-600 focus:outline-none focus:border-[#09A6A4]"
                />
              </div>
            </div>
          ) : (
            /* STATE 2: Payment Method Screen */
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
              <h3 className="text-[1.08rem] font-extrabold text-slate-800 pl-1 leading-tight">
                Payment Method
              </h3>

              {/* Stripe & Razorpay Selection cards */}
              <div className="space-y-3">
                {/* Stripe Selection Card */}
                <div
                  onClick={() => setSelectedMethod("stripe")}
                  className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex items-center justify-between ${
                    selectedMethod === "stripe"
                      ? "border-[#09A6A4] bg-white shadow-md shadow-slate-100"
                      : "border-slate-100 bg-[#F8FAFC]/55 hover:border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-4.5">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedMethod === "stripe"
                          ? "border-[#09A6A4]"
                          : "border-slate-300"
                      }`}
                    >
                      {selectedMethod === "stripe" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#09A6A4]" />
                      )}
                    </div>

                    <span className="text-[0.95rem] font-bold text-slate-700">
                      Stripe
                    </span>
                  </div>
                </div>

                {/* Razorpay Selection Card */}
                <div
                  onClick={() => setSelectedMethod("razorpay")}
                  className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex items-center justify-between ${
                    selectedMethod === "razorpay"
                      ? "border-[#09A6A4] bg-white shadow-md shadow-slate-100"
                      : "border-slate-100 bg-[#F8FAFC]/55 hover:border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-4.5">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedMethod === "razorpay"
                          ? "border-[#09A6A4]"
                          : "border-slate-300"
                      }`}
                    >
                      {selectedMethod === "razorpay" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#09A6A4]" />
                      )}
                    </div>

                    <span className="text-[0.95rem] font-bold text-slate-700">
                      Razorpay
                    </span>
                  </div>
                </div>
              </div>

              {/* Disclaimer Notice Container */}
              <div className="bg-[#E0F2FE]/50 border border-[#90CDF4]/70 rounded-2xl p-4 md:p-5 text-[0.8rem] text-slate-600 font-semibold leading-relaxed">
                <span className="text-[#0284C7] font-extrabold">Note:</span> The
                fee is non-refundable, regardless of the outcome of the swap or
                if either party cancels the swap.
              </div>

              {/* Pay Button */}
              <div className="flex justify-center pt-2">
                <Button onClick={handleFinalPay} className="w-full">
                  Pay
                </Button>
              </div>
            </div>
          )}

          {/* Cancel Swap Button at the very bottom of the card */}
          <div className="w-full flex justify-center pt-2 border-t border-slate-100/50 mt-4">
            <button
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
