"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { IconButton } from "@/components/ui/IconButton";

interface Match {
  id: string;
  name: string;
  username: string;
  want: string;
  offer: string;
  type: "perfect" | "close" | "partial" | null;
  avatar: string;
  country: string;
  isVerified: boolean;
}

const MOCK_PAGE_MATCHES: Match[] = [
  {
    id: "1",
    name: "Miss. Bob Builder",
    username: "@BobBuilder7890",
    want: "₱28,000",
    offer: "$500",
    type: "perfect",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    country: "🇺🇸",
    isVerified: true,
  },
  {
    id: "2",
    name: "Miss. Bob Builder",
    username: "@BobBuilder7890",
    want: "₱15,000",
    offer: "$270",
    type: "close",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Builder",
    country: "🇺🇸",
    isVerified: true,
  },
  {
    id: "3",
    name: "Miss. Bob Builder",
    username: "@BobBuilder7890",
    want: "₱15,000",
    offer: "$700",
    type: "partial",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fahim",
    country: "🇺🇸",
    isVerified: true,
  },
  {
    id: "4",
    name: "Miss. Bob Builder",
    username: "@BobBuilder7890",
    want: "₱15,000",
    offer: "$700",
    type: null,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    country: "🇺🇸",
    isVerified: true,
  },
  {
    id: "5",
    name: "Miss. Bob Builder",
    username: "@BobBuilder7890",
    want: "₱15,000",
    offer: "$700",
    type: null,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace",
    country: "🇺🇸",
    isVerified: true,
  },
];

const badgeStyles: Record<string, string> = {
  perfect: "bg-[#09A6A4] text-white",
  close: "bg-[#27AE60] text-white",
  partial: "bg-[#E67E22] text-white",
};

const badgeLabels: Record<string, string> = {
  perfect: "Perfect Match",
  close: "Close Match",
  partial: "Partial Match",
};

export default function MatchesPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="py-8 md:py-12 px-4 w-full animate-in fade-in duration-400">
      {/* GlassContainer at full 1150px default width */}
      <GlassContainer className="relative bg-white/20 border border-white/50 shadow-xl p-6 md:p-10 overflow-visible">
        {/* ── X Close button – inside glass container, top-right corner ── */}
        <IconButton
          href="/"
          className="absolute top-5 right-5 md:top-6 md:right-6 z-20
                     w-11 h-11
                     bg-slate-300/70 hover:bg-slate-400/80
                     shadow-md backdrop-blur-sm
                     text-slate-600 hover:text-slate-800"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </IconButton>

        {/* Inner content wrapper – keeps cards at 680px centered */}
        <div className="w-full max-w-[680px] mx-auto flex flex-col items-center">
          {/* Title */}
          <h2 className="text-[1.5rem] font-bold text-slate-800 tracking-tight text-center mb-6">
            Matches
          </h2>

          {/* ── Match Cards ── */}
          <div className="w-full space-y-3">
            {MOCK_PAGE_MATCHES.map((match) => (
              <div
                key={match.id}
                onClick={() => router.push("/swap/confirmation?from=swap")}
                className="relative bg-white rounded-2xl border border-slate-100 shadow-sm
                           cursor-pointer group
                           hover:shadow-md hover:border-slate-200
                           transition-all duration-200"
              >
                {/* Badge – overlaps the top-left corner of the card */}
                {match.type && (
                  <span
                    className={cn(
                      "absolute -top-px left-3 px-3 py-[3px] rounded-b-xl",
                      "text-[0.7rem] font-semibold tracking-wide",
                      badgeStyles[match.type],
                    )}
                  >
                    {badgeLabels[match.type]}
                  </span>
                )}

                {/* Card body */}
                <div className={cn("px-4 pb-3", match.type ? "pt-6" : "pt-4")}>
                  {/* Top row: avatar + name + chevron */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-100 shrink-0">
                        <img
                          src={match.avatar}
                          alt={match.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Name + username */}
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-[0.95rem] text-slate-800 leading-tight">
                            {match.name}
                          </span>
                          {match.isVerified && (
                            <CheckCircle2 className="w-[15px] h-[15px] text-[#39E75F] fill-[#39E75F] shrink-0" />
                          )}
                        </div>
                        <p className="text-[0.75rem] text-slate-400 mt-px">
                          {match.username}&nbsp;{match.country}
                        </p>
                      </div>
                    </div>

                    {/* Chevron */}
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#09A6A4] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>

                  {/* Bottom row: Want / Offer */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-50">
                    <p className="text-[0.78rem] text-slate-500">
                      Want&nbsp;
                      <span className="font-bold text-slate-700">
                        {match.want}
                      </span>
                    </p>
                    <p className="text-[0.78rem] text-slate-500">
                      Offer&nbsp;
                      <span className="font-bold text-slate-700">
                        {match.offer}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Pagination ── */}
          <div className="flex items-center justify-center gap-1 mt-8">
            {/* Prev arrow */}
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full
                         text-slate-400 hover:text-slate-700 hover:bg-slate-100
                         transition-colors text-base"
            >
              ←
            </button>

            {/* Page 1 – active */}
            <button
              onClick={() => setCurrentPage(1)}
              className="w-8 h-8 rounded-full bg-[#09A6A4] text-white text-sm font-bold
                         flex items-center justify-center shadow-sm shadow-teal-200"
            >
              1
            </button>

            {/* Pages 2-6 */}
            {[2, 3, 4, 5, 6].map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={cn(
                  "w-8 h-8 rounded-full text-sm font-medium flex items-center justify-center transition-colors",
                  currentPage === p
                    ? "bg-[#09A6A4] text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-100",
                )}
              >
                {p}
              </button>
            ))}

            {/* Ellipsis */}
            <span className="w-8 h-8 flex items-center justify-center text-slate-400 text-sm select-none">
              ...
            </span>

            {/* Page 10 */}
            <button
              onClick={() => setCurrentPage(10)}
              className="w-8 h-8 rounded-full text-sm font-medium text-slate-500 hover:bg-slate-100 flex items-center justify-center transition-colors"
            >
              10
            </button>

            {/* Next arrow */}
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full
                         text-slate-400 hover:text-slate-700 hover:bg-slate-100
                         transition-colors text-base"
            >
              →
            </button>
          </div>
        </div>
        {/* end inner content wrapper */}
      </GlassContainer>
    </div>
  );
}
