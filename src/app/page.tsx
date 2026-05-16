import { GlassContainer } from "@/components/ui/GlassContainer";
import HomeMainPage from "@/components/ui/website/home/HomeMainPage";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <GlassContainer className="flex flex-col items-center">
        <div className="w-full max-w-[750px]">
          {/* Heading Section */}
          <div className="space-y-1 mb-2 text-center">
            <h3 className="text-[1.2rem] font-medium text-brand">
              Good Morning Fahim!
            </h3>
            <h1 className="text-[1.5rem] font-bold text-slate-900 dark:text-white tracking-tight">
              Swap Currencies Directly With People Worldwide.
            </h1>
            <p className="text-[0.85rem] text-slate-500 dark:text-slate-400 font-normal">
              Faster, cheaper, and more transparent than traditional money
              transfer services.
            </p>
          </div>

          <div className="w-full flex flex-col items-center">
            <HomeMainPage />
          </div>
        </div>
      </GlassContainer>
    </div>
  );
}
