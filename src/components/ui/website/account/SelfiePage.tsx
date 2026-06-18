"use client";

import React, { useState, useEffect, useRef } from "react";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import {
  ChevronLeft,
  X,
  Shield,
  Camera,
  RefreshCw,
  Upload,
  Smartphone,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const SelfiePage = () => {
  const router = useRouter();
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [forceMobileMode, setForceMobileMode] = useState(false);

  // States for Webcam Stream
  const [hasCameraAccess, setHasCameraAccess] = useState<boolean | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);

  // States for Desktop Fallback Upload
  const [desktopUploadedPhoto, setDesktopUploadedPhoto] = useState<
    string | null
  >(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // 1. Detect if the agent is a mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 2. Control the Webcam Stream (When mobile or forced mobile)
  const startCamera = async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 480 },
          height: { ideal: 480 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasCameraAccess(true);
      setIsCameraActive(true);
    } catch (err) {
      console.warn("Webcam access rejected or unsupported:", err);
      setHasCameraAccess(false);
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    if (isMobileDevice || forceMobileMode) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isMobileDevice, forceMobileMode]);

  // 3. Take Picture Action
  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = 360;
      canvas.height = 360;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Draw the circular center of the video feed to canvas
        ctx.drawImage(videoRef.current, 0, 0, 360, 360);
        const dataUrl = canvas.toDataURL("image/jpeg");
        setCapturedPhoto(dataUrl);
        stopCamera();

        // Auto trigger biometric scan verification
        triggerFacialScan(dataUrl);
      }
    }
  };

  // 4. Retry Capture
  const handleRetry = () => {
    setCapturedPhoto(null);
    setDesktopUploadedPhoto(null);
    startCamera();
  };

  // 5. Run Biometric Scanning Simulation
  const triggerFacialScan = (photoUrl: string) => {
    setIsVerifying(true);
    setVerificationProgress(0);

    const interval = setInterval(() => {
      setVerificationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            router.push("/account/my-id/verified");
          }, 600);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  // 6. Handle Fallback Desktop Upload
  const handleDesktopFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setDesktopUploadedPhoto(url);
      triggerFacialScan(url);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // RENDER PATH A: IMMERSIVE MOBILE SCANNERS (Circular live feed)
  if (isMobileDevice || forceMobileMode) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-between p-6 relative overflow-hidden animate-in fade-in duration-500">
        {/* Top bar controls */}
        <div className="flex items-center justify-between z-10">
          <IconButton
            variant="dark"
            onClick={() => {
              if (forceMobileMode) {
                setForceMobileMode(false);
              } else {
                router.push("/account/my-id");
              }
            }}
          >
            <ChevronLeft size={20} />
          </IconButton>

          <span className="font-bold text-[1rem] tracking-tight">
            Take Your Selfie
          </span>

          <IconButton
            variant="dark"
            onClick={() => router.push("/account")}
          >
            <X size={20} />
          </IconButton>
        </div>

        {/* Live Camera circular scanner viewport */}
        <div className="flex-1 flex flex-col items-center justify-center py-6 relative z-10">
          <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center select-none">
            {/* The animated green-and-white dotted ring target overlay */}
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-emerald-500 animate-[spin_30s_linear_infinite] shadow-[0_0_25px_rgba(16,185,129,0.3)] z-20" />
            <div className="absolute -inset-1 rounded-full border-2 border-white/20 z-10" />

            {/* Webcam / Captured Circular Feed */}
            <div className="w-[96%] h-[96%] rounded-full overflow-hidden bg-neutral-900 border border-neutral-800 flex items-center justify-center relative">
              {isVerifying && (
                <div className="absolute inset-0 bg-neutral-950/70 z-30 flex flex-col items-center justify-center gap-3 backdrop-blur-[2px] animate-in fade-in duration-300">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    {/* Ring spinner */}
                    <div className="absolute inset-0 rounded-full border-4 border-neutral-800" />
                    <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
                  </div>
                  <span className="text-[0.85rem] font-bold text-emerald-400 tracking-wider">
                    VERIFYING FACE ({verificationProgress}%)
                  </span>
                </div>
              )}

              {capturedPhoto ? (
                <img
                  src={capturedPhoto}
                  alt="Captured Selfie"
                  className="w-full h-full object-cover animate-in zoom-in duration-300"
                />
              ) : hasCameraAccess === false ? (
                <div className="p-6 text-center space-y-3 flex flex-col items-center">
                  <Camera
                    size={32}
                    className="text-neutral-500 animate-pulse"
                  />
                  <p className="text-[0.75rem] text-neutral-400 font-medium">
                    Camera blocked or not supported. Tap below to upload a
                    portrait image instead.
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setCapturedPhoto(url);
                        triggerFacialScan(url);
                      }
                    }}
                    className="hidden"
                    id="fallback-mobile-file"
                  />
                  <label
                    htmlFor="fallback-mobile-file"
                    className="px-4 py-2 bg-emerald-500 text-black text-[0.8rem] font-bold rounded-lg cursor-pointer hover:bg-emerald-600 transition-colors"
                  >
                    Select Photo
                  </label>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover scale-x-[-1]"
                />
              )}

              {/* Laser scanning bar animation overlay */}
              {isCameraActive && !capturedPhoto && (
                <div className="absolute left-0 right-0 h-1 bg-linear-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-[bounce_3s_ease-in-out_infinite] z-20" />
              )}
            </div>
          </div>

          <p className="text-[0.8rem] text-neutral-400 text-center font-medium max-w-[240px] mt-6 select-none leading-relaxed">
            Position your face inside the circle indicator and make sure your
            lighting is bright.
          </p>
        </div>

        {/* Bottom controls */}
        <div className="flex flex-col items-center gap-4 py-4 z-10">
          {!capturedPhoto && hasCameraAccess !== false && (
            <button
              onClick={capturePhoto}
              className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-all shadow-xl border-4 border-neutral-800"
            >
              <Camera size={26} />
            </button>
          )}

          {capturedPhoto && !isVerifying && (
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-6 py-3 bg-neutral-800 text-white font-bold rounded-xl hover:bg-neutral-700 transition-colors shadow-lg"
            >
              <RefreshCw size={16} />
              <span>Retry</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // RENDER PATH B: PORTAL DESKTOP DUAL-DEVICE VIEWS
  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1000px] mx-auto w-full animate-in fade-in duration-700">
      <GlassContainer className="p-6 md:p-12 relative overflow-visible">
        {/* Back Button */}
        <IconButton href="/account/my-id" className="absolute top-6 left-6">
          <ChevronLeft size={24} />
        </IconButton>

        <div className="max-w-[800px] mx-auto space-y-8">
          <div className="text-center space-y-1">
            <h1 className="text-[1.8rem] font-bold text-slate-800 tracking-tight leading-none">
              Facial Verification
            </h1>
            <p className="text-[0.9rem] text-slate-400">
              Select one of the convenient methods below to complete your selfie
              scan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {/* Box A: Mobile hand-off (QR Code Sync) */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100/50 shadow-sm flex flex-col justify-between gap-6 hover:shadow-md transition-shadow duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#E0F7F6] text-[#09A6A4] flex items-center justify-center shadow-inner">
                  <Smartphone size={22} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-[1.1rem] font-bold text-slate-800">
                    Verify via Smartphone
                  </h3>
                  <p className="text-[0.8rem] text-slate-400 leading-relaxed font-medium">
                    No desktop webcam? Scan this QR code using your smartphone's
                    camera to complete the verification seamlessly.
                  </p>
                </div>
              </div>

              {/* Dynamic QR Code Simulation Area */}
              <div className="flex flex-col items-center justify-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-32 h-32 bg-white rounded-xl p-2.5 border border-slate-100 flex items-center justify-center shadow-sm select-none relative group">
                  {/* Dynamic simulated QR code graphic */}
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full text-slate-800"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="25"
                      height="25"
                      fill="currentColor"
                    />
                    <rect x="5" y="5" width="15" height="15" fill="white" />
                    <rect
                      x="75"
                      y="0"
                      width="25"
                      height="25"
                      fill="currentColor"
                    />
                    <rect x="80" y="5" width="15" height="15" fill="white" />
                    <rect
                      x="0"
                      y="75"
                      width="25"
                      height="25"
                      fill="currentColor"
                    />
                    <rect x="5" y="80" width="15" height="15" fill="white" />
                    <rect
                      x="35"
                      y="10"
                      width="10"
                      height="25"
                      fill="currentColor"
                    />
                    <rect
                      x="50"
                      y="30"
                      width="15"
                      height="10"
                      fill="currentColor"
                    />
                    <rect
                      x="25"
                      y="50"
                      width="20"
                      height="20"
                      fill="currentColor"
                    />
                    <rect
                      x="55"
                      y="65"
                      width="15"
                      height="20"
                      fill="currentColor"
                    />
                    <rect
                      x="35"
                      y="80"
                      width="10"
                      height="10"
                      fill="currentColor"
                    />
                    <rect
                      x="80"
                      y="45"
                      width="10"
                      height="30"
                      fill="currentColor"
                    />
                  </svg>

                  {/* Glowing hover scan effect */}
                  <div className="absolute inset-0 bg-white/95 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 rounded-xl backdrop-blur-[1px]">
                    <span className="text-[0.7rem] font-bold text-[#09A6A4] text-center">
                      Wise KYC Dynamic Security Token Active
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse" />
                  <span className="text-[0.72rem] font-bold text-slate-400 uppercase tracking-wider">
                    Waiting for mobile camera...
                  </span>
                </div>
              </div>

              {/* Force Mobile View Simulation Helper */}
              <Button
                variant="secondary"
                onClick={() => setForceMobileMode(true)}
                className="w-full py-3.5 rounded-xl text-[0.85rem] font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                <Camera size={15} />
                <span>Open Simulated Mobile View</span>
              </Button>
            </div>

            {/* Box B: Direct Upload fallback */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100/50 shadow-sm flex flex-col justify-between gap-6 hover:shadow-md transition-shadow duration-300">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#E0F7F6] text-[#09A6A4] flex items-center justify-center shadow-inner">
                  <Upload size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-[1.1rem] font-bold text-slate-800">
                    Upload Recent Portrait
                  </h3>
                  <p className="text-[0.8rem] text-slate-400 leading-relaxed font-medium">
                    Upload a high-quality, recent photo of your face directly
                    from your computer files. Ensure good lighting and a clear
                    background.
                  </p>
                </div>
              </div>

              {/* Upload Drop Zone Box */}
              <div
                onClick={handleUploadClick}
                className="flex-1 min-h-[140px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 bg-slate-50 cursor-pointer hover:bg-slate-100 hover:border-slate-300 transition-all p-4 relative overflow-hidden group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleDesktopFileChange}
                  accept="image/png, image/jpeg"
                  className="hidden"
                />

                {isVerifying && (
                  <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center gap-2 animate-in fade-in duration-300 z-10">
                    <div className="relative w-10 h-10">
                      <div className="absolute inset-0 rounded-full border-2 border-slate-100" />
                      <div className="absolute inset-0 rounded-full border-2 border-[#09A6A4] border-t-transparent animate-spin" />
                    </div>
                    <span className="text-[0.72rem] font-bold text-[#09A6A4] tracking-wider uppercase animate-pulse">
                      Analyzing Face ({verificationProgress}%)
                    </span>
                  </div>
                )}

                {desktopUploadedPhoto ? (
                  <div className="absolute inset-0 p-2">
                    <img
                      src={desktopUploadedPhoto}
                      alt="Uploaded Portrait"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                ) : (
                  <>
                    <Camera
                      size={26}
                      className="text-slate-300 group-hover:scale-110 transition-transform"
                    />
                    <span className="text-[0.85rem] font-bold text-slate-700">
                      Select photo from computer
                    </span>
                    <span className="text-[0.7rem] text-slate-400 font-medium">
                      JPG or PNG up to 4MB
                    </span>
                  </>
                )}
              </div>

              <p className="text-[0.72rem] text-slate-400 italic text-center leading-none">
                Note: Image will be verified using biometric identity filters.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-center text-[0.8rem] text-slate-400 font-semibold select-none">
            <Shield size={16} className="text-[#09A6A4]" />
            Your biometric facial data is encrypted and immediately deleted
            after verification.
          </div>
        </div>
      </GlassContainer>
    </div>
  );
};
