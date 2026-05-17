"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GlassContainer } from "@/components/ui/GlassContainer";
import {
  ArrowLeft,
  Check,
  FileText,
  Clock,
  Shield,
  Star,
  X,
} from "lucide-react";

function SwapCompletedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const uploadedFileName = searchParams.get("file") || "";

  const [showReviewModal, setShowReviewModal] = React.useState(false);
  const [rating, setRating] = React.useState(4);
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);
  const [reviewText, setReviewText] = React.useState("");

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReviewModal(false);
  };

  const handleBack = () => {
    router.push("/swap/proof");
  };

  // Steps component for Completed (Step 6)
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
          return (
            <React.Fragment key={step.num}>
              {/* Connector line */}
              {index > 0 && (
                <div className="flex-1 h-1 mx-2 rounded-full bg-[#09A6A4]" />
              )}

              {/* Step indicator circle */}
              <div className="flex flex-col items-center space-y-1.5 relative">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[0.88rem] bg-[#09A6A4] text-white shadow-md shadow-[#09A6A4]/25 scale-105 transition-all">
                  <Check size={16} strokeWidth={3} />
                </div>
                <span className="text-[0.78rem] font-bold tracking-tight text-[#09A6A4]">
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

        {/* Completed Card Container */}
        <GlassContainer className="w-full overflow-hidden p-6 md:p-10 border border-white/50 bg-white/20 shadow-xl rounded-4xl flex flex-col relative space-y-5 max-w-[850px]">
          <h2 className="text-[1.5rem] font-extrabold text-slate-800 text-center tracking-tight font-sans pb-1">
            Completed
          </h2>

          {/* Step Progress Tracker */}
          {renderSteps()}

          {/* Main Transaction Summary Box */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.01)] space-y-4">
            {/* Swappers avatars and names */}
            <div className="flex items-center justify-between px-2">
              {/* Swapper 1: Bob Builder */}
              <div className="flex items-center gap-2.5 flex-1 justify-start">
                <div className="relative shrink-0 w-9 h-9">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Bob Builder"
                    className="w-full h-full rounded-full object-cover border border-white"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#FFBF00] rounded-full border border-white flex items-center justify-center shadow-sm">
                    <Shield size={7} className="text-white fill-current" />
                  </div>
                </div>
                <span className="text-[0.92rem] font-bold text-slate-800">
                  Bob Builder
                </span>
              </div>

              {/* Central Divider line */}
              <div className="w-px h-8 bg-slate-100 mx-4 shrink-0" />

              {/* Swapper 2: Fahim Ahmed */}
              <div className="flex items-center gap-2.5 flex-1 justify-start pl-2">
                <div className="relative shrink-0 w-9 h-9">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80"
                    alt="Fahim Ahmed"
                    className="w-full h-full rounded-full object-cover border border-white"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#FFBF00] rounded-full border border-white flex items-center justify-center shadow-sm">
                    <Shield size={7} className="text-white fill-current" />
                  </div>
                </div>
                <span className="text-[0.92rem] font-bold text-slate-800">
                  Fahim Ahmed
                </span>
              </div>
            </div>

            {/* Currency conversion block */}
            <div className="bg-slate-50/50 rounded-xl px-5 py-3 border border-slate-100 flex items-center justify-between">
              <h3 className="text-[1.12rem] font-extrabold text-slate-850">
                200 GBP
              </h3>
              <span className="text-[#09A6A4] text-lg font-bold">→</span>
              <h3 className="text-[1.12rem] font-extrabold text-[#09A6A4]">
                74.900 PKR
              </h3>
            </div>

            {/* Swap ID indicators */}
            <div className="flex items-center justify-between text-[0.8rem] font-bold px-1 text-slate-400">
              <span>Swap ID</span>
              <span className="text-slate-700 font-extrabold">#SWP-4521</span>
            </div>
          </div>

          {/* Proof of Payment Section */}
          <div className="space-y-3">
            <h3 className="text-[1.02rem] font-bold text-slate-800 pl-0.5">
              Proof of Payment
            </h3>

            {/* Proof cards columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Bob Builder's proof (Active user - shows the uploaded file) */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100/80 shadow-sm flex flex-col items-center text-center space-y-4">
                <div className="w-11 h-11 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center shadow-inner">
                  <FileText size={22} className="stroke-[2.2]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-[0.88rem] font-extrabold text-slate-800 tracking-tight">
                    {uploadedFileName || "payment_screenshot.jpg"}
                  </h4>
                  <p className="text-[0.75rem] font-semibold text-slate-400">
                    By Bob Builder
                  </p>
                </div>
                <div className="w-full grid grid-cols-2 gap-2.5 pt-1">
                  <button className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-650 hover:text-slate-800 text-[0.82rem] font-extrabold transition-all shadow-sm bg-white">
                    View
                  </button>
                  <button
                    onClick={() => router.push("/swap/proof")}
                    className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-650 hover:text-slate-800 text-[0.82rem] font-extrabold transition-all shadow-sm bg-white"
                  >
                    Update Proof
                  </button>
                </div>
              </div>

              {/* Card 2: Fahim Hossain's proof (Other party - waiting for upload) */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100/60 shadow-sm flex flex-col items-center text-center space-y-4 opacity-85">
                <div className="w-11 h-11 bg-slate-50 text-slate-450 rounded-full flex items-center justify-center shadow-inner border border-slate-100">
                  <Clock size={22} className="stroke-2" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-[0.88rem] font-extrabold text-slate-400 tracking-tight">
                    Waiting for upload
                  </h4>
                  <p className="text-[0.75rem] font-semibold text-slate-400/80">
                    By Fahim Hossain
                  </p>
                </div>
                <div className="w-full grid grid-cols-2 gap-2.5 pt-1 select-none pointer-events-none opacity-45">
                  <button className="py-2.5 px-4 rounded-xl border border-slate-100 text-slate-350 text-[0.82rem] font-extrabold bg-slate-50/20">
                    View
                  </button>
                  <button className="py-2.5 px-4 rounded-xl border border-slate-100 text-slate-350 text-[0.82rem] font-extrabold bg-slate-50/20">
                    Update Proof
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Note Field Display */}
          <div className="space-y-2">
            <label className="text-[0.8rem] font-bold text-slate-550 pl-0.5">
              Note
            </label>
            <div className="bg-slate-50/70 border border-slate-100 rounded-xl px-4 py-3.5 text-[0.85rem] font-semibold text-slate-450 leading-relaxed break-all">
              zxiahsfoihdoifoisajdpojaopskkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={() => router.push("/account/support")}
              className="flex-1 max-w-[220px] py-3.5 rounded-xl bg-[#09A6A4] text-white text-[0.92rem] font-semibold shadow-md shadow-[#09A6A4]/20 hover:scale-[1.01] transition-transform"
            >
              Contact Support
            </button>
            <button
              onClick={() => setShowReviewModal(true)}
              className="flex-1 max-w-[220px] py-3.5 rounded-xl bg-[#09A6A4] text-white text-[0.92rem] font-semibold shadow-md shadow-[#09A6A4]/20 hover:scale-[1.01] transition-transform"
            >
              Share Review
            </button>
          </div>
        </GlassContainer>
      </div>

      {/* SHARE REVIEW OVERLAY DIALOG */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-[460px] w-full shadow-2xl relative flex flex-col items-center text-center space-y-5 animate-in zoom-in duration-300 border border-slate-100">
            {/* Close Button */}
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute right-4 top-4 w-9 h-9 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center hover:bg-slate-200 transition-all shadow-inner"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            <h3 className="text-[1.32rem] font-semibold text-slate-800 tracking-tight leading-tight">
              Share Your Experience.
            </h3>

            {/* Interactive Stars Selector */}
            <div className="flex items-center justify-center gap-2.5 py-1">
              {[1, 2, 3, 4, 5].map((starNum) => {
                const currentRating =
                  hoverRating !== null ? hoverRating : rating;
                const isFilled = starNum <= currentRating;

                return (
                  <button
                    key={starNum}
                    type="button"
                    onClick={() => setRating(starNum)}
                    onMouseEnter={() => setHoverRating(starNum)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="transition-transform hover:scale-110 duration-150"
                  >
                    <Star
                      size={36}
                      className={`stroke-[1.5] ${
                        isFilled
                          ? "fill-[#FFB300] text-[#FFB300]"
                          : "text-slate-350 fill-none"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Review form textarea */}
            <form
              onSubmit={handleSubmitReview}
              className="w-full space-y-4 text-left"
            >
              <div className="space-y-1.5">
                <label className="text-[0.82rem] font-semibold text-slate-550 pl-0.5">
                  Review
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Enter review"
                  rows={4}
                  className="w-full bg-slate-50/50 border border-slate-200/70 rounded-xl px-4 py-3 text-[0.88rem] font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#09A6A4]/60 focus:bg-white transition-all resize-none shadow-inner"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  className="w-full max-w-[220px] py-3 rounded-xl bg-[#09A6A4] text-white text-[0.92rem] font-semibold shadow-md shadow-[#09A6A4]/25 hover:scale-[1.01] transition-transform"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SwapCompletedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-slate-400 font-bold">
          Loading summary...
        </div>
      }
    >
      <SwapCompletedContent />
    </Suspense>
  );
}
