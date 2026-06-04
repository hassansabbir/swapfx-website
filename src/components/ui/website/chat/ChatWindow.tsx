import React, { useState, useEffect } from "react";
import { ArrowLeft, Paperclip, Send, Info, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { ChatSession, ChatMessage } from "./types";
import { ChatHeader } from "./ChatHeader";
import { MessageBubble } from "./MessageBubble";
import { SwapOfferCard } from "./SwapOfferCard";

interface ChatWindowProps {
  session: ChatSession;
  onBack: () => void;
  offerCreated?: boolean;
  isReinstateFlow?: boolean;
  isCancelled?: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  session,
  onBack,
  offerCreated = false,
  isReinstateFlow = false,
  isCancelled = false,
}) => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>(session.messages);
  const [typedMessage, setTypedMessage] = useState("");
  const [isNoteVisible, setIsNoteVisible] = useState(true);

  // Keep messages state synced if the session changes
  useEffect(() => {
    setMessages(session.messages);
  }, [session]);

  useEffect(() => {
    if (isCancelled) {
      const newMsg: ChatMessage = {
        id: `cancel-${Date.now()}`,
        sender: "me",
        senderName: "Nazrul",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop",
        message: "You sent a cancellation request.",
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }) + " UTC",
        isCancellationRequest: true,
        cancellationApproved: false,
      };
      setMessages((prev) => {
        if (prev.some((m) => m.isCancellationRequest)) return prev;
        return [...prev, newMsg];
      });
    }
  }, [isCancelled]);

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
    <div className="relative w-full flex items-center justify-center min-h-[98vh]">
      {/* Circle Back Button */}
      <button
        onClick={onBack}
        className="absolute -left-4 md:-left-12 top-2 w-11 h-11 rounded-full bg-slate-400/85 text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-30"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Chat Frame */}
      <GlassContainer className="w-full overflow-hidden flex flex-col h-[110vh] border border-white/50 relative p-0 bg-white/20">
        {/* Header Bar */}
        <ChatHeader
          participant={session.participant}
          offerCreated={offerCreated}
          onTriggerCancelRequest={() => {
            const newMsg: ChatMessage = {
              id: `cancel-${Date.now()}`,
              sender: "me",
              senderName: "Nazrul",
              avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop",
              message: "You sent a cancellation request.",
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
          onTriggerReinstateRequest={() => {
            const newMsg: ChatMessage = {
              id: `reinstate-${Date.now()}`,
              sender: "me",
              senderName: "Nazrul",
              avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop",
              message: "You sent a reinstatement request.",
              time: new Date().toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              }) + " UTC",
              isReinstateRequest: true,
            };
            setMessages((prev) => [...prev, newMsg]);
          }}
        />

        {/* Conversation Bubbles Panel */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-3 bg-slate-50/20">
          


          {/* Top Inline Safety Banner */}
          {isNoteVisible && (
            <div className="mb-4 bg-[#F8FAFC]/95 border border-slate-200/80 rounded-xl p-3 md:p-4 text-[0.78rem] text-slate-500 font-medium shadow-sm relative pr-10">
              <button 
                onClick={() => setIsNoteVisible(false)}
                className="absolute right-2 top-2 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                title="Dismiss"
              >
                <X size={14} />
              </button>
              <div className="flex gap-2 items-start">
                <Info size={16} className="text-[#09A6A4] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-slate-700">Safety Note:</strong> For your safety and to follow platform rules, please do not share personal contact details such as phone numbers, email addresses, social media, or home addresses. Keep all communication on the platform to protect your privacy and ensure a secure swapping experience. All chatting going through this inbox is being monitored by the admin.
                </p>
              </div>
            </div>
          )}

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
