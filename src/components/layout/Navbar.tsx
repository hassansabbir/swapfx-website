"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import {
  Home,
  Store,
  ArrowLeftRight,
  MessageSquare,
  UserCircle,
  Bell,
  Menu,
  X,
} from "lucide-react";

const NavLink = ({
  icon,
  label,
  href,
  active = false,
  onClick,
}: {
  icon: React.ReactElement<{ size?: number | string }>;
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <Link 
    href={href} 
    onClick={onClick}
    className="flex flex-col items-center gap-1.5 group"
  >
    <div
      className={`${active ? "text-[#09A6A4]" : "text-slate-500"} group-hover:text-[#09A6A4] transition-colors`}
    >
      {React.cloneElement(icon, { size: 22 })}
    </div>
    <span
      className={`text-[0.75rem] md:text-[0.85rem] font-bold tracking-wider ${active ? "text-[#09A6A4]" : "text-slate-500"} group-hover:text-[#09A6A4] transition-colors uppercase`}
    >
      {label}
    </span>
  </Link>
);

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mocking logged in state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (!isLoggedIn) {
    return (
      <nav className="flex items-center justify-between py-4 px-4 md:px-8 max-w-[1250px] mx-auto w-full relative z-50">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src={logo}
              alt="SwapFX Logo"
              width={100}
              height={40}
              className="object-contain"
              priority
            />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/method">
            <Button variant="primary" size="md">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex items-center justify-between py-6 px-4 md:px-8 max-w-[1250px] mx-auto w-full relative z-50">
      {/* Logo */}
      <div className="flex items-center shrink-0">
        <Link href="/">
          <Image
            src={logo}
            alt="SwapFX Logo"
            width={110}
            height={40}
            className="object-contain"
            priority
          />
        </Link>
      </div>

      {/* Desktop Navigation Icons */}
      <div className="hidden md:flex items-center gap-10 lg:gap-14">
        <NavLink href="/" icon={<Home />} label="Home" active={pathname === "/"} />
        <NavLink href="/market" icon={<Store />} label="Market" active={pathname === "/market"} />
        <NavLink href="/swap" icon={<ArrowLeftRight />} label="Swap" active={pathname === "/swap"} />
        <NavLink href="/chat" icon={<MessageSquare />} label="Chat" active={pathname === "/chat"} />
        <NavLink href="/account" icon={<UserCircle />} label="Account" active={pathname === "/account"} />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4 md:gap-6">
        <Link href="/notifications" className="relative text-slate-500 hover:text-slate-700 transition-colors">
          <Bell size={22} />
          {/* Notification Dot */}
          <div className="absolute top-0 right-0.5 w-1.5 h-1.5 bg-[#09A6A4] border border-white rounded-full" />
        </Link>
        
        {/* Profile - Hidden on tiny screens, shown on md+ */}
        <div className="hidden sm:block relative cursor-pointer group">
          <div className="w-10 h-10 rounded-full border-2 border-slate-100 overflow-hidden shadow-sm group-hover:border-[#09A6A4] transition-all">
            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
              PS
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-slate-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[88px] bg-white/80 backdrop-blur-xl z-40 md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col items-center gap-8 py-12">
            <NavLink href="/" icon={<Home />} label="Home" active={pathname === "/"} onClick={toggleMenu} />
            <NavLink href="/market" icon={<Store />} label="Market" active={pathname === "/market"} onClick={toggleMenu} />
            <NavLink href="/swap" icon={<ArrowLeftRight />} label="Swap" active={pathname === "/swap"} onClick={toggleMenu} />
            <NavLink href="/chat" icon={<MessageSquare />} label="Chat" active={pathname === "/chat"} onClick={toggleMenu} />
            <NavLink href="/account" icon={<UserCircle />} label="Account" active={pathname === "/account"} onClick={toggleMenu} />
            
            <div className="pt-4 border-t border-slate-100 w-full flex justify-center">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl w-[80%] max-w-[300px]">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">PS</div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800 text-sm">Silver Swap</p>
                  <p className="text-xs text-slate-500">Verified Account</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
