"use client";

import React from "react";

interface SelfieCapturedProps {
  capturedPhoto: string | null;
  isVerifyingSelfie: boolean;
  selfieProgress: number;
  selfieStatusText: string;
  onRetake: () => void;
  onSubmit: () => void;
}

export default function SelfieCaptured({
  capturedPhoto,
  isVerifyingSelfie,
  selfieProgress,
  selfieStatusText,
  onRetake,
  onSubmit,
}: SelfieCapturedProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 flex flex-col items-center py-4">
      <div className="text-center space-y-1">
        <h3 className="text-[1.15rem] font-extrabold text-slate-800">
          {isVerifyingSelfie ? "Matching Identity Records..." : "Image Capture Approved"}
        </h3>
        <p className="text-[0.82rem] text-slate-400 font-medium">
          {isVerifyingSelfie 
            ? "Comparing facial landmarks with government databases..." 
            : "Review your portrait photo capture before submitting identity check"
          }
        </p>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center select-none mt-2">
        <div className={`absolute inset-0 rounded-full border-4 border-dashed shadow-[0_0_20px_rgba(16,185,129,0.15)] z-20 ${
          isVerifyingSelfie ? "border-[#09A6A4] animate-spin" : "border-emerald-500"
        }`} />
        <div className="absolute -inset-1.5 rounded-full border-2 border-slate-100 z-10" />

        <div className="w-[96%] h-[96%] rounded-full overflow-hidden bg-neutral-900 border border-neutral-800 flex items-center justify-center relative">
          {isVerifyingSelfie && (
            <div className="absolute inset-0 bg-neutral-950/70 z-30 flex flex-col items-center justify-center gap-3 backdrop-blur-[2px] animate-in fade-in duration-300">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-neutral-800" />
                <div className="absolute inset-0 rounded-full border-4 border-[#09A6A4] border-t-transparent animate-spin" />
              </div>
              <span className="text-[0.72rem] font-bold text-[#09A6A4] tracking-wider uppercase animate-pulse">
                Matching ({selfieProgress}%)
              </span>
            </div>
          )}

          {capturedPhoto ? (
            <img
              src={capturedPhoto}
              alt="Captured portrait"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
              alt="Captured portrait"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      <div className="w-full max-w-[420px] text-center space-y-4">
        {isVerifyingSelfie ? (
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2">
            <p className="text-[0.78rem] text-slate-500 font-bold text-center animate-in fade-in">
              {selfieStatusText}
            </p>
          </div>
        ) : (
          <>
            <p className="text-[0.88rem] text-emerald-600 font-bold">
              Image capture successfully!
            </p>

            <div className="flex gap-4">
              <button
                onClick={onRetake}
                className="flex-1 py-3.5 bg-white border-2 border-[#09A6A4]/20 text-[#09A6A4] rounded-xl font-extrabold hover:bg-slate-50 transition-colors shadow-xs text-center focus:outline-none cursor-pointer"
              >
                Retake
              </button>
              
              <button
                onClick={onSubmit}
                className="flex-1 py-3.5 bg-[#09A6A4] text-white rounded-xl font-extrabold shadow-lg shadow-[#09A6A4]/25 hover:scale-[1.01] transition-transform cursor-pointer text-center focus:outline-none"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
