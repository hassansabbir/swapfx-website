"use client";

import React from "react";
import { X, Calendar, Paperclip } from "lucide-react";

interface TicketReplyProps {
  selectedTicket: {
    id: string;
    category: string;
    title: string;
    date: string;
    status: string;
    isDispute: boolean;
    hasChatIcon: boolean;
  } | null;
  replyText: string;
  setReplyText: (val: string) => void;
  onSend: () => void;
  onBack: () => void;
}

export default function TicketReply({
  selectedTicket,
  replyText,
  setReplyText,
  onSend,
  onBack,
}: TicketReplyProps) {
  return (
    <div className="max-w-[800px] mx-auto w-full space-y-6 pt-4 relative animate-in fade-in duration-300">
      {/* Close button top right */}
      <button
        onClick={onBack}
        className="absolute top-2 right-0 w-10 h-10 rounded-full bg-[#949CA9] text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-20 focus:outline-none"
      >
        <X size={20} />
      </button>

      <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-3 mt-8">
        Help & Support
      </h2>

      {/* Ticket Subject Block */}
      <div className="pt-2 pb-4 space-y-1.5">
        <div className="flex items-center gap-3">
          <span className="text-[0.78rem] text-slate-400 font-bold tracking-wider uppercase">
            Ticket #{selectedTicket?.id || "TK-9921"}
          </span>
          <span className="px-3 py-0.5 text-[0.72rem] font-bold rounded-full bg-[#CCFBF1] text-[#0D9488] border border-[#99F6E4]">
            {selectedTicket?.status || "Open"}
          </span>
        </div>

        <h1 className="text-[1.6rem] font-bold text-slate-900 leading-tight tracking-tight">
          {selectedTicket?.title || "Payment Inquiry"}
        </h1>

        <div className="flex items-center gap-2 text-[0.82rem] text-slate-400 font-semibold">
          <Calendar size={14} />
          <span>Created {selectedTicket?.date || "Oct 24, 2023"}</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/85 shadow-[0_4px_25px_rgba(0,0,0,0.015)] overflow-hidden flex flex-col min-h-[420px] mt-2">
        
        {/* To Header */}
        <div className="border-b border-slate-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-6 text-[0.92rem]">
          <span className="text-slate-400 font-bold sm:w-14 sm:shrink-0">To:</span>
          <span className="text-slate-700 font-semibold">Support Team</span>
        </div>

        {/* Subject Header */}
        <div className="border-b border-slate-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-6 text-[0.92rem]">
          <span className="text-slate-400 font-bold sm:w-14 sm:shrink-0">Subject:</span>
          <span className="text-slate-400 font-medium">Re: Password Change Problem</span>
        </div>

        {/* Text Area */}
        <div className="p-6 flex-1 flex flex-col justify-between min-h-[220px]">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your message here..."
            className="w-full flex-1 text-[0.92rem] text-slate-700 font-medium placeholder:text-slate-400 resize-none focus:outline-none"
          />

          <span className="text-[0.78rem] text-slate-400 font-semibold pt-4">
            Please provide as much detail as possible.
          </span>
        </div>

        {/* Actions Footer */}
        <div className="bg-[#F8FAFC]/80 border-t border-slate-100/80 px-6 py-5 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onSend}
              disabled={!replyText.trim()}
              className={`px-16 py-3 rounded-xl text-[0.92rem] font-bold text-white shadow-sm transition-all cursor-pointer focus:outline-none ${
                replyText.trim() 
                  ? "bg-[#09A6A4] shadow-[#09A6A4]/20 hover:scale-[1.02]" 
                  : "bg-[#CCCCCC] cursor-not-allowed"
              }`}
            >
              Send
            </button>

            <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors shadow-xs flex items-center justify-center focus:outline-none">
              <Paperclip size={18} />
            </button>
          </div>

          <p className="text-center text-[0.72rem] text-slate-400 font-semibold">
            Your message will be added to ticket TKT-1001
          </p>
        </div>
      </div>
    </div>
  );
}
