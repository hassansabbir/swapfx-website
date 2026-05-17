"use client";

import React from "react";
import { MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";

interface TicketListProps {
  mockTickets: Array<{
    id: string;
    category: string;
    title: string;
    date: string;
    status: string;
    isDispute: boolean;
    hasChatIcon: boolean;
  }>;
  onTicketClick: (ticket: any) => void;
  onCreateTicket: () => void;
  onRefundClick: () => void;
  onSafetyClick: () => void;
}

export default function TicketList({
  mockTickets,
  onTicketClick,
  onCreateTicket,
  onRefundClick,
  onSafetyClick,
}: TicketListProps) {
  return (
    <div className="max-w-[800px] mx-auto w-full pt-4 pb-4 space-y-6 animate-in fade-in duration-300">
      {/* Header section with floating button */}
      <div className="flex flex-col items-center relative pb-2">
        <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight">
          Help & Support
        </h2>
        
        <div className="w-full flex justify-end pt-3 sm:absolute sm:top-0 sm:pt-0">
          <button
            onClick={onCreateTicket}
            className="px-6 py-2.5 rounded-lg text-[0.88rem] font-bold bg-[#09A6A4] text-white shadow-lg shadow-[#09A6A4]/20 hover:scale-[1.02] transition-transform cursor-pointer focus:outline-none"
          >
            Create Ticket
          </button>
        </div>
      </div>

      {/* Tickets Cards Stack */}
      <div className="space-y-4 pt-4">
        {mockTickets.map((ticket, i) => (
          <div 
            key={i} 
            onClick={() => onTicketClick(ticket)}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between space-y-3 shadow-[0_4px_15px_rgba(0,0,0,0.005)] relative hover:bg-slate-50/50 cursor-pointer transition-colors"
          >
            {/* Card Header row with badges */}
            <div className="flex items-center justify-between">
              <span className="text-[0.85rem] font-bold text-slate-400">
                {ticket.id}
              </span>
              
              <div className="flex gap-2">
                {ticket.isDispute && (
                  <span className="px-3 py-0.5 text-[0.75rem] font-bold rounded-full bg-[#FFF7ED] text-[#EA580C] border border-[#FED7AA]">
                    Dispute
                  </span>
                )}
                
                <span className={`px-3 py-0.5 text-[0.75rem] font-bold rounded-full border ${
                  ticket.status === "Open"
                    ? "bg-[#E0F2FE]/40 text-[#09A6A4] border-[#09A6A4]/30"
                    : "bg-slate-100 text-slate-500 border-slate-200"
                }`}>
                  {ticket.status}
                </span>
              </div>
            </div>

            {/* Card Content Title */}
            <h3 className="text-[0.98rem] font-bold text-slate-800 leading-tight">
              {ticket.title}
            </h3>

            {/* Card Footer row */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[0.8rem] text-slate-400 font-semibold">
                {ticket.date}
              </span>
              
              {ticket.hasChatIcon && (
                <MessageSquare size={16} className="text-slate-400 shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Refund & Safety Form buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button 
          onClick={onRefundClick}
          className="w-full sm:w-auto px-6 py-3 bg-white text-[#09A6A4] border-2 border-[#09A6A4] font-bold rounded-xl text-[0.88rem] hover:bg-slate-50 transition-colors cursor-pointer focus:outline-none"
        >
          Refund Request Form
        </button>
        <button 
          onClick={onSafetyClick}
          className="w-full sm:w-auto px-6 py-3 bg-white text-[#09A6A4] border-2 border-[#09A6A4] font-bold rounded-xl text-[0.88rem] hover:bg-slate-50 transition-colors cursor-pointer focus:outline-none"
        >
          Safety Shield Form
        </button>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2 pt-6">
        <button className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center focus:outline-none">
          <ChevronLeft size={18} />
        </button>
        
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <button
            key={num}
            className={`w-10 h-10 rounded-full font-bold text-[0.88rem] transition-colors flex items-center justify-center focus:outline-none cursor-pointer ${
              num === 1
                ? "bg-[#09A6A4] text-white shadow-md"
                : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
            }`}
          >
            {num}
          </button>
        ))}

        <span className="text-slate-400 font-medium px-1">...</span>

        <button className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-500 font-bold text-[0.88rem] hover:bg-slate-50 flex items-center justify-center">
          10
        </button>

        <button className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center focus:outline-none">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
