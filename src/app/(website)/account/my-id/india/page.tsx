"use client";

import React, { useState, useEffect, useRef } from "react";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, Check, AlertCircle, ShieldCheck, Key, FileText, Smartphone, Lock, Eye, EyeOff, Camera, Pencil, Folder, Calendar, User, EyeIcon, EyeOffIcon, Upload, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

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
          <button 
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
            className="absolute top-6 left-6 w-10 h-10 rounded-full bg-slate-400 text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-lg z-10 focus:outline-none cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        <div className="max-w-[550px] mx-auto w-full space-y-6">
          
          {step === "landing" ? (
            /* ========================================================= */
            /* 1. DIGILOCKER LANDING / INITIATION */
            /* ========================================================= */
            <div className="space-y-6 text-center animate-in fade-in duration-300">
              
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl">🇮🇳</span>
                <span className="text-[0.72rem] text-slate-400 font-bold tracking-widest uppercase">
                  Government of India
                </span>
              </div>

              <div className="flex flex-col items-center space-y-3 pt-2">
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-xl shadow-blue-500/20">
                  <div className="absolute inset-0.5 border border-white/20 rounded-xl" />
                  <ShieldCheck className="text-white w-10 h-10" />
                </div>
                
                <div className="pt-1">
                  <h2 className="text-[1.8rem] font-black tracking-tight leading-none text-slate-800">
                    Digi<span className="text-[#09A6A4]">Locker</span>
                  </h2>
                  <p className="text-[0.72rem] text-slate-400 font-semibold pt-1">
                    Your documents anytime, anywhere
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-5 text-left">
                <h3 className="text-[1rem] font-bold text-slate-800 text-center pb-1">
                  Aadhaar DigiLocker Verification
                </h3>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E0F7F6] text-[#09A6A4] flex items-center justify-center font-bold text-sm shrink-0">
                      1
                    </div>
                    <p className="text-slate-600 text-[0.88rem] leading-relaxed font-medium pt-0.5">
                      Link your secure DigiLocker account instantly.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E0F7F6] text-[#09A6A4] flex items-center justify-center font-bold text-sm shrink-0">
                      2
                    </div>
                    <p className="text-slate-600 text-[0.88rem] leading-relaxed font-medium pt-0.5">
                      Verify your identity using direct Aadhaar validation. No manual document uploads required.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={() => setStep("login")}
                  className="w-full py-4 rounded-xl text-[1rem] font-bold bg-[#09A6A4] text-white shadow-xl shadow-[#09A6A4]/20 hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock size={16} />
                  <span>Proceed to DigiLocker</span>
                </Button>
              </div>

            </div>
          ) : step === "login" ? (
            /* ========================================================= */
            /* 2. DIGILOCKER LOGIN INPUT */
            /* ========================================================= */
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* DigiLocker Portal Tricolor Header */}
              <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-1 bg-gradient-to-b from-orange-500 via-white to-green-600 rounded-full" />
                  <span className="text-[0.9rem] font-bold text-slate-800">DigiLocker Login</span>
                </div>
                <span className="text-[0.72rem] text-slate-400 font-bold uppercase tracking-wider">Secured Portal</span>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-5">
                <div className="space-y-1 pb-1">
                  <h3 className="text-[1.02rem] font-bold text-slate-800">
                    Sign In with Aadhaar or Mobile
                  </h3>
                  <p className="text-[0.78rem] text-slate-400 font-semibold leading-relaxed">
                    Provide your 12-digit Aadhaar number or registered mobile number to fetch your account profile
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[0.88rem] text-slate-800 font-bold pl-0.5">
                    Aadhaar / Mobile Number
                  </label>
                  <input
                    type="text"
                    maxLength={12}
                    value={aadhaarOrMobile}
                    onChange={(e) => setAadhaarOrMobile(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter Aadhaar or Mobile"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-[#F1F5F9]/40 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] tracking-widest text-center text-lg placeholder:tracking-normal placeholder:font-medium placeholder:text-sm"
                  />
                </div>
              </div>

              <Button
                onClick={() => setStep("otp")}
                disabled={aadhaarOrMobile.length < 10}
                className={`w-full py-4 rounded-xl text-[1rem] font-bold shadow-xl transition-all ${
                  aadhaarOrMobile.length >= 10
                    ? "bg-[#09A6A4] text-white shadow-[#09A6A4]/20 hover:scale-[1.01] cursor-pointer"
                    : "bg-slate-200 text-slate-400 shadow-none cursor-not-allowed"
                }`}
              >
                Sign In with OTP
              </Button>

            </div>
          ) : step === "otp" ? (
            /* ========================================================= */
            /* 3. OTP VERIFICATION CHECK */
            /* ========================================================= */
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-1 bg-gradient-to-b from-orange-500 via-white to-green-600 rounded-full" />
                  <span className="text-[0.9rem] font-bold text-slate-800">Verification</span>
                </div>
                <span className="text-[0.72rem] text-slate-400 font-bold uppercase tracking-wider">Authentication</span>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <label className="text-[0.88rem] text-slate-800 font-bold pl-0.5">
                      6-Digit Mobile OTP
                    </label>
                    <span className="text-[0.7rem] text-slate-400 font-semibold">Sent to registered mobile</span>
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 6-Digit OTP"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-[#F1F5F9]/40 text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] tracking-widest text-center text-lg placeholder:tracking-normal placeholder:font-medium placeholder:text-sm"
                  />
                </div>
              </div>

              <Button
                onClick={() => setStep("dob_verification")}
                disabled={otpCode.length !== 6}
                className={`w-full py-4 rounded-xl text-[1rem] font-bold shadow-xl transition-all ${
                  otpCode.length === 6
                    ? "bg-[#09A6A4] text-white shadow-[#09A6A4]/20 hover:scale-[1.01] cursor-pointer"
                    : "bg-slate-200 text-slate-400 shadow-none cursor-not-allowed"
                }`}
              >
                Verify OTP
              </Button>

            </div>
          ) : step === "dob_verification" ? (
            /* ========================================================= */
            /* 4. DATE OF BIRTH VERIFICATION (Screenshot 1) */
            /* ========================================================= */
            <div className="space-y-6 text-center animate-in fade-in duration-300">
              
              {/* Purple DigiLocker Header */}
              <div className="flex flex-col items-center space-y-2 pt-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg">
                  <ShieldCheck className="text-white w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-[1.3rem] font-black tracking-tight leading-none text-slate-800">
                    Digi<span className="text-indigo-600">Locker</span>
                  </h2>
                  <p className="text-[0.55rem] text-slate-400 font-semibold pt-0.5">
                    Your documents anytime, anywhere
                  </p>
                </div>
              </div>

              {/* DOB Verify Card */}
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md space-y-6 text-left max-w-[480px] mx-auto">
                <div className="space-y-1">
                  <h3 className="text-[1.05rem] font-extrabold text-slate-800">
                    Verify your date of birth
                  </h3>
                  <p className="text-[0.82rem] text-slate-400 font-semibold">
                    Enter your Date of Birth
                  </p>
                </div>

                {/* Dropdowns grid */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Day Dropdown */}
                  <select 
                    value={dobDay} 
                    onChange={(e) => setDobDay(e.target.value)}
                    className="h-11 px-3 border border-slate-200 bg-slate-50/50 rounded-xl text-[0.88rem] text-slate-700 font-semibold focus:outline-none focus:border-[#09A6A4] cursor-pointer"
                  >
                    <option value="">Date</option>
                    {Array.from({ length: 31 }, (_, i) => {
                      const d = String(i + 1).padStart(2, "0");
                      return <option key={d} value={d}>{d}</option>;
                    })}
                  </select>

                  {/* Month Dropdown */}
                  <select 
                    value={dobMonth} 
                    onChange={(e) => setDobMonth(e.target.value)}
                    className="h-11 px-3 border border-slate-200 bg-slate-50/50 rounded-xl text-[0.88rem] text-slate-700 font-semibold focus:outline-none focus:border-[#09A6A4] cursor-pointer"
                  >
                    <option value="">Month</option>
                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>

                  {/* Year Dropdown */}
                  <select 
                    value={dobYear} 
                    onChange={(e) => setDobYear(e.target.value)}
                    className="h-11 px-3 border border-slate-200 bg-slate-50/50 rounded-xl text-[0.88rem] text-slate-700 font-semibold focus:outline-none focus:border-[#09A6A4] cursor-pointer"
                  >
                    <option value="">Year</option>
                    {Array.from({ length: 65 }, (_, i) => {
                      const y = String(2015 - i);
                      return <option key={y} value={y}>{y}</option>;
                    })}
                  </select>
                </div>

                <div className="pt-2 flex justify-center">
                  <Button
                    onClick={() => setStep("set_pin")}
                    disabled={!dobDay || !dobMonth || !dobYear}
                    className="w-full py-3.5 rounded-xl text-[0.95rem] font-bold bg-[#09A6A4] text-white shadow-xl shadow-[#09A6A4]/15 hover:scale-[1.01] transition-transform cursor-pointer"
                  >
                    Confirm
                  </Button>
                </div>
              </div>

            </div>
          ) : step === "set_pin" ? (
            /* ========================================================= */
            /* 5. SET SECURITY PIN (Screenshot 2) */
            /* ========================================================= */
            <div className="space-y-6 text-center animate-in fade-in duration-300">
              
              {/* Purple DigiLocker Header */}
              <div className="flex flex-col items-center space-y-2 pt-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg">
                  <ShieldCheck className="text-white w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-[1.3rem] font-black tracking-tight leading-none text-slate-800">
                    Digi<span className="text-indigo-600">Locker</span>
                  </h2>
                  <p className="text-[0.55rem] text-slate-400 font-semibold pt-0.5">
                    Your documents anytime, anywhere
                  </p>
                </div>
              </div>

              {/* Set Pin Card */}
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md space-y-6 text-left max-w-[480px] mx-auto">
                <div className="space-y-2">
                  <h3 className="text-[1.05rem] font-extrabold text-slate-800">
                    Set Your Security PIN
                  </h3>
                  <p className="text-[0.78rem] text-slate-400 leading-normal font-semibold">
                    Choose a secure PIN, avoid sequences (123456), mirrored numbers (123321), repeated sets (121212), repeated pairs (112233) or repeated patterns (131313).
                  </p>
                </div>

                {/* PIN Code entry fields row */}
                <div className="flex items-center justify-center gap-3 py-2">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <input
                      key={index}
                      type={showPin ? "text" : "password"}
                      maxLength={1}
                      value={pinInputs[index]}
                      ref={(el) => {
                        pinRefs.current[index] = el;
                      }}
                      onChange={(e) => handlePinChange(e.target.value, index)}
                      onKeyDown={(e) => handlePinKeyDown(e, index)}
                      className="w-11 h-11 rounded-xl border border-slate-200 bg-slate-50/50 text-center font-extrabold text-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all"
                    />
                  ))}
                  
                  {/* Eye Mask toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showPin ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                  </button>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={() => setStep("meon_consent")}
                    disabled={pinInputs.some(p => !p)}
                    className="w-full py-3.5 rounded-xl text-[0.95rem] font-bold bg-[#09A6A4] text-white shadow-xl shadow-[#09A6A4]/15 hover:scale-[1.01] transition-transform cursor-pointer"
                  >
                    Done
                  </Button>
                </div>
              </div>

            </div>
          ) : step === "meon_consent" ? (
            /* ========================================================= */
            /* 6. MEON DIGILOCKER CONSENT (Screenshot 3) */
            /* ========================================================= */
            <div className="space-y-6 text-center animate-in fade-in duration-300">
              
              {/* Logo */}
              <div className="flex flex-col items-center space-y-1.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shrink-0">
                  <ShieldCheck className="text-white w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-[1.2rem] font-black tracking-tight leading-none text-slate-800">
                    Digi<span className="text-indigo-600">Locker</span>
                  </h2>
                  <p className="text-[0.5rem] text-slate-400 font-semibold pt-0.5">Your documents anytime, anywhere</p>
                </div>
              </div>

              {/* Consent form list container */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md text-left text-[0.85rem] max-w-[480px] mx-auto space-y-5">
                
                <p className="text-[0.88rem] text-slate-700 leading-normal font-semibold">
                  Please provide your consent to share the following with <span className="text-slate-800 font-bold">MEON</span>:
                </p>

                <div className="space-y-4 pt-1">
                  
                  {/* Document selector Accordion */}
                  <div className="border-b border-slate-100 pb-3 space-y-2">
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setDocumentsAccordionOpen(!documentsAccordionOpen)}>
                      <div className="flex items-center gap-2 font-bold text-slate-700">
                        <span className="text-slate-400 text-xs">▼</span>
                        <span>Issued Documents (18)</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-[0.78rem] text-[#09A6A4] font-bold">Select all</span>
                        <input
                          type="checkbox"
                          checked={selectAllDocuments}
                          onChange={(e) => {
                            const val = e.target.checked;
                            setSelectAllDocuments(val);
                            setDegreeChecked(val);
                            setDrivingChecked(val);
                          }}
                          className="w-4 h-4 rounded border-slate-200 text-[#09A6A4] focus:ring-[#09A6A4] cursor-pointer"
                        />
                      </div>
                    </div>

                    {documentsAccordionOpen && (
                      <div className="pl-4 pt-2 space-y-3 border-l-2 border-slate-100">
                        {/* Aadhaar (can be accessed) - Locked */}
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 font-medium">Aadhaar Card <span className="text-[0.72rem] text-slate-400 italic font-medium">(can be accessed)</span></span>
                          <Check size={16} className="text-[#09A6A4] font-black mr-0.5" strokeWidth={3} />
                        </div>

                        {/* Degree Certificate */}
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Degree Certificate <span className="text-[0.72rem] text-slate-400 italic font-medium">(can be accessed)</span></span>
                          <input
                            type="checkbox"
                            checked={degreeChecked}
                            onChange={(e) => setDegreeChecked(e.target.checked)}
                            className="w-4 h-4 rounded border-slate-200 text-[#09A6A4] focus:ring-[#09A6A4]"
                          />
                        </div>

                        {/* Driving License */}
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">Driving License <span className="text-[0.72rem] text-slate-400 italic font-medium">(can be accessed)</span></span>
                          <input
                            type="checkbox"
                            checked={drivingChecked}
                            onChange={(e) => setDrivingChecked(e.target.checked)}
                            className="w-4 h-4 rounded border-slate-200 text-[#09A6A4] focus:ring-[#09A6A4]"
                          />
                        </div>

                        {/* PAN Verification - Locked */}
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 font-medium">PAN Verification Record <span className="text-[0.72rem] text-slate-400 italic font-medium">(can be accessed)</span></span>
                          <Check size={16} className="text-[#09A6A4] font-black mr-0.5" strokeWidth={3} />
                        </div>

                        <p className="text-[0.78rem] text-blue-600 font-bold hover:underline cursor-pointer pt-1">
                          ... View all 18 documents
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Drive block */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                    <div className="flex items-center gap-2 font-bold text-slate-700">
                      <Folder size={16} className="text-slate-400" />
                      <span>DigiLocker Drive</span>
                    </div>
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-200 text-[#09A6A4]"
                    />
                  </div>

                  {/* Profile block */}
                  <div className="border-b border-slate-100 pb-3.5 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-slate-700">
                      <User size={16} className="text-slate-400" />
                      <span>Profile information</span>
                    </div>
                    <p className="text-[0.78rem] text-slate-400 font-semibold pl-6">
                      Name, Date of Birth, Gender
                    </p>
                  </div>

                  {/* Validity Block */}
                  <div className="border-b border-slate-100 pb-3.5 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-bold text-slate-700">
                        <Calendar size={16} className="text-slate-400" />
                        <span>Consent validity date <span className="text-[0.7rem] text-slate-400 font-normal">(Today + 30 days)</span></span>
                      </div>
                      <p className="text-[0.78rem] text-slate-500 font-bold pl-6">
                        16-Apr-2026
                      </p>
                    </div>
                    
                    <button className="text-[#09A6A4] hover:text-[#09A6A4]/80 p-1.5 focus:outline-none">
                      <Pencil size={15} />
                    </button>
                  </div>

                  {/* Purpose Dropdown */}
                  <div className="space-y-1.5 pb-2">
                    <div className="flex items-center gap-2 font-bold text-slate-700">
                      <span className="text-slate-400 text-xs">?</span>
                      <span>Purpose</span>
                    </div>
                    
                    <select
                      value={purposeValue}
                      onChange={(e) => setPurposeValue(e.target.value)}
                      className="w-full h-10 px-3 border border-slate-200 bg-slate-50/50 rounded-xl text-[0.82rem] text-slate-700 font-semibold focus:outline-none focus:border-[#09A6A4]"
                    >
                      <option value="Know Your Customer">Know Your Customer</option>
                      <option value="Employment Check">Employment Check</option>
                      <option value="Address Verification">Address Verification</option>
                    </select>
                  </div>

                </div>

                {/* Consent Legal Declarations */}
                <p className="text-[0.75rem] text-slate-400 font-medium leading-relaxed pt-1">
                  Consent validity is subject to applicable laws. By clicking 'Allow', you are giving consent to share with <span className="text-slate-500 font-bold">MEON</span>.
                </p>

                {/* Buttons block */}
                <div className="flex gap-4 pt-2">
                  <button
                    onClick={() => setStep("landing")}
                    className="flex-1 py-3.5 bg-white border-2 border-[#09A6A4]/20 text-[#09A6A4] rounded-xl font-extrabold hover:bg-slate-50 transition-colors shadow-xs text-center"
                  >
                    Deny
                  </button>
                  
                  <button
                    onClick={() => {
                      setStep("fetching");
                      setTimeout(() => {
                        setStep("aadhar_success");
                      }, 2500);
                    }}
                    className="flex-1 py-3.5 bg-[#09A6A4] text-white rounded-xl font-extrabold shadow-lg shadow-[#09A6A4]/25 hover:scale-[1.01] transition-transform cursor-pointer text-center"
                  >
                    Allow
                  </button>
                </div>

              </div>

            </div>
          ) : step === "fetching" ? (
            /* ========================================================= */
            /* 7. SECURE FETCHING DATA OVERLAY */
            /* ========================================================= */
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
            /* ========================================================= */
            /* 8. AADHAAR VERIFICATION COMPLETED SUCCESS (Screenshot 4 - Left) */
            /* ========================================================= */
            <div className="space-y-6 pt-6 pb-6 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
              
              {/* Confetti Check Badge */}
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
            /* ========================================================= */
            /* 9. SELFIE SCANNING VIEWPORT (Screenshot 4 - Middle) */
            /* ========================================================= */
            <div className="space-y-6 animate-in fade-in duration-300 flex flex-col items-center py-4">
              
              <div className="text-center space-y-1">
                <h3 className="text-[1.15rem] font-extrabold text-slate-800">
                  Facial Biometric Match
                </h3>
                <p className="text-[0.82rem] text-slate-400 font-medium leading-relaxed max-w-[340px]">
                  {hasCameraAccess === false 
                    ? "Camera access blocked. Please upload a high-quality portrait photo of your face." 
                    : "Center your profile face within the guidelines circle. Make sure you are in a bright, evenly lit space."
                  }
                </p>
              </div>

              {/* Hidden file input for alternative desktop fallback */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleDesktopFileChange}
                accept="image/png, image/jpeg"
                className="hidden"
              />

              {/* Camera Scanner ring target overlay */}
              <div className="relative w-64 h-64 flex items-center justify-center select-none mt-2">
                <div className={`absolute inset-0 rounded-full border-4 border-dashed transition-all duration-300 z-20 ${
                  hasCameraAccess === false
                    ? "border-amber-400/80 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
                    : selfieLightingMode === "bad" 
                      ? "border-red-500 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.2)]" 
                      : "border-[#09A6A4] shadow-[0_0_20px_rgba(9,166,164,0.15)] animate-[spin_30s_linear_infinite]"
                }`} />
                <div className="absolute -inset-1.5 rounded-full border-2 border-slate-100 z-10" />

                {/* Webcam circular container */}
                <div 
                  className="w-[96%] h-[96%] rounded-full overflow-hidden bg-neutral-900 border border-neutral-800 flex items-center justify-center relative"
                >
                  {/* Real Web Camera stream feed */}
                  {hasCameraAccess === true ? (
                    <>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_20%,rgba(0,0,0,0.8)_100%)] z-10" />
                      
                      {/* Face Guidelines */}
                      <div className="absolute w-[60%] h-[75%] border-2 border-white/20 border-dashed rounded-[60px/80px] z-20" />

                      {/* Dynamic laser scanning bar - active in good lighting */}
                      {selfieLightingMode === "good" && (
                        <div className="absolute left-0 right-0 h-1.5 bg-linear-to-r from-transparent via-[#09A6A4] to-transparent shadow-[0_0_12px_rgba(9,166,164,0.8)] animate-[bounce_3s_ease-in-out_infinite] z-25" />
                      )}

                      {/* Dark mask overlay if bad lighting simulated */}
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
                    /* Desktop File Upload Alternate Fallback UI */
                    <div 
                      onClick={triggerUploadClick}
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
                    /* Initial webcam trigger load */
                    <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center text-slate-400 gap-3">
                      <Camera size={36} className="text-slate-500 animate-pulse" />
                      <span className="text-[0.65rem] text-slate-500 font-bold uppercase tracking-widest">
                        Requesting camera...
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status notifications block */}
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

                    {/* Camera Action Controls */}
                    <div className="flex justify-center gap-3 pt-2">
                      {/* Capture Trigger */}
                      <Button
                        onClick={captureSelfiePhoto}
                        className="w-full py-4 rounded-xl text-[1rem] font-extrabold bg-[#09A6A4] text-white shadow-xl shadow-[#09A6A4]/20 hover:scale-[1.01] cursor-pointer"
                      >
                        Capture Selfie
                      </Button>
                    </div>
                  </>
                ) : hasCameraAccess === false ? (
                  <div className="space-y-4">
                    <p className="text-[0.82rem] text-slate-400 font-semibold leading-relaxed max-w-[340px] mx-auto">
                      Alternate solution active: Camera is disabled or unsupported. Please choose a front-facing headshot from your computer files to complete biometric comparisons.
                    </p>
                    <div className="flex justify-center">
                      <Button
                        onClick={triggerUploadClick}
                        className="w-full py-4 rounded-xl text-[1rem] font-extrabold bg-[#09A6A4] text-white shadow-xl shadow-[#09A6A4]/20 hover:scale-[1.01] cursor-pointer"
                      >
                        Choose Photo from File
                      </Button>
                    </div>
                  </div>
                ) : null}

                <div className="flex items-center gap-2 justify-center text-[0.72rem] text-slate-400 font-semibold max-w-[380px] mx-auto text-center pt-2">
                  <ShieldCheck size={16} className="text-[#09A6A4] shrink-0" />
                  <span>Biometric face data is encrypted and immediately deleted after verification checks.</span>
                </div>
              </div>

            </div>
          ) : step === "selfie_captured" ? (
            /* ========================================================= */
            /* 10. SELFIE CAPTURED APPROVED REVIEW (Screenshot 4 - Right) */
            /* ========================================================= */
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

              {/* Captured preview circle with dotted green border */}
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

              {/* Success tag */}
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

                    {/* Confirm/Retake CTAs */}
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          setCapturedPhoto(null);
                          setStep("selfie_scan");
                        }}
                        className="flex-1 py-3.5 bg-white border-2 border-[#09A6A4]/20 text-[#09A6A4] rounded-xl font-extrabold hover:bg-slate-50 transition-colors shadow-xs text-center focus:outline-none"
                      >
                        Retake
                      </button>
                      
                      <button
                        onClick={runSelfieMatchAnimation}
                        className="flex-1 py-3.5 bg-[#09A6A4] text-white rounded-xl font-extrabold shadow-lg shadow-[#09A6A4]/25 hover:scale-[1.01] transition-transform cursor-pointer text-center focus:outline-none"
                      >
                        Submit
                      </button>
                    </div>
                  </>
                )}
              </div>

            </div>
          ) : step === "kyc_complete" ? (
            /* ========================================================= */
            /* 11. KYC COMPLETE & RETRIEVED CREDENTIALS DISPLAY */
            /* ========================================================= */
            <div className="space-y-6 pt-6 pb-6 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
              
              <div className="relative w-28 h-28 flex items-center justify-center mb-2">
                <div className="absolute inset-0 w-full h-full animate-spin-slow">
                  <div className="absolute top-0 left-1/2 w-1 h-3 bg-[#09A6A4] rounded-full rotate-45" />
                  <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-amber-400 rounded-full" />
                  <div className="absolute top-1/4 right-0 w-1.5 h-3 bg-blue-400 rounded-full -rotate-12" />
                  <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-[#09A6A4] rounded-full" />
                </div>
                <div className="w-20 h-20 bg-[#09A6A4] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(9,166,164,0.3)] z-10">
                  <Check className="text-white w-10 h-10" strokeWidth={4} />
                </div>
              </div>

              <div className="space-y-1">
                <h2 className="text-[1.4rem] font-bold text-slate-800 tracking-tight">
                  Aadhaar Verified Successfully!
                </h2>
                <p className="text-[0.85rem] text-slate-400 font-semibold">
                  Secure credentials retrieved and verified via DigiLocker
                </p>
              </div>

              {/* retrieved details card */}
              <div className="w-full bg-white rounded-3xl p-6 border border-slate-100 shadow-xs text-left text-[0.88rem] space-y-3.5 max-w-[460px]">
                <h4 className="text-slate-400 font-bold text-[0.72rem] tracking-wider uppercase border-b border-slate-50 pb-2">
                  Retrieved Identity Details
                </h4>

                <div className="grid grid-cols-3 gap-2">
                  <span className="text-slate-400 font-bold col-span-1">Name:</span>
                  <span className="text-slate-800 font-bold col-span-2">FAHIM AHMED</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <span className="text-slate-400 font-bold col-span-1">Aadhaar:</span>
                  <span className="text-slate-800 font-bold col-span-2 tracking-widest">XXXX-XXXX-8901</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <span className="text-slate-400 font-bold col-span-1">Date of Birth:</span>
                  <span className="text-slate-800 font-semibold col-span-2">12/08/1996</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <span className="text-[#09A6A4] font-bold col-span-1">Face Match:</span>
                  <span className="text-[#09A6A4] font-bold col-span-2">98.4% (Biometrics Match)</span>
                </div>

                <div className="grid grid-cols-3 gap-2 col-span-3 border-t border-slate-50 pt-3">
                  <span className="text-slate-400 font-bold col-span-1">Address:</span>
                  <span className="text-slate-800 font-medium col-span-2 leading-relaxed">
                    H-12, Sector 15, Dwarka, New Delhi, Delhi, 110075
                  </span>
                </div>
              </div>

              <button
                onClick={() => router.push("/account")}
                className="w-full max-w-[280px] py-4 mt-4 rounded-xl text-[1rem] font-bold bg-[#09A6A4] text-white shadow-xl shadow-[#09A6A4]/20 hover:scale-[1.01] transition-transform cursor-pointer"
              >
                Continue to Dashboard
              </button>

            </div>
          ) : null}

        </div>
      </GlassContainer>
    </div>
  );
}
