"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { IconButton } from "@/components/ui/IconButton";
import { ArrowLeft, X } from "lucide-react";

// Sub-components import
import ActivePaymentView from "./components/ActivePaymentView";
import ExpiredPaymentView from "./components/ExpiredPaymentView";
import DisputeForm from "./components/DisputeForm";
import DisputeSubmittedView from "./components/DisputeSubmittedView";
import DisputeDetailsView from "./components/DisputeDetailsView";
import ExtensionModal from "./components/ExtensionModal";
import CancelModal from "./components/CancelModal";

type DisputeStep = "none" | "form" | "submitted" | "details";

export default function SwapPaymentPage() {
  const router = useRouter();

  // Interactive checkout states
  const [paymentDone, setPaymentDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("reinstated") === "true") {
        return { minutes: 30, seconds: 0 };
      }
    }
    return { minutes: 9, seconds: 12 };
  });
  const [customNote] = useState(
    "zxiahsfoihdoifoisajdpojaopskkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkasdasdf"
  );
  const [showExtensionModal, setShowExtensionModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [disputeStep, setDisputeStep] = useState<DisputeStep>("none");
  const [disputeReason, setDisputeReason] = useState("");
  const [disputeDescription, setDisputeDescription] = useState("");
  const [disputeProofFile, setDisputeProofFile] = useState<File | null>(null);

  const handleRequestExtensionYes = () => {
    setTimeLeft({ minutes: 0, seconds: 0 });
    setShowExtensionModal(false);
  };

  const handleCancelSwapYes = () => {
    setShowCancelModal(false);
    router.push("/chat/bob-builder?offerCreated=true&cancelled=true");
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

  const isExpired = timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1200px] mx-auto w-full animate-in fade-in duration-500">
      <div className="relative flex items-center justify-center min-h-[85vh]">
        {/* Circle Back Button */}
        <IconButton
          onClick={handleBack}
          className="absolute -left-4 md:-left-12 top-2 w-11 h-11 bg-slate-400/85 shadow-md z-30"
        >
          <ArrowLeft size={20} />
        </IconButton>

        {/* Swap Payment Container */}
        <GlassContainer className="w-full overflow-hidden p-6 md:p-10 border border-white/50 bg-white/20 shadow-xl rounded-4xl flex flex-col relative space-y-4">
          {/* Close/Cross Button */}
          <IconButton
            onClick={() => router.push("/chat/bob-builder?offerCreated=true")}
            className="absolute top-6 right-6 shadow-lg z-30"
          >
            <X size={20} />
          </IconButton>

          <h2 className="text-[1.5rem] font-semibold text-slate-800 text-center tracking-tight">
            {disputeStep === "form"
              ? "File Dispute"
              : disputeStep !== "none"
                ? "Dispute"
                : "Swap Payment"}
          </h2>

          {disputeStep === "form" ? (
            <DisputeForm
              disputeReason={disputeReason}
              setDisputeReason={setDisputeReason}
              disputeDescription={disputeDescription}
              setDisputeDescription={setDisputeDescription}
              disputeProofFile={disputeProofFile}
              setDisputeProofFile={setDisputeProofFile}
              onSubmit={() => setDisputeStep("submitted")}
            />
          ) : disputeStep === "submitted" ? (
            <DisputeSubmittedView
              onViewDetails={() => setDisputeStep("details")}
            />
          ) : disputeStep === "details" ? (
            <DisputeDetailsView
              disputeReason={disputeReason}
              disputeDescription={disputeDescription}
            />
          ) : isExpired ? (
            <ExpiredPaymentView
              setTimeLeft={setTimeLeft}
              onOpenDispute={() => setDisputeStep("form")}
            />
          ) : (
            <ActivePaymentView
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              paymentDone={paymentDone}
              handlePaymentDoneClick={handlePaymentDoneClick}
              handleUploadProofClick={handleUploadProofClick}
              customNote={customNote}
              setShowExtensionModal={setShowExtensionModal}
              setShowCancelModal={setShowCancelModal}
              formatTime={formatTime}
            />
          )}
        </GlassContainer>
      </div>

      {/* REQUEST EXTENSION OVERLAY DIALOG */}
      {showExtensionModal && (
        <ExtensionModal
          onClose={() => setShowExtensionModal(false)}
          onConfirmYes={handleRequestExtensionYes}
        />
      )}

      {/* CANCEL SWAP OVERLAY DIALOG */}
      {showCancelModal && (
        <CancelModal
          onClose={() => setShowCancelModal(false)}
          onConfirmYes={handleCancelSwapYes}
        />
      )}
    </div>
  );
}
