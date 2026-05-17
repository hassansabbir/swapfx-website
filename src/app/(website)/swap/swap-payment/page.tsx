"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GlassContainer } from "@/components/ui/GlassContainer";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Check,
  Upload,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SwapPaymentPage() {
  const router = useRouter();

  // Interactive checkout states
  const [paymentDone, setPaymentDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ minutes: 9, seconds: 12 });
  const [customNote] = useState(
    "zxiahsfoihdoifoisajdpojaopskkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkasdasdf",
  );

  // Countdown timer simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (val: number) => {
    return val < 10 ? `0${val}` : `${val}`;
  };

  const handleBack = () => {
    router.push("/swap/recipients");
  };

  const handlePaymentDoneClick = () => {
    setPaymentDone(true);
  };

  const handleUploadProofClick = () => {
    router.push("/swap/proof");
  };

  // Steps component for Step 4
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
          const isCompleted = step.num < 4;
          const isActive = step.num === 4;

          return (
            <React.Fragment key={step.num}>
              {/* Connector line */}
              {index > 0 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded-full transition-colors duration-300 ${
                    step.num <= 4 ? "bg-[#09A6A4]" : "bg-slate-200"
                  }`}
                />
              )}

              {/* Step indicator circle */}
              <div className="flex flex-col items-center space-y-1.5 relative">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[0.88rem] transition-all duration-300 ${
                    isActive || isCompleted
                      ? "bg-[#09A6A4] text-white shadow-md shadow-[#09A6A4]/25 scale-105"
                      : "bg-white border-2 border-slate-200 text-slate-400"
                  }`}
                >
                  {isCompleted ? <Check size={16} strokeWidth={3} /> : step.num}
                </div>
                <span
                  className={`text-[0.78rem] font-bold tracking-tight transition-colors duration-300 ${
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
        <button
          onClick={handleBack}
          className="absolute -left-4 md:-left-12 top-2 w-11 h-11 rounded-full bg-slate-400/85 text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-30"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Swap Payment Container */}
        <GlassContainer className="w-full overflow-hidden p-6 md:p-10 border border-white/50 bg-white/20 shadow-xl rounded-4xl flex flex-col relative space-y-4">
          <h2 className="text-[1.5rem] font-extrabold text-slate-800 text-center tracking-tight">
            Swap Payment
          </h2>

          {/* Step Progress Tracker */}
          {renderSteps()}

          {/* Main Card View */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/50 shadow-sm space-y-6 max-w-[720px] mx-auto w-full animate-in fade-in duration-400">
            {/* Bob Builder & Fahim Ahmed */}
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

            {/* Currency Exchange Corridor */}
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
              <span className="text-slate-700 font-extrabold">#SWP-4521</span>
            </div>

            {/* Live Countdown Timer */}
            <div className="text-center space-y-1 bg-slate-50/50 rounded-2xl p-3 border border-slate-100">
              <span className="text-[0.78rem] font-semibold text-slate-400 uppercase tracking-wider block">
                Time remaining
              </span>
              <div className="flex items-center justify-center gap-2 text-[2.2rem] font-black text-[#EF4444] font-mono leading-none tracking-tight">
                <Clock size={28} className="animate-pulse" />
                <span>
                  00 : {formatTime(timeLeft.minutes)} :{" "}
                  {formatTime(timeLeft.seconds)}
                </span>
              </div>
            </div>

            {/* Fahim's Recipient Card Form */}
            <div className="space-y-4 pt-2">
              <h4 className="text-[1rem] font-extrabold text-slate-800 tracking-tight">
                Fahim's Recipient
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Account Name */}
                <div className="space-y-1.5">
                  <label className="text-[0.8rem] font-bold text-slate-400 pl-1">
                    Account Name
                  </label>
                  <div className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[0.85rem] font-semibold text-slate-600 text-center select-none">
                    1322
                  </div>
                </div>

                {/* Sort Code */}
                <div className="space-y-1.5">
                  <label className="text-[0.8rem] font-bold text-slate-400 pl-1">
                    Sort Code
                  </label>
                  <div className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[0.85rem] font-semibold text-slate-600 text-center select-none">
                    1322
                  </div>
                </div>

                {/* Account Number */}
                <div className="space-y-1.5">
                  <label className="text-[0.8rem] font-bold text-slate-400 pl-1">
                    Account Number
                  </label>
                  <div className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[0.85rem] font-semibold text-slate-600 text-center select-none">
                    1322
                  </div>
                </div>

                {/* Bank Name */}
                <div className="space-y-1.5">
                  <label className="text-[0.8rem] font-bold text-slate-400 pl-1">
                    Bank Name
                  </label>
                  <div className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[0.85rem] font-semibold text-slate-600 text-center select-none">
                    1322
                  </div>
                </div>

                {/* IBAN */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[0.8rem] font-bold text-slate-400 pl-1">
                    IBAN
                  </label>
                  <div className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[0.85rem] font-semibold text-slate-600 text-center select-none">
                    1322
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              {/* Payment Done */}
              <Button
                onClick={handlePaymentDoneClick}
                disabled={paymentDone}
                className={`w-full py-4 rounded-2xl text-[1.02rem] font-bold shadow-lg transition-all ${
                  paymentDone
                    ? "bg-emerald-500 hover:bg-emerald-500 text-white cursor-default"
                    : "bg-[#09A6A4] text-white hover:scale-[1.01]"
                }`}
              >
                {paymentDone ? "Payment Confirmed" : "Payment Done"}
              </Button>

              {/* Upload Proof */}
              <Button
                onClick={handleUploadProofClick}
                disabled={!paymentDone}
                className={`w-full py-4 rounded-2xl text-[1.02rem] font-bold flex items-center justify-center gap-2 border shadow-sm transition-all ${
                  paymentDone
                    ? "bg-slate-800 text-white border-slate-800 hover:scale-[1.01]"
                    : "bg-slate-100 text-slate-400 border-slate-200/50 cursor-not-allowed"
                }`}
              >
                <Upload size={16} />
                Upload Proof
              </Button>
            </div>
          </div>

          {/* Prefilled Note Label Field */}
          <div className="space-y-1.5 max-w-[720px] mx-auto w-full pt-1">
            <span className="text-[0.8rem] font-bold text-slate-400 pl-1">
              Note
            </span>
            <div className="w-full bg-white border border-slate-200/60 rounded-2xl px-4 py-4 text-[0.82rem] font-medium text-slate-600 leading-relaxed shadow-sm">
              {customNote}
            </div>
          </div>

          {/* Secondary Actions (Request Extension & Cancel Swap) */}
          <div className="flex gap-4 max-w-[720px] mx-auto w-full pt-4">
            <button
              onClick={() => alert("Extension request sent!")}
              className="flex-1 py-3.5 border-2 border-[#09A6A4] text-[#09A6A4] hover:bg-[#09A6A4]/5 transition-colors font-bold rounded-2xl text-[0.92rem]"
            >
              Request Extension
            </button>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to cancel this swap?")) {
                  router.push("/chat");
                }
              }}
              className="flex-1 py-3.5 border-2 border-[#09A6A4] text-[#09A6A4] hover:bg-[#09A6A4]/5 transition-colors font-bold rounded-2xl text-[0.92rem]"
            >
              Cancel Swap
            </button>
          </div>
        </GlassContainer>
      </div>
    </div>
  );
}
