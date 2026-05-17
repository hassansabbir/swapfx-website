"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CreateMarketplaceSwapView } from "@/components/ui/website/swap/CreateMarketplaceSwapView";

function CreateSwapContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "";
  const swapper = searchParams.get("swapper") || "";

  const handleBack = () => {
    if (from === "chat") {
      router.push(`/chat?swapper=${encodeURIComponent(swapper)}`);
    } else {
      router.push("/swap/agreement");
    }
  };

  const handleSubmit = () => {
    if (from === "chat") {
      router.push(`/chat?swapper=${encodeURIComponent(swapper)}&offerCreated=true`);
    } else {
      router.push("/swap/success");
    }
  };

  return (
    <CreateMarketplaceSwapView
      onBack={handleBack}
      onSubmit={handleSubmit}
      swapperName={swapper}
    />
  );
}

export default function CreateMarketplaceSwapPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400 font-bold">Loading...</div>}>
      <CreateSwapContent />
    </Suspense>
  );
}
