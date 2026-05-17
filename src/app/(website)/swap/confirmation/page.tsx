"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SwapConfirmationView } from "@/components/ui/website/swap/SwapConfirmationView";

function SwapConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "swap";

  const handleBack = () => {
    if (from === "market") {
      router.push("/market");
    } else if (from === "chat") {
      router.push("/chat?swapper=Bob Builder&offerCreated=true");
    } else {
      router.push("/swap");
    }
  };

  return <SwapConfirmationView onBack={handleBack} from={from} />;
}

export default function SwapConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400 font-bold">Loading...</div>}>
      <SwapConfirmationContent />
    </Suspense>
  );
}
