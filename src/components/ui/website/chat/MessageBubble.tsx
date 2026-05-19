import React from "react";
import { Shield, AlertCircle, CheckCircle } from "lucide-react";
import { ChatMessage } from "./types";

interface MessageBubbleProps {
  msg: ChatMessage;
  onApproveCancellation?: (msgId: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ msg, onApproveCancellation }) => {
  const isMe = msg.sender === "me";

  if (msg.isCancellationRequest) {
    return (
      <div className="flex gap-3 max-w-[85%] animate-in fade-in duration-300">
        {/* Sender Avatar */}
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

        {/* Message Column */}
        <div className="space-y-1.5 flex-1">
          {/* Sender Name */}
          <span className="text-[0.88rem] font-bold text-slate-800 pl-1 block">
            {msg.senderName}
          </span>

          {/* Cancellation Card details box */}
          <div className="bg-white rounded-[1.25rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-5 overflow-hidden flex flex-col space-y-4 max-w-[580px] w-full">
            {/* Header info */}
            <div className="flex items-center gap-2.5 text-rose-500">
              <AlertCircle size={20} className="shrink-0" />
              <h4 className="text-[1.02rem] font-bold tracking-tight leading-tight">
                Cancellation Request
              </h4>
            </div>

            {/* Description */}
            <p className="text-[0.88rem] font-medium text-slate-600 leading-relaxed">
              Your counter swapper wants to cancel this swap. Any fee you pay will be refunded if you approve. Do you want to approve the cancellation request?
            </p>

            {/* Approve Button / Approved State */}
            {msg.cancellationApproved ? (
              <div className="space-y-3">
                <div className="h-px bg-slate-100/85" />
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-[0.92rem]">
                  <CheckCircle size={18} className="shrink-0" />
                  <span>Swap Cancelled</span>
                </div>
                <p className="text-[0.82rem] font-medium text-slate-500 leading-relaxed">
                  The swap has been successfully cancelled and your fee will be refunded.
                </p>
              </div>
            ) : (
              <div className="w-full pt-1">
                <button
                  onClick={() => onApproveCancellation && onApproveCancellation(msg.id)}
                  className="w-full py-2.5 rounded-xl bg-rose-500 text-white text-[0.88rem] font-bold hover:bg-rose-600 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-sm shadow-rose-500/10 cursor-pointer focus:outline-none"
                >
                  Approve
                </button>
              </div>
            )}
          </div>

          {/* Timestamp */}
          <span className="text-[0.72rem] text-slate-400 font-semibold block text-left max-w-[580px] pr-2 pt-0.5">
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
