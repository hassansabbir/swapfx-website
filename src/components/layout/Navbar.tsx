import React from "react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import logo from "@/assets/logo.png";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-2 px-4 md:px-8 max-w-[1150px] mx-auto w-full">
      <div className="flex items-center gap-2">
        <Image src={logo} alt="SwapFX Logo" width={80} height={80} priority />
      </div>
      <Button variant="primary" size="md">
        Get Started
      </Button>
    </nav>
  );
};
