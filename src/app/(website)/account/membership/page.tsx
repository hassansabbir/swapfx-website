"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassContainer } from "@/components/ui/GlassContainer";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  Shield,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function MembershipFlowPage() {
  const router = useRouter();
  const [viewState, setViewState] = useState<
    | "silver"
    | "gold_details"
    | "subscription"
    | "payment"
    | "success"
    | "gold_active"
    | "cancel_confirm"
  >("silver");
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">(
    "monthly",
  );
  const [selectedPayment, setSelectedPayment] = useState<"stripe" | "razorpay">(
    "stripe",
  );

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1000px] mx-auto w-full animate-in fade-in duration-500">
      <GlassContainer className="p-6 md:p-12 relative bg-white/40 border border-white/60 shadow-2xl rounded-4xl flex flex-col justify-center min-h-[500px]">
        {/* Close Button (visible only in main views) */}
        {(viewState === "silver" ||
          viewState === "gold_active" ||
          viewState === "success") && (
          <button
            onClick={() => router.back()}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#949CA9] text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-20 focus:outline-none"
          >
            <X size={18} />
          </button>
        )}

        {/* Dynamic Views */}
        {viewState === "silver" ? (
          /* ========================================================= */
          /* 1. SILVER TIER MEMBERSHIP */
          /* ========================================================= */
          <div className="max-w-[650px] mx-auto w-full space-y-6 pt-2 animate-in fade-in duration-300">
            <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-3">
              Membership
            </h2>

            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-slate-200/60 shadow-[0_4px_25px_rgba(0,0,0,0.01)] flex flex-col items-center max-w-[550px] mx-auto">
              {/* Silver Badge */}
              <div className="w-16 h-16 rounded-full bg-slate-200/80 flex items-center justify-center mb-3 shadow-inner relative">
                <Shield size={32} className="text-[#949CA9] fill-[#B3B8C1]" />
              </div>

              <h3 className="text-[1.3rem] font-bold text-slate-600 mb-1">
                Silver
              </h3>
              <p className="text-[1.05rem] text-slate-700 font-medium mb-8">
                You're a Silver Member
              </p>

              {/* Features List */}
              <div className="w-full space-y-4 mb-10">
                {[
                  "Free membership tier with no monthly or annual fees",
                  "Trust-building profile status to strengthen your reputation on the platform",
                  "Up to 5 swaps per month with standard usage limits",
                  "Swap value up to £500 per swap",
                  "Access to the standard customer service queue for general support",
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="text-white fill-[#09A6A4] shrink-0 mt-0.5"
                    />
                    <span className="text-[0.9rem] text-slate-700 font-medium leading-snug">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Upgrade Button */}
              <Button
                onClick={() => setViewState("gold_details")}
                className="w-full"
              >
                Upgrade to Gold
              </Button>
            </div>
          </div>
        ) : viewState === "gold_details" ? (
          /* ========================================================= */
          /* 2. GOLD TIER UPGRADE DETAILS */
          /* ========================================================= */
          <div className="max-w-[750px] mx-auto w-full space-y-6 pt-4 relative animate-in fade-in duration-300">
            {/* Back circle chevron button */}
            <button
              onClick={() => setViewState("silver")}
              className="absolute top-2 left-0 w-10 h-10 rounded-full bg-[#949CA9] text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-20 focus:outline-none"
            >
              <ChevronLeft size={22} />
            </button>

            <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-3">
              Membership
            </h2>

            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-slate-200/60 shadow-[0_4px_25px_rgba(0,0,0,0.01)] flex flex-col items-center max-w-[650px] mx-auto">
              {/* Gold Badge */}
              <div className="w-16 h-16 rounded-full bg-amber-100/80 flex items-center justify-center mb-3 shadow-inner relative">
                <Shield size={32} className="text-amber-500 fill-amber-400" />
              </div>

              <h3 className="text-[1.3rem] font-bold text-[#09A6A4] mb-1">
                Gold
              </h3>
              <p className="text-[1.05rem] text-slate-800 font-bold mb-6">
                Become a Gold member
              </p>

              {/* Pricing Text */}
              <div className="text-center mb-8 space-y-1">
                <div className="flex items-end justify-center gap-1">
                  <span className="text-[1.8rem] font-bold text-[#09A6A4]">
                    £2.99
                  </span>
                  <span className="text-[0.9rem] text-slate-500 font-medium pb-1.5">
                    / month
                  </span>
                </div>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-[1.1rem] font-bold text-[#09A6A4]">
                    £33.99
                  </span>
                  <span className="text-[0.85rem] text-slate-500 font-medium pb-0.5">
                    / year
                  </span>
                </div>
              </div>

              {/* Features List */}
              <div className="w-full space-y-4 mb-10">
                {[
                  "Enhanced trust & reputation badge for increased credibility across the platform",
                  "3 free swaps each month with full Safety Shield protection included",
                  "Higher monthly swap allowance — up to 10 swaps per month",
                  "Increased swap value limit — exchange up to £1,500 per swap",
                  "Flexible membership billing — choose monthly or annual plans",
                  "Priority customer support queue for faster issue resolution",
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="text-white fill-[#09A6A4] shrink-0 mt-0.5"
                    />
                    <span className="text-[0.9rem] text-slate-700 font-medium leading-snug">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Upgrade Button */}
              <Button
                onClick={() => setViewState("subscription")}
                className="w-full"
              >
                Upgrade to Gold
              </Button>
            </div>
          </div>
        ) : viewState === "subscription" ? (
          /* ========================================================= */
          /* 3. SUBSCRIPTION CHECKOUT */
          /* ========================================================= */
          <div className="max-w-[750px] mx-auto w-full space-y-6 pt-4 relative animate-in fade-in duration-300">
            {/* Back circle chevron button */}
            <button
              onClick={() => setViewState("gold_details")}
              className="absolute top-2 left-0 w-10 h-10 rounded-full bg-[#949CA9] text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-20 focus:outline-none"
            >
              <ChevronLeft size={22} />
            </button>

            <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-2">
              Membership
            </h2>

            <div className="max-w-[650px] mx-auto w-full space-y-5">
              <div className="space-y-1">
                <h3 className="text-[1.1rem] font-bold text-slate-800">
                  Choose your subscription plan
                </h3>
                <p className="text-[0.85rem] text-slate-500 font-medium">
                  Select monthly or annual billing for your Gold membership
                </p>
              </div>

              {/* Plan Selectors */}
              <div className="space-y-4">
                {/* Monthly Box */}
                <div
                  onClick={() => setSelectedPlan("monthly")}
                  className={`relative p-5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    selectedPlan === "monthly"
                      ? "border-[#09A6A4] bg-[#09A6A4]/5 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-slate-800 text-[1.05rem]">
                        Monthly
                      </h4>
                      <p className="text-[0.8rem] text-slate-500 font-medium">
                        Billed monthly
                      </p>
                    </div>
                    <div className="flex items-end gap-1.5">
                      <span className="text-[1.3rem] font-bold text-[#09A6A4]">
                        £2.99
                      </span>
                      <span className="text-[0.8rem] text-slate-500 font-medium pb-1">
                        per month
                      </span>
                    </div>
                  </div>
                  {selectedPlan === "monthly" ? (
                    <CheckCircle2
                      size={24}
                      className="text-white fill-[#09A6A4]"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-slate-200" />
                  )}
                </div>

                {/* Yearly Box */}
                <div
                  onClick={() => setSelectedPlan("yearly")}
                  className={`relative p-5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between mt-6 ${
                    selectedPlan === "yearly"
                      ? "border-[#09A6A4] bg-[#09A6A4]/5 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  {/* Save 5% Badge */}
                  <div className="absolute -top-3.5 right-6 bg-[#00C853] text-white text-[0.75rem] font-bold px-3 py-1 rounded-full shadow-sm z-10">
                    Save 5%
                  </div>

                  <div className="space-y-2">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-slate-800 text-[1.05rem]">
                        Yearly
                      </h4>
                      <p className="text-[0.8rem] text-slate-500 font-medium">
                        Billed annually
                      </p>
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-end gap-1.5">
                        <span className="text-[1.3rem] font-bold text-[#09A6A4]">
                          £33.99
                        </span>
                        <span className="text-[0.8rem] text-slate-500 font-medium pb-1">
                          per year
                        </span>
                      </div>
                      <p className="text-[0.75rem] text-slate-400 font-medium">
                        £2.83/month when billed annually
                      </p>
                    </div>
                  </div>
                  {selectedPlan === "yearly" ? (
                    <CheckCircle2
                      size={24}
                      className="text-white fill-[#09A6A4]"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-slate-200" />
                  )}
                </div>
              </div>

              {/* Important Notes Box */}
              <div className="bg-[#EBF5FF] border border-[#BFDBFE] rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <AlertCircle size={18} className="text-[#2563EB]" />
                  <span className="font-bold text-[#1E3A8A] text-[0.85rem]">
                    Important Notes:
                  </span>
                </div>
                <ul className="list-disc pl-5 space-y-1.5 text-[0.8rem] text-[#1E40AF] font-medium leading-relaxed">
                  <li>
                    Refunds for cancelled annual memberships are issued based on
                    the remaining unused months.
                  </li>
                  <li>
                    Subscription starts immediately and payments are collected
                    on the same date each month or year.
                  </li>
                  <li>
                    Failure to pay the subscription fee will result in automatic
                    cancellation of Gold membership after 14 days.
                  </li>
                  <li>
                    Account will be downgraded to Silver if payment is missed.
                  </li>
                  <li>
                    Missed payments can be settled within 14 days to bring your
                    account up to date and restore benefits.
                  </li>
                </ul>
              </div>

              {/* Order Summary Table */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 mt-4 space-y-4 shadow-sm">
                <div className="flex justify-between items-center text-[0.85rem]">
                  <span className="text-slate-500 font-medium">Plan</span>
                  <span className="font-bold text-slate-800">
                    Gold Membership
                  </span>
                </div>
                <div className="flex justify-between items-center text-[0.85rem]">
                  <span className="text-slate-500 font-medium">
                    Billing Cycle
                  </span>
                  <span className="font-bold text-slate-800">
                    {selectedPlan === "monthly" ? "Monthly" : "Yearly"}
                  </span>
                </div>
                <div className="h-px w-full bg-slate-100" />
                <div className="flex justify-between items-end">
                  <span className="font-bold text-slate-800 text-[0.95rem]">
                    Total
                  </span>
                  <div className="text-right">
                    <div className="text-[1.4rem] font-bold text-[#09A6A4] leading-none">
                      {selectedPlan === "monthly" ? "£2.99" : "£33.99"}
                    </div>
                    <div className="text-[0.75rem] text-slate-400 font-medium mt-1">
                      {selectedPlan === "monthly" ? "per month" : "per year"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Subscribe Button */}
              <div className="pt-3 pb-2 flex justify-center">
                <Button
                  onClick={() => setViewState("payment")}
                  className="w-full"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        ) : viewState === "payment" ? (
          /* ========================================================= */
          /* 4. PAYMENT METHOD */
          /* ========================================================= */
          <div className="max-w-[750px] mx-auto w-full space-y-6 pt-4 relative animate-in fade-in duration-300">
            <button
              onClick={() => setViewState("subscription")}
              className="absolute top-2 left-0 w-10 h-10 rounded-full bg-[#949CA9] text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-20 focus:outline-none"
            >
              <ChevronLeft size={22} />
            </button>

            <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-3">
              Membership
            </h2>

            <div className="max-w-[500px] mx-auto w-full space-y-5">
              <h3 className="font-bold text-slate-800 text-[1rem]">
                Payment Method
              </h3>

              <div className="space-y-3">
                {/* Stripe Option */}
                <div
                  onClick={() => setSelectedPayment("stripe")}
                  className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-4 ${
                    selectedPayment === "stripe"
                      ? "border-[#09A6A4] bg-white shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === "stripe" ? "border-[#09A6A4]" : "border-slate-300"}`}
                  >
                    {selectedPayment === "stripe" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#09A6A4]" />
                    )}
                  </div>
                  <div className="font-bold text-[#635BFF] text-[1.1rem] tracking-tight flex items-center">
                    <span className="text-[1.3rem] mr-1">stripe</span>
                  </div>
                </div>

                {/* Razorpay Option */}
                <div
                  onClick={() => setSelectedPayment("razorpay")}
                  className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-4 ${
                    selectedPayment === "razorpay"
                      ? "border-[#09A6A4] bg-white shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPayment === "razorpay" ? "border-[#09A6A4]" : "border-slate-300"}`}
                  >
                    {selectedPayment === "razorpay" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#09A6A4]" />
                    )}
                  </div>
                  <div className="font-bold text-[#02042B] text-[1.1rem] tracking-tight flex items-center">
                    <span className="text-[#3395FF] mr-1.5">⚡</span> Razorpay
                  </div>
                </div>
              </div>

              <div className="pt-6 flex justify-center">
                <Button
                  onClick={() => setViewState("success")}
                  className="w-full"
                >
                  Pay
                </Button>
              </div>
            </div>
          </div>
        ) : viewState === "success" ? (
          /* ========================================================= */
          /* 5. SUCCESS SCREEN */
          /* ========================================================= */
          <div className="max-w-[650px] mx-auto w-full space-y-6 pt-10 pb-4 animate-in zoom-in-95 duration-500 flex flex-col items-center text-center relative">
            {/* Confetti / Success Icon */}
            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
              {/* Fake confetti dots (pure CSS for mockup) */}
              <div className="absolute inset-0 w-full h-full animate-spin-slow">
                <div className="absolute top-0 left-1/2 w-1.5 h-4 bg-[#09A6A4] rounded-full rotate-45" />
                <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-amber-400 rounded-full" />
                <div className="absolute top-1/4 right-0 w-1.5 h-3 bg-blue-400 rounded-full -rotate-12" />
                <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-[#09A6A4] rounded-full" />
                <div className="absolute top-1/3 left-0 w-2 h-2 bg-pink-400 rounded-full" />
              </div>
              <div className="w-24 h-24 bg-[#09A6A4] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(9,166,164,0.3)] z-10">
                <Check className="text-white w-12 h-12" strokeWidth={4} />
              </div>
            </div>

            <h2 className="text-[1.2rem] font-bold text-slate-800 tracking-tight max-w-[350px]">
              Welcome to Gold! Your account is now ready.
            </h2>

            <p className="text-[0.95rem] text-slate-500 font-medium max-w-[400px] leading-relaxed mb-8">
              Enjoy free swaps, higher limits, better rates and faster matches.
            </p>

            <button
              onClick={() => setViewState("gold_active")}
              className="w-full max-w-[280px] py-3.5 mt-4 rounded-lg text-[0.95rem] font-bold bg-[#09A6A4] text-white shadow-lg shadow-[#09A6A4]/20 hover:scale-[1.02] transition-transform"
            >
              Continue
            </button>
          </div>
        ) : viewState === "gold_active" ? (
          /* ========================================================= */
          /* 6. GOLD ACTIVE (CANCEL START) */
          /* ========================================================= */
          <div className="max-w-[750px] mx-auto w-full space-y-6 pt-2 animate-in fade-in duration-300">
            <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-3">
              Membership
            </h2>

            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-slate-200/60 shadow-[0_4px_25px_rgba(0,0,0,0.01)] flex flex-col items-center max-w-[650px] mx-auto">
              <div className="w-16 h-16 rounded-full bg-amber-100/80 flex items-center justify-center mb-3 shadow-inner relative">
                <Shield size={32} className="text-amber-500 fill-amber-400" />
              </div>

              <h3 className="text-[1.3rem] font-bold text-[#09A6A4] mb-1">
                Gold
              </h3>
              <p className="text-[1.05rem] text-slate-800 font-bold mb-6">
                Become a Gold member
              </p>

              <div className="text-center mb-8 space-y-1">
                <div className="flex items-end justify-center gap-1">
                  <span className="text-[1.8rem] font-bold text-[#09A6A4]">
                    £2.99
                  </span>
                  <span className="text-[0.9rem] text-slate-500 font-medium pb-1.5">
                    / month
                  </span>
                </div>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-[1.1rem] font-bold text-[#09A6A4]">
                    £33.99
                  </span>
                  <span className="text-[0.85rem] text-slate-500 font-medium pb-0.5">
                    / year
                  </span>
                </div>
              </div>

              <div className="w-full space-y-4 mb-10">
                {[
                  "Enhanced trust & reputation badge for increased credibility across the platform",
                  "3 free swaps each month with full Safety Shield protection included",
                  "Higher monthly swap allowance — up to 10 swaps per month",
                  "Increased swap value limit — exchange up to £1,500 per swap",
                  "Flexible membership billing — choose monthly or annual plans",
                  "Priority customer support queue for faster issue resolution",
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="text-white fill-[#09A6A4] shrink-0 mt-0.5"
                    />
                    <span className="text-[0.9rem] text-slate-700 font-medium leading-snug">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setViewState("cancel_confirm")}
                className="w-full max-w-[320px] py-3.5 rounded-lg text-[0.95rem] font-bold bg-[#09A6A4] text-white shadow-lg shadow-[#09A6A4]/20 hover:scale-[1.02] transition-transform"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : viewState === "cancel_confirm" ? (
          /* ========================================================= */
          /* 7. CANCEL CONFIRMATION */
          /* ========================================================= */
          <div className="max-w-[750px] mx-auto w-full space-y-6 pt-4 relative animate-in fade-in duration-300">
            <button
              onClick={() => setViewState("gold_active")}
              className="absolute top-2 left-0 w-10 h-10 rounded-full bg-[#949CA9] text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-20 focus:outline-none"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="max-w-[650px] mx-auto w-full space-y-6 pt-10">
              <div className="space-y-3">
                <h3 className="text-[1.25rem] font-bold text-slate-800">
                  Cancel Gold membership?
                </h3>
                <p className="text-[0.9rem] text-slate-600 font-medium leading-relaxed">
                  We're sorry to see you go. If you cancel, you'll lose access
                  to Gold benefits after your current billing period ends on{" "}
                  <span className="font-bold">April 17, 2026</span>.
                </p>
              </div>

              {/* Warning Box */}
              <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <AlertCircle size={18} className="text-[#DC2626]" />
                  <span className="font-bold text-[#991B1B] text-[0.9rem]">
                    After April 17, 2026, you'll lose:
                  </span>
                </div>
                <div className="space-y-2.5">
                  {[
                    "Enhanced trust badge",
                    "3 free swaps with Safety Shield",
                    "Higher swap limits (10/month, £1,500/swap)",
                    "Priority customer support",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <X size={16} strokeWidth={3} className="text-[#DC2626]" />
                      <span className="text-[0.85rem] text-[#991B1B] font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Check size={18} strokeWidth={3} className="text-slate-500" />
                  <span className="font-bold text-slate-800 text-[0.9rem]">
                    You'll still have Silver membership:
                  </span>
                </div>
                <div className="space-y-2.5">
                  {[
                    "Free membership tier",
                    "Up to 5 swaps per month",
                    "Swap value up to £500",
                    "Standard customer service",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2
                        size={16}
                        className="text-slate-200 fill-slate-400"
                      />
                      <span className="text-[0.85rem] text-slate-600 font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-4 flex flex-col md:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setViewState("gold_active")}
                  className="w-full md:w-auto px-10 py-3.5 rounded-lg text-[0.9rem] font-bold bg-[#09A6A4] text-white shadow-lg shadow-[#09A6A4]/20 hover:scale-[1.02] transition-transform"
                >
                  Keep Gold Membership
                </button>
                <button
                  onClick={() => setViewState("silver")}
                  className="w-full md:w-auto px-10 py-3.5 rounded-lg text-[0.9rem] font-bold bg-white text-[#09A6A4] border-2 border-[#09A6A4] hover:bg-slate-50 transition-colors"
                >
                  Continue Cancellation
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </GlassContainer>
    </div>
  );
}
