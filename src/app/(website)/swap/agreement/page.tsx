"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SwapAgreementView } from "@/components/ui/website/swap/SwapAgreementView";

function SwapAgreementContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "";
  const swapper = searchParams.get("swapper") || "";

  const getSwapperId = (name: string) => {
    const clean = name.toLowerCase().trim();
    if (clean.includes("bob")) return "bob-builder";
    if (clean.includes("john")) return "john-doe";
    if (clean.includes("cameron")) return "cameron-williamson";
    if (clean.includes("fahim")) return "fahim-ahmed";
    return "bob-builder";
  };

  const handleCancel = () => {
    if (from === "chat") {
      router.push(`/chat/${getSwapperId(swapper)}`);
    } else {
      router.push("/swap");
    }
  };

  const handleContinue = () => {
    if (from === "chat") {
      router.push(
        `/swap/createswap?from=chat&swapper=${encodeURIComponent(swapper)}`
      );
    } else {
      router.push("/swap/createswap");
    }
  };

  return (
    <SwapAgreementView
      onCancel={handleCancel}
      onContinue={handleContinue}
    />
  );
}

export default function SwapAgreementPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400 font-bold">Loading...</div>}>
      <SwapAgreementContent />
    </Suspense>
  );
}
