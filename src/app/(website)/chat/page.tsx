"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { Search, Shield, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { INITIAL_MOCK_CHATS, ChatSession } from "@/components/ui/website/chat/types";

function ConversationsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter chats by search query
  const filteredChats = INITIAL_MOCK_CHATS.filter((chat) =>
    chat.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Simulate multiple pages by repeating mock data if needed,
  // but to match mockup we will show the available chats plus a couple of mock items
  const renderStatus = (chat: ChatSession) => {
    if (chat.unreadCount && chat.unreadCount > 0) {
      return (
        <div className="w-6 h-6 rounded-full bg-[#09A6A4] text-white flex items-center justify-center text-[0.75rem] font-bold shadow-sm">
          {chat.unreadCount}
        </div>
      );
    } else {
      return (
        <span className="text-[0.78rem] text-slate-400 font-semibold">
          {chat.lastMessageTime}
        </span>
      );
    }
  };

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1200px] mx-auto w-full animate-in fade-in duration-700">
      <div className="relative flex items-center justify-center min-h-[92vh]">
        
        {/* Main Outer Container */}
        <GlassContainer className="w-full max-w-[850px] p-6 md:p-12 relative overflow-visible border border-white/50 bg-white/20 shadow-xl rounded-4xl flex flex-col space-y-6">
          
          {/* Centered Heading */}
          <div className="text-center pt-2">
            <h1 className="text-[1.5rem] font-bold text-slate-800 tracking-tight font-sans">
              Conversations
            </h1>
          </div>

          {/* Search bar block */}
          <div className="w-full bg-white rounded-xl border border-slate-100 flex items-center px-4 py-3.5 shadow-sm focus-within:ring-2 focus-within:ring-[#09A6A4]/15 transition-all">
            <Search size={20} className="text-slate-400 mr-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search here..."
              className="w-full bg-transparent font-semibold text-slate-600 focus:outline-none text-[0.95rem] placeholder:text-slate-400"
            />
          </div>

          {/* Conversations Cards List */}
          <div className="space-y-4 pt-2">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => router.push(`/chat/${chat.id}`)}
                className="bg-white rounded-2xl p-4.5 border border-slate-100/60 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex items-center justify-between cursor-pointer transition-all duration-300 group hover:scale-[1.005]"
              >
                <div className="flex items-center gap-4.5">
                  {/* Avatar wrapper */}
                  <div className="relative shrink-0 w-11 h-11">
                    <div className="w-full h-full rounded-full border border-white shadow-sm overflow-hidden flex items-center justify-center bg-slate-100">
                      <img
                        src={chat.participant.avatarUrl}
                        alt={chat.participant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Gold Verification Badge Corner Overlay */}
                    {chat.participant.isVerified && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 bg-[#FFBF00] rounded-full border border-white flex items-center justify-center shadow-sm">
                        <Shield size={9} className="text-white fill-current" />
                      </div>
                    )}
                  </div>

                  {/* Name and typing subtext */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-[1rem] font-bold text-slate-800 leading-tight">
                        {chat.participant.name}
                      </h4>
                      {chat.participant.isVerified && (
                        <CheckCircle2
                          size={15}
                          className="text-[#10B981] fill-current"
                        />
                      )}
                    </div>
                    <p className="text-[0.82rem] text-slate-400 font-semibold leading-none">
                      {chat.participant.typing ? (
                        <span className="text-[#09A6A4] font-bold animate-pulse">Typing...</span>
                      ) : (
                        chat.lastMessage
                      )}
                    </p>
                  </div>
                </div>

                {/* Right side: unread count or time */}
                <div className="shrink-0 flex items-center justify-end">
                  {renderStatus(chat)}
                </div>
              </div>
            ))}

            {/* Empty search fallback */}
            {filteredChats.length === 0 && (
              <div className="text-center py-10 text-slate-400 font-bold">
                No conversations found.
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-3 pt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[0.8rem] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)]
                  ${
                    num === currentPage
                      ? "bg-[#09A6A4] text-white shadow-sm shadow-[#09A6A4]/30"
                      : "bg-white text-slate-600 border border-slate-100 hover:bg-slate-50 hover:shadow-md"
                  }
                `}
                >
                  {num}
                </button>
              ))}
              <span className="text-slate-400 mx-1 text-[0.8rem]">...</span>
              <button
                onClick={() => setCurrentPage(10)}
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[0.8rem] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)]
                ${
                  currentPage === 10
                    ? "bg-[#09A6A4] text-white shadow-sm shadow-[#09A6A4]/30"
                    : "bg-white text-slate-600 border border-slate-100 hover:bg-slate-50 hover:shadow-md"
                }
              `}
              >
                10
              </button>
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(10, p + 1))}
              className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </GlassContainer>
      </div>
    </div>
  );
}

export default function ConversationsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-slate-400 font-bold">
          Loading...
        </div>
      }
    >
      <ConversationsContent />
    </Suspense>
  );
}
