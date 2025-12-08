export default function DSAProblemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* No navbar padding - full screen for coding */}
      {children}
    </div>
  );
}
