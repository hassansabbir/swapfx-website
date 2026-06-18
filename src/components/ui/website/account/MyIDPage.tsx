"use client";

import React, { useState } from "react";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { ChevronLeft, Info, AlertCircle, Globe, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MyIDPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<"info" | "location">("info");
  const [selectedLocation, setSelectedLocation] = useState<
    "india" | "other" | ""
  >("");

  const handleContinue = () => {
    if (selectedLocation === "india") {
      router.push("/account/my-id/india");
    } else if (selectedLocation === "other") {
      router.push("/account/my-id/upload");
    }
  };

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1000px] mx-auto w-full animate-in fade-in duration-700">
      <GlassContainer className="p-6 md:p-12 relative overflow-visible">
        {/* Back Button */}
        <IconButton
          onClick={() => {
            if (step === "location") {
              setStep("info");
            } else {
              router.push("/account");
            }
          }}
          className="absolute top-6 left-6"
        >
          <ChevronLeft size={24} />
        </IconButton>

        <div className="max-w-[550px] mx-auto space-y-8">
          <h1 className="text-center text-[1.8rem] font-bold text-slate-800 tracking-tight mb-4">
            My ID
          </h1>

          {step === "info" ? (
            /* ========================================================= */
            /* STEP 1: INITIAL INFORMATION */
            /* ========================================================= */
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Identity Verification Card */}
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
                <h3 className="text-center text-[1.1rem] font-bold text-slate-800">
                  Identity Verification
                </h3>

                <div className="flex items-center gap-3">
                  <span className="text-[0.95rem] font-bold text-slate-700">
                    Status:
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#DC2626] rounded-full text-white text-[0.85rem] font-bold">
                    <AlertCircle size={14} />
                    Not Verified
                  </div>
                </div>

                <p className="text-slate-500 text-[0.9rem] leading-relaxed">
                  Verification helps keep your account secure and unlocks full
                  access to all features.
                </p>
              </div>

              {/* What to expect Card */}
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center gap-2">
                  <Info size={22} className="text-slate-400" />
                  <h3 className="text-[1.1rem] font-bold text-slate-800">
                    What to expect
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#E0F7F6] text-[#09A6A4] flex items-center justify-center font-bold text-sm shrink-0">
                      1
                    </div>
                    <p className="text-slate-600 text-[0.95rem] leading-relaxed font-medium">
                      You will be required to take clear photo of your ID.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#E0F7F6] text-[#09A6A4] flex items-center justify-center font-bold text-sm shrink-0">
                      2
                    </div>
                    <p className="text-slate-600 text-[0.95rem] leading-relaxed font-medium">
                      After submitting photo of the ID, you will need to
                      complete facial verification to finish the identity check.
                    </p>
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <div className="flex justify-center pt-4">
                <Button onClick={() => setStep("location")} className="w-full">
                  Start ID Verification
                </Button>
              </div>
            </div>
          ) : (
            /* ========================================================= */
            /* STEP 2: COUNTRY LOCATION SELECTOR */
            /* ========================================================= */
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
                <div className="text-center space-y-1.5">
                  <h3 className="text-[1.15rem] font-bold text-slate-800">
                    Select Document Country
                  </h3>
                  <p className="text-[0.88rem] text-slate-400 font-medium">
                    Choose the region that issued your identity document
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {/* India Option Card */}
                  <div
                    onClick={() => setSelectedLocation("india")}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 hover:bg-slate-50/50 ${
                      selectedLocation === "india"
                        ? "border-[#09A6A4] bg-[#E0F7F6]/10 shadow-[0_4px_15px_rgba(9,166,164,0.08)]"
                        : "border-slate-200/80 bg-white"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold shrink-0 shadow-sm border ${
                        selectedLocation === "india"
                          ? "bg-[#E0F7F6]/60 border-[#09A6A4]/20"
                          : "bg-slate-50 border-slate-100"
                      }`}
                    >
                      🇮🇳
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.98rem] font-bold text-slate-800 leading-tight">
                        India
                      </p>
                      <p className="text-[0.78rem] text-slate-400 font-semibold leading-normal pt-0.5">
                        Verify using Aadhaar, PAN Card, or Passport
                      </p>
                    </div>
                  </div>

                  {/* Other Countries Option Card */}
                  <div
                    onClick={() => setSelectedLocation("other")}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 hover:bg-slate-50/50 ${
                      selectedLocation === "other"
                        ? "border-[#09A6A4] bg-[#E0F7F6]/10 shadow-[0_4px_15px_rgba(9,166,164,0.08)]"
                        : "border-slate-200/80 bg-white"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-sm border ${
                        selectedLocation === "other"
                          ? "bg-[#E0F7F6]/60 border-[#09A6A4]/20 text-[#09A6A4]"
                          : "bg-slate-50 border-slate-100 text-slate-400"
                      }`}
                    >
                      <Globe size={24} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.98rem] font-bold text-slate-800 leading-tight">
                        Other Countries
                      </p>
                      <p className="text-[0.78rem] text-slate-400 font-semibold leading-normal pt-0.5">
                        Verify using Passport, Driver's License, or National ID
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleContinue}
                  disabled={selectedLocation === ""}
                  className={`w-full${
                    selectedLocation !== ""
                      ? "bg-[#09A6A4] text-white shadow-[#09A6A4]/20 hover:scale-[1.01] cursor-pointer"
                      : "bg-slate-200 text-slate-400 shadow-none cursor-not-allowed"
                  }`}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}
        </div>
      </GlassContainer>
    </div>
  );
};

export default MyIDPage;
