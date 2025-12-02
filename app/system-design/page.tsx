import { SystemDesignCard } from "@/components/system-design/SystemDesignCard";
import { hldTopics, lldTopics } from "@/lib/topics/systemDesignTopics";
import { ArrowLeft, Layers, Code2 } from "lucide-react";
import Link from "next/link";

export default function SystemDesignPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header - Compact */}
      <div className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-xl sticky top-20 z-40">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-emerald-400 mb-3 transition-colors group"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg blur-md opacity-40" />
              <div className="relative p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30">
                <Layers className="h-5 w-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                System Design Mastery
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                Master HLD & LLD concepts for top product-based companies
              </p>
            </div>
          </div>

          {/* Stats Bar - Compact */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/30">
              <span className="text-lg font-bold text-emerald-400">
                {hldTopics.length}
              </span>
              <span className="text-[11px] text-gray-400">HLD</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/30">
              <span className="text-lg font-bold text-cyan-400">
                {lldTopics.length}
              </span>
              <span className="text-[11px] text-gray-400">LLD</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-500/10 border border-blue-500/30">
              <span className="text-lg font-bold text-blue-400">17</span>
              <span className="text-[11px] text-gray-400">Total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Compact */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* High-Level Design Section */}
        <section id="hld" className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <Layers className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">
                High-Level Design (HLD)
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Design scalable distributed systems and architect complex
                applications
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {hldTopics.map((topic) => (
              <SystemDesignCard key={topic.slug} {...topic} />
            ))}
          </div>
        </section>

        {/* Low-Level Design Section */}
        <section id="lld">
          <div className="mb-6 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <Code2 className="h-5 w-5 text-cyan-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">
                Low-Level Design (LLD)
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Master object-oriented design patterns and build robust software
                components
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {lldTopics.map((topic) => (
              <SystemDesignCard key={topic.slug} {...topic} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
