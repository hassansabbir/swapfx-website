import { cn } from "@/lib/utils";
import React from "react";

interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GlassContainer = ({
  children,
  className,
  ...props
}: GlassContainerProps) => {
  return (
    <div
      className={cn(
        "bg-white/5 backdrop-blur-sm rounded-4xl md:rounded-[3rem] p-5 md:p-16 w-full max-w-[1150px] mx-auto overflow-hidden border border-white/20 shadow-xl",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
