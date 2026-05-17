"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { ChevronLeft, ChevronRight, X, MessageSquare, ChevronDown, Check, FileText, Image as ImageIcon, Paperclip, Calendar, Upload } from "lucide-react";

type ViewState = 
  | "list" 
  | "create" 
  | "success" 
  | "detail" 
  | "reply" 
  | "refund" 
  | "refund_success" 
  | "safety" 
  | "safety_success";

export default function HelpAndSupportPage() {
  const router = useRouter();
  const [viewState, setViewState] = useState<ViewState>("list");
  
  // Create ticket states
  const [enquiryType, setEnquiryType] = useState("Password Change Problem");
  const [description, setDescription] = useState(
    "Swappers are unable to update their password due to validation or system error, preventing successful password change."
  );

  // Refund states
  const [refundFeeType, setRefundFeeType] = useState("");
  const [refundSwapId, setRefundSwapId] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [refundDetail, setRefundDetail] = useState("");

  // Safety states
  const [safetySwapId, setSafetySwapId] = useState("");
  const [safetyAmount, setSafetyAmount] = useState("");
  const [safetyIssue, setSafetyIssue] = useState("");
  const [safetyDetail, setSafetyDetail] = useState("");
  
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [replyText, setReplyText] = useState("");

  const mockTickets = [
    {
      id: "TK-9921",
      category: "Dispute",
      title: "Payment Inquiry",
      date: "Oct 24, 2023",
      status: "Open",
      isDispute: true,
      hasChatIcon: true,
      userBody: "I am writing regarding a recent transaction on my account that appears to have been processed twice. The transaction occurred on October 22nd for the amount of $149.00.\n\nI have checked my bank statement and can see two identical charges from \"Linear Protocol\" with the same timestamp. I only intended to purchase the Annual Pro Plan once.\n\nCould you please investigate this and process a refund for the duplicate charge as soon as possible? I have attached the invoice receipts for both transactions below for your reference.",
      supportBody: "Hello,\n\nThank you for reaching out. We have received your inquiry regarding the duplicate charge on your account. I have forwarded this to our billing department for a thorough investigation.\n\nTypically, duplicate charges like this are cleared within 24-48 business hours once verified. We will notify you here as soon as the refund has been initiated."
    },
    {
      id: "TKT-1002",
      category: "Billing",
      title: "Payment not reflecting in account",
      date: "2/2/2026",
      status: "Open",
      isDispute: false,
      hasChatIcon: true,
      userBody: "Sent money but account not upgraded.",
      supportBody: ""
    },
    {
      id: "TKT-1001",
      category: "Dispute",
      title: "Dispute",
      date: "2/2/2026",
      status: "Closed",
      isDispute: true,
      hasChatIcon: false,
      userBody: "Issue resolving user swap.",
      supportBody: ""
    },
    {
      id: "TKT-1001",
      category: "Account",
      title: "Password Change Problem",
      date: "2/2/2026",
      status: "Closed",
      isDispute: false,
      hasChatIcon: false,
      userBody: "Getting error while validating old password.",
      supportBody: ""
    },
  ];

  const handleTicketClick = (ticket: any) => {
    setSelectedTicket(ticket);
    setViewState("detail");
  };

  const resetForms = () => {
    setRefundFeeType("");
    setRefundSwapId("");
    setRefundReason("");
    setRefundDetail("");
    setSafetySwapId("");
    setSafetyAmount("");
    setSafetyIssue("");
    setSafetyDetail("");
    setReplyText("");
  };

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1000px] mx-auto w-full animate-in fade-in duration-500">
      <GlassContainer className="p-6 md:p-12 relative bg-white/40 border border-white/60 shadow-2xl rounded-4xl flex flex-col justify-center min-h-[550px]">
        
        {/* Close Button top right (Only visible on specific navigation view states) */}
        {(viewState === "list" || 
          viewState === "reply" || 
          viewState === "refund" || 
          viewState === "refund_success" || 
          viewState === "safety" || 
          viewState === "safety_success") && (
          <button
            onClick={() => {
              if (viewState.endsWith("_success")) {
                setViewState("list");
              } else {
                router.back();
              }
            }}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#949CA9] text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-20 focus:outline-none animate-in fade-in"
          >
            <X size={18} />
          </button>
        )}

        {viewState === "list" ? (
          /* ========================================================= */
          /* 1. TICKETS LIST DASHBOARD */
          /* ========================================================= */
          <div className="max-w-[800px] mx-auto w-full pt-4 pb-4 space-y-6 animate-in fade-in duration-300">
            
            {/* Header section with floating button */}
            <div className="flex flex-col items-center relative pb-2">
              <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight">
                Help & Support
              </h2>
              
              <div className="w-full flex justify-end pt-3 sm:absolute sm:top-0 sm:pt-0">
                <button
                  onClick={() => setViewState("create")}
                  className="px-6 py-2.5 rounded-lg text-[0.88rem] font-bold bg-[#09A6A4] text-white shadow-lg shadow-[#09A6A4]/20 hover:scale-[1.02] transition-transform cursor-pointer"
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
                  onClick={() => handleTicketClick(ticket)}
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
                onClick={() => setViewState("refund")}
                className="w-full sm:w-auto px-6 py-3 bg-white text-[#09A6A4] border-2 border-[#09A6A4] font-bold rounded-xl text-[0.88rem] hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Refund Request Form
              </button>
              <button 
                onClick={() => setViewState("safety")}
                className="w-full sm:w-auto px-6 py-3 bg-white text-[#09A6A4] border-2 border-[#09A6A4] font-bold rounded-xl text-[0.88rem] hover:bg-slate-50 transition-colors cursor-pointer"
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
        ) : viewState === "create" ? (
          /* ========================================================= */
          /* 2. CREATE TICKET FORM */
          /* ========================================================= */
          <div className="max-w-[700px] mx-auto w-full space-y-6 pt-4 relative animate-in fade-in duration-300">
            <button
              onClick={() => setViewState("list")}
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
                  onClick={() => setViewState("success")}
                  className="w-full sm:w-auto px-12 py-3.5 rounded-lg text-[0.95rem] font-bold bg-[#09A6A4] text-white shadow-lg shadow-[#09A6A4]/20 hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  Submit
                </button>
                
                <button className="w-full sm:w-auto px-10 py-3.5 bg-white text-[#09A6A4] border-2 border-[#09A6A4] font-bold rounded-lg text-[0.95rem] hover:bg-slate-50 transition-colors cursor-pointer">
                  Attach File (Optional)
                </button>
              </div>

            </div>
          </div>
        ) : viewState === "success" ? (
          /* ========================================================= */
          /* 3. SUCCESS MESSAGE */
          /* ========================================================= */
          <div className="max-w-[650px] mx-auto w-full space-y-6 pt-10 pb-4 animate-in zoom-in-95 duration-500 flex flex-col items-center text-center relative">
            
            {/* Confetti Animation Circle */}
            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
              <div className="absolute inset-0 w-full h-full animate-spin-slow">
                <div className="absolute top-0 left-1/2 w-1.5 h-4 bg-[#09A6A4] rounded-full rotate-45" />
                <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-amber-400 rounded-full" />
                <div className="absolute top-1/4 right-0 w-1.5 h-3 bg-blue-400 rounded-full -rotate-12" />
                <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-[#09A6A4] rounded-full" />
                <div className="absolute top-1/3 left-0 w-2 h-2 bg-pink-400 rounded-full" />
              </div>
              <div className="w-24 h-24 bg-[#09A6A4] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(9,166,164,0.3)] z-10">
                <Check className="text-white w-12 h-12" strokeWidth={4} />
              </div>
            </div>

            <h2 className="text-[1.3rem] font-bold text-slate-800 tracking-tight max-w-[400px]">
              Your enquiry has been submitted
            </h2>
            
            <p className="text-[0.95rem] text-slate-500 font-medium max-w-[420px] leading-relaxed mb-8">
              Thanks for getting in touch. Our support team has received your request (<span className="font-bold text-slate-700">#TKT-2024-0325-7890</span>) and will get back to you within 72 hours. We'll notify you as soon as there's an update.
            </p>

            <button
              onClick={() => {
                setDescription("");
                setViewState("list");
              }}
              className="w-full max-w-[280px] py-3.5 mt-4 rounded-lg text-[0.95rem] font-bold bg-[#09A6A4] text-white shadow-lg shadow-[#09A6A4]/20 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              Continue
            </button>

          </div>
        ) : viewState === "detail" ? (
          /* ========================================================= */
          /* 4. TICKET DETAILS THREAD */
          /* ========================================================= */
          <div className="max-w-[800px] mx-auto w-full space-y-6 pt-4 relative animate-in fade-in duration-300">
            <button
              onClick={() => setViewState("list")}
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
                onClick={() => setViewState("reply")}
                className="w-full max-w-[280px] py-3.5 rounded-lg text-[0.95rem] font-bold bg-[#09A6A4] text-white shadow-lg shadow-[#09A6A4]/20 hover:scale-[1.02] transition-transform cursor-pointer"
              >
                Reply
              </button>
            </div>

          </div>
        ) : viewState === "reply" ? (
          /* ========================================================= */
          /* 5. REPLY COMPOSE EDITOR INSIDE TICKET */
          /* ========================================================= */
          <div className="max-w-[800px] mx-auto w-full space-y-6 pt-4 relative animate-in fade-in duration-300">
            {/* Close button top right */}
            <button
              onClick={() => setViewState("detail")}
              className="absolute top-2 right-0 w-10 h-10 rounded-full bg-[#949CA9] text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-20 focus:outline-none"
            >
              <X size={20} />
            </button>

            <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-3">
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
              <div className="border-b border-slate-100 px-6 py-4 flex items-center gap-6 text-[0.92rem]">
                <span className="text-slate-400 font-bold w-14">To:</span>
                <span className="text-slate-700 font-semibold">Support Team</span>
              </div>

              {/* Subject Header */}
              <div className="border-b border-slate-100 px-6 py-4 flex items-center gap-6 text-[0.92rem]">
                <span className="text-slate-400 font-bold w-14">Subject:</span>
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
                    onClick={() => {
                      if (replyText.trim()) {
                        setSelectedTicket((prev: any) => ({
                          ...prev,
                          supportBody: prev.supportBody + "\n\nReply sent:\n" + replyText
                        }));
                        setReplyText("");
                        setViewState("detail");
                      }
                    }}
                    disabled={!replyText.trim()}
                    className={`px-16 py-3 rounded-xl text-[0.92rem] font-bold text-white shadow-sm transition-all cursor-pointer ${
                      replyText.trim() 
                        ? "bg-[#09A6A4] shadow-[#09A6A4]/20 hover:scale-[1.02]" 
                        : "bg-[#CCCCCC] cursor-not-allowed"
                    }`}
                  >
                    Send
                  </button>

                  <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors shadow-xs flex items-center justify-center">
                    <Paperclip size={18} />
                  </button>
                </div>

                <p className="text-center text-[0.72rem] text-slate-400 font-semibold">
                  Your message will be added to ticket TKT-1001
                </p>
              </div>
            </div>
          </div>
        ) : viewState === "refund" ? (
          /* ========================================================= */
          /* 6. REFUND REQUEST FORM (Image 1) */
          /* ========================================================= */
          <div className="max-w-[700px] mx-auto w-full space-y-6 pt-4 relative animate-in fade-in duration-300">
            <button
              onClick={() => setViewState("list")}
              className="absolute top-2 left-0 w-10 h-10 rounded-full bg-[#949CA9] text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-20 focus:outline-none animate-in fade-in"
            >
              <ChevronLeft size={22} />
            </button>

            <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-3">
              Refund Request
            </h2>

            <div className="space-y-5 pt-4">
              
              {/* Question 1 */}
              <div className="space-y-2 relative">
                <label className="text-[0.95rem] text-slate-800 font-semibold pl-1">
                  Which Fee Are You Requesting A Refund For?
                </label>
                <div className="relative">
                  <select
                    value={refundFeeType}
                    onChange={(e) => setRefundFeeType(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-[#F1F5F9]/40 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select Fee Type</option>
                    <option value="Escrow Fee">Swap Escrow Fee</option>
                    <option value="Membership Fee">Membership Fee</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown size={18} className="text-slate-500" />
                  </div>
                </div>
              </div>

              {/* Swap ID */}
              <div className="space-y-2">
                <label className="text-[0.95rem] text-slate-800 font-semibold pl-1">
                  Swap ID
                </label>
                <input
                  type="text"
                  value={refundSwapId}
                  onChange={(e) => setRefundSwapId(e.target.value)}
                  placeholder="Enter Swap ID"
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-[#F1F5F9]/40 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all leading-relaxed"
                />
              </div>

              {/* Reason */}
              <div className="space-y-2 relative">
                <label className="text-[0.95rem] text-slate-800 font-semibold pl-1">
                  Reason For Your Request
                </label>
                <div className="relative">
                  <select
                    value={refundReason}
                    onChange={(e) => setRefundReason(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-[#F1F5F9]/40 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select Reason</option>
                    <option value="Double Charged">Double Charge</option>
                    <option value="Swap Failed">Swap Cancelled / Failed</option>
                    <option value="Dissatisfied">Dissatisfied with Service</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown size={18} className="text-slate-500" />
                  </div>
                </div>
              </div>

              {/* Tell us more */}
              <div className="space-y-2">
                <label className="text-[0.95rem] text-slate-800 font-semibold pl-1">
                  Tell Us More
                </label>
                <textarea
                  value={refundDetail}
                  onChange={(e) => setRefundDetail(e.target.value)}
                  placeholder="Provide Additional Details About Your Refund Request"
                  className="w-full min-h-[140px] p-4 rounded-xl border border-slate-200 bg-[#F1F5F9]/40 text-slate-600 font-medium placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all leading-relaxed"
                />
              </div>

              {/* Attachments */}
              <div className="space-y-2">
                <label className="text-[0.95rem] text-slate-800 font-semibold pl-1 block">
                  Attachments <span className="text-slate-400 font-medium">(optional)</span>
                </label>
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-lg text-slate-700 text-[0.88rem] hover:bg-slate-50 transition-colors shadow-xs">
                  <Upload size={16} />
                  <span>Choose file</span>
                </button>
              </div>

              {/* Declaration */}
              <div className="pt-2 text-[0.85rem] text-slate-500 leading-relaxed font-semibold">
                <span className="text-slate-700 font-bold block pb-0.5">Declaration</span>
                By submitting this request, you confirm that all information provided is accurate and that you are requesting a refund in accordance with the platform's Refund Policy.
              </div>

              {/* Submit */}
              <div className="pt-6 flex justify-center">
                <button
                  onClick={() => setViewState("refund_success")}
                  className="w-full sm:w-auto px-16 py-3.5 rounded-lg text-[0.95rem] font-bold bg-[#09A6A4] text-white shadow-lg shadow-[#09A6A4]/20 hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  Submit
                </button>
              </div>

            </div>
          </div>
        ) : viewState === "refund_success" ? (
          /* ========================================================= */
          /* 7. REFUND SUCCESS (Image 3 - Left) */
          /* ========================================================= */
          <div className="max-w-[650px] mx-auto w-full space-y-6 pt-10 pb-4 animate-in zoom-in-95 duration-500 flex flex-col items-center text-center relative">
            
            {/* Confetti Animation Circle */}
            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
              <div className="absolute inset-0 w-full h-full animate-spin-slow">
                <div className="absolute top-0 left-1/2 w-1.5 h-4 bg-[#09A6A4] rounded-full rotate-45" />
                <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-amber-400 rounded-full" />
                <div className="absolute top-1/4 right-0 w-1.5 h-3 bg-blue-400 rounded-full -rotate-12" />
                <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-[#09A6A4] rounded-full" />
                <div className="absolute top-1/3 left-0 w-2 h-2 bg-pink-400 rounded-full" />
              </div>
              <div className="w-24 h-24 bg-[#09A6A4] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(9,166,164,0.3)] z-10">
                <Check className="text-white w-12 h-12" strokeWidth={4} />
              </div>
            </div>

            <h2 className="text-[1.3rem] font-bold text-slate-800 tracking-tight max-w-[400px]">
              Refund claim submitted!
            </h2>
            
            <p className="text-[0.95rem] text-slate-500 font-medium max-w-[420px] leading-relaxed mb-8">
              We've received your request and our team will review it. You can expect a response within 3-5 business days.
            </p>

            <button
              onClick={() => {
                resetForms();
                setViewState("list");
              }}
              className="w-full max-w-[280px] py-3.5 mt-4 rounded-lg text-[0.95rem] font-bold bg-[#09A6A4] text-white shadow-lg shadow-[#09A6A4]/20 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              Continue
            </button>

          </div>
        ) : viewState === "safety" ? (
          /* ========================================================= */
          /* 8. SAFETY SHIELD CLAIM FORM (Image 2) */
          /* ========================================================= */
          <div className="max-w-[700px] mx-auto w-full space-y-6 pt-4 relative animate-in fade-in duration-300">
            <button
              onClick={() => setViewState("list")}
              className="absolute top-2 left-0 w-10 h-10 rounded-full bg-[#949CA9] text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-20 focus:outline-none animate-in fade-in"
            >
              <ChevronLeft size={22} />
            </button>

            <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-3">
              Safety Shield Claim
            </h2>

            <div className="space-y-5 pt-4">
              
              {/* Swap ID */}
              <div className="space-y-2">
                <label className="text-[0.95rem] text-slate-800 font-semibold pl-1">
                  Swap ID
                </label>
                <input
                  type="text"
                  value={safetySwapId}
                  onChange={(e) => setSafetySwapId(e.target.value)}
                  placeholder="Enter Swap ID"
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-[#F1F5F9]/40 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all leading-relaxed"
                />
              </div>

              {/* Swap Amount */}
              <div className="space-y-2">
                <label className="text-[0.95rem] text-slate-800 font-semibold pl-1">
                  Swap Amount
                </label>
                <input
                  type="text"
                  value={safetyAmount}
                  onChange={(e) => setSafetyAmount(e.target.value)}
                  placeholder="Enter Swap Amount"
                  className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-[#F1F5F9]/40 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all leading-relaxed"
                />
              </div>

              {/* What Went Wrong dropdown */}
              <div className="space-y-2 relative">
                <label className="text-[0.95rem] text-slate-800 font-semibold pl-1">
                  What Went Wrong?
                </label>
                <div className="relative">
                  <select
                    value={safetyIssue}
                    onChange={(e) => setSafetyIssue(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-[#F1F5F9]/40 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select Issue</option>
                    <option value="Escrow Release Failure">Partner did not release escrow</option>
                    <option value="Payment Issue">Payment not received</option>
                    <option value="Swap Dispute">Dispute during swap</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ChevronDown size={18} className="text-slate-500" />
                  </div>
                </div>
              </div>

              {/* Describe What Happened */}
              <div className="space-y-2">
                <label className="text-[0.95rem] text-slate-800 font-semibold pl-1">
                  Describe What Happened
                </label>
                <textarea
                  value={safetyDetail}
                  onChange={(e) => setSafetyDetail(e.target.value)}
                  placeholder="Provide Detailed Information About What Went Wrong"
                  className="w-full min-h-[140px] p-4 rounded-xl border border-slate-200 bg-[#F1F5F9]/40 text-slate-600 font-medium placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all leading-relaxed"
                />
              </div>

              {/* Attachments */}
              <div className="space-y-2">
                <label className="text-[0.95rem] text-slate-800 font-semibold pl-1 block leading-tight">
                  Upload evidence <span className="text-slate-400 font-medium text-[0.8rem] block sm:inline sm:pl-1">(Proof of payment, screenshots, chat history, bank confirmation)</span>
                </label>
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-lg text-slate-700 text-[0.88rem] hover:bg-slate-50 transition-colors shadow-xs mt-1">
                  <Upload size={16} />
                  <span>Choose file</span>
                </button>
              </div>

              {/* Declaration */}
              <div className="pt-2 text-[0.85rem] text-slate-500 leading-relaxed font-semibold">
                <span className="text-slate-700 font-bold block pb-0.5">Declaration</span>
                By submitting this request, you confirm that all information provided is accurate and that you are requesting a reimbursement in accordance with the platform's Safety Shield Policy.
              </div>

              {/* Submit */}
              <div className="pt-6 flex justify-center">
                <button
                  onClick={() => setViewState("safety_success")}
                  className="w-full sm:w-auto px-16 py-3.5 rounded-lg text-[0.95rem] font-bold bg-[#09A6A4] text-white shadow-lg shadow-[#09A6A4]/20 hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  Submit
                </button>
              </div>

            </div>
          </div>
        ) : viewState === "safety_success" ? (
          /* ========================================================= */
          /* 9. SAFETY SUCCESS (Image 3 - Right) */
          /* ========================================================= */
          <div className="max-w-[650px] mx-auto w-full space-y-6 pt-10 pb-4 animate-in zoom-in-95 duration-500 flex flex-col items-center text-center relative">
            
            {/* Confetti Animation Circle */}
            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
              <div className="absolute inset-0 w-full h-full animate-spin-slow">
                <div className="absolute top-0 left-1/2 w-1.5 h-4 bg-[#09A6A4] rounded-full rotate-45" />
                <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-amber-400 rounded-full" />
                <div className="absolute top-1/4 right-0 w-1.5 h-3 bg-blue-400 rounded-full -rotate-12" />
                <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-[#09A6A4] rounded-full" />
                <div className="absolute top-1/3 left-0 w-2 h-2 bg-pink-400 rounded-full" />
              </div>
              <div className="w-24 h-24 bg-[#09A6A4] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(9,166,164,0.3)] z-10">
                <Check className="text-white w-12 h-12" strokeWidth={4} />
              </div>
            </div>

            <h2 className="text-[1.3rem] font-bold text-slate-800 tracking-tight max-w-[400px]">
              Safety Shield claim submitted!
            </h2>
            
            <p className="text-[0.95rem] text-slate-500 font-medium max-w-[420px] leading-relaxed mb-8">
              We've received your request and our team will review it. You can expect a response within 3-5 business days.
            </p>

            <button
              onClick={() => {
                resetForms();
                setViewState("list");
              }}
              className="w-full max-w-[280px] py-3.5 mt-4 rounded-lg text-[0.95rem] font-bold bg-[#09A6A4] text-white shadow-lg shadow-[#09A6A4]/20 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              Continue
            </button>

          </div>
        ) : null}
      </GlassContainer>
    </div>
  );
}
