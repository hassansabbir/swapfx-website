"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { IconButton } from "@/components/ui/IconButton";
import { ChevronLeft, ChevronRight, Lock, RectangleEllipsis, UserX, X, Trash2, ChevronDown, Eye, EyeOff } from "lucide-react";

export default function AccountSettingsPage() {
  const router = useRouter();
  const [viewState, setViewState] = useState<"menu" | "manage_pin" | "change_password" | "change_pin" | "close_account" | "view_pin">("menu");
  const [showPin, setShowPin] = useState(false);

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1000px] mx-auto w-full animate-in fade-in duration-500">
      <GlassContainer className="p-6 md:p-12 relative bg-white/40 border border-white/60 shadow-2xl rounded-4xl min-h-[420px] flex flex-col justify-center">
        {/* Close Button (visible only in main menu) */}
        {viewState === "menu" && (
          <IconButton
            onClick={() => router.back()}
            className="absolute top-6 right-6 w-9 h-9 bg-slate-400/80 shadow-md z-20"
          >
            <X size={18} />
          </IconButton>
        )}

        {/* Dynamic Views */}
        {viewState === "menu" ? (
          /* ========================================================= */
          /* 1. ACCOUNT SETTINGS MENU */
          /* ========================================================= */
          <div className="max-w-[650px] mx-auto w-full space-y-6 animate-in fade-in duration-300">
            {/* Header Title (optional for this view, but keeping structural parity) */}
            <div className="h-4" /> {/* Spacer since screenshot doesn't show a bold title here, just the list */}

            {/* Selector Options Box */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_4px_25px_rgba(0,0,0,0.01)] overflow-hidden divide-y divide-slate-100">
              {/* Option 1: Change Password */}
              <button
                onClick={() => setViewState("change_password")}
                className="w-full p-5 flex items-center justify-between hover:bg-slate-50/50 transition-all text-left focus:outline-none group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700 group-hover:text-[#09A6A4] group-hover:bg-[#E0F2FE]/45 transition-colors border border-slate-100 shadow-xs">
                    <Lock size={18} />
                  </div>
                  <span className="text-[0.92rem] font-semibold text-slate-700 tracking-tight group-hover:text-slate-900 transition-colors">
                    Change Password
                  </span>
                </div>
                <ChevronRight size={18} className="text-slate-700 group-hover:text-[#09A6A4] transition-colors" />
              </button>

              {/* Option 2: Manage PIN */}
              <button
                onClick={() => setViewState("manage_pin")}
                className="w-full p-5 flex items-center justify-between hover:bg-slate-50/50 transition-all text-left focus:outline-none group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700 group-hover:text-[#09A6A4] group-hover:bg-[#E0F2FE]/45 transition-colors border border-slate-100 shadow-xs">
                    <RectangleEllipsis size={18} />
                  </div>
                  <span className="text-[0.92rem] font-semibold text-slate-700 tracking-tight group-hover:text-slate-900 transition-colors">
                    Manage PIN
                  </span>
                </div>
                <ChevronRight size={18} className="text-slate-700 group-hover:text-[#09A6A4] transition-colors" />
              </button>

              {/* Option 3: Close Account */}
              <button
                onClick={() => setViewState("close_account")}
                className="w-full p-5 flex items-center justify-between hover:bg-slate-50/50 transition-all text-left focus:outline-none group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700 group-hover:text-[#09A6A4] group-hover:bg-[#E0F2FE]/45 transition-colors border border-slate-100 shadow-xs">
                    <UserX size={18} />
                  </div>
                  <span className="text-[0.92rem] font-semibold text-slate-700 tracking-tight group-hover:text-slate-900 transition-colors">
                    Close Account
                  </span>
                </div>
                <ChevronRight size={18} className="text-slate-700 group-hover:text-[#09A6A4] transition-colors" />
              </button>
            </div>
          </div>
        ) : viewState === "manage_pin" ? (
          /* ========================================================= */
          /* 2. MANAGE PIN SUBMENU */
          /* ========================================================= */
          <div className="max-w-[750px] mx-auto w-full space-y-6 pt-4 relative animate-in fade-in duration-300">
            {/* Back circle chevron button in top left matching mockup */}
            <IconButton
              onClick={() => setViewState("menu")}
              className="absolute top-2 left-0 bg-[#949CA9] hover:bg-slate-500 shadow-md z-20"
            >
              <ChevronLeft size={22} />
            </IconButton>

            {/* Header Title */}
            <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-3">
              Manage PIN
            </h2>

            {/* Selector Options Box */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_4px_25px_rgba(0,0,0,0.01)] overflow-hidden divide-y divide-slate-100">
              {/* Option 1: View PIN */}
              <button
                onClick={() => setViewState("view_pin")}
                className="w-full p-5 flex items-center justify-between hover:bg-slate-50/50 transition-all text-left focus:outline-none group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700 group-hover:text-[#09A6A4] group-hover:bg-[#E0F2FE]/45 transition-colors border border-slate-100 shadow-xs">
                    <RectangleEllipsis size={18} />
                  </div>
                  <span className="text-[0.92rem] font-semibold text-slate-700 tracking-tight group-hover:text-slate-900 transition-colors">
                    View PIN
                  </span>
                </div>
                <ChevronRight size={18} className="text-slate-700 group-hover:text-[#09A6A4] transition-colors" />
              </button>

              {/* Option 2: Change PIN */}
              <button
                onClick={() => setViewState("change_pin")}
                className="w-full p-5 flex items-center justify-between hover:bg-slate-50/50 transition-all text-left focus:outline-none group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700 group-hover:text-[#09A6A4] group-hover:bg-[#E0F2FE]/45 transition-colors border border-slate-100 shadow-xs">
                    <RectangleEllipsis size={18} />
                  </div>
                  <span className="text-[0.92rem] font-semibold text-slate-700 tracking-tight group-hover:text-slate-900 transition-colors">
                    Change PIN
                  </span>
                </div>
                <ChevronRight size={18} className="text-slate-700 group-hover:text-[#09A6A4] transition-colors" />
              </button>
            </div>
          </div>
        ) : viewState === "change_password" ? (
          /* ========================================================= */
          /* 3. CHANGE PASSWORD FORM */
          /* ========================================================= */
          <div className="max-w-[750px] mx-auto w-full space-y-6 pt-4 relative animate-in fade-in duration-300">
            {/* Back circle chevron button in top left */}
            <IconButton
              onClick={() => setViewState("menu")}
              className="absolute top-2 left-0 bg-[#949CA9] hover:bg-slate-500 shadow-md z-20"
            >
              <ChevronLeft size={22} />
            </IconButton>

            {/* Header Title */}
            <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-3">
              Change Password
            </h2>

            {/* Form Container */}
            <div className="max-w-[500px] mx-auto w-full space-y-5">
              <h3 className="font-bold text-slate-800 text-[1rem]">Choose Your Password</h3>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[0.9rem] text-slate-700 font-medium pl-1">Current Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter your old password"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[0.9rem] text-slate-700 font-medium pl-1">New Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter your new password"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[0.9rem] text-slate-700 font-medium pl-1">Confirm Password</label>
                  <input 
                    type="password" 
                    placeholder="Re-enter your new password"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-center">
                <button className="px-12 py-3 rounded-lg text-[0.95rem] font-bold bg-[#09A6A4] text-white shadow-lg shadow-[#09A6A4]/20 hover:scale-[1.02] transition-transform w-[280px]">
                  Update
                </button>
              </div>
            </div>
          </div>
        ) : viewState === "change_pin" ? (
          /* ========================================================= */
          /* 4. CHANGE PIN FORM */
          /* ========================================================= */
          <div className="max-w-[750px] mx-auto w-full space-y-6 pt-4 relative animate-in fade-in duration-300">
            {/* Back circle chevron button in top left (goes back to manage_pin) */}
            <IconButton
              onClick={() => setViewState("manage_pin")}
              className="absolute top-2 left-0 bg-[#949CA9] hover:bg-slate-500 shadow-md z-20"
            >
              <ChevronLeft size={22} />
            </IconButton>

            {/* Header Title */}
            <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-3">
              Manage PIN
            </h2>

            {/* Form Container */}
            <div className="max-w-[500px] mx-auto w-full space-y-5">
              <h3 className="font-bold text-slate-800 text-[1rem]">Choose Your PIN</h3>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[0.9rem] text-slate-700 font-medium pl-1">Current PIN</label>
                  <input 
                    type="password" 
                    placeholder="Enter your old PIN"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all"
                  />
                </div>

                <div className="space-y-1.5 pt-2">
                  <input 
                    type="password" 
                    placeholder="Enter your new PIN"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all"
                  />
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="text-[0.9rem] text-slate-700 font-medium pl-1">Confirm PIN</label>
                  <input 
                    type="password" 
                    placeholder="Re-enter your new PIN"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-center">
                <button className="px-12 py-3 rounded-lg text-[0.95rem] font-bold bg-[#09A6A4] text-white shadow-lg shadow-[#09A6A4]/20 hover:scale-[1.02] transition-transform w-[280px]">
                  Update
                </button>
              </div>
            </div>
          </div>
        ) : viewState === "close_account" ? (
          /* ========================================================= */
          /* 5. CLOSE ACCOUNT FORM */
          /* ========================================================= */
          <div className="max-w-[750px] mx-auto w-full space-y-6 pt-4 relative animate-in fade-in duration-300">
            {/* Close Button top right */}
            <IconButton
              onClick={() => setViewState("menu")}
              className="absolute top-2 right-0 bg-[#949CA9] hover:bg-slate-500 shadow-md z-20"
            >
              <X size={20} />
            </IconButton>

            <div className="max-w-[500px] mx-auto w-full flex flex-col items-center pt-6 space-y-5">
              
              {/* Trash Icon */}
              <div className="w-20 h-20 bg-red-100/70 rounded-2xl flex items-center justify-center mb-2 shadow-sm">
                <Trash2 size={40} className="text-[#EF4444]" strokeWidth={2} />
              </div>
              
              <h2 className="text-center text-[1.4rem] font-bold text-slate-800 tracking-tight pb-3">
                Close Account!
              </h2>

              {/* Form Container */}
              <div className="w-full space-y-4">
                
                {/* Reason Select */}
                <div className="space-y-1.5 relative">
                  <label className="text-[0.9rem] text-slate-700 font-medium pl-1">Reason</label>
                  <div className="relative">
                    <select 
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all appearance-none"
                      defaultValue=""
                    >
                      <option value="" disabled className="text-slate-400">Enter a reason why you want to close</option>
                      <option value="1">Taking a break from the platform</option>
                      <option value="2">Found a better alternative</option>
                      <option value="3">Other reasons</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ChevronDown size={18} className="text-slate-500" />
                    </div>
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[0.9rem] text-slate-700 font-medium pl-1">Password</label>
                  <input 
                    type="password" 
                    placeholder="***********"
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-xl tracking-widest"
                  />
                </div>
              </div>

              {/* Confirm Button */}
              <div className="pt-6 pb-4 flex justify-center w-full">
                <button className="w-full py-3.5 rounded-lg text-[1rem] font-bold bg-[#EF4444] text-white shadow-lg shadow-red-500/20 hover:scale-[1.02] transition-transform">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        ) : viewState === "view_pin" ? (
          /* ========================================================= */
          /* 6. VIEW PIN */
          /* ========================================================= */
          <div className="max-w-[750px] mx-auto w-full space-y-6 pt-4 relative animate-in fade-in duration-300">
            {/* Back circle chevron button */}
            <IconButton
              onClick={() => setViewState("manage_pin")}
              className="absolute top-2 left-0 bg-[#949CA9] hover:bg-slate-500 shadow-md z-20"
            >
              <ChevronLeft size={22} />
            </IconButton>

            {/* Header Title */}
            <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-3">
              Manage PIN
            </h2>

            {/* PIN Card Box */}
            <div className="max-w-[500px] mx-auto w-full space-y-3">
              <span className="text-[0.95rem] font-semibold text-slate-700 block pl-1">
                View PIN
              </span>

              <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 flex items-center justify-between h-14">
                {/* 4 dots or digits */}
                <div className="flex-1 flex justify-center gap-6 pl-10">
                  {showPin ? (
                    <span className="text-xl font-bold tracking-[0.7em] text-slate-800 pl-4">1234</span>
                  ) : (
                    <div className="flex gap-4">
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-400" />
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-400" />
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-400" />
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-400" />
                    </div>
                  )}
                </div>

                {/* Eye toggle button */}
                <button
                  onClick={() => setShowPin(!showPin)}
                  className="text-slate-700 hover:text-[#09A6A4] transition-colors focus:outline-none pr-2"
                >
                  {showPin ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </GlassContainer>
    </div>
  );
}
