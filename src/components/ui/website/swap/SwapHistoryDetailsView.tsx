import React from "react";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { IconButton } from "@/components/ui/IconButton";
import { ArrowLeft, CheckCircle2, Star } from "lucide-react";

export const SwapHistoryDetailsView = ({
  swap,
  onBack,
}: {
  swap: any;
  onBack: () => void;
}) => {
  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1200px] mx-auto w-full animate-in fade-in duration-500">
      <GlassContainer className="p-6 md:p-12 relative overflow-visible">
        {/* Back Button */}
        <IconButton onClick={onBack} className="absolute top-6 left-6 w-11 h-11 bg-slate-400/85 shadow-md animate-in fade-in duration-300">
          <ArrowLeft size={20} />
        </IconButton>

        <div className="space-y-6 max-w-[750px] mx-auto">
          {/* Header Title */}
          <div className="text-center pt-12">
            <h2 className="text-[1.5rem] font-bold text-slate-800 tracking-tight">
              Swap History
            </h2>
          </div>

          {/* User Profile / Status Row */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0 w-12 h-12">
                {/* Avatar Image */}
                <div className="w-full h-full rounded-full border border-white shadow-sm overflow-hidden flex items-center justify-center bg-slate-100">
                  {swap.avatarUrl ? (
                    <img
                      src={swap.avatarUrl}
                      alt={swap.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-slate-400 font-bold text-xs uppercase">
                      {swap.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                  )}
                </div>
                {/* Gold Verification Badge on Avatar Corner */}
                <div className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 bg-[#FFBF00] rounded-full border border-white flex items-center justify-center shadow-sm">
                  <span className="text-[8px] font-bold text-white leading-none mb-0.5">
                    i
                  </span>
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-[1.05rem] font-bold text-slate-800 leading-tight">
                    {swap.name}
                  </h4>
                  <CheckCircle2
                    size={16}
                    className="text-green-500 fill-current"
                  />
                </div>
                <div className="flex items-center gap-1 text-[0.8rem] text-slate-400 font-semibold leading-none">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span>
                    {swap.rating} ({swap.reviews})
                  </span>
                </div>
              </div>
            </div>

            <div className="shrink-0">
              <span
                className={`text-[1.05rem] font-bold ${swap.status === "Completed" ? "text-green-600" : "text-slate-500"}`}
              >
                {swap.status}
              </span>
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-white rounded-4xl p-6 md:p-8 border border-slate-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.01)] space-y-2">
            {[
              { label: "Swapper Name", value: swap.swapperName },
              { label: "Amount Sent", value: swap.amountSent },
              { label: "Amount Receive", value: swap.amountReceive },
              { label: "Date", value: swap.date },
              { label: "Time", value: swap.time },
              { label: "Swap ID", value: `#${swap.id}` },
            ].map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-4 border-b border-slate-100/60 last:border-b-0"
              >
                <span className="text-[0.92rem] font-bold text-slate-400">
                  {item.label}
                </span>
                <span className="text-[0.95rem] font-bold text-slate-800">
                  {item.value}
                </span>
              </div>
            ))}

            {/* Note block */}
            <div className="space-y-2 py-4 border-t border-slate-100/60">
              <span className="text-[0.92rem] font-bold text-slate-400">
                Note :
              </span>
              <p className="text-[0.88rem] text-[#001D3D]/70 font-medium leading-relaxed">
                {swap.note}
              </p>
            </div>

            {/* Proof block */}
            <div className="flex justify-between items-center py-4 border-t border-slate-100/60">
              <span className="text-[0.92rem] font-bold text-slate-400">
                Proof
              </span>
              <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity">
                <svg
                  width="22"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-slate-800"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <text
                    x="6"
                    y="18"
                    fontSize="6.5"
                    fontWeight="bold"
                    fill="currentColor"
                    stroke="none"
                  >
                    PDF
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center items-center gap-4 pt-6">
            <button className="flex-1 max-w-[180px] py-4 bg-[#09A6A4] text-white font-bold rounded-xl shadow-md shadow-[#09A6A4]/15 hover:scale-[1.02] transition-transform duration-200 text-center">
              Email
            </button>
            <button
              onClick={onBack}
              className="flex-1 max-w-[180px] py-4 bg-white border border-[#09A6A4] text-[#09A6A4] font-bold rounded-xl hover:bg-[#09A6A4]/5 transition-all duration-200 text-center"
            >
              Close
            </button>
          </div>
        </div>
      </GlassContainer>
    </div>
  );
};
