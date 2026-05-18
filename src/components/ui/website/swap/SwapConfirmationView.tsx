"use client";

import React from "react";
import { GlassContainer } from "@/components/ui/GlassContainer";
import {
  ArrowLeft,
  ArrowDown,
  Shield,
  CheckCircle2,
  Star,
  Quote,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const SwapConfirmationView = ({
  onBack,
  from = "swap",
}: {
  onBack: () => void;
  from?: string;
}) => {
  const router = useRouter();

  // Create Counter Offer States
  const [showCounterOffer, setShowCounterOffer] = React.useState(false);
  const [offerAmount, setOfferAmount] = React.useState("150000.00");
  const [wantAmount, setWantAmount] = React.useState("7500.00");
  const [swapRate, setSwapRate] = React.useState("380");
  const [timing, setTiming] = React.useState("Select");
  const [note, setNote] = React.useState("");

  const [isOfferFocused, setIsOfferFocused] = React.useState(false);
  const [isWantFocused, setIsWantFocused] = React.useState(false);

  // Formatting helpers
  const formatCurrency = (val: string) => {
    if (!val) return "";
    const parts = val.replace(/,/g, "").split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const parseCurrency = (val: string) => {
    return val.replace(/,/g, "");
  };

  const handleOfferSubmit = () => {
    router.push("/chat/john-doe?offerCreated=true");
  };

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1200px] mx-auto w-full animate-in fade-in duration-500">
      <GlassContainer className="p-6 md:p-12 relative overflow-visible">
        {/* Back Button */}
        <button
          onClick={showCounterOffer ? () => setShowCounterOffer(false) : onBack}
          className="absolute top-6 left-6 w-11 h-11 rounded-full bg-slate-400/85 text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-10 animate-in fade-in duration-300 focus:outline-none"
        >
          <ArrowLeft size={20} />
        </button>

        {showCounterOffer ? (
          /* ========================================================= */
          /* CREATE COUNTER OFFER VIEW */
          /* ========================================================= */
          <div className="max-w-[700px] mx-auto w-full space-y-6 pt-4 animate-in fade-in duration-300">
            {/* Header Title */}
            <h2 className="text-center text-[1.4rem] font-bold text-slate-800 tracking-tight pb-2 pt-2">
              Create Counter Offer
            </h2>

            {/* Counter Offer Details Card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-5">
              <h3 className="text-center text-[1.12rem] font-bold text-slate-800 tracking-tight pb-2">
                Counter Offer Details
              </h3>

              {/* To : Bob Builder */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-[0.9rem] font-semibold text-slate-500 w-24 shrink-0">
                  To :
                </span>
                <input
                  type="text"
                  readOnly
                  value="Bob Builder"
                  className="w-full bg-slate-50/50 border border-slate-200/80 rounded-xl px-4 py-3.5 text-[0.88rem] font-medium text-slate-400 select-none focus:outline-none cursor-not-allowed"
                />
              </div>

              {/* I offer : PKR | 150,000.00 */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-[0.9rem] font-semibold text-slate-500 w-24 shrink-0">
                  I offer :
                </span>
                <div className="flex gap-3 w-full">
                  <div className="w-[120px] bg-slate-50/50 border border-slate-200/80 rounded-xl py-3.5 text-center text-[0.88rem] font-bold text-slate-700 select-none flex items-center justify-center">
                    PKR
                  </div>
                  <input
                    type="text"
                    value={
                      isOfferFocused ? offerAmount : formatCurrency(offerAmount)
                    }
                    onFocus={() => {
                      setIsOfferFocused(true);
                      setOfferAmount(parseCurrency(offerAmount));
                    }}
                    onBlur={() => {
                      setIsOfferFocused(false);
                      let finalVal = offerAmount;
                      if (finalVal && !finalVal.includes(".")) {
                        finalVal += ".00";
                      }
                      setOfferAmount(finalVal);
                    }}
                    onChange={(e) => {
                      const val = e.target.value;
                      const cleaned = val.replace(/[^0-9.]/g, "");
                      const parts = cleaned.split(".");
                      if (parts.length <= 2) {
                        setOfferAmount(cleaned);
                      }
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-[0.88rem] font-semibold text-slate-700 focus:outline-none focus:border-[#09A6A4]/60 transition-colors shadow-sm text-right"
                  />
                </div>
              </div>

              {/* I want : GBP | 7,500.00 */}
              <div className="flex items-center justify-between gap-4">
                <span className="text-[0.9rem] font-semibold text-slate-500 w-24 shrink-0">
                  I want :
                </span>
                <div className="flex gap-3 w-full">
                  <div className="w-[120px] bg-slate-50/50 border border-slate-200/80 rounded-xl py-3.5 text-center text-[0.88rem] font-bold text-slate-700 select-none flex items-center justify-center">
                    GBP
                  </div>
                  <input
                    type="text"
                    value={
                      isWantFocused ? wantAmount : formatCurrency(wantAmount)
                    }
                    onFocus={() => {
                      setIsWantFocused(true);
                      setWantAmount(parseCurrency(wantAmount));
                    }}
                    onBlur={() => {
                      setIsWantFocused(false);
                      let finalVal = wantAmount;
                      if (finalVal && !finalVal.includes(".")) {
                        finalVal += ".00";
                      }
                      setWantAmount(finalVal);
                    }}
                    onChange={(e) => {
                      const val = e.target.value;
                      const cleaned = val.replace(/[^0-9.]/g, "");
                      const parts = cleaned.split(".");
                      if (parts.length <= 2) {
                        setWantAmount(cleaned);
                      }
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-[0.88rem] font-semibold text-slate-700 focus:outline-none focus:border-[#09A6A4]/60 transition-colors shadow-sm text-right"
                  />
                </div>
              </div>

              {/* Proposed swap rate : 380 | PKR */}
              <div className="flex items-center justify-between gap-4 pt-1">
                <span className="text-[0.9rem] font-semibold text-slate-500 w-24 shrink-0 leading-tight">
                  Proposed swap rate :
                </span>
                <div className="flex gap-3 w-full">
                  <input
                    type="text"
                    value={swapRate}
                    onChange={(e) => {
                      const val = e.target.value;
                      const cleaned = val.replace(/[^0-9]/g, "");
                      setSwapRate(cleaned);
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-[0.88rem] font-semibold text-slate-700 focus:outline-none focus:border-[#09A6A4]/60 transition-colors shadow-sm text-center"
                  />
                  <div className="w-[120px] bg-slate-50/50 border border-slate-200/80 rounded-xl py-3.5 text-center text-[0.88rem] font-semibold text-slate-400 select-none flex items-center justify-center">
                    PKR
                  </div>
                </div>
              </div>

              {/* Market rate indicator & note */}
              <div className="space-y-1.5 pl-[112px] pt-1">
                <p className="text-[0.78rem] font-semibold text-slate-400">
                  (Market rate : 375 PKR)
                </p>
                <p className="text-[0.74rem] font-medium text-slate-400 leading-relaxed">
                  <span className="font-semibold text-slate-500">Note:</span>{" "}
                  Offering a swap rate above the market level increases the
                  likelihood of attracting swappers.
                </p>
              </div>
            </div>

            {/* Timing Dropdown */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-4">
              <div className="space-y-2">
                <label className="text-[0.88rem] font-semibold text-slate-700 block">
                  Timing
                </label>
                <div className="relative">
                  <select
                    value={timing}
                    onChange={(e) => setTiming(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-[0.88rem] font-semibold text-slate-600 focus:outline-none focus:border-[#09A6A4]/60 transition-colors shadow-sm appearance-none cursor-pointer pr-10"
                  >
                    <option value="Select">Select</option>
                    <option value="Immediate">Immediate (&lt; 1 hour)</option>
                    <option value="Same day">Same day (&lt; 24 hours)</option>
                    <option value="Within 2 days">Within 2 days</option>
                    <option value="Within 7 days">Within 7 days</option>
                  </select>
                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Note (Optional) */}
              <div className="space-y-2">
                <label className="text-[0.88rem] font-semibold text-slate-700 block">
                  Note (Optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Please enter your note"
                  rows={4}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-[0.88rem] font-medium text-slate-600 focus:outline-none focus:border-[#09A6A4]/60 transition-colors shadow-sm placeholder-slate-300 resize-none"
                />
              </div>
            </div>

            {/* Submit Counter Offer Button */}
            <div className="flex justify-center pt-2 w-full">
              <Button
                onClick={handleOfferSubmit}
                className="w-full py-4 rounded-2xl text-[1rem] font-bold bg-[#09A6A4] text-white shadow-xl shadow-[#09A6A4]/20 hover:scale-[1.01] transition-transform border-none focus:outline-none"
              >
                Submit
              </Button>
            </div>

            {/* Warn Banner at bottom */}
            <div className="flex items-center gap-3 p-4 bg-amber-50/40 border border-amber-100 rounded-2xl">
              <div className="w-8 h-8 rounded-full bg-amber-100/60 flex items-center justify-center text-amber-600 shrink-0 font-bold text-sm select-none">
                !
              </div>
              <p className="text-[0.74rem] font-semibold text-slate-500 leading-normal">
                Funds are transferred directly between Swappers. We do not hold
                your money.
              </p>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* SWAP CONFIRMATION MAIN VIEW */
          /* ========================================================= */
          <div className="space-y-5 max-w-[700px] mx-auto">
            {/* Card 1: User Profile Header Card */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/60 flex items-center gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.01)] animate-in fade-in slide-in-from-top-3 duration-300">
              <div className="relative shrink-0 w-11 h-11">
                <div className="w-full h-full rounded-full border border-white shadow-sm overflow-hidden flex items-center justify-center bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&w=80"
                    alt="John Doe"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Gold Verification Badge on Avatar Corner */}
                <div className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 bg-[#FFBF00] rounded-full border border-white flex items-center justify-center shadow-sm">
                  <Shield size={9} className="text-white fill-current" />
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-[1rem] font-bold text-slate-800 leading-tight">
                    John Doe
                  </h4>
                  <CheckCircle2
                    size={15}
                    className="text-green-500 fill-current"
                  />
                </div>
                <div className="flex items-center gap-1 text-[0.75rem] text-slate-400 font-semibold leading-none">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span>4.9 (128 reviews)</span>
                </div>
              </div>
            </div>

            {/* Card 2: Swap Confirmation Main Card */}
            <div className="bg-white rounded-4xl p-6 md:p-8 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-5 animate-in fade-in slide-in-from-top-4 duration-400">
              <h3 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pt-2">
                Swap Confirmation
              </h3>

              {/* I Will Receive Box */}
              <div className="flex items-center justify-between py-2 relative">
                <div className="space-y-1">
                  <span className="text-[0.75rem] font-bold text-slate-400 tracking-wider block">
                    I WILL RECEIVE
                  </span>
                  <h2 className="text-[2rem] md:text-[2.2rem] font-extrabold text-slate-800 leading-tight tracking-tight">
                    200 GBP
                  </h2>
                </div>
                <span className="flex items-center gap-2 px-3.5 py-1.5 bg-[#F8FAFC] border border-slate-100 rounded-full shadow-sm text-xs font-bold text-slate-700 select-none">
                  <svg
                    viewBox="0 0 74 39"
                    className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm border border-slate-100/50"
                  >
                    <rect width="74" height="39" fill="#ffffff" />
                    <rect width="74" height="3" y="0" fill="#b22234" />
                    <rect width="74" height="3" y="6" fill="#b22234" />
                    <rect width="74" height="3" y="12" fill="#b22234" />
                    <rect width="74" height="3" y="18" fill="#b22234" />
                    <rect width="74" height="3" y="24" fill="#b22234" />
                    <rect width="74" height="3" y="30" fill="#b22234" />
                    <rect width="74" height="3" y="36" fill="#b22234" />
                    <rect width="32" height="21" fill="#3c3b6e" />
                    <circle cx="4" cy="4" r="1" fill="#fff" />
                    <circle cx="10" cy="4" r="1" fill="#fff" />
                    <circle cx="16" cy="4" r="1" fill="#fff" />
                    <circle cx="22" cy="4" r="1" fill="#fff" />
                    <circle cx="28" cy="4" r="1" fill="#fff" />
                    <circle cx="7" cy="9" r="1" fill="#fff" />
                    <circle cx="13" cy="9" r="1" fill="#fff" />
                    <circle cx="19" cy="9" r="1" fill="#fff" />
                    <circle cx="25" cy="9" r="1" fill="#fff" />
                    <circle cx="4" cy="14" r="1" fill="#fff" />
                    <circle cx="10" cy="14" r="1" fill="#fff" />
                    <circle cx="16" cy="14" r="1" fill="#fff" />
                    <circle cx="22" cy="14" r="1" fill="#fff" />
                    <circle cx="28" cy="14" r="1" fill="#fff" />
                  </svg>
                  USD
                </span>
              </div>

              {/* Divider with circle arrow */}
              <div className="relative py-4 flex items-center justify-center">
                <div className="w-full border-t border-slate-100"></div>
                <div className="absolute w-10.5 h-10.5 rounded-full bg-linear-to-b from-[#4FD1C5] to-[#319795] text-white flex items-center justify-center shadow-lg shadow-[#4FD1C5]/20 z-10 border-4 border-white">
                  <ArrowDown size={18} />
                </div>
              </div>

              {/* I Will Give Box */}
              <div className="flex items-center justify-between py-2 relative">
                <div className="space-y-1">
                  <span className="text-[0.75rem] font-bold text-slate-400 tracking-wider block">
                    I WILL GIVE
                  </span>
                  <h2 className="text-[2rem] md:text-[2.2rem] font-extrabold text-[#09A6A4] leading-tight tracking-tight">
                    74,900 PKR
                  </h2>
                </div>
                <span className="flex items-center gap-2 px-3.5 py-1.5 bg-[#F8FAFC] border border-slate-100 rounded-full shadow-sm text-xs font-bold text-slate-700 select-none">
                  <svg
                    viewBox="0 0 30 20"
                    className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm border border-slate-100/50"
                  >
                    <rect width="30" height="20" fill="#115c30" />
                    <rect width="10" height="20" fill="#ffffff" />
                    <circle cx="20" cy="10" r="4.5" fill="#ffffff" />
                    <circle cx="21.5" cy="8.5" r="4.5" fill="#115c30" />
                    <polygon
                      points="21,7 22,8.5 23.5,8 22.5,9.5 23.5,11 22,10.5 21,12 21,10.5 19.5,10 20.5,9.5"
                      fill="#ffffff"
                    />
                  </svg>
                  PKR
                </span>
              </div>
            </div>

            {/* Card 3: Proposed swap rate, Required & Note */}
            <div className="bg-white rounded-4xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden space-y-0.5 animate-in fade-in slide-in-from-top-5 duration-500">
              {/* Row 1: Proposed swap rate */}
              <div className="bg-[#F8FAFC] px-6 py-5 flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="text-[0.92rem] font-semibold text-slate-500">
                    Proposed swap rate
                  </span>
                  <p className="text-[0.72rem] text-slate-400 leading-none">
                    (Market rate : 375 PKR)
                  </p>
                </div>
                <span className="text-[1rem] font-bold text-slate-800">
                  380 PKR
                </span>
              </div>

              {/* Row 2: Required */}
              <div className="px-6 py-5 flex justify-between items-center border-t border-slate-100/60">
                <span className="text-[0.92rem] font-semibold text-slate-500">
                  Required
                </span>
                <span className="text-[1rem] font-bold text-slate-800">
                  2 days
                </span>
              </div>

              {/* Row 3: Note from Swapper */}
              <div className="px-6 py-5 border-t border-slate-100/60 space-y-4">
                <span className="text-[0.92rem] font-semibold text-slate-500 block">
                  Note from Swapper
                </span>
                <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-100/50 flex gap-4 items-start shadow-inner">
                  <Quote
                    size={28}
                    className="text-slate-300 fill-slate-50 shrink-0 transform rotate-180"
                  />
                  <p className="text-[0.88rem] text-slate-600 font-medium leading-relaxed">
                    Need this swap urgently for a family matter. My funds are
                    ready in the US bank, looking for an immediate PKR transfer.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {from === "chat" ? (
              <div className="flex justify-center pt-4 max-w-[500px] mx-auto w-full animate-in fade-in slide-in-from-top-6 duration-600">
                <Link href="/swap/payment" className="w-full">
                  <Button className="w-full py-4 rounded-xl text-[1rem] font-bold bg-[#09A6A4] text-white shadow-xl shadow-[#09A6A4]/20 hover:scale-[1.01] transition-transform border-b-4 border-[#078d8b]">
                    Confirm
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex gap-4 w-full pt-4 max-w-[500px] mx-auto animate-in fade-in slide-in-from-top-6 duration-600">
                <Link href="/chat/bob-builder" className="flex-1">
                  <Button className="w-full py-4 rounded-xl text-[1rem] font-bold bg-[#09A6A4] text-white shadow-xl shadow-[#09A6A4]/20 hover:scale-[1.01] transition-transform">
                    Contact Swapper
                  </Button>
                </Link>
                <Button
                  onClick={() => setShowCounterOffer(true)}
                  className="flex-1 py-4 rounded-xl text-[1rem] font-bold bg-[#09A6A4] text-white shadow-xl shadow-[#09A6A4]/20 hover:scale-[1.01] transition-transform"
                >
                  Counter Offer
                </Button>
              </div>
            )}
          </div>
        )}
      </GlassContainer>
    </div>
  );
};
