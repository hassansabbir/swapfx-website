"use client";

import { cn } from "@/lib/utils";
import React, { useCallback, useRef, useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "white" | "secondary";
  size?: "sm" | "md" | "lg";
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  onClick,
  ...props
}: ButtonProps) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const nextId = useRef(0);

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

  const rippleColor: Record<string, string> = {
    primary: "rgba(255, 255, 255, 0.45)",
    white: "rgba(9, 166, 164, 0.25)",
    secondary: "rgba(255, 255, 255, 0.4)",
  };

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2.2;

      const id = nextId.current++;
      setRipples((prev) => [...prev, { id, x, y, size }]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);

      onClick?.(e);
    },
    [onClick],
  );

  return (
    <button
      className={cn(
        "relative overflow-hidden rounded-lg transition-all shadow-md border border-white/40 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
        variants[variant],
        sizes[size],
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            background: `radial-gradient(circle, ${rippleColor[variant]} 0%, transparent 70%)`,
            animation: "button-ripple 600ms ease-out forwards",
          }}
        />
      ))}
      <style>{`
        @keyframes button-ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          60% {
            opacity: 0.6;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
};
