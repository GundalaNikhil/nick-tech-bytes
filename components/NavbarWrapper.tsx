"use client";

import Navbar from "@/components/navbar";
import { interviewResources, topicsList } from "@/lib/interviewData";

export default function NavbarWrapper() {
  return (
    <Navbar topicsList={topicsList} interviewResources={interviewResources} />
  );
}
