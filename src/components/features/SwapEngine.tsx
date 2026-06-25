"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { ChevronDown } from "lucide-react";
import { swapService } from "@/lib/services";
import { SwapRate, Currency } from "@/types";
import { cn } from "@/lib/utils";

interface SwapEngineProps {
  onFindMatch?: () => void;
}

export const SwapEngine = ({ onFindMatch }: SwapEngineProps) => {
  const [rate, setRate] = useState<SwapRate | null>(null);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [amount, setAmount] = useState("500");
  const [isCalculated, setIsCalculated] = useState(false);
  const [offerCurrency, setOfferCurrency] = useState("USD");
  const [wantCurrency, setWantCurrency] = useState("PHP");
  const [showOfferDropdown, setShowOfferDropdown] = useState(false);
  const [showWantDropdown, setShowWantDropdown] = useState(false);

  const offerDropdownRef = useRef<HTMLDivElement>(null);
  const wantDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (offerDropdownRef.current && !offerDropdownRef.current.contains(target)) {
        setShowOfferDropdown(false);
      }
      if (wantDropdownRef.current && !wantDropdownRef.current.contains(target)) {
        setShowWantDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const init = async () => {
      const [rateData, currencyData] = await Promise.all([
        swapService.getRate(offerCurrency, wantCurrency),
        swapService.getCurrencies(),
      ]);
      setRate(rateData);
      setCurrencies(currencyData);
    };
    init();
  }, [offerCurrency, wantCurrency]);

  const calculatedValue = rate
    ? (parseFloat(amount) * rate.rate).toLocaleString(undefined, {
        minimumFractionDigits: 2,
      })
    : "0.00";
  const savingsValue = rate
    ? (parseFloat(amount) * (rate.rate - rate.marketRate)).toLocaleString(
        undefined,
        { minimumFractionDigits: 2 },
      )
    : "0.00";

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Offer Currency */}
        <div className="space-y-1.5">
          <label className="text-[0.8rem] font-medium text-slate-700">
            I offer:
          </label>
          <div className="relative" ref={offerDropdownRef}>
            <div
              onClick={() => {
                setShowOfferDropdown(!showOfferDropdown);
                setShowWantDropdown(false);
              }}
              className="flex items-center justify-between bg-white/95 border border-white/20 rounded-lg px-3 py-2 cursor-pointer hover:bg-white transition-all shadow-sm"
            >
              <span className="font-medium text-[0.9rem] text-slate-800">
                {offerCurrency}
              </span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-slate-400 transition-transform",
                  showOfferDropdown && "rotate-180",
                )}
              />
            </div>

            {showOfferDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-slate-100 z-50 max-h-48 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                {currencies.map((c) => (
                  <div
                    key={c.code}
                    className="px-3 py-2 hover:bg-slate-50 cursor-pointer text-[0.9rem] font-medium text-slate-700"
                    onClick={() => {
                      setOfferCurrency(c.code);
                      setShowOfferDropdown(false);
                    }}
                  >
                    {c.code} - {c.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Amount */}
        <div className="space-y-1.5">
          <label className="text-[0.8rem] font-medium text-slate-700">
            Amount:
          </label>
          <div className="relative">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-white/95 border border-white/20 rounded-lg px-3 py-2 font-medium text-[0.9rem] text-slate-800 focus:outline-none focus:bg-white transition-all shadow-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-slate-400">
              <ChevronDown className="w-3 h-3 rotate-180" />
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Want Currency */}
      <div className="space-y-1.5 mb-6">
        <label className="text-[0.8rem] font-medium text-slate-700">
          I want:
        </label>
        <div className="relative" ref={wantDropdownRef}>
          <div
            onClick={() => {
              setShowWantDropdown(!showWantDropdown);
              setShowOfferDropdown(false);
            }}
            className="flex items-center justify-between bg-white/95 border border-white/20 rounded-lg px-3 py-2 cursor-pointer hover:bg-white transition-all shadow-sm"
          >
            <span className="font-medium text-[0.9rem] text-slate-800">
              {wantCurrency}
            </span>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-slate-400 transition-transform",
                showWantDropdown && "rotate-180",
              )}
            />
          </div>

          {showWantDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-slate-100 z-50 max-h-48 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
              {currencies.map((c) => (
                <div
                  key={c.code}
                  className="px-3 py-2 hover:bg-slate-50 cursor-pointer text-[0.9rem] font-medium text-slate-700"
                  onClick={() => {
                    setWantCurrency(c.code);
                    setShowWantDropdown(false);
                  }}
                >
                  {c.code} - {c.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Result Card */}
      {isCalculated && (
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-slate-500 text-[0.85rem]">
              You could receive:
            </span>
            <span className="text-[1.1rem] font-bold text-[#09A6A4]">
              {calculatedValue} {wantCurrency}
            </span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-slate-500 text-[0.85rem]">Your savings:</span>
            <span className="text-[0.85rem] font-semibold text-[#09A6A4]">
              ~{savingsValue} {wantCurrency}
            </span>
          </div>

          <div className="h-px bg-slate-100 w-full mb-6" />

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[0.8rem] font-medium">
                Swap Rate:
              </span>
              <span className="text-[#09A6A4] font-bold text-[0.9rem]">
                1 {offerCurrency} = {rate?.rate} {wantCurrency}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[0.8rem] font-medium">
                Market Rate:
              </span>
              <span className="text-slate-500 font-medium text-[0.9rem]">
                1 {offerCurrency} = {rate?.marketRate} {wantCurrency}
              </span>
            </div>
          </div>

          <div className="mt-4 flex gap-2 items-start">
            <div className="w-1 h-1 rounded-full bg-[#09A6A4] shrink-0 mt-1.5" />
            <p className="text-[0.75rem] leading-relaxed text-[#09A6A4] font-medium opacity-80">
              The rate is projected based on previous swap activity for this
              currency.
            </p>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="space-y-3 flex items-center justify-center flex-col ">
        <Button
          variant={isCalculated ? "white" : "primary"}
          className="w-3/4"
          onClick={() => setIsCalculated(true)}
          disabled={isCalculated}
        >
          Calculate Swap
        </Button>
        <Button
          variant={isCalculated ? "primary" : "white"}
          className="w-3/4"
          onClick={() => {
            if (isCalculated && onFindMatch) {
              onFindMatch();
            }
          }}
          disabled={!isCalculated}
        >
          Find a Match
        </Button>
      </div>
    </div>
  );
};
