"use client";

import Hero from "@/components/hero";
import ResourcesGrid from "@/components/ResourcesGrid";
import AdditionalResources from "@/components/AdditionalResources";
import Footer from "@/components/footer";
import { HomeSystemDesignBanner } from "@/components/system-design/HomeSystemDesignBanner";
import { ReactTutorialsBanner } from "@/components/react/ReactTutorialsBanner";
import { DockerTutorialsBanner } from "@/components/docker/DockerTutorialsBanner";
import { interviewQuestions, topicsList } from "@/lib/interviewData";
import { useRouter } from "next/navigation";

export default function NickTechBytes() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Hero onExploreMore={() => router.push("/explore")} />

      <HomeSystemDesignBanner />

      <ReactTutorialsBanner />

      <DockerTutorialsBanner />

      <ResourcesGrid
        topicsList={topicsList}
        interviewQuestions={interviewQuestions}
      />
      <AdditionalResources />
      <Footer />
    </div>
  );
}
