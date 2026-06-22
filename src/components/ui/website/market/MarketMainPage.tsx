"use client";

import React, { useEffect, useRef, useState } from "react";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { Button } from "@/components/ui/Button";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Shield,
  CheckCircle2,
  Star,
  ArrowRight,
  ArrowLeft,
  ArrowRight as ArrowRightIcon,
  X,
} from "lucide-react";
import Link from "next/link";

interface MarketOffer {
  id: string;
  name: string;
  rating: string;
  reviews: number;
  offerAmount: string;
  wantAmount: string;
  rate: string;
  rateNote: string;
  requiredWithin: string;
  avatarUrl: string;
}

const MOCK_OFFERS: MarketOffer[] = [
  {
    id: "MKT-8821",
    name: "Bob Builder",
    rating: "4.7",
    reviews: 56,
    offerAmount: "200 GBP",
    wantAmount: "74,900 PKR",
    rate: "1 GBP = 10.00 PKR",
    rateNote: "(5% above market rate)",
    requiredWithin: "< 2 Days",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "MKT-8822",
    name: "Bob Builder",
    rating: "4.7",
    reviews: 56,
    offerAmount: "200 GBP",
    wantAmount: "74,900 PKR",
    rate: "1 GBP = 10.00 PKR",
    rateNote: "(5% above market rate)",
    requiredWithin: "< 2 Days",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
  },
];

const MarketMainPage = () => {
  const [corridorLeft, setCorridorLeft] = useState("USA");
  const [showLeftDrop, setShowLeftDrop] = useState(false);
  const [showRightDrop, setShowRightDrop] = useState(false);

  // Search & Filter Overlay States
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showFilterOverlay, setShowFilterOverlay] = useState(false);

  const [filterRequiredDate, setFilterRequiredDate] = useState("Select");
  const [filterRate, setFilterRate] = useState("Select");
  const [filterTrustScore, setFilterTrustScore] = useState("Select");
  const [filterPublishedDate, setFilterPublishedDate] = useState("Select");

  const countries = ["USA", "UK", "Europe", "Pakistan", "Canada", "Australia"];

  // Close any open dropdown when clicking outside of it
  const searchRef = useRef<HTMLDivElement>(null);
  const leftDropRef = useRef<HTMLDivElement>(null);
  const rightDropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (searchRef.current && !searchRef.current.contains(target)) {
        setShowSearchSuggestions(false);
      }
      if (leftDropRef.current && !leftDropRef.current.contains(target)) {
        setShowLeftDrop(false);
      }
      if (rightDropRef.current && !rightDropRef.current.contains(target)) {
        setShowRightDrop(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderFlag = (c: string) => {
    if (c === "USA") {
      return (
        <span className="flex items-center gap-2">
          <svg
            viewBox="0 0 74 39"
            className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm border border-slate-100/50"
          >
            <rect width="74" height="39" fill="#ffffff" />
            <rect width="74" height="3" y="0" fill="#b22234" />
            <rect width="74" height="3" y="6" fill="#b22234" />
            <rect width="74" height="3" y="12" fill="#b22234" />
            <rect width="74" height="3" y="18" fill="#b22234" />
            <rect width="74" height="3" y="24" fill="#b22234" />
            <rect width="74" height="3" y="30" fill="#b22234" />
            <rect width="74" height="3" y="36" fill="#b22234" />
            <rect width="32" height="21" fill="#3c3b6e" />
            <circle cx="4" cy="4" r="1" fill="#fff" />
            <circle cx="10" cy="4" r="1" fill="#fff" />
            <circle cx="16" cy="4" r="1" fill="#fff" />
            <circle cx="22" cy="4" r="1" fill="#fff" />
            <circle cx="28" cy="4" r="1" fill="#fff" />
            <circle cx="7" cy="9" r="1" fill="#fff" />
            <circle cx="13" cy="9" r="1" fill="#fff" />
            <circle cx="19" cy="9" r="1" fill="#fff" />
            <circle cx="25" cy="9" r="1" fill="#fff" />
            <circle cx="4" cy="14" r="1" fill="#fff" />
            <circle cx="10" cy="14" r="1" fill="#fff" />
            <circle cx="16" cy="14" r="1" fill="#fff" />
            <circle cx="22" cy="14" r="1" fill="#fff" />
            <circle cx="28" cy="14" r="1" fill="#fff" />
          </svg>
          <span>USA</span>
        </span>
      );
    }
    // Simple flags fallbacks for UK/Europe/PK/CA/AU to make them look uniform
    if (c === "UK") {
      return (
        <span className="flex items-center gap-2">
          <svg
            viewBox="0 0 60 30"
            className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm border border-slate-100/50"
          >
            <rect width="60" height="30" fill="#00247d" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
            <path
              d="M0,0 L60,30 M60,0 L0,30"
              stroke="#cf142b"
              strokeWidth="4"
            />
            <path
              d="M30,0 L30,30 M0,15 L60,15"
              stroke="#fff"
              strokeWidth="10"
            />
            <path
              d="M30,0 L30,30 M0,15 L60,15"
              stroke="#cf142b"
              strokeWidth="6"
            />
          </svg>
          <span>UK</span>
        </span>
      );
    }
    if (c === "Europe") {
      return (
        <span className="flex items-center gap-2">
          <svg
            viewBox="0 0 30 20"
            className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm border border-slate-100/50"
          >
            <rect width="30" height="20" fill="#003399" />
            <circle
              cx="15"
              cy="10"
              r="4"
              fill="none"
              stroke="#ffcc00"
              strokeWidth="1"
              strokeDasharray="1 1.5"
            />
          </svg>
          <span>Europe</span>
        </span>
      );
    }
    if (c === "Pakistan") {
      return (
        <span className="flex items-center gap-2">
          <svg
            viewBox="0 0 30 20"
            className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm border border-slate-100/50"
          >
            <rect width="30" height="20" fill="#115c30" />
            <rect width="10" height="20" fill="#ffffff" />
            <circle cx="20" cy="10" r="4.5" fill="#ffffff" />
            <circle cx="21.5" cy="8.5" r="4.5" fill="#115c30" />
            <polygon
              points="21,7 22,8.5 23.5,8 22.5,9.5 23.5,11 22,10.5 21,12 21,10.5 19.5,10 20.5,9.5"
              fill="#ffffff"
            />
          </svg>
          <span>Pakistan</span>
        </span>
      );
    }
    return <span>{c}</span>;
  };

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1200px] mx-auto w-full animate-in fade-in duration-700">
      <GlassContainer className="p-4 md:p-10 space-y-8">
        <div className="space-y-6 max-w-[750px] mx-auto">
          {/* Header Title */}
          <div className="text-center">
            <h1 className="text-[1.5rem] font-bold text-slate-800 tracking-tight">
              Market Place
            </h1>
          </div>

          {/* Search bar block */}
          <div className="relative" ref={searchRef}>
            <div className="flex gap-3 w-full">
              <div className="flex-1 bg-white rounded-xl border border-slate-100 flex items-center px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#09A6A4]/15 transition-all">
                <Search size={20} className="text-slate-400 mr-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setShowSearchSuggestions(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchSuggestions(true);
                  }}
                  placeholder="Search here"
                  className="w-full bg-transparent font-semibold text-slate-600 focus:outline-none text-[0.95rem]"
                />
              </div>
              <button
                onClick={() => setShowFilterOverlay(true)}
                className="w-12 h-12 shrink-0 rounded-xl bg-[#09A6A4] text-white flex items-center justify-center hover:bg-[#078d8b] transition-all shadow-md shadow-[#09A6A4]/20 hover:scale-[1.02]"
              >
                <SlidersHorizontal size={20} />
              </button>
            </div>

            {/* Search Suggestions Dropdown Overlay */}
            {showSearchSuggestions && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200/70 rounded-3xl shadow-xl z-50 p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex justify-end pr-1">
                  <button
                    onClick={() => setShowSearchSuggestions(false)}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors"
                  >
                    <X size={15} />
                  </button>
                </div>

                <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <Link
                      href="/profile/bob-builder"
                      key={index}
                      onClick={() => setShowSearchSuggestions(false)}
                      className="flex items-center gap-3 p-3 bg-white border border-slate-100 hover:border-[#09A6A4]/35 hover:shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-2xl transition-all cursor-pointer group"
                    >
                      {/* Avatar Circle with Badge */}
                      <div className="relative shrink-0 w-11 h-11">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                          alt="Bob Builder"
                          className="w-full h-full rounded-full object-cover"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 bg-[#FFBF00] rounded-full border border-white flex items-center justify-center shadow-sm">
                          <Shield
                            size={9}
                            className="text-white fill-current"
                          />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-[0.95rem] font-bold text-slate-800 group-hover:text-[#09A6A4] transition-colors leading-tight">
                            Bob Builder
                          </h4>
                          <CheckCircle2
                            size={14}
                            className="text-green-500 fill-current"
                          />
                        </div>
                        <div className="flex items-center gap-2 text-[0.78rem] text-slate-400 font-semibold leading-none">
                          <span>@fahimahmed7890</span>
                          <span className="text-[0.9rem] leading-none select-none">
                            🇺🇸
                          </span>
                          <span className="flex items-center gap-0.5 text-[0.75rem] text-slate-450 font-bold ml-1">
                            <Star
                              size={11}
                              className="text-yellow-400 fill-yellow-400"
                            />
                            <span>4.7 (56)</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Corridor Selectors */}
          <div className="space-y-2 relative">
            <h3 className="text-[0.9rem] font-bold text-slate-400 uppercase tracking-wider">
              Corridor
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Left Dropdown */}
              <div className="relative" ref={leftDropRef}>
                <div
                  onClick={() => {
                    setShowLeftDrop(!showLeftDrop);
                    setShowRightDrop(false);
                  }}
                  className="w-full bg-white rounded-xl px-4 py-3.5 border border-slate-100 flex items-center justify-between cursor-pointer shadow-sm hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-700 text-[0.95rem] select-none">
                    {renderFlag(corridorLeft)}
                  </span>
                  <ChevronDown size={18} className="text-slate-300" />
                </div>

                {showLeftDrop && (
                  <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
                    {countries.map((c) => (
                      <div
                        key={c}
                        onClick={() => {
                          setCorridorLeft(c);
                          setShowLeftDrop(false);
                        }}
                        className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer font-bold text-slate-600 text-[0.9rem]"
                      >
                        {renderFlag(c)}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Dropdown */}
              <div className="relative" ref={rightDropRef}>
                <div
                  onClick={() => {
                    setShowRightDrop(!showRightDrop);
                    setShowLeftDrop(false);
                  }}
                  className="w-full bg-white rounded-xl px-4 py-3.5 border border-slate-100 flex items-center justify-between cursor-pointer shadow-sm hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-400 text-[0.95rem] select-none">
                    Select
                  </span>
                  <ChevronDown size={18} className="text-slate-300" />
                </div>

                {showRightDrop && (
                  <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
                    {countries.map((c) => (
                      <div
                        key={c}
                        onClick={() => setShowRightDrop(false)}
                        className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer font-bold text-slate-600 text-[0.9rem]"
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-5 pt-3">
            {MOCK_OFFERS.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-4xl p-6 border border-slate-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6 hover:shadow-[0_12px_40px_rgb(0,0,0,0.04)] transition-all duration-300 group"
              >
                {/* Profile row */}
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0 w-11 h-11">
                    <div className="w-full h-full rounded-full border border-white shadow-sm overflow-hidden flex items-center justify-center bg-slate-100">
                      {offer.avatarUrl ? (
                        <img
                          src={offer.avatarUrl}
                          alt={offer.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-slate-400 font-bold text-xs uppercase">
                          {offer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      )}
                    </div>
                    {/* Gold Verification badge corner overlay */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#FFBF00] rounded-full border border-white flex items-center justify-center shadow-sm">
                      <Shield size={9} className="text-white fill-current" />
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-[1.02rem] font-bold text-slate-800 leading-tight">
                        {offer.name}
                      </h4>
                      <CheckCircle2
                        size={16}
                        className="text-[#10B981] fill-current"
                      />
                    </div>
                    <div className="flex items-center gap-1 text-[0.78rem] text-slate-400 font-semibold leading-none">
                      <Star
                        size={11}
                        className="text-yellow-400 fill-yellow-400"
                      />
                      <span>
                        {offer.rating} ({offer.reviews})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Offer vs Want amounts block */}
                <div className="flex items-center justify-between px-2">
                  <div className="space-y-1">
                    <span className="text-[0.72rem] font-bold text-slate-400 uppercase tracking-wider block">
                      Offer
                    </span>
                    <h2 className="text-[1.2rem] sm:text-[1.6rem] md:text-[2rem] font-extrabold text-slate-800 leading-none tracking-tight whitespace-nowrap">
                      {offer.offerAmount}
                    </h2>
                  </div>

                  <div className="text-teal-400 select-none animate-pulse">
                    <ArrowRightIcon size={24} strokeWidth={2.5} />
                  </div>

                  <div className="space-y-1 text-right">
                    <span className="text-[0.72rem] font-bold text-slate-400 uppercase tracking-wider block">
                      Want
                    </span>
                    <h2 className="text-[1.2rem] sm:text-[1.6rem] md:text-[2rem] font-extrabold text-[#09A6A4] leading-none tracking-tight whitespace-nowrap">
                      {offer.wantAmount}
                    </h2>
                  </div>
                </div>

                {/* Exchange Rates & timings details info */}
                <div className="flex justify-between items-baseline px-2 border-t border-slate-50 pt-5 text-[0.88rem]">
                  <div className="space-y-0.5">
                    <p className="text-slate-600 font-medium leading-none">
                      <span className="font-bold text-slate-800">Rate:</span>{" "}
                      {offer.rate}
                    </p>
                    <p className="text-[0.72rem] text-slate-400 font-medium leading-none pl-1">
                      {offer.rateNote}
                    </p>
                  </div>

                  <p className="text-slate-600 font-medium leading-none">
                    <span className="font-bold text-slate-800">Required:</span>{" "}
                    {offer.requiredWithin}
                  </p>
                </div>

                {/* Centered View Details Action Button */}
                <div className="flex justify-center pt-2 w-full">
                  <Link
                    href="/swap/confirmation?from=market"
                    className="w-full"
                  >
                    <Button className="w-full">View Details</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-3 pt-6">
            <button className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
              <ArrowLeft size={16} />
            </button>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[0.8rem] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)]
                  ${
                    num === 1
                      ? "bg-[#09A6A4] text-white shadow-sm shadow-[#09A6A4]/30"
                      : "bg-white text-slate-600 border border-slate-100 hover:bg-slate-50 hover:shadow-md"
                  }
                `}
                >
                  {num}
                </button>
              ))}
              <span className="text-slate-400 mx-1 text-[0.8rem]">...</span>
              <button className="w-9 h-9 rounded-full bg-white text-slate-600 border border-slate-100 flex items-center justify-center font-bold text-[0.8rem] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:bg-slate-50 hover:shadow-md">
                10
              </button>
            </div>

            <button className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </GlassContainer>

      {/* Filter Overlay Modal */}
      {showFilterOverlay && (
        <div className="fixed inset-0 bg-slate-900/35 backdrop-blur-xs flex items-center justify-center z-100 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 w-[92%] max-w-[480px] shadow-2xl border border-slate-200/45 space-y-5 relative animate-in zoom-in-95 duration-250">
            {/* Header */}
            <div className="flex justify-between items-center pb-1">
              <h3 className="text-[1.25rem] font-bold text-slate-800 tracking-tight">
                Filter
              </h3>
              <button
                onClick={() => setShowFilterOverlay(false)}
                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-650 flex items-center justify-center transition-colors focus:outline-none"
              >
                <X size={18} />
              </button>
            </div>

            {/* Sort By Required Date */}
            <div className="space-y-2">
              <label className="text-[0.88rem] font-semibold text-slate-600 block">
                Sort By Required Date
              </label>
              <div className="relative">
                <select
                  value={filterRequiredDate}
                  onChange={(e) => setFilterRequiredDate(e.target.value)}
                  className="w-full bg-slate-50/20 border border-slate-200/80 rounded-xl px-4 py-3 text-[0.88rem] font-semibold text-slate-600 focus:outline-none focus:border-[#09A6A4]/60 transition-all appearance-none cursor-pointer pr-10"
                >
                  <option value="Select">Select</option>
                  <option value="Newest First">Newest First</option>
                  <option value="Oldest First">Oldest First</option>
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>

            {/* Sort by Rate */}
            <div className="space-y-2">
              <label className="text-[0.88rem] font-semibold text-slate-600 block">
                Sort by Rate
              </label>
              <div className="relative">
                <select
                  value={filterRate}
                  onChange={(e) => setFilterRate(e.target.value)}
                  className="w-full bg-slate-50/20 border border-slate-200/80 rounded-xl px-4 py-3 text-[0.88rem] font-semibold text-slate-600 focus:outline-none focus:border-[#09A6A4]/60 transition-all appearance-none cursor-pointer pr-10"
                >
                  <option value="Select">Select</option>
                  <option value="Low to High">Low to High</option>
                  <option value="High to Low">High to Low</option>
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>

            {/* Sort by Trust Score */}
            <div className="space-y-2">
              <label className="text-[0.88rem] font-semibold text-slate-600 block">
                Sort by Trust Score
              </label>
              <div className="relative">
                <select
                  value={filterTrustScore}
                  onChange={(e) => setFilterTrustScore(e.target.value)}
                  className="w-full bg-slate-50/20 border border-slate-200/80 rounded-xl px-4 py-3 text-[0.88rem] font-semibold text-slate-600 focus:outline-none focus:border-[#09A6A4]/60 transition-all appearance-none cursor-pointer pr-10"
                >
                  <option value="Select">Select</option>
                  <option value="Highest Rated">Highest Rated</option>
                  <option value="Most Reviewed">Most Reviewed</option>
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>

            {/* Swap Published Date */}
            <div className="space-y-2">
              <label className="text-[0.88rem] font-semibold text-slate-600 block">
                Swap Published Date
              </label>
              <div className="relative">
                <select
                  value={filterPublishedDate}
                  onChange={(e) => setFilterPublishedDate(e.target.value)}
                  className="w-full bg-slate-50/20 border border-slate-200/80 rounded-xl px-4 py-3 text-[0.88rem] font-semibold text-slate-600 focus:outline-none focus:border-[#09A6A4]/60 transition-all appearance-none cursor-pointer pr-10"
                >
                  <option value="Select">Select</option>
                  <option value="Today">Today</option>
                  <option value="This Week">This Week</option>
                  <option value="This Month">This Month</option>
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => {
                  setFilterRequiredDate("Select");
                  setFilterRate("Select");
                  setFilterTrustScore("Select");
                  setFilterPublishedDate("Select");
                }}
                className="flex-1 py-3 border border-[#09A6A4] text-[#09A6A4] font-semibold rounded-xl text-[0.92rem] hover:bg-slate-50 transition-all text-center focus:outline-none"
              >
                Clear
              </button>
              <button
                onClick={() => setShowFilterOverlay(false)}
                className="flex-1 py-3 bg-[#09A6A4] text-white font-semibold rounded-xl text-[0.92rem] hover:bg-[#078d8b] transition-all text-center shadow-md shadow-[#09A6A4]/25 focus:outline-none"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketMainPage;
