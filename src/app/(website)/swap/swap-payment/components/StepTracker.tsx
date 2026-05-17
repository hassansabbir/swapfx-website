"use client";

import React from "react";
import { Check } from "lucide-react";

export default function StepTracker() {
  const steps = [
    { num: 1, label: "Swap" },
    { num: 2, label: "Fee" },
    { num: 3, label: "Recipients" },
    { num: 4, label: "Payment" },
    { num: 5, label: "Proof" },
    { num: 6, label: "Completed" },
  ];

  return (
    <div className="flex items-center justify-between max-w-[650px] mx-auto w-full pt-2 pb-8 animate-in fade-in duration-300">
      {steps.map((step, index) => {
        const isCompleted = step.num < 4;
        const isActive = step.num === 4;

        return (
          <React.Fragment key={step.num}>
            {/* Connector line */}
            {index > 0 && (
              <div
                className={`flex-1 h-1 mx-2 rounded-full transition-colors duration-300 ${
                  step.num <= 4 ? "bg-[#09A6A4]" : "bg-slate-200"
                }`}
              />
            )}

            {/* Step indicator circle */}
            <div className="flex flex-col items-center space-y-1.5 relative">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[0.88rem] transition-all duration-300 ${
                  isActive || isCompleted
                    ? "bg-[#09A6A4] text-white shadow-md shadow-[#09A6A4]/25 scale-105"
                    : "bg-white border-2 border-slate-200 text-slate-400"
                }`}
              >
                {isCompleted ? <Check size={16} strokeWidth={3} /> : step.num}
              </div>
              <span
                className={`text-[0.78rem] font-bold tracking-tight transition-colors duration-300 ${
                  isActive || isCompleted
                    ? "text-[#09A6A4]"
                    : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
