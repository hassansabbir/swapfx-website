"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassContainer } from "@/components/ui/GlassContainer";
import {
  ArrowLeft,
  Check,
  UploadCloud,
  Camera,
  Image as ImageIcon,
  Info,
  ShieldAlert,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import CancelModal from "@/app/(website)/swap/swap-payment/components/CancelModal";

export default function ProofOfPaymentPage() {
  const router = useRouter();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancelSwapYes = () => {
    setShowCancelModal(false);
    router.push("/chat/bob-builder?offerCreated=true&cancelled=true");
  };

  const handleBack = () => {
    router.push("/swap/swap-payment");
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedFile) {
      setShowSuccessModal(true);
    }
  };

  const handleModalContinue = () => {
    router.push(
      `/swap/completed?file=${encodeURIComponent(uploadedFile || "")}`,
    );
  };

  // Steps component for Step 5
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
          const isCompleted = step.num < 5;
          const isActive = step.num === 5;

          return (
            <React.Fragment key={step.num}>
              {/* Connector line */}
              {index > 0 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded-full transition-colors duration-300 ${
                    step.num <= 5 ? "bg-[#09A6A4]" : "bg-slate-200"
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
        <IconButton
          onClick={handleBack}
          className="absolute left-2 md:-left-12 top-2 w-11 h-11 bg-slate-400/85 shadow-md z-30"
        >
          <ArrowLeft size={20} />
        </IconButton>

        {/* Proof details Card container */}
        <GlassContainer className="w-full overflow-hidden p-6 md:p-10 border border-white/50 bg-white/20 shadow-xl rounded-4xl flex flex-col relative space-y-4">
          {/* Close/Cross Button */}
          <IconButton
            onClick={() => router.push("/chat/bob-builder?offerCreated=true")}
            className="absolute top-6 right-6 shadow-lg z-30"
          >
            <X size={20} />
          </IconButton>

          <h2 className="text-[1.5rem] font-extrabold text-slate-800 text-center tracking-tight mt-8">
            Proof of Payment
          </h2>

          {/* Step Progress Tracker */}
          {renderSteps()}

          {/* Main upload view content */}
          <form
            onSubmit={handleSubmitProof}
            className="space-y-5 max-w-[720px] mx-auto w-full animate-in fade-in duration-400"
          >
            <div className="space-y-1">
              <h3 className="text-[1.12rem] font-extrabold text-slate-850 tracking-tight">
                Upload Proof of Payment
              </h3>
              <p className="text-[0.82rem] font-medium text-slate-500 leading-relaxed">
                To complete your currency swap, please upload a clear screenshot
                or photo of the bank transaction.
              </p>
            </div>

            {/* Hidden Real File Input Uploader */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {/* Dotted Upload Zone */}
            <div
              onClick={handleUploadClick}
              className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all ${
                uploadedFile
                  ? "border-emerald-450 bg-white shadow-sm"
                  : "border-slate-350 bg-white/50 hover:bg-white hover:border-[#09A6A4]"
              }`}
            >
              {uploadedFile ? (
                <div className="space-y-3 animate-in zoom-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto shadow-sm">
                    <Check size={26} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[0.92rem] font-extrabold text-slate-800 block">
                      {uploadedFile}
                    </span>
                    <span className="text-[0.72rem] font-bold text-slate-400 block uppercase">
                      Ready to submit • 2.4 MB
                    </span>
                  </div>
                  <button
                    onClick={removeFile}
                    className="px-4 py-1.5 bg-rose-50 text-rose-500 text-[0.78rem] font-bold rounded-lg hover:bg-rose-100 transition-colors z-20 relative"
                  >
                    Delete Receipt
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#E0F2FE] text-[#0ea5e9] flex items-center justify-center mx-auto shadow-sm">
                    <UploadCloud size={24} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[0.95rem] font-extrabold text-slate-800 block">
                      Tap to upload image
                    </span>
                    <span className="text-[0.75rem] font-bold text-slate-400 block">
                      Supports JPG, PNG (Max 5MB)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick camera/gallery upload buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleUploadClick}
                className="bg-white border border-slate-200/60 shadow-sm rounded-2xl py-3.5 flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors text-[0.88rem] font-bold text-slate-650"
              >
                <Camera size={16} className="text-slate-400" />
                Take Photo
              </button>
              <button
                type="button"
                onClick={handleUploadClick}
                className="bg-white border border-slate-200/60 shadow-sm rounded-2xl py-3.5 flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors text-[0.88rem] font-bold text-slate-650"
              >
                <ImageIcon size={16} className="text-slate-400" />
                Gallery
              </button>
            </div>

            {/* passive host disclaimer notice */}
            <div className="bg-[#E0F2FE]/45 border border-[#90CDF4]/60 rounded-2xl p-4 md:p-5 text-[0.8rem] text-slate-600 font-semibold leading-relaxed flex gap-3">
              <Info size={18} className="text-[#0EA5E9] shrink-0 mt-0.5" />
              <span>
                Please upload a clear photo or screenshot of the bank
                transaction to complete the swap. The platform operates as a
                passive host and does not verify bank documents.
              </span>
            </div>

            {/* Secure indicator label */}
            <div className="flex items-center justify-center gap-2 text-[0.7rem] font-bold text-slate-400 tracking-wider py-1 select-none">
              <ShieldAlert size={14} className="text-slate-350 fill-current" />
              SECURE & ENCRYPTED UPLOAD
            </div>

            {/* Submit Proof Button */}
            <div className="flex justify-center pt-2">
              <Button
                type="submit"
                disabled={!uploadedFile}
                className={`w-full${
                  uploadedFile
                    ? "bg-[#09A6A4] text-white shadow-[#09A6A4]/20 hover:scale-[1.01] border-[#078d8b]"
                    : "bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed"
                }`}
              >
                Submit Proof
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

      {/* CONFETTI SUCCESS MODAL DIALOG */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-6 md:p-10 max-w-[500px] w-full shadow-2xl relative flex flex-col items-center text-center space-y-6 animate-in zoom-in duration-300">
            {/* Circular Close Button */}
            <IconButton
              onClick={() => setShowSuccessModal(false)}
              variant="light"
              className="absolute right-4 top-4 w-9 h-9"
            >
              <X size={18} strokeWidth={2.5} />
            </IconButton>

            {/* Large check icon and confetti bursts */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Confetti pieces decoration */}
              <div className="absolute inset-0 select-none pointer-events-none scale-110">
                {/* 1 */}
                <div className="absolute top-1 left-3 w-2.5 h-1.5 bg-teal-400 rotate-12 rounded-full" />
                {/* 2 */}
                <div className="absolute top-2.5 right-4 w-2 h-2.5 bg-yellow-400 rotate-45 rounded-sm" />
                {/* 3 */}
                <div className="absolute bottom-2.5 left-4 w-2.5 h-1 bg-emerald-450 -rotate-45" />
                {/* 4 */}
                <div className="absolute bottom-3 right-5 w-1.5 h-3.5 bg-sky-400 rotate-90 rounded-full" />
                {/* 5 */}
                <div className="absolute top-1/2 -left-2 w-3 h-1.5 bg-pink-400 -rotate-12" />
                {/* 6 */}
                <div className="absolute top-1/3 -right-2 w-2.5 h-2.5 bg-emerald-400 rotate-45 rounded-full" />
              </div>

              {/* Central Check Circle */}
              <div className="w-20 h-20 rounded-full bg-[#09A6A4] flex items-center justify-center shadow-lg shadow-[#09A6A4]/25">
                <Check size={38} className="text-white" strokeWidth={3.5} />
              </div>
            </div>

            {/* Congratulatory Text */}
            <p className="text-[0.95rem] font-medium text-slate-600 leading-relaxed px-2">
              Thank you for uploading your proof of payment and completing the
              swap within the agreed time. Your proof is now available for the
              other swapper to review.
            </p>

            {/* Confirm Button */}
            <Button
              onClick={handleModalContinue}
              className="w-full max-w-[320px] py-3.5 rounded-2xl text-[1rem] font-bold bg-[#09A6A4] text-white shadow-xl shadow-[#09A6A4]/25 hover:scale-[1.01] transition-transform"
            >
              Confirm
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
