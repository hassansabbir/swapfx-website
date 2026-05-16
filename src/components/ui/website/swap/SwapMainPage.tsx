"use client";

import React, { useState } from "react";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeft,
  ArrowRight,
  X,
  ChevronDown,
  AlertCircle,
} from "lucide-react";

type SwapView = "MAIN" | "AGREEMENT" | "CREATE_SWAP";

const SwapMainPage = () => {
  const [view, setView] = useState<SwapView>("MAIN");

  if (view === "AGREEMENT") {
    return (
      <SwapAgreementView
        onCancel={() => setView("MAIN")}
        onContinue={() => setView("CREATE_SWAP")}
      />
    );
  }

  if (view === "CREATE_SWAP") {
    return <CreateMarketplaceSwapView onBack={() => setView("AGREEMENT")} />;
  }

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1200px] mx-auto w-full animate-in fade-in duration-700">
      <GlassContainer className="p-4 md:p-10 space-y-8">
        {/* Header */}
        <div className="space-y-8 max-w-[750px] mx-auto">
          <div className="text-center">
            <h1 className="text-[1.5rem] font-bold text-slate-800 tracking-tight">
              Swap
            </h1>
          </div>

          {/* Stats Row */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <div className="flex-1 max-w-[180px] bg-white/50 backdrop-blur-md rounded-3xl p-5 text-center border border-white/60 shadow-sm space-y-0.5">
              <h2 className="text-[1.8rem] font-bold text-[#001D3D]">20</h2>
              <p className="text-[0.8rem] font-medium text-slate-500">
                Complete
              </p>
            </div>
            <div className="flex-1 max-w-[180px] bg-white/50 backdrop-blur-md rounded-3xl p-5 text-center border border-white/60 shadow-sm space-y-0.5">
              <h2 className="text-[1.8rem] font-bold text-[#001D3D]">02</h2>
              <p className="text-[0.8rem] font-medium text-slate-500">
                Swappers
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center pt-1">
            <Button
              variant="primary"
              onClick={() => setView("AGREEMENT")}
              className="px-10 py-4 text-[0.9rem] font-bold rounded-lg shadow-md shadow-[#09A6A4]/15 transition-transform hover:scale-[1.02]"
            >
              Create Market Swap
            </Button>
          </div>

          {/* Swap History */}
          <div className="space-y-3 pt-3">
            <h3 className="text-[1rem] font-bold text-slate-400">
              Swap History
            </h3>

            <div className="space-y-2.5">
              {[1, 2, 3].map((_, i) => (
                <SwapHistoryCard key={i} />
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-1.5 pt-3">
            <button className="w-7 h-7 flex items-center justify-center text-slate-300 hover:text-slate-500 transition-colors">
              <ArrowLeft size={14} />
            </button>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[0.7rem] transition-all
                  ${num === 1 ? "bg-[#09A6A4] text-white shadow-sm shadow-[#09A6A4]/30" : "text-slate-400 hover:bg-white/50"}
                `}
                >
                  {num}
                </button>
              ))}
              <span className="text-slate-300 mx-0.5 text-[0.7rem]">...</span>
              <button className="w-7 h-7 text-slate-400 font-bold hover:bg-white/50 rounded-full text-[0.7rem]">
                10
              </button>
            </div>

            <button className="w-7 h-7 flex items-center justify-center text-slate-300 hover:text-slate-500 transition-colors">
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </GlassContainer>
    </div>
  );
};

const SwapAgreementView = ({
  onCancel,
  onContinue,
}: {
  onCancel: () => void;
  onContinue: () => void;
}) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1200px] mx-auto w-full animate-in fade-in zoom-in-95 duration-500">
      <GlassContainer className="p-6 md:p-12 relative overflow-visible">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute -top-4 -right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-slate-400 text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-lg z-10"
        >
          <X size={24} />
        </button>

        <div className="space-y-8 max-w-[750px] mx-auto">
          <div className="space-y-4">
            <h2 className="text-[1.5rem] font-bold text-slate-800">
              Swap Agreement Confirmation
            </h2>
            <p className="text-[0.9rem] text-slate-500 leading-relaxed">
              Before proceeding, please confirm that you understand and agree to
              the following:
            </p>
          </div>

          <ul className="space-y-5">
            {[
              "Both parties must complete their swap within the agreed time limit.",
              "The swap timer will start only after both Swappers have paid the required swap fee.",
              "Swap fees are non-refundable once the timer starts.",
              "You are responsible for sending funds to the correct details provided.",
              "If one party fails to complete the swap within the time limit, the case may be reviewed and appropriate action taken.",
              "Any dispute must be raised before the timer expires.",
              "Providing false payment proof may result in account suspension.",
            ].map((text, i) => (
              <li
                key={i}
                className="flex gap-4 text-[0.85rem] text-slate-600 leading-relaxed group"
              >
                <span className="text-slate-300 mt-0.5">•</span>
                <p className="flex-1">{text}</p>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 pt-4">
            <div
              onClick={() => setAgreed(!agreed)}
              className={`w-6 h-6 rounded-md border-2 cursor-pointer transition-all flex items-center justify-center
                ${agreed ? "bg-[#09A6A4] border-[#09A6A4]" : "border-slate-200 bg-white"}
              `}
            >
              {agreed && (
                <div className="w-3 h-1.5 border-l-2 border-b-2 border-white -rotate-45 mb-0.5" />
              )}
            </div>
            <label
              onClick={() => setAgreed(!agreed)}
              className="text-[0.9rem] text-slate-600 cursor-pointer font-medium"
            >
              I have read and agree to the swap terms.
            </label>
          </div>

          <div className="flex justify-center pt-2">
            <Button
              disabled={!agreed}
              onClick={onContinue}
              className={`px-24 py-4 rounded-xl font-bold transition-all shadow-lg border-b-4
                ${agreed ? "bg-[#09A6A4] text-white hover:scale-[1.02] shadow-[#09A6A4]/20 border-[#078d8b]" : "bg-slate-200 text-slate-400 cursor-not-allowed border-slate-300 shadow-none"}
              `}
            >
              Continue
            </Button>
          </div>
        </div>
      </GlassContainer>
    </div>
  );
};

const CreateMarketplaceSwapView = ({ onBack }: { onBack: () => void }) => {
  const [offerCurrency, setOfferCurrency] = useState("PKR");
  const [wantCurrency, setWantCurrency] = useState("GBP");
  const [duration, setDuration] = useState("Select");

  const [showOfferDrop, setShowOfferDrop] = useState(false);
  const [showWantDrop, setShowWantDrop] = useState(false);
  const [showDurationDrop, setShowDurationDrop] = useState(false);

  const currencies = ["PKR", "USD", "GBP", "EUR", "CAD", "AUD"];
  const durations = ["1 Day", "3 Days", "1 Week", "2 Weeks", "1 Month"];

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1200px] mx-auto w-full animate-in fade-in slide-in-from-right-4 duration-500">
      <GlassContainer className="p-6 md:p-10 relative">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-slate-400 text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-lg"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="space-y-8 max-w-[750px] mx-auto">
          <div className="text-center space-y-1">
            <h2 className="text-[1.5rem] font-bold text-slate-800">
              Create Marketplace Swap
            </h2>
            <p className="text-[0.9rem] text-slate-400">
              Post your swap offer to the marketplace.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/40 shadow-sm space-y-8">
            <h3 className="text-center text-[1.2rem] font-bold text-[#001D3D]">
              Swap Details
            </h3>

            <div className="space-y-6">
              {/* I Offer */}
              <div className="space-y-3">
                <label className="block text-center text-[0.9rem] font-medium text-slate-500">
                  I offer :
                </label>
                <div className="flex gap-3 w-full relative">
                  <div
                    onClick={() => {
                      setShowOfferDrop(!showOfferDrop);
                      setShowWantDrop(false);
                      setShowDurationDrop(false);
                    }}
                    className="w-32 bg-white rounded-xl px-4 py-3.5 border border-slate-100 flex items-center justify-between cursor-pointer shadow-sm hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-700">
                      {offerCurrency}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-300 transition-transform ${showOfferDrop ? "rotate-180" : ""}`}
                    />
                  </div>

                  {showOfferDrop && (
                    <div className="absolute top-full left-0 w-32 mt-1 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
                      {currencies.map((curr) => (
                        <div
                          key={curr}
                          onClick={() => {
                            setOfferCurrency(curr);
                            setShowOfferDrop(false);
                          }}
                          className="px-4 py-2 hover:bg-slate-50 cursor-pointer font-bold text-slate-600 text-[0.9rem]"
                        >
                          {curr}
                        </div>
                      ))}
                    </div>
                  )}

                  <input
                    type="text"
                    placeholder="150,000.00"
                    className="flex-1 bg-white rounded-xl px-5 py-3.5 border border-slate-100 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/10 shadow-sm"
                  />
                </div>
              </div>

              {/* I Want */}
              <div className="space-y-3">
                <label className="block text-center text-[0.9rem] font-medium text-slate-500">
                  I want :
                </label>
                <div className="flex gap-3 w-full relative">
                  <div
                    onClick={() => {
                      setShowWantDrop(!showWantDrop);
                      setShowOfferDrop(false);
                      setShowDurationDrop(false);
                    }}
                    className="w-32 bg-white rounded-xl px-4 py-3.5 border border-slate-100 flex items-center justify-between cursor-pointer shadow-sm hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-700">
                      {wantCurrency}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-300 transition-transform ${showWantDrop ? "rotate-180" : ""}`}
                    />
                  </div>

                  {showWantDrop && (
                    <div className="absolute top-full left-0 w-32 mt-1 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
                      {currencies.map((curr) => (
                        <div
                          key={curr}
                          onClick={() => {
                            setWantCurrency(curr);
                            setShowWantDrop(false);
                          }}
                          className="px-4 py-2 hover:bg-slate-50 cursor-pointer font-bold text-slate-600 text-[0.9rem]"
                        >
                          {curr}
                        </div>
                      ))}
                    </div>
                  )}

                  <input
                    type="text"
                    placeholder="7,500.00"
                    className="flex-1 bg-white rounded-xl px-5 py-3.5 border border-slate-100 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/10 shadow-sm"
                  />
                </div>
              </div>

              {/* Proposed Rate */}
              <div className="space-y-3">
                <label className="block text-center text-[0.9rem] font-medium text-slate-500">
                  Proposed swap rate :
                </label>
                <div className="flex gap-3 w-full">
                  <input
                    type="text"
                    placeholder="380"
                    className="flex-1 bg-white rounded-xl px-5 py-3.5 border border-slate-100 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/10 shadow-sm"
                  />
                  <div className="w-32 bg-white/50 rounded-xl px-4 py-3.5 border border-white flex items-center justify-center font-bold text-slate-400 shadow-sm">
                    {offerCurrency}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-center sm:text-left sm:pl-4">
                <p className="text-[0.8rem] text-slate-400 font-medium">
                  (Market rate : 375 {offerCurrency})
                </p>
                <p className="text-[0.75rem] text-slate-400 leading-tight">
                  <span className="font-bold">Note:</span> Offering a swap rate
                  above the market level increases the likelihood of attracting
                  swappers.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="space-y-8 px-2">
            <div className="flex flex-col gap-3 relative">
              <label className="text-[1rem] font-bold text-slate-700">
                Required within:
              </label>
              <div
                onClick={() => {
                  setShowDurationDrop(!showDurationDrop);
                  setShowOfferDrop(false);
                  setShowWantDrop(false);
                }}
                className="w-full max-w-[280px] bg-white/60 rounded-xl px-5 py-3.5 border border-white flex items-center justify-between cursor-pointer text-slate-700 font-bold text-[0.95rem] shadow-sm hover:bg-white/80 transition-all"
              >
                {duration}
                <ChevronDown
                  size={20}
                  className={`text-slate-300 transition-transform ${showDurationDrop ? "rotate-180" : ""}`}
                />
              </div>

              {showDurationDrop && (
                <div className="absolute top-full left-0 w-full max-w-[280px] mt-1 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
                  {durations.map((dur) => (
                    <div
                      key={dur}
                      onClick={() => {
                        setDuration(dur);
                        setShowDurationDrop(false);
                      }}
                      className="px-5 py-2.5 hover:bg-slate-50 cursor-pointer font-bold text-slate-600 text-[0.9rem]"
                    >
                      {dur}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <p className="text-[0.8rem] text-slate-400 font-medium italic leading-tight">
              Note: A longer duration keeps the swap visible and active for an
              extended period.
            </p>

            <div className="space-y-3">
              <label className="text-[1rem] font-bold text-slate-700">
                Note (Optional)
              </label>
              <textarea
                placeholder="Please enter your note"
                className="w-full bg-white/60 rounded-2xl p-5 mt-3 border border-white font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/10 min-h-[120px] resize-none shadow-sm"
              />
            </div>

            <div className="flex justify-center pt-4">
              <Button className="px-20 py-3 rounded-2xl text-[1.1rem] font-bold bg-[#09A6A4] text-white shadow-xl shadow-[#09A6A4]/20 hover:scale-[1.02] transition-transform border-b-4 border-[#078d8b]">
                Submit
              </Button>
            </div>

            <div className="flex items-center gap-2 justify-center text-[0.8rem] text-slate-500 font-medium">
              <div className="w-5 h-5 rounded-full border border-yellow-400 flex items-center justify-center text-yellow-500 shrink-0">
                <AlertCircle size={14} />
              </div>
              Funds are transferred directly between Swappers. We do not hold
              your money.
            </div>
          </div>
        </div>
      </GlassContainer>
    </div>
  );
};

const SwapHistoryCard = () => (
  <div className="bg-white/40 backdrop-blur-md rounded-[1.2rem] p-3 md:px-6 md:py-4 border border-white/40 shadow-sm flex flex-row items-center justify-between gap-2 md:gap-4 hover:bg-white/60 transition-all cursor-pointer group">
    <div className="flex items-center gap-2 md:gap-3">
      <div className="relative shrink-0">
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-200 border border-white shadow-sm overflow-hidden flex items-center justify-center text-slate-400 font-bold text-[9px]">
          MB
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 md:w-3.5 md:h-3.5 bg-slate-100 rounded-full border border-white flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
        </div>
      </div>

      <div className="space-y-0 min-w-0">
        <h4 className="text-[0.8rem] md:text-[0.85rem] font-bold text-slate-800 leading-tight truncate max-w-[80px] sm:max-w-none">
          Mr. Bob Builder
        </h4>
        <div className="flex items-center gap-1 text-slate-400">
          <span className="text-[0.65rem] md:text-[0.7rem] font-bold">4.7</span>
          <span className="text-[0.6rem] md:text-[0.65rem] font-medium">
            (56)
          </span>
        </div>
      </div>
    </div>

    <div className="flex items-baseline gap-2 md:gap-3 md:flex-1 md:justify-center">
      <span className="text-[0.75rem] md:text-[0.85rem] font-bold text-slate-800 whitespace-nowrap">
        £200 GBP
      </span>
      <span className="text-[0.75rem] md:text-[0.85rem] font-bold text-[#09A6A4] whitespace-nowrap">
        $250 USD
      </span>
    </div>

    <div className="shrink-0">
      <div className="px-3 md:px-4 py-1 rounded-full bg-slate-200/50 text-[0.6rem] md:text-[0.65rem] font-bold text-slate-500 uppercase tracking-tight">
        Incomplete
      </div>
    </div>
  </div>
);

export default SwapMainPage;
