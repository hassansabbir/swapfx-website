"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CreateMarketplaceSwapView } from "@/components/ui/website/swap/CreateMarketplaceSwapView";

function CreateSwapContent() {
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

  const handleBack = () => {
    if (from === "chat") {
      router.push(`/chat/${getSwapperId(swapper)}`);
    } else {
      router.push("/swap/agreement");
    }
  };

  const handleSubmit = () => {
    if (from === "chat") {
      router.push(`/chat/${getSwapperId(swapper)}?offerCreated=true`);
    } else {
      router.push("/swap/success");
    }
  };

  const handleClose = () => {
    if (from === "chat") {
      router.push(`/chat/${getSwapperId(swapper)}`);
    } else {
      router.push("/swap");
    }
  };

  return (
    <CreateMarketplaceSwapView
      onBack={handleBack}
      onClose={handleClose}
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
