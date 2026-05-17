"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { X } from "lucide-react";

// Sub-components import
import TicketList from "./components/TicketList";
import CreateTicket from "./components/CreateTicket";
import SuccessMessage from "./components/SuccessMessage";
import TicketDetail from "./components/TicketDetail";
import TicketReply from "./components/TicketReply";
import RefundRequest from "./components/RefundRequest";
import RefundSuccess from "./components/RefundSuccess";
import SafetyShieldClaim from "./components/SafetyShieldClaim";
import SafetySuccess from "./components/SafetySuccess";

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
            className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#949CA9] text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-20 focus:outline-none animate-in fade-in cursor-pointer"
          >
            <X size={18} />
          </button>
        )}

        {viewState === "list" ? (
          <TicketList
            mockTickets={mockTickets}
            onTicketClick={handleTicketClick}
            onCreateTicket={() => setViewState("create")}
            onRefundClick={() => setViewState("refund")}
            onSafetyClick={() => setViewState("safety")}
          />
        ) : viewState === "create" ? (
          <CreateTicket
            enquiryType={enquiryType}
            setEnquiryType={setEnquiryType}
            description={description}
            setDescription={setDescription}
            onBack={() => setViewState("list")}
            onSubmit={() => setViewState("success")}
          />
        ) : viewState === "success" ? (
          <SuccessMessage
            onContinue={() => {
              setDescription("");
              setViewState("list");
            }}
          />
        ) : viewState === "detail" ? (
          <TicketDetail
            selectedTicket={selectedTicket}
            onBack={() => setViewState("list")}
            onReply={() => setViewState("reply")}
          />
        ) : viewState === "reply" ? (
          <TicketReply
            selectedTicket={selectedTicket}
            replyText={replyText}
            setReplyText={setReplyText}
            onBack={() => setViewState("detail")}
            onSend={() => {
              if (replyText.trim()) {
                setSelectedTicket((prev: any) => ({
                  ...prev,
                  supportBody: prev.supportBody + "\n\nReply sent:\n" + replyText
                }));
                setReplyText("");
                setViewState("detail");
              }
            }}
          />
        ) : viewState === "refund" ? (
          <RefundRequest
            refundFeeType={refundFeeType}
            setRefundFeeType={setRefundFeeType}
            refundSwapId={refundSwapId}
            setRefundSwapId={setRefundSwapId}
            refundReason={refundReason}
            setRefundReason={setRefundReason}
            refundDetail={refundDetail}
            setRefundDetail={setRefundDetail}
            onBack={() => setViewState("list")}
            onSubmit={() => setViewState("refund_success")}
          />
        ) : viewState === "refund_success" ? (
          <RefundSuccess
            onContinue={() => {
              resetForms();
              setViewState("list");
            }}
          />
        ) : viewState === "safety" ? (
          <SafetyShieldClaim
            safetySwapId={safetySwapId}
            setSafetySwapId={setSafetySwapId}
            safetyAmount={safetyAmount}
            setSafetyAmount={setSafetyAmount}
            safetyIssue={safetyIssue}
            setSafetyIssue={setSafetyIssue}
            safetyDetail={safetyDetail}
            setSafetyDetail={setSafetyDetail}
            onBack={() => setViewState("list")}
            onSubmit={() => setViewState("safety_success")}
          />
        ) : viewState === "safety_success" ? (
          <SafetySuccess
            onContinue={() => {
              resetForms();
              setViewState("list");
            }}
          />
        ) : null}
      </GlassContainer>
    </div>
  );
}
