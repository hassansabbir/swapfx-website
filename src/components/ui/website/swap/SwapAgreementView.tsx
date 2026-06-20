import React, { useState } from "react";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { X } from "lucide-react";

export const SwapAgreementView = ({
  onCancel,
  onContinue,
}: {
  onCancel: () => void;
  onContinue: () => void;
}) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1200px] mx-auto w-full animate-in fade-in zoom-in-95 duration-500">
      <GlassContainer className="p-6 md:p-12 relative overflow-visible">
        {/* Close Button */}
        <IconButton onClick={onCancel} className="absolute top-3 right-3 md:top-6 md:right-6">
          <X size={24} />
        </IconButton>

        <div className="space-y-8 max-w-[750px] mx-auto mt-8">
          <div className="space-y-4">
            <h2 className="text-[1.5rem] font-bold text-slate-800">
              Swap Agreement Confirmation
            </h2>
            <p className="text-[0.9rem] text-slate-500 leading-relaxed">
              Before proceeding, please confirm that you understand and agree to
              the following:
            </p>
          </div>

          <ul className="space-y-5">
            {[
              "Both parties must complete their swap within the agreed time limit.",
              "The swap timer will start only after both Swappers have paid the required swap fee.",
              "Swap fees are non-refundable once the timer starts.",
              "You are responsible for sending funds to the correct details provided.",
              "If one party fails to complete the swap within the time limit, the case may be reviewed and appropriate action taken.",
              "Any dispute must be raised before the timer expires.",
              "Providing false payment proof may result in account suspension.",
            ].map((text, i) => (
              <li
                key={i}
                className="flex gap-4 text-[0.85rem] text-slate-600 leading-relaxed group"
              >
                <span className="text-slate-300 mt-0.5">•</span>
                <p className="flex-1">{text}</p>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 pt-4">
            <div
              onClick={() => setAgreed(!agreed)}
              className={`w-6 h-6 rounded-md border-2 cursor-pointer transition-all flex items-center justify-center
                ${agreed ? "bg-[#09A6A4] border-[#09A6A4]" : "border-slate-200 bg-white"}
              `}
            >
              {agreed && (
                <div className="w-3 h-1.5 border-l-2 border-b-2 border-white -rotate-45 mb-0.5" />
              )}
            </div>
            <label
              onClick={() => setAgreed(!agreed)}
              className="text-[0.9rem] text-slate-600 cursor-pointer font-medium"
            >
              I have read and agree to the swap terms.
            </label>
          </div>

          <div className="flex justify-center pt-2">
            <Button
              disabled={!agreed}
              onClick={onContinue}
              className={`w-full
                ${agreed ? "bg-[#09A6A4] text-white hover:scale-[1.02] shadow-[#09A6A4]/20 border-[#078d8b]" : "bg-slate-200 text-slate-400 cursor-not-allowed border-slate-300 shadow-none"}
              `}
            >
              Continue
            </Button>
          </div>
        </div>
      </GlassContainer>
    </div>
  );
};
