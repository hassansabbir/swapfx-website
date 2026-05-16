export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[calc(100dvh-20px)] w-full flex items-center justify-center p-4 relative z-50">
      {children}
    </div>
  );
}
