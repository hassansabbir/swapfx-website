"use client";

import React from "react";
import { Shield, ArrowRight, Clock, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import StepTracker from "./StepTracker";

interface ActivePaymentViewProps {
  timeLeft: { minutes: number; seconds: number };
  setTimeLeft: React.Dispatch<
    React.SetStateAction<{ minutes: number; seconds: number }>
  >;
  paymentDone: boolean;
  handlePaymentDoneClick: () => void;
  handleUploadProofClick: () => void;
  customNote: string;
  setShowExtensionModal: (val: boolean) => void;
  setShowCancelModal: (val: boolean) => void;
  formatTime: (val: number) => string;
}

export default function ActivePaymentView({
  timeLeft,
  setTimeLeft,
  paymentDone,
  handlePaymentDoneClick,
  handleUploadProofClick,
  customNote,
  setShowExtensionModal,
  setShowCancelModal,
  formatTime,
}: ActivePaymentViewProps) {
  return (
    <>
      {/* Step Progress Tracker */}
      <StepTracker />

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
            <span className="text-[0.92rem] font-semibold text-slate-700">
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
            <span className="text-[0.92rem] font-semibold text-slate-700">
              Fahim Ahmed
            </span>
          </div>
        </div>

        {/* Currency Exchange Corridor */}
        <div className="bg-slate-50/70 rounded-2xl p-4 flex items-center justify-between border border-slate-100">
          <span className="text-[1.05rem] font-semibold text-slate-700">
            200 GBP
          </span>
          <ArrowRight size={18} className="text-[#09A6A4] shrink-0" />
          <span className="text-[1.05rem] font-semibold text-[#09A6A4]">
            74,900 PKR
          </span>
        </div>

        {/* Swap ID label */}
        <div className="flex justify-between items-center px-1 text-[0.8rem]">
          <span className="text-slate-400 font-semibold">Swap ID</span>
          <span className="text-slate-700 font-semibold">#SWP-4521</span>
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
          {/* Subtle testing expired toggle link */}
          <button
            type="button"
            onClick={() => setTimeLeft({ minutes: 0, seconds: 0 })}
            className="text-[0.72rem] text-rose-400 hover:text-rose-500 font-semibold underline mt-1 block mx-auto transition-colors focus:outline-none"
          >
            (Simulate Timer Expired)
          </button>
        </div>

        {/* Fahim's Recipient Card Form */}
        <div className="space-y-4 pt-2">
          <h4 className="text-[1rem] font-semibold text-slate-800 tracking-tight">
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
            className={`w-full ${
              paymentDone
                ? "bg-gray-500 hover:bg-gray-500 text-white cursor-default"
                : "bg-[#09A6A4] text-white hover:scale-[1.01]"
            }`}
          >
            {paymentDone ? "Payment Confirmed" : "Payment Done"}
          </Button>

          {/* Upload Proof */}
          <Button
            onClick={handleUploadProofClick}
            disabled={!paymentDone}
            className={`w-full py-3 rounded-xl text-[1.02rem] font-semibold flex items-center justify-center gap-2 border shadow-sm transition-all ${
              paymentDone
                ? "bg-[#09A6A4]/80 text-white border-[#09A6A4] hover:scale-[1.01]"
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
        <Button onClick={() => setShowExtensionModal(true)} className="flex-1">
          Request Extension
        </Button>
        <Button onClick={() => setShowCancelModal(true)} className="flex-1">
          Cancel Swap
        </Button>
      </div>
    </>
  );
}
