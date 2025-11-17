"use client";

import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import ResourcesGrid from "@/components/ResourcesGrid";
import AdditionalResources from "@/components/AdditionalResources";
import Footer from "@/components/footer";
import {
  interviewQuestions,
  interviewResources,
  topicsList,
} from "@/lib/interviewData";
import { useRouter } from "next/navigation";

export default function NickTechBytes() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 text-white">
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>

      <Navbar topicsList={topicsList} interviewResources={interviewResources} />

      <Hero onExploreMore={() => router.push("/explore")} />

      <ResourcesGrid
        topicsList={topicsList}
        interviewQuestions={interviewQuestions}
      />
      <AdditionalResources />
      <Footer />
    </div>
  );
}
