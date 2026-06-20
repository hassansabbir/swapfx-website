"use client";

import React, { Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { IconButton } from "@/components/ui/IconButton";
import { CheckCircle2, Shield, Star, X } from "lucide-react";

function ProfileContent() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  // Prefilled swapper profiles to make it dynamic and high-fidelity
  const profiles: Record<
    string,
    {
      name: string;
      handle: string;
      avatar: string;
      flag: string;
      totalSwaps: number;
      activeSwaps: number;
      reviewsCount: number;
      dob: string;
      address: string;
      city: string;
      zip: string;
      country: string;
      currency: string;
      incomeSource: string;
      chatId: string;
    }
  > = {
    "bob-builder": {
      name: "Bob Builder",
      handle: "@bobbuilder7890",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      flag: "🇺🇸",
      totalSwaps: 15,
      activeSwaps: 10,
      reviewsCount: 222,
      dob: "Example",
      address: "Elgin St. Celina, Delaware",
      city: "London",
      zip: "1920",
      country: "United Kingdom",
      currency: "USD",
      incomeSource: "Employee",
      chatId: "bob-builder",
    },
    "john-doe": {
      name: "John Doe",
      handle: "@johndoe456",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&w=120",
      flag: "🇨🇦",
      totalSwaps: 24,
      activeSwaps: 4,
      reviewsCount: 128,
      dob: "Example",
      address: "Bay St, Toronto, Ontario",
      city: "Toronto",
      zip: "M5H 2Y2",
      country: "Canada",
      currency: "CAD",
      incomeSource: "Business",
      chatId: "john-doe",
    },
    "cameron-williamson": {
      name: "Cameron Williamson",
      handle: "@cameronw",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&w=120",
      flag: "🇬🇧",
      totalSwaps: 8,
      activeSwaps: 2,
      reviewsCount: 42,
      dob: "Example",
      address: "Baker St, London",
      city: "London",
      zip: "NW1 6XE",
      country: "United Kingdom",
      currency: "GBP",
      incomeSource: "Freelancer",
      chatId: "cameron-williamson",
    },
  };

  // Fallback to bob-builder if no profile matches
  const profile = profiles[id] || profiles["bob-builder"];

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[900px] mx-auto w-full animate-in fade-in duration-500">
      <GlassContainer className="p-6 md:p-12 relative overflow-hidden bg-white/40 border border-white/60 shadow-2xl rounded-4xl">
        {/* Top Centered Header Title */}
        <h2 className="text-center text-[1.12rem] font-bold text-slate-800 tracking-tight pb-6 pt-8">
          Profile
        </h2>

        {/* Circular Close X Button in top right */}
        <IconButton
          onClick={() => router.back()}
          className="absolute top-6 right-6 w-9 h-9 bg-slate-400/80 shadow-md z-20"
        >
          <X size={18} />
        </IconButton>

        <div className="space-y-6 max-w-[640px] mx-auto">
          {/* Swapper Card (Avatar overlapping the Teal banner container) */}
          <div className="flex flex-col items-center relative pt-12 pb-2">
            {/* Swapper Avatar Picture */}
            <div className="absolute top-0 w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-100 z-10">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Teal Banner Backdrop Container */}
            <div className="w-full bg-[#09A6A4] rounded-t-3xl pt-16 pb-4 px-6 text-center text-white shadow-[0_4px_20px_rgba(9,166,164,0.12)]">
              <div className="flex items-center justify-center gap-1.5">
                <h3 className="text-[1.32rem] font-bold tracking-tight">
                  {profile.name}
                </h3>
                <CheckCircle2 size={18} className="text-white fill-[#10B981]" />
              </div>
              <p className="text-[0.88rem] font-medium opacity-90 pt-0.5 select-none flex items-center justify-center gap-1">
                {profile.handle} <span className="text-[1.05rem] leading-none">{profile.flag}</span>
              </p>
            </div>

            {/* Statistics Light Teal sub-bar */}
            <div className="w-full bg-[#E0F2FE]/70 rounded-b-3xl py-4.5 px-4 grid grid-cols-3 text-center border-t border-white/20 shadow-[0_4px_15px_rgba(0,0,0,0.01)]">
              <div className="space-y-1">
                <span className="text-[0.74rem] font-bold text-slate-500 uppercase tracking-wider block">
                  Total Swap
                </span>
                <span className="text-[1.35rem] font-extrabold text-slate-800 leading-none block">
                  {profile.totalSwaps}
                </span>
              </div>
              <div className="space-y-1 border-l border-slate-200/50">
                <span className="text-[0.74rem] font-bold text-slate-500 uppercase tracking-wider block">
                  Active Swap
                </span>
                <span className="text-[1.35rem] font-extrabold text-slate-800 leading-none block">
                  {profile.activeSwaps}
                </span>
              </div>
              <div className="space-y-1 border-l border-slate-200/50">
                <span className="text-[0.74rem] font-bold text-slate-500 uppercase tracking-wider block">
                  Reviews
                </span>
                <span className="text-[1.35rem] font-extrabold text-slate-800 leading-none block">
                  {profile.reviewsCount}
                </span>
              </div>
            </div>
          </div>

          {/* General Information Card List */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/60 shadow-[0_4px_25px_rgba(0,0,0,0.01)] space-y-4">
            <div className="divide-y divide-slate-100 text-[0.88rem] font-medium text-slate-700">
              <div className="flex justify-between py-3">
                <span className="text-slate-400">Date of Birth</span>
                <span className="text-slate-800 font-semibold">{profile.dob}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-slate-400">Address Line 1</span>
                <span className="text-slate-800 font-semibold">{profile.address}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-slate-400">State/ City</span>
                <span className="text-slate-800 font-semibold">{profile.city}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-slate-400">Zip Code</span>
                <span className="text-slate-800 font-semibold">{profile.zip}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-slate-400">Country</span>
                <span className="text-slate-800 font-semibold">{profile.country}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-slate-400">Currency</span>
                <span className="text-slate-800 font-semibold">{profile.currency}</span>
              </div>
              <div className="flex justify-between py-3 pt-3">
                <span className="text-slate-400">Income Source</span>
                <span className="text-slate-800 font-semibold">{profile.incomeSource}</span>
              </div>
            </div>
          </div>

          {/* Most Recent Review Card Container */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/60 shadow-[0_4px_25px_rgba(0,0,0,0.01)] space-y-5">
            <h4 className="text-[0.92rem] font-bold text-slate-800 tracking-tight pl-0.5">
              Most Recent Review
            </h4>

            {/* Review List */}
            <div className="space-y-5 divide-y divide-slate-100/70">
              {/* Review 1 */}
              <div className="space-y-3 pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {/* Reviewer Avatar */}
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                      <img
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&w=80"
                        alt="Amina Al-Khalifa"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-[0.85rem] font-bold text-slate-800 leading-tight">
                          Amina Al-Khalifa
                        </span>
                        {/* Green Double Check indicator matching screenshot */}
                        <span className="text-emerald-500 font-semibold text-[0.74rem] leading-none select-none">
                          ✓✓
                        </span>
                      </div>
                      <span className="text-[0.7rem] font-semibold text-slate-400 block leading-tight pt-0.5">
                        30 Min Ago
                      </span>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <span className="flex items-center gap-1 px-3 py-1 bg-slate-100 rounded-lg text-[0.78rem] font-bold text-slate-700 select-none shadow-xs">
                    <Star size={11} className="text-yellow-400 fill-yellow-400" />
                    <span>4</span>
                  </span>
                </div>

                <p className="text-[0.82rem] text-slate-500 font-medium leading-relaxed pl-1">
                  Dr. khalid al mansur is an exceptional physician whose professionalism, expertise, and compassion truly set him apart.
                </p>
              </div>

              {/* Review 2 */}
              <div className="space-y-3 pt-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {/* Reviewer Avatar */}
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                      <img
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&w=80"
                        alt="Amina Al-Khalifa"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-[0.85rem] font-bold text-slate-800 leading-tight">
                          Amina Al-Khalifa
                        </span>
                        <span className="text-emerald-500 font-semibold text-[0.74rem] leading-none select-none">
                          ✓✓
                        </span>
                      </div>
                      <span className="text-[0.7rem] font-semibold text-slate-400 block leading-tight pt-0.5">
                        30 Min Ago
                      </span>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <span className="flex items-center gap-1 px-3 py-1 bg-slate-100 rounded-lg text-[0.78rem] font-bold text-slate-700 select-none shadow-xs">
                    <Star size={11} className="text-yellow-400 fill-yellow-400" />
                    <span>5</span>
                  </span>
                </div>

                <p className="text-[0.82rem] text-slate-500 font-medium leading-relaxed pl-1">
                  Dr. khalid al mansur is an exceptional physician whose professionalism, expertise, and compassion truly .
                </p>
              </div>
            </div>
          </div>

          {/* Contact Solid Teal Button centered at the bottom */}
          <div className="flex justify-center pt-4 w-full">
            <button
              onClick={() => router.push(`/chat/${profile.chatId}`)}
              className="w-full max-w-[340px] py-4 bg-[#09A6A4] hover:bg-[#078d8b] text-white text-[1rem] font-bold rounded-2xl shadow-xl shadow-[#09A6A4]/25 hover:scale-[1.01] transition-all text-center focus:outline-none border-none cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>
      </GlassContainer>
    </div>
  );
}

export default function SwapperProfilePage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-[#09A6A4] animate-spin" />
      </div>
    }>
      <ProfileContent />
    </Suspense>
  );
}
