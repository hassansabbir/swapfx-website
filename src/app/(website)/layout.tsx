import { Navbar } from "@/components/layout/Navbar";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 pb-20">
        {children}
      </main>
    </div>
  );
}
