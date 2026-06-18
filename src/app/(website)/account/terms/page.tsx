"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { IconButton } from "@/components/ui/IconButton";
import { ArrowLeft, ChevronRight, FileText, Shield, X } from "lucide-react";

export default function TermsPage() {
  const router = useRouter();
  const [viewState, setViewState] = useState<"menu" | "terms" | "privacy">("menu");

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1000px] mx-auto w-full animate-in fade-in duration-500">
      <GlassContainer className="p-6 md:p-12 relative bg-white/40 border border-white/60 shadow-2xl rounded-4xl flex flex-col justify-center">
        {/* Close Button (visible only in main menu) */}
        {viewState === "menu" && (
          <IconButton
            onClick={() => router.back()}
            className="absolute top-6 right-6 w-9 h-9 bg-slate-400/80 shadow-md z-20"
          >
            <X size={18} />
          </IconButton>
        )}

        {/* Dynamic Views rendering sequentially */}
        {viewState === "menu" ? (
          /* ========================================================= */
          /* 1. OPTIONS MENU SELECTOR CARD */
          /* ========================================================= */
          <div className="max-w-[650px] mx-auto w-full space-y-6 animate-in fade-in duration-300">
            {/* Header Title */}
            <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-3">
              Terms
            </h2>

            {/* Selector Options Box */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_4px_25px_rgba(0,0,0,0.01)] overflow-hidden divide-y divide-slate-100">
              {/* Option 1: Terms & Conditions */}
              <button
                onClick={() => setViewState("terms")}
                className="w-full p-5 flex items-center justify-between hover:bg-slate-50/50 transition-all text-left focus:outline-none group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 group-hover:text-[#09A6A4] group-hover:bg-[#E0F2FE]/45 transition-colors border border-slate-100 shadow-xs">
                    <FileText size={18} />
                  </div>
                  <span className="text-[0.92rem] font-semibold text-slate-700 tracking-tight group-hover:text-slate-900 transition-colors">
                    Terms & Conditions
                  </span>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-[#09A6A4] transition-colors" />
              </button>

              {/* Option 2: Privacy Policy */}
              <button
                onClick={() => setViewState("privacy")}
                className="w-full p-5 flex items-center justify-between hover:bg-slate-50/50 transition-all text-left focus:outline-none group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 group-hover:text-[#09A6A4] group-hover:bg-[#E0F2FE]/45 transition-colors border border-slate-100 shadow-xs">
                    <Shield size={18} />
                  </div>
                  <span className="text-[0.92rem] font-semibold text-slate-700 tracking-tight group-hover:text-slate-900 transition-colors">
                    Privacy Policy
                  </span>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-[#09A6A4] transition-colors" />
              </button>
            </div>
          </div>
        ) : viewState === "terms" ? (
          /* ========================================================= */
          /* 2. TERMS & CONDITIONS DETAILED VIEW */
          /* ========================================================= */
          <div className="max-w-[750px] mx-auto w-full space-y-5 pt-8 relative animate-in fade-in duration-300">
            {/* Back circle arrow button in top left */}
            <IconButton
              onClick={() => setViewState("menu")}
              className="absolute top-0 left-0 w-9 h-9 bg-slate-400/80 shadow-md z-20"
            >
              <ArrowLeft size={18} />
            </IconButton>

            {/* Header Title */}
            <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-3">
              Terms & Conditions
            </h2>

            {/* Policy detailed texts container card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/60 shadow-[0_4px_25px_rgba(0,0,0,0.01)] text-[0.88rem] leading-relaxed text-slate-600 font-medium space-y-5">
              <p>
                By accessing or using the{" "}
                <span className="text-[#09A6A4] font-bold font-sans">passa</span>{" "}
                application, you agree to comply with and be bound by the following
                Terms & Conditions. If you do not agree with these terms, you must
                not access or use the App.
              </p>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-800">1. Acceptance of Terms</h4>
                <p>
                  By creating an account, signing in, or using any feature of the App,
                  you confirm that you have read, understood, and agreed to these Terms &
                  Conditions, along with any applicable laws and regulations.
                </p>
                <p className="font-semibold text-slate-800 pt-1">
                  Acceptance of these terms is mandatory before accessing the App.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-800">2. Swapper Roles</h4>
                <p>
                  <span className="text-[#09A6A4] font-bold font-sans">passa</span> is a B2B platform
                  and supports the following Swapper roles:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 pt-1">
                  <li>Super Admin (Platform Owner)</li>
                  <li>Grocery markets (Customers/Buyers)</li>
                  <li>Suppliers/Dealers (Sellers)</li>
                </ul>
                <p className="pt-2">
                  Each role has defined permissions and limitations. Swappers must operate
                  strictly within the scope of their assigned role. Unauthorized access or
                  misuse of features is prohibited.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-800">3. Account Registration & Security</h4>
                <p>
                  Swappers must provide accurate, complete, and up-to-date information
                  during registration.
                </p>
                <p>
                  You are responsible for maintaining the confidentiality of your login
                  credentials.
                </p>
                <p>
                  Any activity performed through your account will be considered your
                  responsibility.
                </p>
                <p>
                  <span className="text-[#09A6A4] font-bold font-sans">passa</span> is not liable for
                  losses caused by unauthorized access due to Swapper negligence.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-800">4. Product Listings & Validation</h4>
                <p>
                  Suppliers submit product details (including pricing and bulk pricing) for
                  approval.
                </p>
                <p>
                  All product listings are reviewed and validated by the Super Admin before
                  being made available on the platform.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* 3. PRIVACY POLICY DETAILED VIEW */
          /* ========================================================= */
          <div className="max-w-[750px] mx-auto w-full space-y-5 pt-8 relative animate-in fade-in duration-300">
            {/* Back circle arrow button in top left */}
            <IconButton
              onClick={() => setViewState("menu")}
              className="absolute top-0 left-0 w-9 h-9 bg-slate-400/80 shadow-md z-20"
            >
              <ArrowLeft size={18} />
            </IconButton>

            {/* Header Title */}
            <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-3">
              Privacy Policy
            </h2>

            {/* Policy detailed texts container card */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/60 shadow-[0_4px_25px_rgba(0,0,0,0.01)] text-[0.88rem] leading-relaxed text-slate-650 font-medium space-y-5">
              <h4 className="font-bold text-slate-800 tracking-tight">
                passa – B2B Order Management Platform
              </h4>

              <p>
                Your privacy is important to us. This Privacy Policy explains how{" "}
                <span className="text-[#09A6A4] font-bold font-sans">passa</span> (“App”, “Platform”,
                “we”, “our”) collects, uses, stores, and protects your information when
                you use our B2B application and services.
              </p>

              <p className="font-semibold text-slate-800">
                By accessing or using the App, you agree to the collection and use of information
                as described in this Privacy Policy.
              </p>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-800">1. Information We Collect</h4>
                
                <div className="space-y-1.5 pl-2">
                  <h5 className="font-semibold text-slate-700">a. Personal & Business Information</h5>
                  <ul className="list-disc pl-5 space-y-1 text-slate-500">
                    <li>Full name</li>
                    <li>Phone number</li>
                    <li>Email address</li>
                    <li>Business name & address</li>
                    <li>Account credentials</li>
                    <li>Role type (Super Admin, Supplier, Grocery market)</li>
                  </ul>
                </div>

                <div className="space-y-1.5 pl-2 pt-2">
                  <h5 className="font-semibold text-slate-700">b. Usage & Technical Information</h5>
                  <ul className="list-disc pl-5 space-y-1 text-slate-500">
                    <li>App activity (pages visited, actions taken)</li>
                    <li>Order interactions and preferences</li>
                    <li>Device information and log data</li>
                    <li>Language and region settings</li>
                  </ul>
                </div>

                <div className="space-y-1.5 pl-2 pt-2">
                  <h5 className="font-semibold text-slate-700">c. Transaction & Order Information</h5>
                  <p className="text-slate-500 pl-1">
                    Details of payment histories, transaction timelines, and ordered listings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </GlassContainer>
    </div>
  );
}
