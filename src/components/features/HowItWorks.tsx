import React from "react";
import { Users, Handshake, ArrowLeftRight, CheckCircle2 } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Find a match",
      description:
        "The app instantly connects Swappers who want to exchange opposite currencies.",
      icon: <Users className="w-8 h-8 text-[#1ACCC9]" />,
    },
    {
      id: 2,
      title: "Agree the swap",
      description:
        "Both sides confirm a fair exchange rate and choose the timing that works for them.",
      icon: <Handshake className="w-8 h-8 text-[#1ACCC9]" />,
    },
    {
      id: 3,
      title: "Swap directly",
      description:
        "Each Swapper sends their currency straight to the recipient's local bank account for a smooth transfer.",
      icon: <ArrowLeftRight className="w-8 h-8 text-[#1ACCC9]" />,
    },
    {
      id: 4,
      title: "Confirm completion",
      description:
        "Once both transfers land, Swappers upload proof and the swap is verified and completed.",
      icon: <CheckCircle2 className="w-8 h-8 text-[#1ACCC9]" />,
    },
  ];

  return (
    <div className="space-y-8 mt-16 relative">
      <div className="px-2">
        <h2 className="text-[1.25rem] font-bold text-slate-800 mb-4 px-2">
          How it works
        </h2>
        <p className="text-[0.95rem] text-slate-500 max-w-[700px] leading-relaxed">
          A peer-to-peer currency swap lets people exchange money directly with
          each other at a mutually agreed rate, skipping the middleman and their
          fees.
        </p>
      </div>

      {/* Auto-playing Video Section */}
      <div className="mt-10 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-900 relative aspect-video w-full">
        <video
          src="/howItWorks.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="relative mt-12">
        {/* Glowing Connecting Lines (Visible in gaps) */}
        <div className="absolute inset-0 z-0 hidden md:block">
          {/* Vertical Center Line */}
          <div className="absolute left-1/4 top-[10%] bottom-[10%] w-[2px] bg-[#1ACCC9]/30 -translate-x-1/2 blur-[1px]">
            <div className="w-full h-full bg-[#1ACCC9]/40 blur-xs"></div>
          </div>
          {/* Horizontal Center Line */}
          <div className="absolute top-1/4 left-[10%] right-[10%] h-[2px] bg-[#1ACCC9]/30 -translate-y-1/2 blur-[1px]">
            <div className="w-full h-full bg-[#1ACCC9]/40 blur-xs"></div>
          </div>
          <div className="absolute right-1/4 top-[10%] bottom-[10%] w-[2px] bg-[#1ACCC9]/30 -translate-x-1/2 blur-[1px]">
            <div className="w-full h-full bg-[#1ACCC9]/40 blur-xs"></div>
          </div>
          {/* Horizontal Center Line */}
          <div className="absolute bottom-1/4 left-[10%] right-[10%] h-[2px] bg-[#1ACCC9]/30 -translate-y-1/2 blur-[1px]">
            <div className="w-full h-full bg-[#1ACCC9]/40 blur-xs"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
          {/* Step Cards */}
          {steps?.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded-2xl  py-5 shadow-sm border border-slate-100 space-y-6 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon with Glow */}
              <div className="relative">
                <div className="absolute inset-0 bg-[#1ACCC9]/20 rounded-full blur-xl group-hover:bg-[#1ACCC9]/40 transition-colors"></div>
                <div className="w-16 h-16 rounded-full bg-white shadow-inner flex items-center justify-center relative z-10 border border-[#E0F7F7]">
                  {step.icon}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[1.2rem] font-bold text-slate-800">
                  {step.id}. {step.title}
                </h4>
                <p className="text-[0.85rem] text-slate-400 leading-relaxed font-medium px-4">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
