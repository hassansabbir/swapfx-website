import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "white" | "secondary";
  size?: "sm" | "md" | "lg";
}

export const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) => {
  const variants = {
    primary: "bg-[#09A6A4] hover:bg-[#088F8D] text-white",
    white: "bg-white hover:bg-slate-50 text-[#09A6A4]",
    secondary: "bg-[#D1D1D1] hover:bg-[#C0C0C0] text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-[0.8rem]",
    md: "px-6 py-3 text-[0.95rem] font-bold",
    lg: "px-8 py-4 text-[1.1rem] font-bold",
  };

  return (
    <button
      className={cn(
        "rounded-lg transition-all shadow-md border border-white/40 active:translate-y-px disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
