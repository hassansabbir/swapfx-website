import React from "react";
import { Shield } from "lucide-react";
import { ChatMessage } from "./types";

interface MessageBubbleProps {
  msg: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ msg }) => {
  const isMe = msg.sender === "me";

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
