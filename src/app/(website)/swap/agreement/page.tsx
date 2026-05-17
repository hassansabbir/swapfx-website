"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SwapAgreementView } from "@/components/ui/website/swap/SwapAgreementView";

export default function SwapAgreementPage() {
  const router = useRouter();

  return (
    <SwapAgreementView
      onCancel={() => router.push("/swap")}
      onContinue={() => router.push("/swap/createswap")}
    />
  );
}
