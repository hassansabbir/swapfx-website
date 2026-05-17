"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { GlassContainer } from "@/components/ui/GlassContainer";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Check,
  Upload,
  Clock,
  AlertCircle,
  HelpCircle,
  X,
  ChevronRight,
  ChevronDown,
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
  const [showExtensionModal, setShowExtensionModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [disputeStep, setDisputeStep] = useState<
    "none" | "form" | "submitted" | "details"
  >("none");
  const [disputeReason, setDisputeReason] = useState("");
  const [disputeDescription, setDisputeDescription] = useState("");
  const [disputeProofFile, setDisputeProofFile] = useState<File | null>(null);
  const disputeFileInputRef = useRef<HTMLInputElement>(null);

  const handleRequestExtensionYes = () => {
    setTimeLeft({ minutes: 0, seconds: 0 });
    setShowExtensionModal(false);
  };

  const handleCancelSwapYes = () => {
    setShowCancelModal(false);
    router.push("/chat");
  };

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
    if (disputeStep === "form") {
      setDisputeStep("none");
    } else if (disputeStep === "submitted") {
      setDisputeStep("form");
    } else if (disputeStep === "details") {
      setDisputeStep("submitted");
    } else {
      router.push("/swap/recipients");
    }
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
          <h2 className="text-[1.5rem] font-semibold text-slate-800 text-center tracking-tight">
            {disputeStep === "form"
              ? "File Dispute"
              : disputeStep !== "none"
                ? "Dispute"
                : "Swap Payment"}
          </h2>

          {disputeStep === "form" ? (
            /* ========================================================= */
            /* STEP 1: FILE DISPUTE FORM */
            /* ========================================================= */
            <div className="max-w-[720px] mx-auto w-full space-y-6 pt-4 animate-in fade-in duration-300">
              {/* Dispute Reason */}
              <div className="space-y-2">
                <label className="text-[0.85rem] font-semibold text-slate-650 pl-1">
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
                    <option value="Item not as described">
                      Item not as described
                    </option>
                    <option value="Payment not received">
                      Payment not received
                    </option>
                    <option value="Incorrect amount transferred">
                      Incorrect amount transferred
                    </option>
                    <option value="Delayed/unresponsive counterpart">
                      Delayed/unresponsive counterpart
                    </option>
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
                <label className="text-[0.85rem] font-semibold text-slate-655 pl-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={disputeDescription}
                  onChange={(e) =>
                    setDisputeDescription(e.target.value.slice(0, 300))
                  }
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
                <label className="text-[0.85rem] font-semibold text-slate-655 pl-1">
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
                        {disputeProofFile.name} (
                        {(disputeProofFile.size / 1024 / 1024).toFixed(2)} MB)
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
                Provide as much detail as possible to help our team review your
                case faster. Include, screenshots of payment, conversations etc.
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  onClick={() => setDisputeStep("submitted")}
                  disabled={!disputeReason || disputeDescription.length < 20}
                  className={`w-full py-3.5 rounded-2xl text-[0.98rem] font-semibold transition-all shadow-md text-center ${
                    disputeReason && disputeDescription.length >= 20
                      ? "bg-[#09A6A4] text-white hover:scale-[1.01] hover:bg-[#089290] shadow-[#09A6A4]/25"
                      : "bg-slate-200 text-slate-400/90 cursor-not-allowed select-none shadow-none"
                  }`}
                >
                  Submit
                </button>
              </div>
            </div>
          ) : disputeStep === "submitted" ? (
            /* ========================================================= */
            /* STEP 2: DISPUTE SUBMITTED SUCCESS SCREEN */
            /* ========================================================= */
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
                    Our team will review your case within 72 hours. We'll notify
                    you as soon as there's an update, and we may contact both
                    swappers if we need more information.
                  </p>
                  <p>
                    While we can't guarantee the completion of swaps or the
                    successful resolution of every dispute, we'll support you
                    throughout the process. We'll settle claims if the swap was
                    covered under the Safety Shield protection.
                  </p>
                </div>
              </div>

              {/* Dispute ID card redirector to details */}
              <div
                onClick={() => setDisputeStep("details")}
                className="bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 rounded-2xl p-4.5 flex items-center justify-between cursor-pointer transition-all shadow-sm active:scale-[0.99] select-none"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[0.88rem] font-medium text-slate-450">
                    Dispute ID
                  </span>
                  <span className="text-[0.88rem] font-semibold text-slate-800 font-mono">
                    #DSP-8492
                  </span>
                </div>
                <ChevronRight
                  size={18}
                  className="text-[#09A6A4] stroke-[2.2]"
                />
              </div>

              {/* Contact Support */}
              <div className="pt-2">
                <button className="w-full py-3.5 bg-[#09A6A4] hover:bg-[#089290] text-white text-[0.98rem] font-semibold rounded-2xl shadow-md shadow-[#09A6A4]/25 hover:scale-[1.01] transition-transform text-center">
                  Contact Support
                </button>
              </div>
            </div>
          ) : disputeStep === "details" ? (
            /* ========================================================= */
            /* STEP 3: DISPUTE DETAILS VIEW SCREEN */
            /* ========================================================= */
            <div className="max-w-[720px] mx-auto w-full space-y-5 pt-4 animate-in fade-in duration-300">
              <div className="space-y-1">
                <h3 className="text-[1.38rem] font-semibold text-slate-800 tracking-tight leading-tight">
                  Dispute Details
                </h3>
                <div className="flex items-center gap-1.5 text-[0.88rem] font-medium text-slate-450">
                  <span>Dispute ID:</span>
                  <span className="text-slate-800 font-semibold font-mono">
                    #DSP-8492
                  </span>
                </div>
              </div>

              {/* Status Box */}
              <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center justify-between">
                <span className="text-[0.88rem] font-medium text-slate-450">
                  Status
                </span>
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100/60 rounded-full px-3 py-1 text-[0.78rem] font-semibold text-amber-600 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Under Review
                </div>
              </div>

              {/* Swap Details Card */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
                <h4 className="text-[0.95rem] font-semibold text-slate-850 tracking-tight pb-0.5">
                  Swap Details
                </h4>
                <div className="space-y-3.5 text-[0.88rem] font-medium text-slate-750">
                  <div className="flex justify-between">
                    <span className="text-slate-450">Swap ID</span>
                    <span className="font-semibold text-slate-800">
                      #SWP-3847
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-450">Date Submitted</span>
                    <span className="font-semibold text-slate-850">
                      March 24, 2026
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-450">Other Party</span>
                    <span className="font-semibold text-slate-855">
                      @swapper_user
                    </span>
                  </div>
                </div>
              </div>

              {/* Dispute Reason Card */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-2">
                <h4 className="text-[0.95rem] font-semibold text-slate-855 tracking-tight">
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
                <button className="w-full py-3.5 bg-[#09A6A4] hover:bg-[#089290] text-white text-[0.98rem] font-semibold rounded-2xl shadow-md shadow-[#09A6A4]/25 hover:scale-[1.01] transition-transform text-center">
                  Contact Support
                </button>
              </div>
            </div>
          ) : (
            /* ========================================================= */
            /* STANDARD EXPIRED VS ACTIVE PAYMENT STEP 4 VIEW */
            /* ========================================================= */
            <>
              {timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
                /* ========================================================= */
                /* SWAP TIME EXPIRED STATE SCREEN - PIXEL-PERFECT MOCKUP */
                /* ========================================================= */
                <div className="max-w-[720px] mx-auto w-full space-y-6 pt-4 animate-in zoom-in duration-300">
                  {/* Alert Warning Circle with ! */}
                  <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-rose-50/70 text-rose-500 flex items-center justify-center border-4 border-white shadow-md mx-auto">
                      <div className="w-11 h-11 rounded-full border-2 border-rose-500 flex items-center justify-center">
                        <span className="text-xl font-semibold select-none leading-none">
                          !
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Paragraph */}
                  <div className="text-center space-y-3">
                    <h3 className="text-[1.48rem] font-semibold text-slate-800 tracking-tight leading-tight">
                      Swap Time Expired
                    </h3>
                    <p className="text-[0.88rem] font-medium text-slate-500 leading-relaxed max-w-[620px] mx-auto px-1">
                      The time window for this swap has ended, and one or both
                      swappers didn't complete the required steps in time. If
                      you've discussed and still want to proceed, you can
                      reinstate this swap and continue from where you left off.
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
                        <span className="text-slate-800 font-semibold">
                          #SWP-4521
                        </span>
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
                          <span className="text-slate-855 font-semibold">
                            Bob Builder
                          </span>
                        </div>
                      </div>

                      {/* Original Time */}
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Original Time</span>
                        <span className="text-slate-800 font-semibold">
                          3 hours
                        </span>
                      </div>

                      {/* Extensions Used */}
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Extensions Used</span>
                        <span className="text-slate-800 font-semibold">
                          2/2
                        </span>
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
                    <span className="font-semibold text-[#0369a1]">Note:</span>{" "}
                    Swap not completed within the agreed time window. Please
                    reach out to the other swapper to resolve the delay. If
                    you're unable to reach an agreement, raise a dispute ticket
                    with the support team for assistance.
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 pt-3">
                    <button
                      onClick={() => setTimeLeft({ minutes: 30, seconds: 0 })}
                      className="w-full py-3.5 bg-[#09A6A4] hover:bg-[#089593] text-white text-[0.95rem] font-semibold rounded-xl shadow-md shadow-[#09A6A4]/20 hover:scale-[1.01] transition-transform text-center"
                    >
                      Reinstate Swap
                    </button>
                    <div className="flex gap-4 w-full">
                      <button className="flex-1 py-3 bg-white border border-slate-200 text-[#09A6A4] text-[0.92rem] font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-center">
                        Contact Support
                      </button>
                      <button
                        onClick={() => setDisputeStep("form")}
                        className="flex-1 py-3 bg-white border border-slate-200 text-[#09A6A4] text-[0.92rem] font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-center"
                      >
                        Open Dispute
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* ========================================================= */
                /* ACTIVE SWAP PAYMENT STATE SCREEN */
                /* ========================================================= */
                <>
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
                            <Shield
                              size={9}
                              className="text-white fill-current"
                            />
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
                            <Shield
                              size={9}
                              className="text-white fill-current"
                            />
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
                      <ArrowRight
                        size={18}
                        className="text-[#09A6A4] shrink-0"
                      />
                      <span className="text-[1.05rem] font-semibold text-[#09A6A4]">
                        74,900 PKR
                      </span>
                    </div>

                    {/* Swap ID label */}
                    <div className="flex justify-between items-center px-1 text-[0.8rem]">
                      <span className="text-slate-400 font-semibold">
                        Swap ID
                      </span>
                      <span className="text-slate-700 font-semibold">
                        #SWP-4521
                      </span>
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
                        className="text-[0.72rem] text-rose-400 hover:text-rose-500 font-semibold underline mt-1 block mx-auto transition-colors"
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
                        className={`w-full py-4 rounded-2xl text-[1.02rem] font-semibold shadow-lg transition-all ${
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
                        className={`w-full py-4 rounded-2xl text-[1.02rem] font-semibold flex items-center justify-center gap-2 border shadow-sm transition-all ${
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
                      onClick={() => setShowExtensionModal(true)}
                      className="flex-1 py-3.5 border-2 border-[#09A6A4] text-[#09A6A4] hover:bg-[#09A6A4]/5 transition-colors font-semibold rounded-2xl text-[0.92rem]"
                    >
                      Request Extension
                    </button>
                    <button
                      onClick={() => setShowCancelModal(true)}
                      className="flex-1 py-3.5 border-2 border-[#09A6A4] text-[#09A6A4] hover:bg-[#09A6A4]/5 transition-colors font-semibold rounded-2xl text-[0.92rem]"
                    >
                      Cancel Swap
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </GlassContainer>
      </div>

      {/* REQUEST EXTENSION OVERLAY DIALOG */}
      {showExtensionModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-[460px] w-full shadow-2xl relative flex flex-col items-center text-center space-y-5 animate-in zoom-in duration-300 border border-slate-100">
            {/* Close Button */}
            <button
              onClick={() => setShowExtensionModal(false)}
              className="absolute right-4 top-4 w-9 h-9 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center hover:bg-slate-200 transition-all shadow-inner"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            {/* Custom rounded cursor/arrow icon */}
            <div className="w-16 h-16 rounded-2xl bg-rose-50/70 text-rose-500 flex items-center justify-center shadow-sm">
              {/* Premium pointing cursor matching mockup */}
              <HelpCircle size={28} className="stroke-2" />
            </div>

            <div className="space-y-2">
              <h3 className="text-[1.32rem] font-semibold text-slate-800 tracking-tight leading-tight">
                Request Extension
              </h3>
              <p className="text-[0.88rem] font-medium text-slate-500 leading-relaxed px-2">
                Need a little more time? You can extend your session by 30
                minutes to complete this swap. This helps keep your transaction
                active and prevents it from expiring.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 w-full pt-2">
              <button
                onClick={handleRequestExtensionYes}
                className="flex-1 py-3 rounded-xl bg-[#09A6A4] text-white text-[0.95rem] font-semibold shadow-md shadow-[#09A6A4]/25 hover:scale-[1.01] transition-transform"
              >
                Yes
              </button>
              <button
                onClick={() => setShowExtensionModal(false)}
                className="flex-1 py-3 bg-[#09A6A4] text-white rounded-xl font-semibold shadow-md shadow-[#09A6A4]/25 hover:scale-[1.01] transition-transform"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CANCEL SWAP OVERLAY DIALOG */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-[460px] w-full shadow-2xl relative flex flex-col items-center text-center space-y-5 animate-in zoom-in duration-300 border border-slate-100">
            {/* Close Button */}
            <button
              onClick={() => setShowCancelModal(false)}
              className="absolute right-4 top-4 w-9 h-9 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center hover:bg-slate-200 transition-all shadow-inner"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            {/* Warning Exclamation Circle */}
            <div className="w-16 h-16 rounded-2xl bg-rose-50/70 text-rose-500 flex items-center justify-center shadow-sm">
              <AlertCircle size={28} className="stroke-2" />
            </div>

            <div className="space-y-2">
              <h3 className="text-[1.32rem] font-semibold text-slate-800 tracking-tight leading-tight">
                Cancel This Swap?
              </h3>
              <p className="text-[0.88rem] font-medium text-slate-500 leading-relaxed px-2">
                If you cancel this swap, the admin fee will not be refunded, and
                the transaction will be permanently terminated. Are you sure you
                want to proceed?
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 w-full pt-2">
              <button
                onClick={handleCancelSwapYes}
                className="flex-1 py-3 rounded-xl bg-[#09A6A4] text-white text-[0.95rem] font-semibold shadow-md shadow-[#09A6A4]/25 hover:scale-[1.01] transition-transform"
              >
                Yes
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-3 bg-[#09A6A4] text-white rounded-xl font-semibold shadow-md shadow-[#09A6A4]/25 hover:scale-[1.01] transition-transform"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
