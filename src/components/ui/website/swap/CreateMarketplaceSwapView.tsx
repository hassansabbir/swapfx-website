import React, { useState, useEffect, useRef } from "react";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { ArrowLeft, ChevronDown, AlertCircle, X } from "lucide-react";

export const CreateMarketplaceSwapView = ({
  onBack,
  onClose,
  onSubmit,
  swapperName,
}: {
  onBack: () => void;
  onClose: () => void;
  onSubmit: () => void;
  swapperName?: string;
}) => {
  const [offerCurrency, setOfferCurrency] = useState("PKR");
  const [wantCurrency, setWantCurrency] = useState("GBP");
  const [duration, setDuration] = useState("Select");

  const [showOfferDrop, setShowOfferDrop] = useState(false);
  const [showWantDrop, setShowWantDrop] = useState(false);
  const [showDurationDrop, setShowDurationDrop] = useState(false);

  const offerRef = useRef<HTMLDivElement>(null);
  const wantRef = useRef<HTMLDivElement>(null);
  const durationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (offerRef.current && !offerRef.current.contains(target)) {
        setShowOfferDrop(false);
      }
      if (wantRef.current && !wantRef.current.contains(target)) {
        setShowWantDrop(false);
      }
      if (durationRef.current && !durationRef.current.contains(target)) {
        setShowDurationDrop(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currencies = ["PKR", "USD", "GBP", "EUR", "CAD", "AUD"];
  const durations = ["1 Day", "3 Days", "1 Week", "2 Weeks", "1 Month"];

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1200px] mx-auto w-full animate-in fade-in slide-in-from-right-4 duration-500">
      <GlassContainer className="p-6 md:p-10 relative">
        {/* Back Button */}
        <IconButton onClick={onBack} className="absolute top-6 left-6">
          <ArrowLeft size={24} />
        </IconButton>

        {/* Close Button */}
        <IconButton onClick={onClose} className="absolute top-6 right-6">
          <X size={24} />
        </IconButton>

        <div className="space-y-8 max-w-[750px] mx-auto mt-8">
          <div className="text-center space-y-1">
            <h2 className="text-[1.5rem] font-bold text-slate-800">
              {swapperName ? "Create Peer Swap" : "Publish Market Offer"}
            </h2>
            <p className="text-[0.9rem] text-slate-400">
              {swapperName
                ? "Prepare your swap offer"
                : "Post your swap offer to the marketplace."}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/45 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-white/40 shadow-sm space-y-8">
            <h3 className="text-center text-[1.2rem] font-bold text-[#001D3D]">
              Swap Details
            </h3>

            <div className="space-y-6">
              {/* To Swapper */}
              {swapperName && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 space-y-3 sm:space-y-0">
                  <label className="block font-medium text-slate-500 text-[0.9rem] w-28 text-left shrink-0">
                    To :
                  </label>
                  <input
                    type="text"
                    disabled
                    value={swapperName}
                    className="flex-1 bg-white rounded-xl px-5 py-3.5 border border-slate-100 font-bold text-slate-400 focus:outline-none shadow-sm cursor-not-allowed"
                  />
                </div>
              )}

              {/* I Offer */}
              <div
                className={`space-y-3 ${swapperName ? "flex flex-col sm:flex-row sm:items-center sm:gap-4 sm:space-y-0" : ""}`}
              >
                <label
                  className={`block font-medium text-slate-500 text-[0.9rem] ${swapperName ? "w-28 text-left shrink-0" : "text-center"}`}
                >
                  I offer :
                </label>
                <div className="flex gap-3 flex-1 w-full">
                  <div className="relative shrink-0 w-20 sm:w-32" ref={offerRef}>
                    <div
                      onClick={() => {
                        setShowOfferDrop(!showOfferDrop);
                        setShowWantDrop(false);
                        setShowDurationDrop(false);
                      }}
                      className="w-full bg-white rounded-xl px-2 sm:px-4 py-3.5 border border-slate-100 flex items-center justify-between cursor-pointer shadow-sm hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-bold text-slate-700 text-[0.85rem] sm:text-[1rem]">
                        {offerCurrency}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-slate-300 transition-transform ${showOfferDrop ? "rotate-180" : ""}`}
                      />
                    </div>

                    {showOfferDrop && (
                      <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
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
                  </div>

                  <input
                    type="text"
                    defaultValue={swapperName ? "150,000.00" : ""}
                    placeholder="150,000.00"
                    className="flex-1 min-w-0 bg-white rounded-xl px-5 py-3.5 border border-slate-100 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/10 shadow-sm"
                  />
                </div>
              </div>

              {/* I Want */}
              <div
                className={`space-y-3 ${swapperName ? "flex flex-col sm:flex-row sm:items-center sm:gap-4 sm:space-y-0" : ""}`}
              >
                <label
                  className={`block font-medium text-slate-500 text-[0.9rem] ${swapperName ? "w-28 text-left shrink-0" : "text-center"}`}
                >
                  I want :
                </label>
                <div className="flex gap-3 flex-1 w-full">
                  <div className="relative shrink-0 w-20 sm:w-32" ref={wantRef}>
                    <div
                      onClick={() => {
                        setShowWantDrop(!showWantDrop);
                        setShowOfferDrop(false);
                        setShowDurationDrop(false);
                      }}
                      className="w-full bg-white rounded-xl px-2 sm:px-4 py-3.5 border border-slate-100 flex items-center justify-between cursor-pointer shadow-sm hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-bold text-slate-700 text-[0.85rem] sm:text-[1rem]">
                        {wantCurrency}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-slate-300 transition-transform ${showWantDrop ? "rotate-180" : ""}`}
                      />
                    </div>

                    {showWantDrop && (
                      <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
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
                  </div>

                  <input
                    type="text"
                    defaultValue={swapperName ? "7,500.00" : ""}
                    placeholder="7,500.00"
                    className="flex-1 min-w-0 bg-white rounded-xl px-5 py-3.5 border border-slate-100 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/10 shadow-sm"
                  />
                </div>
              </div>

              {/* Proposed Rate */}
              <div
                className={`space-y-3 ${swapperName ? "flex flex-col sm:flex-row sm:items-center sm:gap-4 sm:space-y-0" : ""}`}
              >
                <label
                  className={`block font-medium text-slate-500 text-[0.9rem] ${swapperName ? "w-28 text-left shrink-0" : "text-center"}`}
                >
                  Proposed swap rate :
                </label>
                <div className="flex gap-3 flex-1 w-full">
                  <input
                    type="text"
                    defaultValue={swapperName ? "380" : ""}
                    placeholder="380"
                    className="flex-1 min-w-0 bg-white rounded-xl px-5 py-3.5 border border-slate-100 font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/10 shadow-sm"
                  />
                  <div className="w-20 sm:w-32 shrink-0 bg-white/50 rounded-xl px-2 sm:px-4 py-3.5 border border-white flex items-center justify-center font-bold text-slate-400 shadow-sm">
                    {offerCurrency}
                  </div>
                </div>
              </div>

              <div
                className={`space-y-2 ${swapperName ? "sm:pl-32" : "text-center sm:text-left sm:pl-4"}`}
              >
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
            <div
              className={`flex flex-col gap-3 ${swapperName ? "sm:flex-row sm:items-center sm:gap-4" : ""}`}
            >
              <label
                className={`text-[1rem] font-bold text-slate-700 ${swapperName ? "w-28 text-left shrink-0" : ""}`}
              >
                Timing:
              </label>
              <div className="relative w-full max-w-[280px]" ref={durationRef}>
                <div
                  onClick={() => {
                    setShowDurationDrop(!showDurationDrop);
                    setShowOfferDrop(false);
                    setShowWantDrop(false);
                  }}
                  className="w-full bg-white/60 rounded-xl px-5 py-3.5 border border-white flex items-center justify-between cursor-pointer text-slate-700 font-bold text-[0.95rem] shadow-sm hover:bg-white/80 transition-all"
                >
                  {duration}
                  <ChevronDown
                    size={20}
                    className={`text-slate-300 transition-transform ${showDurationDrop ? "rotate-180" : ""}`}
                  />
                </div>

                {showDurationDrop && (
                  <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
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
              <Button onClick={onSubmit} className="w-full">
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
