"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { ChevronLeft, Star } from "lucide-react";

export default function MyReviewsPage() {
  const router = useRouter();

  const ratingBars = [
    { stars: 5, count: 250, percent: 75 },
    { stars: 4, count: 100, percent: 45 },
    { stars: 3, count: 20, percent: 30 },
    { stars: 2, count: 10, percent: 20 },
    { stars: 1, count: 3, percent: 12 },
  ];

  const reviews = [
    {
      id: 1,
      name: "Amina Al-Khalifa",
      time: "30 Min Ago",
      rating: 4,
      text: "Dr. khalid al mansur is an exceptional physician whose professionalism, expertise, and compassion truly set him apart.",
      avatar: "https://i.pravatar.cc/150?img=11"
    },
    {
      id: 2,
      name: "Amina Al-Khalifa",
      time: "30 Min Ago",
      rating: 4,
      text: "Dr. khalid al mansur is an exceptional physician whose professionalism, expertise, and compassion truly set him apart.",
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    {
      id: 3,
      name: "Amina Al-Khalifa",
      time: "30 Min Ago",
      rating: 4,
      text: "Dr. khalid al mansur is an exceptional physician whose professionalism, expertise, and compassion truly set him apart.",
      avatar: "https://i.pravatar.cc/150?img=13"
    },
  ];

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1000px] mx-auto w-full animate-in fade-in duration-500">
      <GlassContainer className="p-6 md:p-12 relative bg-white/40 border border-white/60 shadow-2xl rounded-4xl flex flex-col justify-center min-h-[500px]">
        
        {/* Back circle chevron button */}
        <button
          onClick={() => router.back()}
          className="absolute top-8 left-8 w-11 h-11 rounded-full bg-[#949CA9] text-white flex items-center justify-center hover:bg-slate-500 transition-colors shadow-md z-20 focus:outline-none"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="max-w-[700px] mx-auto w-full pt-4 pb-8 space-y-12">
          
          {/* Header & Overall Rating Section */}
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-center text-[1.25rem] font-bold text-slate-800 tracking-tight pb-2">
              My Review
            </h2>
            
            <div className="flex flex-col items-center">
              <span className="text-[3.5rem] font-bold text-slate-900 leading-none mb-2">4.5</span>
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={20} className="fill-black text-black" />
                ))}
              </div>
              <span className="text-[1.1rem] text-slate-700 font-medium">350 Review</span>
            </div>
          </div>

          {/* Rating Bars Section */}
          <div className="max-w-[550px] mx-auto w-full space-y-3 px-4">
            {ratingBars.map((bar) => (
              <div key={bar.stars} className="flex items-center gap-4 w-full">
                <span className="text-[0.95rem] font-medium text-slate-700 w-[50px] shrink-0">
                  {bar.stars} Star
                </span>
                
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-[#09A6A4] rounded-full" 
                    style={{ width: `${bar.percent}%` }}
                  />
                </div>
                
                <span className="text-[0.95rem] font-medium text-slate-700 w-[35px] text-right shrink-0">
                  {bar.count < 10 ? `0${bar.count}` : bar.count}
                </span>
              </div>
            ))}
          </div>

          {/* Reviews List */}
          <div className="w-full space-y-2 max-w-[650px] mx-auto mt-12">
            {reviews.map((review) => (
              <div key={review.id} className="w-full py-6 border-b border-slate-200/80 last:border-0 group">
                <div className="flex items-start justify-between mb-4">
                  
                  {/* Avatar & Name Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200 relative shadow-sm">
                      <img 
                        src={review.avatar} 
                        alt={review.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 text-[1.05rem]">{review.name}</span>
                      <span className="text-slate-500 text-[0.8rem] font-medium">{review.time}</span>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="bg-slate-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shrink-0">
                    <Star size={14} className="fill-black text-black" />
                    <span className="font-bold text-slate-800 text-[0.9rem] leading-none mt-0.5">{review.rating}</span>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-[0.9rem] text-slate-500 font-medium leading-relaxed">
                  {review.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </GlassContainer>
    </div>
  );
}
