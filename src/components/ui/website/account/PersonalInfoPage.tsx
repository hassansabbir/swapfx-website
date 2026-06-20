"use client";

import React from "react";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import {
  X,
  Camera,
  CheckCircle2,
  Calendar,
  ChevronDown,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";

const PersonalInfoPage = () => {
  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1150px] mx-auto w-full animate-in fade-in duration-700">
      <GlassContainer className="p-6 md:p-10 relative overflow-visible">
        {/* Close Button */}
        <IconButton href="/account" className="absolute top-6 right-6">
          <X size={24} />
        </IconButton>

        <div className="max-w-[700px] mx-auto space-y-10 mt-8">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 border-4 border-white shadow-xl overflow-hidden transition-transform group-hover:scale-105">
                <Camera size={32} />
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-slate-400 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                <ShieldAlert size={16} className="text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-[1.5rem] font-bold text-slate-800 tracking-tight">
                  Mr. Fahim Ahmed
                </h2>
                <div className="w-5 h-5 rounded-full bg-slate-300 flex items-center justify-center">
                  <CheckCircle2
                    size={14}
                    className="text-white fill-slate-300"
                  />
                </div>
              </div>
              <p className="text-[#09A6A4] font-bold text-sm tracking-wide">
                @fahimahmed7890
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            {/* Title, First Name, Last Name */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormGroup label="Title">
                <div className="relative">
                  <select className="w-full h-14 px-4 rounded-xl bg-white/50 border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all appearance-none">
                    <option>MR.</option>
                    <option>MRS.</option>
                    <option>MS.</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </FormGroup>
              <FormGroup label="First Name">
                <input
                  type="text"
                  defaultValue="Fahim"
                  className="w-full h-14 px-4 rounded-xl bg-white/50 border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all"
                />
              </FormGroup>
              <FormGroup label="Last name">
                <input
                  type="text"
                  defaultValue="Ahmed"
                  className="w-full h-14 px-4 rounded-xl bg-white/50 border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all"
                />
              </FormGroup>
            </div>

            {/* Phone */}
            <div className="md:col-span-2">
              <FormGroup label="Phone">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="relative w-full sm:w-32 sm:shrink-0">
                    <div className="w-full h-14 px-4 rounded-xl bg-white/50 border border-slate-200 flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-4 bg-red-500 rounded-sm relative overflow-hidden">
                          {/* Simplified flag icon */}
                          <div className="absolute inset-0 flex flex-col">
                            <div className="h-1/3 bg-red-600" />
                            <div className="h-1/3 bg-white" />
                            <div className="h-1/3 bg-black" />
                          </div>
                        </div>
                        <ChevronDown size={18} className="text-slate-400" />
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    defaultValue="+123 456 789"
                    className="flex-1 min-w-0 h-14 px-4 rounded-xl bg-white/50 border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all"
                  />
                </div>
              </FormGroup>
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <FormGroup label="Email">
                <input
                  type="email"
                  defaultValue="Swapper@gmail.com"
                  className="w-full h-14 px-4 rounded-xl bg-white/50 border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all"
                />
              </FormGroup>
            </div>

            {/* Swapper Name */}
            <div className="md:col-span-2">
              <FormGroup label="Swapper Name">
                <input
                  type="text"
                  defaultValue="@fahim123"
                  className="w-full h-14 px-4 rounded-xl bg-white/50 border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all"
                />
              </FormGroup>
            </div>

            {/* DOB & Nationality */}
            <FormGroup label="Date Of Birth">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select"
                  className="w-full h-14 px-4 rounded-xl bg-white/50 border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all"
                />
                <Calendar
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={20}
                />
              </div>
            </FormGroup>
            <FormGroup label="Nationality">
              <input
                type="text"
                placeholder="Enter Nationality"
                className="w-full h-14 px-4 rounded-xl bg-white/50 border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all"
              />
            </FormGroup>

            {/* Street Address */}
            <div className="md:col-span-2">
              <FormGroup label="Street Address">
                <input
                  type="text"
                  placeholder="Enter Street Address"
                  className="w-full h-14 px-4 rounded-xl bg-white/50 border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all"
                />
              </FormGroup>
            </div>

            {/* State / City & Zip */}
            <FormGroup label="State / City">
              <input
                type="text"
                placeholder="Enter City"
                className="w-full h-14 px-4 rounded-xl bg-white/50 border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all"
              />
            </FormGroup>
            <FormGroup label="Zip /Post Code">
              <input
                type="text"
                placeholder="Enter Zip/Post Code"
                className="w-full h-14 px-4 rounded-xl bg-white/50 border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all"
              />
            </FormGroup>

            {/* Country & Currency */}
            <FormGroup label="Country">
              <div className="relative">
                <select className="w-full h-14 px-4 rounded-xl bg-white/50 border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all appearance-none">
                  <option>Select Country</option>
                  <option>United States</option>
                  <option>Bangladesh</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={20}
                />
              </div>
            </FormGroup>
            <FormGroup label="Currency">
              <div className="w-full h-14 px-4 rounded-xl bg-slate-100/50 border border-slate-200 text-slate-400 font-bold flex items-center">
                BDT
              </div>
            </FormGroup>

            {/* Income Source */}
            <div className="md:col-span-2">
              <FormGroup label="Income Source">
                <div className="relative">
                  <select className="w-full h-14 px-4 rounded-xl bg-white/50 border border-slate-200 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#09A6A4]/20 focus:border-[#09A6A4] transition-all appearance-none">
                    <option>Select Income Source</option>
                    <option>Salary</option>
                    <option>Business</option>
                    <option>Freelancing</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </FormGroup>
            </div>
          </div>

          {/* Update Button */}
          <div className="flex justify-center pt-6">
            <Button className="w-full">Update</Button>
          </div>
        </div>
      </GlassContainer>
    </div>
  );
};

const FormGroup = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <label className="text-[0.95rem] font-bold text-slate-700 tracking-tight block px-1">
      {label}
    </label>
    {children}
  </div>
);

export default PersonalInfoPage;
