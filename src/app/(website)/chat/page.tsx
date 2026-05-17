"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { ArrowLeft, MoreHorizontal, Paperclip, Send, Shield, CheckCircle2, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ChatMessage {
  id: string;
  sender: "them" | "me";
  senderName: string;
  avatarUrl: string;
  message: string;
  time: string;
  isSwapCard?: boolean;
}

function ChatContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const swapperName = searchParams.get("swapper") || "Bob Builder";
  const offerCreated = searchParams.get("offerCreated") === "true";

  const [showDropdown, setShowDropdown] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  
  // Custom message state starting with all mockup messages
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "them",
      senderName: swapperName,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      message: "Hello ! Nazrul How are you?",
      time: "Oct 24, 14:32:01 UTC",
    },
    {
      id: "2",
      sender: "me",
      senderName: "Nazrul",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop",
      message: "Hello! Jhon abraham",
      time: "Oct 24, 14:32:01 UTC",
    },
    {
      id: "3",
      sender: "me",
      senderName: "Nazrul",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop",
      message: "You did your job well!",
      time: "Oct 24, 14:32:01 UTC",
    },
    {
      id: "4",
      sender: "them",
      senderName: swapperName,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      message: "Have a great working week!!",
      time: "Oct 24, 14:32:01 UTC",
    },
    {
      id: "5",
      sender: "them",
      senderName: swapperName,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      message: "Hope you like it",
      time: "Oct 24, 14:32:01 UTC",
    },
    {
      id: "6",
      sender: "me",
      senderName: "Nazrul",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop",
      message: "You did your job well!",
      time: "Oct 24, 14:32:01 UTC",
    },
  ]);

  // Handle typing send
  const handleSendMessage = () => {
    if (!typedMessage.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "me",
      senderName: "Nazrul",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop",
      message: typedMessage,
      time: "Oct 24, 14:32:01 UTC",
    };
    setMessages((prev) => [...prev, newMsg]);
    setTypedMessage("");
  };

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1200px] mx-auto w-full animate-in fade-in duration-500">
      <div className="relative flex items-center justify-center min-h-[92vh]">
        {/* Circle Back Button */}
        <button
          onClick={() => router.push("/market")}
          className="absolute -left-4 md:-left-12 top-2 w-11 h-11 rounded-full bg-slate-400/85 text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-30"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Chat Frame */}
        <GlassContainer className="w-full overflow-hidden flex flex-col h-[92vh] border border-white/50 relative p-0 bg-white/20">
          
          {/* Header Bar */}
          <div className="bg-white/80 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 z-20 relative">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0 w-11 h-11">
                <div className="w-full h-full rounded-full border border-white shadow-sm overflow-hidden flex items-center justify-center bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt={swapperName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#FFBF00] rounded-full border border-white flex items-center justify-center shadow-sm">
                  <Shield size={9} className="text-white fill-current" />
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-[1.02rem] font-bold text-slate-800 leading-tight">
                    {swapperName}
                  </h4>
                  <CheckCircle2 size={16} className="text-[#10B981] fill-current" />
                </div>
                <p className="text-[0.8rem] text-emerald-500 font-bold leading-none">
                  Active now
                </p>
              </div>
            </div>

            {/* Three dot actions trigger */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                <MoreHorizontal size={22} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-1.5 animate-in fade-in zoom-in-95 duration-200">
                  <Link
                    href={`/swap/createswap?from=chat&swapper=${encodeURIComponent(swapperName)}`}
                    className="w-full block px-4 py-2.5 hover:bg-slate-50 text-[0.88rem] font-bold text-slate-700 text-left transition-colors"
                  >
                    Create Swap
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Conversation Bubbles Panel */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/20">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${msg.sender === "me" ? "ml-auto flex-row-reverse" : ""}`}
              >
                {msg.sender === "them" && (
                  <div className="relative shrink-0 w-9 h-9">
                    <img
                      src={msg.avatarUrl}
                      alt={msg.senderName}
                      className="w-full h-full rounded-full object-cover border border-white"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#FFBF00] rounded-full border border-white flex items-center justify-center shadow-sm">
                      <Shield size={7} className="text-white fill-current" />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5 w-full">
                  {msg.sender === "them" && (
                    <span className="text-[0.78rem] font-bold text-slate-500 pl-1 block">
                      {msg.senderName}
                    </span>
                  )}
                  
                  <div
                    className={`rounded-2xl px-5 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] w-fit
                      ${
                        msg.sender === "me"
                          ? "bg-[#09A6A4] text-white rounded-tr-none ml-auto"
                          : "bg-white text-slate-700 rounded-tl-none"
                      }
                    `}
                  >
                    <p className="text-[0.92rem] font-medium leading-relaxed">
                      {msg.message}
                    </p>
                  </div>

                  <span className={`text-[0.72rem] text-slate-400 font-semibold block ${msg.sender === "me" ? "text-right" : "pl-1"}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Special Inline Swap Offer Card (shown only if offerCreated=true) */}
            {offerCreated && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="relative shrink-0 w-9 h-9">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Fahim Ahmed"
                    className="w-full h-full rounded-full object-cover border border-white"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#FFBF00] rounded-full border border-white flex items-center justify-center shadow-sm">
                    <Shield size={7} className="text-white fill-current" />
                  </div>
                </div>

                <div className="space-y-1.5 flex-1">
                  <span className="text-[0.78rem] font-bold text-slate-500 pl-1 block">
                    Fahim Ahmed
                  </span>

                  {/* Inline Swap Offer Details Box */}
                  <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-lg shadow-slate-100/30 space-y-4">
                    
                    {/* Header */}
                    <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
                      <div className="space-y-0.5">
                        <h4 className="text-[0.95rem] font-bold text-slate-800 leading-tight">
                          {swapperName}
                        </h4>
                        <div className="flex items-center gap-1 text-[0.75rem] text-slate-400 font-semibold">
                          <Star size={11} className="text-yellow-400 fill-yellow-400" />
                          <span>4.7 (56)</span>
                        </div>
                      </div>
                    </div>

                    {/* Swap currencies display */}
                    <div className="flex items-center justify-between px-1">
                      <h3 className="text-[1.25rem] font-extrabold text-slate-800 tracking-tight">
                        £200 GBP
                      </h3>
                      <ArrowRight size={18} className="text-[#09A6A4] shrink-0" />
                      <h3 className="text-[1.25rem] font-extrabold text-[#09A6A4] tracking-tight">
                        $250 USD
                      </h3>
                    </div>

                    {/* Details row */}
                    <div className="bg-slate-50 rounded-xl px-3 py-2 text-[0.78rem] text-slate-500 font-semibold flex justify-between items-center">
                      <span>Rate: 1 GBP = 10.00 PKR</span>
                      <span>Required: &lt;1 hr</span>
                    </div>

                    {/* View Details Button inside chat bubble */}
                    <Link href="/swap/confirmation?from=chat" className="block w-full">
                      <button className="w-full py-2.5 rounded-xl bg-[#09A6A4] text-white text-[0.88rem] font-bold shadow-md hover:scale-[1.01] transition-transform">
                        View Details
                      </button>
                    </Link>
                  </div>

                  <span className="text-[0.72rem] text-slate-400 font-semibold block pl-1">
                    Oct 24, 14:32:01 UTC
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Safety Warning Note */}
          <div className="px-6 pb-4 shrink-0 bg-slate-50/20">
            <div className="bg-[#F8FAFC]/95 border border-slate-200/80 rounded-2xl p-4 md:p-5 text-[0.78rem] text-slate-500 font-medium leading-relaxed shadow-sm">
              <span className="font-bold text-slate-700">Note:</span> For your safety and to follow platform rules, please do not share personal contact details such as phone numbers, email addresses, social media, or home addresses. Keep all communication on the platform to protect your privacy and ensure a secure swapping experience.
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
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400 font-bold">Loading...</div>}>
      <ChatContent />
    </Suspense>
  );
}
