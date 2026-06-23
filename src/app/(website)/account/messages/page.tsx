"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { ChevronLeft, ChevronRight, Paperclip, X, ArrowRight, FileText, Image as ImageIcon } from "lucide-react";

type ViewState = "list" | "detail" | "reply" | "thread";

export default function AccountMessagesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"inbox" | "sent">("inbox");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewState, setViewState] = useState<ViewState>("list");
  const [replyText, setReplyText] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [viewState]);

  const inboxMessages = [
    {
      id: 1,
      sender: "Support Team",
      subject: "Password Change Problem",
      date: "Oct 24, 2026 11:20 AM",
      hasAttachment: false,
      unread: true,
      body: "Thank you for reaching out. We have received your inquiry regarding the duplicate charge on your account. I have forwarded this to our billing department for a thorough investigation.\n\nTypically, duplicate charges like this are cleared within 24-48 business hours once verified. We will notify you here as soon as the refund has been initiated."
    },
    {
      id: 2,
      sender: "Support Team",
      subject: "Payment not reflecting in account",
      date: "Oct 24, 2026 11:20 AM",
      hasAttachment: true,
      unread: false,
      body: "We are checking the payment gateway logs."
    },
    {
      id: 3,
      sender: "Support Team",
      subject: "Password Change Problem",
      date: "Oct 24, 2026 11:20 AM",
      hasAttachment: false,
      unread: false,
      body: "Please verify your email address."
    },
    {
      id: 4,
      sender: "Support Team",
      subject: "Password Change Problem",
      date: "Oct 24, 2026 11:20 AM",
      hasAttachment: false,
      unread: false,
      body: "Please verify your email address."
    },
    {
      id: 5,
      sender: "Support Team",
      subject: "Password Change Problem",
      date: "Oct 24, 2026 11:20 AM",
      hasAttachment: false,
      unread: false,
      body: "Please verify your email address."
    },
    {
      id: 6,
      sender: "Support Team",
      subject: "Password Change Problem",
      date: "Oct 24, 2026 11:20 AM",
      hasAttachment: false,
      unread: false,
      body: "Please verify your email address."
    },
  ];

  const handleMessageClick = (msg: any) => {
    setSelectedMessage(msg);
    setViewState("detail");
  };

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1000px] mx-auto w-full animate-in fade-in duration-500">
      <GlassContainer className="p-6 md:p-12 relative bg-white/40 border border-white/60 shadow-2xl rounded-4xl flex flex-col justify-center min-h-[550px]">
        
        {/* Close Button top right (Only on List page) */}
        {(viewState === "list") && (
          <button
            onClick={() => router.back()}
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#949CA9] text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-20 focus:outline-none"
          >
            <X size={18} />
          </button>
        )}

        {viewState === "list" ? (
          /* ========================================================= */
          /* 1. MESSAGES LIST */
          /* ========================================================= */
          <div className="max-w-[800px] mx-auto w-full pt-4 pb-4 space-y-6 animate-in fade-in duration-300">
            <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-2 mt-8">
              Messages
            </h2>

            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("inbox")}
                className={`px-6 py-2 rounded-full font-bold text-[0.88rem] transition-all cursor-pointer ${
                  activeTab === "inbox"
                    ? "bg-[#09A6A4] text-white shadow-md shadow-[#09A6A4]/25"
                    : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                Inbox
              </button>
              <button
                onClick={() => setActiveTab("sent")}
                className={`px-6 py-2 rounded-full font-bold text-[0.88rem] transition-all cursor-pointer ${
                  activeTab === "sent"
                    ? "bg-[#09A6A4] text-white shadow-md shadow-[#09A6A4]/25"
                    : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                Sent
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-[0_4px_25px_rgba(0,0,0,0.01)] overflow-hidden divide-y divide-slate-100/80">
              {inboxMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  onClick={() => handleMessageClick(msg)}
                  className={`p-5 flex items-start gap-4 transition-all hover:bg-slate-50/50 cursor-pointer ${
                    msg.unread ? "bg-white" : "bg-white/60"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-[#38BDF8] text-white flex items-center justify-center font-bold text-[0.95rem] shrink-0 shadow-xs">
                    ST
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 text-[0.95rem] leading-none">
                        {msg.sender}
                      </span>
                      <span className="text-[0.78rem] text-slate-400 font-medium">
                        {msg.date}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-0.5">
                      <p className={`text-[0.88rem] truncate pr-4 ${
                        msg.unread ? "font-bold text-slate-800" : "font-medium text-slate-500"
                      }`}>
                        {msg.subject}
                      </p>

                      {msg.hasAttachment ? (
                        <Paperclip size={16} className="text-slate-400 shrink-0" />
                      ) : (
                        <ArrowRight size={16} className="text-[#09A6A4] shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-6">
              <button className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full border border-slate-200 bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center focus:outline-none">
                <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>

              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full font-bold text-[0.88rem] transition-colors flex items-center justify-center focus:outline-none cursor-pointer ${
                    num > 3 ? "hidden sm:flex" : ""
                  } ${
                    currentPage === num
                      ? "bg-[#09A6A4] text-white shadow-md"
                      : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {num}
                </button>
              ))}

              <span className="text-slate-400 font-medium px-1">...</span>

              <button
                onClick={() => setCurrentPage(10)}
                className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full font-bold text-[0.88rem] transition-colors flex items-center justify-center focus:outline-none cursor-pointer ${
                  currentPage === 10
                    ? "bg-[#09A6A4] text-white shadow-md"
                    : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                }`}
              >
                10
              </button>

              <button className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full border border-slate-200 bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center focus:outline-none">
                <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>
          </div>
        ) : viewState === "detail" ? (
          /* ========================================================= */
          /* 2. RECEIVED MESSAGE DETAILS */
          /* ========================================================= */
          <div className="max-w-[750px] mx-auto w-full space-y-6 pt-4 relative animate-in fade-in duration-300">
            <button
              onClick={() => setViewState("list")}
              className="absolute top-2 left-0 w-10 h-10 rounded-full bg-[#949CA9] text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-20 focus:outline-none"
            >
              <ChevronLeft size={22} />
            </button>

            <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-2 mt-8">
              Messages
            </h2>

            <div className="border-b border-slate-200/80 pb-4">
              <p className="text-[0.95rem] text-slate-500 pl-1 font-semibold">
                Subject: <span className="text-slate-400 font-medium ml-3">{selectedMessage?.subject || "Password Change Problem"}</span>
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden mt-6">
              {/* Card Header */}
              <div className="bg-slate-50/70 border-b border-slate-100 px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                <span className="font-bold text-slate-800 text-[0.92rem]">Support Team</span>
                <span className="text-[0.72rem] text-slate-400 font-bold uppercase tracking-wider">
                  {selectedMessage?.date || "OCT 24, 2026 11:20 AM"}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <p className="text-[0.92rem] text-slate-700 leading-relaxed font-medium">
                  Hello,
                </p>
                <p className="text-[0.92rem] text-slate-700 leading-relaxed font-medium whitespace-pre-line">
                  {selectedMessage?.body || "Thank you for reaching out. We have received your inquiry regarding the duplicate charge on your account. I have forwarded this to our billing department for a thorough investigation.\n\nTypically, duplicate charges like this are cleared within 24-48 business hours once verified. We will notify you here as soon as the refund has been initiated."}
                </p>
                <div className="pt-2 space-y-0.5">
                  <p className="text-[0.92rem] text-slate-700 leading-relaxed font-medium">Best regards,</p>
                  <p className="text-[0.92rem] text-slate-700 leading-relaxed font-semibold">Linear Protocol Support</p>
                </div>
              </div>
            </div>

            {/* Reply Button */}
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
          /* 3. REPLY EDITOR FORM */
          /* ========================================================= */
          <div className="max-w-[750px] mx-auto w-full space-y-6 pt-4 relative animate-in fade-in duration-300">
            {/* Close button top right */}
            <button
              onClick={() => setViewState("detail")}
              className="absolute top-2 right-0 w-10 h-10 rounded-full bg-[#949CA9] text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-20 focus:outline-none"
            >
              <X size={20} />
            </button>

            <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-3 mt-8">
              Messages
            </h2>

            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.015)] overflow-hidden flex flex-col min-h-[420px]">

              {/* To Header */}
              <div className="border-b border-slate-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-6 text-[0.92rem]">
                <span className="text-slate-400 font-bold sm:w-14 sm:shrink-0">To:</span>
                <span className="text-slate-700 font-semibold">Support Team</span>
              </div>

              {/* Subject Header */}
              <div className="border-b border-slate-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-6 text-[0.92rem]">
                <span className="text-slate-400 font-bold sm:w-14 sm:shrink-0">Subject:</span>
                <span className="text-slate-400 font-medium">Re: {selectedMessage?.subject || "Password Change Problem"}</span>
              </div>

              {/* Text Area Container */}
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

              {/* Actions Footer Container */}
              <div className="bg-[#F8FAFC]/80 border-t border-slate-100/80 px-6 py-5 flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (replyText.trim()) {
                        setViewState("thread");
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
        ) : viewState === "thread" ? (
          /* ========================================================= */
          /* 4. CONVERSATION THREAD DETAILS */
          /* ========================================================= */
          <div className="max-w-[750px] mx-auto w-full space-y-6 pt-4 relative animate-in fade-in duration-300">
            <button
              onClick={() => {
                setReplyText("");
                setViewState("list");
              }}
              className="absolute top-2 left-0 w-10 h-10 rounded-full bg-[#949CA9] text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-20 focus:outline-none"
            >
              <ChevronLeft size={22} />
            </button>

            <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-2 mt-8">
              Messages
            </h2>

            <div className="border-b border-slate-200/80 pb-4">
              <p className="text-[0.95rem] text-slate-500 pl-1 font-semibold">
                Subject: <span className="text-slate-400 font-medium ml-3">Re: {selectedMessage?.subject || "Password Change Problem"}</span>
              </p>
            </div>

            {/* Combined Thread container */}
            <div className="space-y-6 mt-6">
              
              {/* Message 1 (From Support) */}
              <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="bg-slate-50/70 border-b border-slate-100 px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                  <span className="font-bold text-slate-800 text-[0.92rem]">Support Team</span>
                  <span className="text-[0.72rem] text-slate-400 font-bold uppercase tracking-wider">
                    OCT 24, 2026 11:20 AM
                  </span>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-[0.92rem] text-slate-700 leading-relaxed font-medium">Hello,</p>
                  <p className="text-[0.92rem] text-slate-700 leading-relaxed font-medium whitespace-pre-line">
                    Thank you for reaching out. We have received your inquiry regarding the duplicate charge on your account. I have forwarded this to our billing department for a thorough investigation.
                  </p>
                  <p className="text-[0.92rem] text-slate-700 leading-relaxed font-medium">
                    Typically, duplicate charges like this are cleared within 24-48 business hours once verified. We will notify you here as soon as the refund has been initiated.
                  </p>
                  <div className="pt-2">
                    <p className="text-[0.92rem] text-slate-700 leading-relaxed font-medium">Best regards,</p>
                    <p className="text-[0.92rem] text-slate-700 leading-relaxed font-semibold">Linear Protocol Support</p>
                  </div>
                </div>
              </div>

              {/* Message 2 (From User - Reply) */}
              <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="bg-slate-50/70 border-b border-slate-100 px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 text-[0.92rem]">You</span>
                    <span className="bg-slate-200 text-slate-500 text-[0.68rem] font-bold px-2 py-0.5 rounded">Customer</span>
                  </div>
                  <span className="text-[0.72rem] text-slate-400 font-bold uppercase tracking-wider">
                    OCT 24, 2026 11:20 AM
                  </span>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="space-y-4 text-[0.92rem] text-slate-700 leading-relaxed font-medium">
                    <p>
                      I am writing regarding a recent transaction on my account that appears to have been processed twice. The transaction occurred on October 22nd for the amount of $149.00.
                    </p>
                    <p>
                      I have checked my bank statement and can see two identical charges from "Linear Protocol" with the same timestamp. I only intended to purchase the Annual Pro Plan once.
                    </p>
                    <p>
                      Could you please investigate this and process a refund for the duplicate charge as soon as possible? I have attached the invoice receipts for both transactions below for your reference.
                    </p>
                  </div>

                  {/* Attachments Section */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <span className="text-[0.72rem] text-slate-400 font-bold tracking-wider block">
                      📎 2 ATTACHMENTS
                    </span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[500px]">
                      {/* Attachment A */}
                      <div className="border border-slate-200 bg-white rounded-xl p-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                          <FileText size={20} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[0.8rem] font-bold text-slate-700 truncate">Invoice_OCT_22_A.pdf</p>
                          <p className="text-[0.7rem] text-slate-400 font-semibold">1.2 MB</p>
                        </div>
                      </div>

                      {/* Attachment B */}
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

            </div>

            {/* Bottom Reply Button */}
            <div className="pt-6 flex justify-center">
              <button 
                onClick={() => setViewState("reply")}
                className="w-full max-w-[280px] py-3.5 rounded-lg text-[0.95rem] font-bold bg-[#09A6A4] text-white shadow-lg shadow-[#09A6A4]/20 hover:scale-[1.02] transition-transform cursor-pointer"
              >
                Reply
              </button>
            </div>
          </div>
        ) : null}
      </GlassContainer>
    </div>
  );
}
