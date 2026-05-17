"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SwapSuccessView } from "@/components/ui/website/swap/SwapSuccessView";

export default function SwapSuccessPage() {
  const router = useRouter();

  return (
    <SwapSuccessView
      onClose={() => router.push("/swap")}
      onViewDetails={() => router.push("/swap/confirmation")}
    />
  );
}
