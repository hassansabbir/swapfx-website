"use client";

import React, { useEffect, useState } from "react";
import { MatchCard } from "./MatchCard";
import { swapService } from "@/lib/services";
import { UserMatch } from "@/types";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

import { Bell } from "lucide-react";

export const MatchList = () => {
  const [matches, setMatches] = useState<UserMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await swapService.getMatches();
        // For demonstration, you can toggle this or it will be empty if service returns []
        setMatches(data);
      } catch (error) {
        console.error("Failed to fetch matches:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-8 space-y-4">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="w-full h-32 bg-slate-100/50 animate-pulse rounded-[1.2rem]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-[1.1rem] font-bold text-slate-800 mb-5">
        Best matches for USD → PHP
      </h2>

      {matches.length > 0 ? (
        <>
          <div className="space-y-1">
            {matches.map((match) => (
              <MatchCard key={match.id} {...match} />
            ))}
          </div>

          <div className="flex items-center justify-center ">
            <Link href="/swap/matches" className="w-3/4 mt-8 flex justify-center">
              <Button variant="primary" className="w-full">
                View All Matches
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="bg-white/95 rounded-3xl p-10 flex flex-col items-center text-center space-y-6 border border-white/20 shadow-sm animate-in fade-in zoom-in duration-500">
          <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center border border-slate-50">
            <Bell className="w-8 h-8 text-[#1ACCC9]" />
          </div>

          <div className="space-y-3">
            <h3 className="text-[1.3rem] font-bold text-slate-800">
              No match found yet.
            </h3>
            <p className="text-[0.9rem] text-slate-400 max-w-[500px] leading-relaxed font-medium">
              We couldn't find a swapper that fits your criteria right now. New
              swap Offer appear throughout the day - you can try again, create
              your swap request, or let us notify you when a match appears.
            </p>
          </div>

          <div className="flex gap-4 w-full max-w-[450px]">
            <Button variant="white" className="flex-1 text-[0.9rem] py-3">
              Create Swap
            </Button>
            <Button variant="white" className="flex-1 text-[0.9rem] py-3">
              Notify Me
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
