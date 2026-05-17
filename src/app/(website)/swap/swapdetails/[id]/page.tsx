"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { SwapHistoryDetailsView } from "@/components/ui/website/swap/SwapHistoryDetailsView";
import { MOCK_SWAPS } from "@/components/ui/website/swap/types";

export default function SwapDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // Resolve target swap details matching parameter dynamic ID
  const swap = MOCK_SWAPS.find((item) => item.id === id) || MOCK_SWAPS[0];

  return (
    <SwapHistoryDetailsView
      swap={swap}
      onBack={() => router.push("/swap")}
    />
  );
}
