import React, { useState, useEffect } from "react";
import { ArrowLeft, Paperclip, Send } from "lucide-react";
import Link from "next/link";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { ChatSession, ChatMessage } from "./types";
import { ChatHeader } from "./ChatHeader";
import { MessageBubble } from "./MessageBubble";
import { SwapOfferCard } from "./SwapOfferCard";

interface ChatWindowProps {
  session: ChatSession;
  onBack: () => void;
  offerCreated?: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  session,
  onBack,
  offerCreated = false,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(session.messages);
  const [typedMessage, setTypedMessage] = useState("");

  // Keep messages state synced if the session changes
  useEffect(() => {
    setMessages(session.messages);
  }, [session]);

  const handleSendMessage = () => {
    if (!typedMessage.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "me",
      senderName: "Nazrul",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop",
      message: typedMessage,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }) + " UTC",
    };
    setMessages((prev) => [...prev, newMsg]);
    setTypedMessage("");
  };

  return (
    <div className="relative w-full flex items-center justify-center min-h-[92vh]">
      {/* Circle Back Button */}
      <button
        onClick={onBack}
        className="absolute -left-4 md:-left-12 top-2 w-11 h-11 rounded-full bg-slate-400/85 text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-30"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Chat Frame */}
      <GlassContainer className="w-full overflow-hidden flex flex-col h-[92vh] border border-white/50 relative p-0 bg-white/20">
        {/* Header Bar */}
        <ChatHeader
          participant={session.participant}
          onTriggerCancelRequest={() => {
            const newMsg: ChatMessage = {
              id: `cancel-${Date.now()}`,
              sender: "them",
              senderName: session.participant.name,
              avatarUrl: session.participant.avatarUrl,
              message: "Your counter swapper wants to cancel this swap.",
              time: new Date().toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              }) + " UTC",
              isCancellationRequest: true,
              cancellationApproved: false,
            };
            setMessages((prev) => [...prev, newMsg]);
          }}
        />

        {/* Conversation Bubbles Panel */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/20">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              msg={msg}
              onApproveCancellation={(msgId) => {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === msgId ? { ...m, cancellationApproved: true } : m
                  )
                );
              }}
            />
          ))}

          {/* Special Inline Swap Offer Card (shown only if offerCreated=true) */}
          {offerCreated && (
            <SwapOfferCard participant={session.participant} />
          )}
        </div>

        {/* Safety Warning Note */}
        <div className="px-6 pb-4 shrink-0 bg-slate-50/20">
          <div className="bg-[#F8FAFC]/95 border border-slate-200/80 rounded-2xl p-4 md:p-5 text-[0.78rem] text-slate-500 font-medium leading-relaxed shadow-sm">
            <span className="font-bold text-slate-700">Note:</span> For your safety
            and to follow platform rules, please do not share personal contact details
            such as phone numbers, email addresses, social media, or home addresses.
            Keep all communication on the platform to protect your privacy and ensure
            a secure swapping experience.
          </div>
        </div>

        {/* Bottom message text input panel */}
        <div className="p-4.5 shrink-0 bg-[#09A6A4] flex items-center gap-4.5 z-20">
          <button className="text-white hover:text-teal-150 transition-colors shrink-0">
            <Paperclip size={22} />
          </button>

          <div className="flex-1 bg-white rounded-full px-5 py-2.5 flex items-center shadow-inner">
            <input
              type="text"
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              placeholder="Write your message"
              className="w-full bg-transparent font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none text-[0.92rem]"
            />
          </div>

          <button
            onClick={handleSendMessage}
            className="text-white hover:scale-105 active:scale-95 transition-all shrink-0"
          >
            <Send size={22} className="fill-current" />
          </button>
        </div>
      </GlassContainer>
    </div>
  );
};
