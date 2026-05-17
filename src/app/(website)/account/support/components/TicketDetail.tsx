"use client";

import React from "react";
import { ChevronLeft, Calendar, FileText, Image as ImageIcon } from "lucide-react";

interface TicketDetailProps {
  selectedTicket: {
    id: string;
    category: string;
    title: string;
    date: string;
    status: string;
    isDispute: boolean;
    hasChatIcon: boolean;
    userBody?: string;
    supportBody?: string;
  } | null;
  onBack: () => void;
  onReply: () => void;
}

export default function TicketDetail({
  selectedTicket,
  onBack,
  onReply,
}: TicketDetailProps) {
  return (
    <div className="max-w-[800px] mx-auto w-full space-y-6 pt-4 relative animate-in fade-in duration-300">
      <button
        onClick={onBack}
        className="absolute top-2 left-0 w-10 h-10 rounded-full bg-[#949CA9] text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-20 focus:outline-none animate-in fade-in"
      >
        <ChevronLeft size={22} />
      </button>

      <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-3">
        Help & Support
      </h2>

      {/* Ticket Subject Block */}
      <div className="pt-2 pb-4 space-y-2">
        <span className="text-[0.98rem] font-bold text-slate-800 block">
          {selectedTicket?.category || "Dispute"}
        </span>
        
        <div className="flex items-center gap-3">
          <span className="text-[0.78rem] text-slate-400 font-bold tracking-wider uppercase">
            Ticket #{selectedTicket?.id || "TK-9921"}
          </span>
          <span className="px-3 py-0.5 text-[0.72rem] font-bold rounded-full bg-[#CCFBF1] text-[#0D9488] border border-[#99F6E4]">
            {selectedTicket?.status || "Open"}
          </span>
        </div>

        <h1 className="text-[1.8rem] font-bold text-slate-900 leading-tight tracking-tight pt-1">
          {selectedTicket?.title || "Payment Inquiry"}
        </h1>

        <div className="flex items-center gap-2 text-[0.82rem] text-slate-400 font-semibold pt-1">
          <Calendar size={15} />
          <span>Created {selectedTicket?.date || "Oct 24, 2023"}</span>
        </div>
      </div>

      {/* Thread Container */}
      <div className="space-y-6 pt-2">
        
        {/* Card 1: User's Initial Message */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.01)] overflow-hidden">
          <div className="bg-[#F8FAFC]/50 border-b border-slate-100 px-6 py-4 flex justify-between items-center text-[0.88rem]">
            <p className="text-slate-700 font-bold">
              To: <span className="text-slate-400 font-medium ml-2">Support Team</span>
            </p>
            <span className="text-[0.75rem] text-slate-400 font-bold uppercase">
              OCT 24, 2026 11:20 AM
            </span>
          </div>
          
          <div className="p-6 space-y-6 text-[0.92rem] text-slate-700 leading-relaxed font-medium">
            <p className="whitespace-pre-line">
              {selectedTicket?.userBody || "I am writing regarding a recent transaction on my account that appears to have been processed twice. The transaction occurred on October 22nd for the amount of $149.00.\n\nI have checked my bank statement and can see two identical charges from \"Linear Protocol\" with the same timestamp. I only intended to purchase the Annual Pro Plan once.\n\nCould you please investigate this and process a refund for the duplicate charge as soon as possible? I have attached the invoice receipts for both transactions below for your reference."}
            </p>

            {/* Mock attachments */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <span className="text-[0.72rem] text-slate-400 font-bold tracking-wider block">
                📎 2 ATTACHMENTS
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[500px]">
                <div className="border border-slate-200 bg-white rounded-xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                    <FileText size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.8rem] font-bold text-slate-700 truncate">Invoice_OCT_22_A.pdf</p>
                    <p className="text-[0.7rem] text-slate-400 font-semibold">1.2 MB</p>
                  </div>
                </div>

                <div className="border border-slate-200 bg-white rounded-xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                    <ImageIcon size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.8rem] font-bold text-slate-700 truncate">Bank_Statement.png</p>
                    <p className="text-[0.7rem] text-slate-400 font-semibold">3.5 MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Separation Indicator 1 */}
        <div className="flex items-center justify-center py-2 relative">
          <div className="absolute inset-x-0 h-px bg-slate-200" />
          <span className="relative px-4 bg-white/80 rounded-full text-[0.72rem] text-slate-400 font-bold tracking-widest uppercase">
            TICKET OPENED BY SYSTEM
          </span>
        </div>

        {/* Card 2: Support Response (Official Badge) */}
        {(selectedTicket?.supportBody || selectedTicket?.id === "TK-9921") && (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.01)] overflow-hidden">
            <div className="bg-[#F8FAFC]/50 border-b border-slate-100 px-6 py-4 flex justify-between items-center text-[0.88rem]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">Support Team</span>
                <span className="bg-slate-200 text-slate-500 text-[0.62rem] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                  Official
                </span>
              </div>
              <span className="text-[0.75rem] text-slate-400 font-bold uppercase">
                OCT 24, 11:20 AM
              </span>
            </div>
            
            <div className="p-6 space-y-4 text-[0.92rem] text-slate-700 leading-relaxed font-medium">
              <p>Hello,</p>
              <p className="whitespace-pre-line">
                {selectedTicket?.supportBody || "Thank you for reaching out. We have received your inquiry regarding the duplicate charge on your account. I have forwarded this to our billing department for a thorough investigation.\n\nTypically, duplicate charges like this are cleared within 24-48 business hours once verified. We will notify you here as soon as the refund has been initiated."}
              </p>
              <div className="pt-2">
                <p>Best regards,</p>
                <p className="font-bold text-slate-800">Linear Protocol Support</p>
              </div>
            </div>
          </div>
        )}

        {/* Status Separation Indicator 2 */}
        {(selectedTicket?.supportBody || selectedTicket?.id === "TK-9921") && (
          <div className="flex items-center justify-center py-2 relative">
            <div className="absolute inset-x-0 h-px bg-slate-200" />
            <span className="relative px-4 bg-white/80 rounded-full text-[0.72rem] text-slate-400 font-bold tracking-widest uppercase">
              STATUS CHANGED TO PENDING
            </span>
          </div>
        )}

      </div>

      {/* Bottom Reply trigger */}
      <div className="pt-6 flex justify-center">
        <button 
          onClick={onReply}
          className="w-full max-w-[280px] py-3.5 rounded-lg text-[0.95rem] font-bold bg-[#09A6A4] text-white shadow-lg shadow-[#09A6A4]/20 hover:scale-[1.02] transition-transform cursor-pointer focus:outline-none"
        >
          Reply
        </button>
      </div>
    </div>
  );
}
