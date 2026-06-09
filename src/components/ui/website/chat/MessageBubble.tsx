import React, { useState, useEffect } from "react";
import { Shield, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { ChatMessage } from "./types";
import { Button } from "../../Button";

interface MessageBubbleProps {
  msg: ChatMessage;
  onApproveCancellation?: (msgId: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ msg, onApproveCancellation }) => {
  const [isMe, setIsMe] = useState(msg.sender === "me");

  useEffect(() => {
    setIsMe(msg.sender === "me");
  }, [msg.sender]);

  if (msg.isCancellationRequest) {
    return (
      <div className={`flex gap-3 max-w-[85%] animate-in fade-in duration-300 ${isMe ? "ml-auto flex-row-reverse" : ""}`}>
        {/* Sender Avatar */}
        {!isMe && (
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

        {/* Message Column */}
        <div className="space-y-1.5 flex-1">
          {/* Sender Name */}
          {!isMe && (
            <span className="text-[0.88rem] font-bold text-slate-800 pl-1 block">
              {msg.senderName}
            </span>
          )}

          {/* Cancellation Card details box */}
          <div className={`bg-white rounded-[1.25rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-5 overflow-hidden flex flex-col space-y-4 max-w-[580px] w-full relative ${isMe ? "ml-auto" : ""}`}>
            {/* Demo toggle button */}
            <button
              onClick={() => setIsMe(!isMe)}
              className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-rose-500 hover:bg-slate-100 transition-colors z-20 cursor-pointer"
              title="Toggle Sender/Receiver View"
            >
              <RefreshCw size={14} />
            </button>

            {/* Header info */}
            <div className="flex items-center gap-2.5 text-rose-500">
              <AlertCircle size={20} className="shrink-0" />
              <h4 className="text-[1.02rem] font-bold tracking-tight leading-tight">
                {isMe ? "Cancellation Request Sent" : "Cancellation Request"}
              </h4>
            </div>

            {/* Description */}
            <p className="text-[0.88rem] font-medium text-slate-600 leading-relaxed">
              {isMe
                ? "Your cancellation request has been sent to the counter swapper for approval."
                : "You’ve received a cancellation request from the counter swapper."}
            </p>

            {/* Action Buttons */}
            <div className="w-full pt-1">
              {msg.cancellationApproved ? (
                <div className="space-y-3">
                  <div className="h-px bg-slate-100/85" />
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-[0.92rem]">
                    <CheckCircle size={18} className="shrink-0" />
                    <span>Swap Cancelled</span>
                  </div>
                </div>
              ) : (
                <div className="w-full flex gap-3">
                  <Button
                    onClick={() => onApproveCancellation && onApproveCancellation(msg.id)}
                    className="flex-1"
                    variant="primary"
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => setIsMe(true)} // Mock reject by switching to sender
                    className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                    variant="white"
                  >
                    Reject
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Timestamp */}
          <span className={`text-[0.72rem] text-slate-400 font-semibold block pt-0.5 max-w-[580px] ${isMe ? "text-right pr-2 ml-auto" : "text-left pl-2 mr-auto"}`}>
            {msg.time}
          </span>
        </div>
      </div>
    );
  }

  if (msg.isReinstateRequest) {
    return (
      <div className={`flex gap-3 max-w-[85%] animate-in fade-in duration-300 ${isMe ? "ml-auto flex-row-reverse" : ""}`}>
        {/* Sender Avatar */}
        {!isMe && (
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

        {/* Message Column */}
        <div className="space-y-1.5 flex-1">
          {/* Sender Name */}
          {!isMe && (
            <span className="text-[0.88rem] font-bold text-slate-800 pl-1 block">
              {msg.senderName}
            </span>
          )}

          {/* Reinstate Card details box */}
          <div className={`bg-white rounded-[1.25rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-5 overflow-hidden flex flex-col space-y-4 max-w-[580px] w-full relative ${isMe ? "ml-auto" : ""}`}>
            {/* Demo toggle button */}
            <button
              onClick={() => setIsMe(!isMe)}
              className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-emerald-500 hover:bg-slate-100 transition-colors z-20 cursor-pointer"
              title="Toggle Sender/Receiver View"
            >
              <RefreshCw size={14} />
            </button>

            {/* Header info */}
            <div className="flex items-start gap-2.5 text-[#09A6A4]">
              <RefreshCw size={20} className="shrink-0 mt-0.5" />
              <h4 className="text-[1.02rem] font-bold tracking-tight leading-relaxed">
                {isMe
                  ? "Your reinstatement request has been sent to the contact swapper for approval."
                  : "You have received a reinstatement request from the counter swapper."}
              </h4>
            </div>

            {/* Action Buttons */}
            {isMe ? (
              <div className="w-full text-center pt-1 font-bold text-amber-500 text-[0.88rem]">
                waiting for approval of the other swapper
              </div>
            ) : (
              <div className="w-full pt-1">
                <div className="w-full flex gap-3">
                  <Link href="/swap/swap-payment?reinstated=true" className="flex-1">
                    <Button className="w-full" variant="primary">
                      Accept
                    </Button>
                  </Link>
                  <Button
                    onClick={() => setIsMe(true)} // Mock reject by switching to sender
                    className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                    variant="white"
                  >
                    Reject
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Timestamp */}
          <span className={`text-[0.72rem] text-slate-400 font-semibold block pt-0.5 max-w-[580px] ${isMe ? "text-right pr-2 ml-auto" : "text-left pl-2 mr-auto"}`}>
            {msg.time}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex gap-3 max-w-[85%] ${isMe ? "ml-auto flex-row-reverse" : ""}`}>
      {!isMe && (
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
        {!isMe && (
          <span className="text-[0.78rem] font-bold text-slate-500 pl-1 block">
            {msg.senderName}
          </span>
        )}

        <div
          className={`rounded-2xl px-5 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] w-fit
            ${
              isMe
                ? "bg-[#09A6A4] text-white rounded-tr-none ml-auto"
                : "bg-white text-slate-700 rounded-tl-none border border-slate-100"
            }
          `}
        >
          <p className="text-[0.92rem] font-medium leading-relaxed">
            {msg.message}
          </p>
        </div>

        <span
          className={`text-[0.72rem] text-slate-400 font-semibold block ${
            isMe ? "text-right" : "pl-1"
          }`}
        >
          {msg.time}
        </span>
      </div>
    </div>
  );
};
