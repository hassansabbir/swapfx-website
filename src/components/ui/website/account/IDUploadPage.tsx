"use client";

import React, { useState } from "react";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, Upload } from "lucide-react";
import Link from "next/link";

const IDUploadPage = () => {
  const [selectedType, setSelectedType] = useState<"id" | "passport">("id");

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1000px] mx-auto w-full animate-in fade-in duration-700">
      <GlassContainer className="p-6 md:p-12 relative overflow-visible">
        {/* Back Button */}
        <Link 
          href="/account/my-id"
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-slate-400 text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-lg z-10"
        >
          <ChevronLeft size={24} />
        </Link>

        <div className="max-w-[650px] mx-auto space-y-8">
          <h1 className="text-center text-[1.8rem] font-bold text-slate-800 tracking-tight mb-2">
            My ID
          </h1>

          <div className="text-center space-y-3">
            <h2 className="text-[1.1rem] font-bold text-slate-800">
              Verify Your Identity
            </h2>
            <p className="text-slate-500 text-[0.9rem] leading-relaxed max-w-[500px] mx-auto">
              You're required to complete the ID check and facial verification. Make sure your ID photos are clear, readable and show the entire document. Avoid glare, blur and cropping.
            </p>
          </div>

          {/* Type Selection */}
          <div className="flex justify-center gap-8 py-2">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <div 
                onClick={() => setSelectedType("id")}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedType === "id" ? "border-[#09A6A4]" : "border-slate-300 group-hover:border-slate-400"
                }`}
              >
                {selectedType === "id" && <div className="w-2.5 h-2.5 rounded-full bg-[#09A6A4]" />}
              </div>
              <span className={`font-bold text-[1rem] transition-colors ${
                selectedType === "id" ? "text-[#09A6A4]" : "text-slate-500 group-hover:text-slate-600"
              }`}>
                ID Card
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer group">
              <div 
                onClick={() => setSelectedType("passport")}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedType === "passport" ? "border-[#09A6A4]" : "border-slate-300 group-hover:border-slate-400"
                }`}
              >
                {selectedType === "passport" && <div className="w-2.5 h-2.5 rounded-full bg-[#09A6A4]" />}
              </div>
              <span className={`font-bold text-[1rem] transition-colors ${
                selectedType === "passport" ? "text-[#09A6A4]" : "text-slate-500 group-hover:text-slate-600"
              }`}>
                Passport
              </span>
            </label>
          </div>

          {/* Upload Areas */}
          <div className="space-y-6">
            {selectedType === "id" ? (
              <>
                <div className="space-y-3">
                  <p className="text-slate-700 font-bold text-[0.95rem] px-1">
                    Upload Your ID Card Front Side
                  </p>
                  <UploadBox />
                </div>

                <div className="space-y-3">
                  <p className="text-slate-700 font-bold text-[0.95rem] px-1">
                    Upload Your ID Card Back Side
                  </p>
                  <UploadBox />
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <p className="text-slate-700 font-bold text-[0.95rem] px-1">
                  Upload Your Passport
                </p>
                <UploadBox />
              </div>
            )}
          </div>

          {/* Continue Button */}
          <div className="flex justify-center pt-4">
            <Link href={`/account/my-id/success?type=${selectedType}`} className="w-full md:w-[400px]">
              <Button className="w-full py-4 rounded-xl text-[1.1rem] font-bold bg-[#09A6A4] text-white shadow-xl shadow-[#09A6A4]/20 hover:scale-[1.01] transition-transform">
                Continue
              </Button>
            </Link>
          </div>
        </div>
      </GlassContainer>
    </div>
  );
};

const UploadBox = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="w-full h-40 md:h-48 bg-white rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors group relative overflow-hidden"
    >
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg"
      />
      
      {previewUrl ? (
        <div className="absolute inset-0 w-full h-full p-2">
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-100 shadow-inner group/preview">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-full object-cover animate-in fade-in zoom-in duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
              <div className="bg-white/90 p-2 rounded-full text-slate-800 shadow-xl scale-90 group-hover/preview:scale-100 transition-transform">
                <Upload size={20} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Upload size={24} />
          </div>
          <div className="text-center px-4">
            <p className="text-slate-700 font-bold text-[0.95rem] truncate max-w-[250px]">
              {fileName || "Click to upload"}
            </p>
            <p className="text-slate-400 text-[0.8rem] mt-1">
              {fileName ? "File selected" : "PNG, JPG up to 5MB"}
            </p>
          </div>
        </>
      )}

      {fileName && (
        <div className="absolute top-4 right-4 z-10 text-[#09A6A4] bg-white/90 p-1.5 rounded-full shadow-lg animate-in zoom-in duration-300">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      )}
    </div>
  );
};

export default IDUploadPage;
