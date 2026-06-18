"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import {
  ChevronLeft,
  LogOut,
  User,
  Contact,
  Building2,
  Star,
  MessageSquare,
  Headphones,
  FileText,
  ShieldCheck,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AccountPage = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    window.dispatchEvent(new Event("storage"));
    router.push("/");
  };
  const menuItems1 = [
    {
      label: "Personal Information",
      icon: <User size={20} />,
      hasAlert: true,
      href: "/account/personal-info",
    },
    {
      label: "My ID",
      icon: <Contact size={20} />,
      hasAlert: true,
      href: "/account/my-id",
    },
    {
      label: "Membership",
      icon: <Building2 size={20} />,
      hasChevron: true,
      href: "/account/membership",
    },
    {
      label: "Reviews",
      icon: <Star size={20} />,
      hasChevron: true,
      href: "/account/reviews",
    },
    {
      label: "Messages (10)",
      icon: <MessageSquare size={20} />,
      hasChevron: true,
      href: "/account/messages",
    },
  ];

  const menuItems2 = [
    {
      label: "Help & Support",
      icon: <Headphones size={20} />,
      hasChevron: true,
      href: "/account/support",
    },
    {
      label: "Terms",
      icon: <FileText size={20} />,
      hasChevron: true,
      href: "/account/terms",
    },
    {
      label: "Account",
      icon: <ShieldCheck size={20} />,
      hasChevron: true,
      href: "/account/settings",
    },
  ];

  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1200px] mx-auto w-full animate-in fade-in duration-700">
      <GlassContainer className="p-6 md:p-12 relative overflow-visible">
        {/* Back Button */}
        <IconButton href="/" className="absolute top-6 left-6">
          <ChevronLeft size={24} />
        </IconButton>

        <div className="max-w-[750px] mx-auto space-y-8">
          {/* Profile Header Card */}
          <div className="bg-[#09A6A4] rounded-3xl p-6 md:p-8 flex items-center gap-5 shadow-xl shadow-[#09A6A4]/20 relative overflow-hidden">
            {/* Background pattern/glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />

            <div className="relative shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white/30 overflow-hidden shadow-lg">
                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xl">
                  FA
                </div>
              </div>
            </div>

            <div className="text-white space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-[1.4rem] md:text-[1.8rem] font-bold tracking-tight">
                  Fahim Ahmed
                </h2>
                <CheckCircle2
                  size={20}
                  className="fill-white text-[#09A6A4] shrink-0"
                />
              </div>
              <p className="text-[0.85rem] md:text-[0.95rem] font-medium opacity-90 flex items-center gap-2">
                @fahimahmed7890 🇺🇸
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <div className="flex justify-end pr-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-slate-600 hover:text-red-500 transition-colors font-bold text-[0.9rem]"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Menu Sections */}
          <div className="space-y-6">
            {/* Section 1 */}
            <div className="bg-white/50 backdrop-blur-md rounded-3xl border border-white/60 shadow-sm overflow-hidden">
              {menuItems1.map((item, index) => (
                <MenuItem
                  key={index}
                  {...item}
                  isLast={index === menuItems1.length - 1}
                />
              ))}
            </div>

            {/* Section 2 */}
            <div className="bg-white/50 backdrop-blur-md rounded-3xl border border-white/60 shadow-sm overflow-hidden">
              {menuItems2.map((item, index) => (
                <MenuItem
                  key={index}
                  {...item}
                  isLast={index === menuItems2.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Bottom Submit Button */}
          <div className="flex justify-center pt-4">
            <Button className="w-full">Submit</Button>
          </div>
        </div>
      </GlassContainer>
    </div>
  );
};

const MenuItem = ({
  label,
  icon,
  hasAlert,
  hasChevron,
  isLast,
  href,
}: {
  label: string;
  icon: React.ReactNode;
  hasAlert?: boolean;
  hasChevron?: boolean;
  isLast: boolean;
  href?: string;
}) => {
  const content = (
    <div
      className={`p-5 flex items-center justify-between group cursor-pointer hover:bg-white/40 transition-all ${!isLast ? "border-b border-white/40" : ""}`}
    >
      <div className="flex items-center gap-4">
        <div className="text-slate-600 group-hover:text-[#09A6A4] transition-colors">
          {icon}
        </div>
        <span className="text-[0.95rem] font-bold text-slate-700 tracking-tight">
          {label}
        </span>
      </div>
      <div className="text-slate-300 group-hover:text-slate-500 transition-colors">
        {hasAlert && <AlertCircle size={20} className="text-red-400" />}
        {hasChevron && <ChevronRight size={20} />}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};

export default AccountPage;
