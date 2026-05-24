"use client";

import React, { Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { INITIAL_MOCK_CHATS } from "@/components/ui/website/chat/types";
import { ChatWindow } from "@/components/ui/website/chat/ChatWindow";

function ChatDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = params.id as string;
  const offerCreated = searchParams.get("offerCreated") === "true";
  const isReinstateFlow = searchParams.get("reinstate") === "true";

  // Resolve target chat session matching dynamic ID path, fall back to Bob Builder
  const session =
    INITIAL_MOCK_CHATS.find((chat) => chat.id === id) || INITIAL_MOCK_CHATS[1];

  const handleBack = () => {
    router.push("/chat");
  };

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1200px] mx-auto w-full animate-in fade-in duration-550">
      <ChatWindow
        session={session}
        onBack={handleBack}
        offerCreated={offerCreated}
        isReinstateFlow={isReinstateFlow}
      />
    </div>
  );
}

export default function ChatDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-slate-400 font-bold">
          Loading conversation...
        </div>
      }
    >
      <ChatDetailsContent />
    </Suspense>
  );
}
