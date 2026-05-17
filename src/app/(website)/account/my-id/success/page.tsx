import { Suspense } from "react";
import IDSuccessPage from "@/components/ui/website/account/IDSuccessPage";

export default function IDSuccess() {
  return (
    <Suspense fallback={
      <div className="h-[80vh] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-[#09A6A4] animate-spin" />
      </div>
    }>
      <IDSuccessPage />
    </Suspense>
  );
}
