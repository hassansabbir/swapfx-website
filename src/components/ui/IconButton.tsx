"use client";

import { cn } from "@/lib/utils";
import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface IconButtonBaseProps {
  children: React.ReactNode;
  className?: string;
  /** Visual style variant */
  variant?: "slate" | "dark" | "light";
}

interface IconButtonAsButton extends IconButtonBaseProps {
  href?: never;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface IconButtonAsLink extends IconButtonBaseProps {
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

type IconButtonProps = IconButtonAsButton | IconButtonAsLink;

export const IconButton = ({
  children,
  className,
  variant = "slate",
  href,
  onClick,
  ...props
}: IconButtonProps) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const nextId = useRef(0);

  const variants = {
    slate:
      "bg-slate-400 text-white hover:bg-slate-500 shadow-lg",
    dark:
      "bg-neutral-800 text-white hover:bg-neutral-700",
    light:
      "bg-slate-100 text-slate-400 hover:bg-slate-200 shadow-inner",
  };

  const rippleColor: Record<string, string> = {
    slate: "rgba(255, 255, 255, 0.45)",
    dark: "rgba(255, 255, 255, 0.35)",
    light: "rgba(100, 116, 139, 0.2)",
  };

  const handleRipple = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2.5;

      const id = nextId.current++;
      setRipples((prev) => [...prev, { id, x, y, size }]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 500);
    },
    [],
  );

  const rippleElements = (
    <>
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
            animation: "icon-btn-ripple 500ms ease-out forwards",
          }}
        />
      ))}
      <style>{`
        @keyframes icon-btn-ripple {
          0% { transform: scale(0); opacity: 1; }
          60% { opacity: 0.5; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </>
  );

  const sharedClassName = cn(
    "relative overflow-hidden w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 cursor-pointer focus:outline-none z-10",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={sharedClassName}
        onClick={(e) => {
          handleRipple(e);
          (onClick as React.MouseEventHandler<HTMLAnchorElement>)?.(e);
        }}
      >
        {children}
        {rippleElements}
      </Link>
    );
  }

  return (
    <button
      className={sharedClassName}
      onClick={(e) => {
        handleRipple(e);
        (onClick as React.MouseEventHandler<HTMLButtonElement>)?.(e);
      }}
    >
      {children}
      {rippleElements}
    </button>
  );
};
