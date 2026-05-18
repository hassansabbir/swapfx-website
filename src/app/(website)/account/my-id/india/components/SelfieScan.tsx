"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Camera, Upload, ShieldCheck } from "lucide-react";

interface SelfieScanProps {
  hasCameraAccess: boolean | null;
  selfieLightingMode: "bad" | "good";
  setSelfieLightingMode: (val: "bad" | "good") => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onCapture: () => void;
  onTriggerUpload: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SelfieScan({
  hasCameraAccess,
  selfieLightingMode,
  setSelfieLightingMode,
  videoRef,
  fileInputRef,
  onCapture,
  onTriggerUpload,
  onFileChange,
}: SelfieScanProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 flex flex-col items-center py-4">
      <div className="text-center space-y-1">
        <h3 className="text-[1.15rem] font-extrabold text-slate-800">
          Facial Biometric Match
        </h3>
        <p className="text-[0.82rem] text-slate-400 font-medium leading-relaxed max-w-[340px]">
          {hasCameraAccess === false
            ? "Camera access blocked. Please upload a high-quality portrait photo of your face."
            : "Center your profile face within the guidelines circle. Make sure you are in a bright, evenly lit space."}
        </p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        accept="image/png, image/jpeg"
        className="hidden"
      />

      <div className="relative w-64 h-64 flex items-center justify-center select-none mt-2">
        <div
          className={`absolute inset-0 rounded-full border-4 border-dashed transition-all duration-300 z-20 ${
            hasCameraAccess === false
              ? "border-amber-400/80 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
              : selfieLightingMode === "bad"
                ? "border-red-500 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                : "border-[#09A6A4] shadow-[0_0_20px_rgba(9,166,164,0.15)] animate-[spin_30s_linear_infinite]"
          }`}
        />
        <div className="absolute -inset-1.5 rounded-full border-2 border-slate-100 z-10" />

        <div className="w-[96%] h-[96%] rounded-full overflow-hidden bg-neutral-900 border border-neutral-800 flex items-center justify-center relative">
          {hasCameraAccess === true ? (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_20%,rgba(0,0,0,0.8)_100%)] z-10" />
              <div className="absolute w-[60%] h-[75%] border-2 border-white/20 border-dashed rounded-[60px/80px] z-20" />

              {selfieLightingMode === "good" && (
                <div className="absolute left-0 right-0 h-1.5 bg-linear-to-r from-transparent via-[#09A6A4] to-transparent shadow-[0_0_12px_rgba(9,166,164,0.8)] animate-[bounce_3s_ease-in-out_infinite] z-25" />
              )}

              {selfieLightingMode === "bad" && (
                <div className="absolute inset-0 bg-black/60 z-15 transition-opacity" />
              )}

              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />
            </>
          ) : hasCameraAccess === false ? (
            <div
              onClick={onTriggerUpload}
              className="w-full h-full bg-slate-50 flex flex-col items-center justify-center text-slate-400 gap-2 cursor-pointer hover:bg-slate-100 transition-colors p-4"
            >
              <Upload size={32} className="text-[#09A6A4] animate-bounce" />
              <span className="text-[0.78rem] text-slate-700 font-extrabold text-center leading-tight">
                Upload Portrait
              </span>
              <span className="text-[0.62rem] text-slate-400 font-semibold text-center leading-normal">
                Select JPG or PNG file
              </span>
            </div>
          ) : (
            <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center text-slate-400 gap-3">
              <Camera size={36} className="text-slate-500 animate-pulse" />
              <span className="text-[0.65rem] text-slate-500 font-bold uppercase tracking-widest">
                Requesting camera...
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-[420px] text-center space-y-4">
        {hasCameraAccess === true ? (
          <>
            {selfieLightingMode === "bad" ? (
              <p className="text-[0.88rem] text-red-500 font-bold animate-pulse">
                Too dark or too bright!
              </p>
            ) : (
              <p className="text-[0.88rem] text-emerald-600 font-bold">
                Perfect lighting detected! Ready to capture.
              </p>
            )}

            <div className="flex justify-center gap-3 pt-2">
              <Button
                onClick={onCapture}
                className="w-full py-4 rounded-xl text-[1rem] font-extrabold bg-[#09A6A4] text-white shadow-xl shadow-[#09A6A4]/20 hover:scale-[1.01] cursor-pointer"
              >
                Capture Selfie
              </Button>
            </div>
          </>
        ) : hasCameraAccess === false ? (
          <div className="space-y-4">
            <p className="text-[0.82rem] text-slate-400 font-semibold leading-relaxed max-w-[340px] mx-auto">
              Alternate solution active: Camera is disabled or unsupported.
              Please choose a front-facing headshot from your computer files to
              complete biometric comparisons.
            </p>
            <div className="flex justify-center">
              <Button onClick={onTriggerUpload} className="w-full ">
                Choose Photo from File
              </Button>
            </div>
          </div>
        ) : null}

        <div className="flex items-center gap-2 justify-center text-[0.72rem] text-slate-400 font-semibold max-w-[380px] mx-auto text-center pt-2">
          <ShieldCheck size={16} className="text-[#09A6A4] shrink-0" />
          <span>
            Biometric face data is encrypted and immediately deleted after
            verification checks.
          </span>
        </div>
      </div>
    </div>
  );
}
