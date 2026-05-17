"use client";

import React from "react";
import { ChevronLeft, ChevronDown } from "lucide-react";

interface CreateTicketProps {
  enquiryType: string;
  setEnquiryType: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export default function CreateTicket({
  enquiryType,
  setEnquiryType,
  description,
  setDescription,
  onBack,
  onSubmit,
}: CreateTicketProps) {
  return (
    <div className="max-w-[700px] mx-auto w-full space-y-6 pt-4 relative animate-in fade-in duration-300">
      <button
        onClick={onBack}
        className="absolute top-2 left-0 w-10 h-10 rounded-full bg-[#949CA9] text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-20 focus:outline-none animate-in fade-in"
      >
        <ChevronLeft size={22} />
      </button>

      <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-3">
        Help & Support
      </h2>

      <div className="space-y-5 pt-4">
        {/* Enquiry Type dropdown */}
        <div className="space-y-2 relative">
          <label className="text-[0.95rem] text-slate-800 font-semibold pl-1">
            Enquiry Type
          </label>
          <div className="relative">
            <select
              value={enquiryType}
              onChange={(e) => setEnquiryType(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-[#F1F5F9]/40 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all appearance-none cursor-pointer"
            >
              <option value="Password Change Problem">Password Change Problem</option>
              <option value="Payment not reflecting in account">Payment not reflecting in account</option>
              <option value="Dispute Support">Dispute Support</option>
              <option value="General Support">General Support</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown size={18} className="text-slate-500" />
            </div>
          </div>
        </div>

        {/* Description Input */}
        <div className="space-y-2">
          <label className="text-[0.95rem] text-slate-800 font-semibold pl-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your enquiry here..."
            className="w-full min-h-[160px] p-4 rounded-xl border border-slate-200 bg-[#F1F5F9]/40 text-slate-600 font-medium placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all leading-relaxed"
          />
        </div>

        {/* Action buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onSubmit}
            className="w-full sm:w-auto px-12 py-3.5 rounded-lg text-[0.95rem] font-bold bg-[#09A6A4] text-white shadow-lg shadow-[#09A6A4]/20 hover:scale-[1.02] transition-transform cursor-pointer focus:outline-none"
          >
            Submit
          </button>
          
          <button className="w-full sm:w-auto px-10 py-3.5 bg-white text-[#09A6A4] border-2 border-[#09A6A4] font-bold rounded-lg text-[0.95rem] hover:bg-slate-50 transition-colors cursor-pointer focus:outline-none">
            Attach File (Optional)
          </button>
        </div>
      </div>
    </div>
  );
}
