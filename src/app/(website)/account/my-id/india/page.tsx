"use client";

import React, { useState, useEffect, useRef } from "react";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { IconButton } from "@/components/ui/IconButton";
import { ChevronLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";

// Sub-components import
import DigiLockerLanding from "./components/DigiLockerLanding";
import DigiLockerLogin from "./components/DigiLockerLogin";
import DigiLockerOtp from "./components/DigiLockerOtp";
import DobVerification from "./components/DobVerification";
import SetSecurityPin from "./components/SetSecurityPin";
import MeonConsent from "./components/MeonConsent";
import SelfieScan from "./components/SelfieScan";
import SelfieCaptured from "./components/SelfieCaptured";
import KycComplete from "./components/KycComplete";

type DigiLockerStep = 
  | "landing" 
  | "login" 
  | "otp" 
  | "dob_verification"
  | "set_pin"
  | "meon_consent"
  | "fetching"
  | "aadhar_success"
  | "selfie_scan"
  | "selfie_captured"
  | "kyc_complete";

export default function IndianVerificationPage() {
  const router = useRouter();
  const [step, setStep] = useState<DigiLockerStep>("landing");
  
  // Input fields
  const [aadhaarOrMobile, setAadhaarOrMobile] = useState("");
  const [otpCode, setOtpCode] = useState("");
  
  // DOB Verification states
  const [dobDay, setDobDay] = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [dobYear, setDobYear] = useState("");

  // Security PIN states
  const [pinInputs, setPinInputs] = useState<string[]>(Array(6).fill(""));
  const [showPin, setShowPin] = useState(false);
  const pinRefs = useRef<(HTMLInputElement | null)[]>([]);

  // MEON Consent states
  const [documentsAccordionOpen, setDocumentsAccordionOpen] = useState(true);
  const [selectAllDocuments, setSelectAllDocuments] = useState(false);
  const [degreeChecked, setDegreeChecked] = useState(false);
  const [drivingChecked, setDrivingChecked] = useState(false);
  const [purposeValue, setPurposeValue] = useState("Know Your Customer");

  // Real Camera & File Upload states
  const [hasCameraAccess, setHasCameraAccess] = useState<boolean | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [selfieLightingMode, setSelfieLightingMode] = useState<"bad" | "good">("good");
  const [isVerifyingSelfie, setIsVerifyingSelfie] = useState(false);
  const [selfieProgress, setSelfieProgress] = useState(0);
  const [selfieStatusText, setSelfieStatusText] = useState("Initializing camera scan...");

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle PIN input focus movements
  const handlePinChange = (value: string, index: number) => {
    const cleanValue = value.replace(/\D/g, "");
    if (!cleanValue) return;

    const newInputs = [...pinInputs];
    newInputs[index] = cleanValue.substring(cleanValue.length - 1);
    setPinInputs(newInputs);

    // Auto-focus next input
    if (index < 5 && cleanValue) {
      pinRefs.current[index + 1]?.focus();
    }
  };

  const handlePinKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newInputs = [...pinInputs];
      newInputs[index] = "";
      setPinInputs(newInputs);

      // Auto-focus previous input
      if (index > 0) {
        pinRefs.current[index - 1]?.focus();
      }
    }
  };

  // Web Camera streaming mechanisms
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
    } catch (err) {
      console.warn("Webcam access rejected or unsupported:", err);
      setHasCameraAccess(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  // Launch camera whenever we land on the selfie capture screen
  useEffect(() => {
    if (step === "selfie_scan") {
      setCapturedPhoto(null);
      setSelfieLightingMode("good");
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [step]);

  // Capture photo from video element canvas snapshot
  const captureSelfiePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = 360;
      canvas.height = 360;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, 360, 360);
        const dataUrl = canvas.toDataURL("image/jpeg");
        setCapturedPhoto(dataUrl);
        stopCamera();
        setStep("selfie_captured");
      }
    }
  };

  // Desktop File Upload Alternative handler
  const handleDesktopFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCapturedPhoto(event.target.result as string);
          setStep("selfie_captured");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Run final comparison and matching simulation
  const runSelfieMatchAnimation = () => {
    setIsVerifyingSelfie(true);
    setSelfieProgress(0);
    setSelfieStatusText("Analyzing captured biometric features...");

    const interval = setInterval(() => {
      setSelfieProgress((prev) => {
        const next = prev + 5;
        if (next >= 100) {
          clearInterval(interval);
          setSelfieStatusText("Face match confirmed (98.4%)!");
          setTimeout(() => {
            setIsVerifyingSelfie(false);
            setStep("kyc_complete");
          }, 800);
          return 100;
        }

        if (next < 30) {
          setSelfieStatusText("Detecting facial biometric landmarks...");
        } else if (next < 70) {
          setSelfieStatusText("Comparing live selfie with Aadhaar photo database...");
        } else {
          setSelfieStatusText("Validating identity authentication keys...");
        }

        return next;
      });
    }, 120);
  };

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1000px] mx-auto w-full animate-in fade-in duration-500">
      <GlassContainer className="p-6 md:p-12 relative overflow-visible bg-white/40 border border-white/60 shadow-2xl rounded-4xl flex flex-col justify-center min-h-[580px]">
        
        {/* Navigation back arrow */}
        {step !== "fetching" && step !== "kyc_complete" && !isVerifyingSelfie && (
          <IconButton 
            onClick={() => {
              if (step === "landing") router.push("/account/my-id");
              else if (step === "login") setStep("landing");
              else if (step === "otp") setStep("login");
              else if (step === "dob_verification") setStep("otp");
              else if (step === "set_pin") setStep("dob_verification");
              else if (step === "meon_consent") setStep("set_pin");
              else if (step === "aadhar_success") setStep("meon_consent");
              else if (step === "selfie_scan") setStep("aadhar_success");
              else if (step === "selfie_captured") setStep("selfie_scan");
            }}
            className="absolute top-6 left-6"
          >
            <ChevronLeft size={24} />
          </IconButton>
        )}

        <div className="max-w-[550px] mx-auto w-full space-y-6">
          
          {step === "landing" ? (
            <DigiLockerLanding onNext={() => setStep("login")} />
          ) : step === "login" ? (
            <DigiLockerLogin
              aadhaarOrMobile={aadhaarOrMobile}
              onChangeAadhaarOrMobile={setAadhaarOrMobile}
              onNext={() => setStep("otp")}
            />
          ) : step === "otp" ? (
            <DigiLockerOtp
              otpCode={otpCode}
              onChangeOtpCode={setOtpCode}
              onNext={() => setStep("dob_verification")}
            />
          ) : step === "dob_verification" ? (
            <DobVerification
              dobDay={dobDay}
              dobMonth={dobMonth}
              dobYear={dobYear}
              setDobDay={setDobDay}
              setDobMonth={setDobMonth}
              setDobYear={setDobYear}
              onNext={() => setStep("set_pin")}
            />
          ) : step === "set_pin" ? (
            <SetSecurityPin
              pinInputs={pinInputs}
              onChangePin={handlePinChange}
              onKeyDownPin={handlePinKeyDown}
              showPin={showPin}
              setShowPin={setShowPin}
              pinRefs={pinRefs}
              onNext={() => setStep("meon_consent")}
            />
          ) : step === "meon_consent" ? (
            <MeonConsent
              documentsAccordionOpen={documentsAccordionOpen}
              setDocumentsAccordionOpen={setDocumentsAccordionOpen}
              selectAllDocuments={selectAllDocuments}
              setSelectAllDocuments={setSelectAllDocuments}
              degreeChecked={degreeChecked}
              setDegreeChecked={setDegreeChecked}
              drivingChecked={drivingChecked}
              setDrivingChecked={setDrivingChecked}
              purposeValue={purposeValue}
              setPurposeValue={setPurposeValue}
              onDeny={() => setStep("landing")}
              onAllow={() => {
                setStep("fetching");
                setTimeout(() => {
                  setStep("aadhar_success");
                }, 2500);
              }}
            />
          ) : step === "fetching" ? (
            <div className="space-y-6 pt-10 pb-6 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full border-4 border-[#09A6A4]/20 border-t-[#09A6A4] animate-spin mb-4" />
              <h3 className="text-[1.25rem] font-bold text-slate-800">
                Fetching Aadhaar from DigiLocker
              </h3>
              <p className="text-[0.88rem] text-slate-400 font-medium max-w-[360px] leading-relaxed">
                Retrieving your encrypted government identity credentials from secure servers. Please do not close this window...
              </p>
            </div>
          ) : step === "aadhar_success" ? (
            <div className="space-y-6 pt-6 pb-6 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
              <div className="relative w-32 h-32 flex items-center justify-center mb-2">
                <div className="absolute inset-0 w-full h-full animate-spin-slow">
                  <div className="absolute top-0 left-1/2 w-1.5 h-3 bg-[#09A6A4] rounded-full rotate-45" />
                  <div className="absolute bottom-1 right-1/4 w-2 h-2 bg-amber-400 rounded-full" />
                  <div className="absolute top-4 right-1.5 w-1.5 h-3 bg-blue-400 rounded-full -rotate-12" />
                  <div className="absolute bottom-4 left-1.5 w-2 h-2 bg-[#09A6A4] rounded-full" />
                  <div className="absolute top-1/4 left-1 w-2 h-2.5 bg-pink-400 rounded-full" />
                </div>
                <div className="w-24 h-24 bg-[#09A6A4] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(9,166,164,0.3)] z-10">
                  <Check className="text-white w-12 h-12" strokeWidth={4} />
                </div>
              </div>
              <div className="space-y-3 px-4">
                <p className="text-[1rem] text-slate-700 font-semibold leading-relaxed max-w-[340px]">
                  Thank you for completing the Aadhar verification. Please complete the facial verification.
                </p>
              </div>
              <button
                onClick={() => setStep("selfie_scan")}
                className="w-full max-w-[280px] py-4 mt-4 rounded-xl text-[1rem] font-bold bg-[#09A6A4] text-white shadow-xl shadow-[#09A6A4]/20 hover:scale-[1.01] transition-transform cursor-pointer"
              >
                Facial Verification
              </button>
            </div>
          ) : step === "selfie_scan" ? (
            <SelfieScan
              hasCameraAccess={hasCameraAccess}
              selfieLightingMode={selfieLightingMode}
              setSelfieLightingMode={setSelfieLightingMode}
              videoRef={videoRef}
              fileInputRef={fileInputRef}
              onCapture={captureSelfiePhoto}
              onTriggerUpload={triggerUploadClick}
              onFileChange={handleDesktopFileChange}
            />
          ) : step === "selfie_captured" ? (
            <SelfieCaptured
              capturedPhoto={capturedPhoto}
              isVerifyingSelfie={isVerifyingSelfie}
              selfieProgress={selfieProgress}
              selfieStatusText={selfieStatusText}
              onRetake={() => {
                setCapturedPhoto(null);
                setStep("selfie_scan");
              }}
              onSubmit={runSelfieMatchAnimation}
            />
          ) : step === "kyc_complete" ? (
            <KycComplete onContinue={() => router.push("/account")} />
          ) : null}

        </div>
      </GlassContainer>
    </div>
  );
}
