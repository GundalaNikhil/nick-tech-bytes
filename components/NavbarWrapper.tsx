"use client";

import Navbar from "@/components/navbar";
import { interviewResources, topicsList } from "@/lib/interviewData";
import { usePathname } from "next/navigation";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Hide navbar on individual DSA problem pages
  const isDSAProblemPage = pathname?.match(/^\/dsa-problems\/[^\/]+$/);

  if (isDSAProblemPage) {
    return null;
  }

  return (
    <Navbar topicsList={topicsList} interviewResources={interviewResources} />
  );
}
