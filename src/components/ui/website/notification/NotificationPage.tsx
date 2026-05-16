"use client";

import React from "react";
import { GlassContainer } from "@/components/ui/GlassContainer";
import { 
  Wallet,
  CreditCard,
  AlertCircle
} from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "payment",
    title: "Payment Received",
    message: "Payment of $250.00 has been successfully received.",
    time: "34 Minutes ago",
    unread: true,
  },
  {
    id: 2,
    type: "refund",
    title: "Refund Successful",
    message: "Your refund of $120.00 has been successfully processed.",
    time: "50 Minutes ago",
    unread: true,
  },
  {
    id: 3,
    type: "payout",
    title: "Payout Failed",
    message: "Your payout of $1,500.00 has failed. Please verify your bank details.",
    time: "52 Minutes ago",
    unread: true,
  },
  {
    id: 4,
    type: "refund",
    title: "Refund Successful",
    message: "Your refund of $120.00 has been successfully processed.",
    time: "50 Minutes ago",
    unread: true,
  },
];

const NotificationPage = () => {
  return (
    <div className="py-6 md:py-10 px-3 md:px-8 max-w-[1200px] mx-auto w-full animate-in fade-in duration-700">
      <GlassContainer className="p-6 md:p-12 relative">
        <div className="max-w-[750px] mx-auto space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-[1.8rem] font-bold text-slate-800 tracking-tight">
              Notification
            </h1>
          </div>

          {/* Notifications List */}
          <div className="space-y-0">
            {notifications.map((notif, index) => (
              <NotificationItem 
                key={notif.id} 
                notif={notif} 
                isLast={index === notifications.length - 1} 
              />
            ))}
          </div>
        </div>
      </GlassContainer>
    </div>
  );
};

const NotificationItem = ({ notif, isLast }: { notif: any; isLast: boolean }) => {
  const getIcon = () => {
    switch (notif.type) {
      case "payment":
        return <Wallet size={24} className="text-slate-600" />;
      case "refund":
        return <CreditCard size={24} className="text-slate-600" />;
      case "payout":
        return <AlertCircle size={24} className="text-slate-600" />;
      default:
        return <Wallet size={24} className="text-slate-600" />;
    }
  };

  return (
    <div className={`py-8 flex items-start gap-6 group hover:bg-white/10 transition-colors cursor-pointer rounded-2xl px-4 -mx-4 ${!isLast ? 'border-b border-slate-100/50' : ''}`}>
      {/* Icon with unread dot */}
      <div className="relative shrink-0 mt-1">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm">
          {getIcon()}
        </div>
        {notif.unread && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-4 border-white shadow-sm" />
        )}
      </div>

      {/* Content */}
      <div className="space-y-1.5 flex-1">
        <p className="text-[0.85rem] font-medium text-slate-400">
          {notif.title}
        </p>
        <h3 className="text-[1rem] md:text-[1.1rem] font-bold text-slate-800 leading-tight">
          {notif.message}
        </h3>
        <p className="text-[0.8rem] font-medium text-slate-400">
          {notif.time}
        </p>
      </div>
    </div>
  );
};

export default NotificationPage;
