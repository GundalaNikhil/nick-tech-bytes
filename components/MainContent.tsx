"use client";

import { usePathname } from "next/navigation";

export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Don't add padding for individual DSA problem pages
  const isDSAProblemPage = pathname?.match(/^\/dsa-problems\/[^\/]+$/);

  if (isDSAProblemPage) {
    return <>{children}</>;
  }

  return <div className="pt-14 md:pt-16">{children}</div>;
}
