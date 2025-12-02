import { DockerTutorialCard } from "@/components/docker/DockerTutorialCard";
import { dockerTutorials } from "@/lib/topics/dockerTutorials";
import { ArrowLeft, Code2, Rocket, Sparkles, Zap, Boxes } from "lucide-react";
import Link from "next/link";

export default function DockerTutorialsPage() {
  // Group tutorials by difficulty
  const beginnerTutorials = dockerTutorials.filter(
    (t) => t.difficulty === "beginner"
  );
  const intermediateTutorials = dockerTutorials.filter(
    (t) => t.difficulty === "intermediate"
  );
  const advancedTutorials = dockerTutorials.filter(
    (t) => t.difficulty === "advanced"
  );

  const totalTutorials = dockerTutorials.length;
  const totalEstimatedHours = Math.round(
    dockerTutorials.reduce((sum, t) => {
      const minutes = parseInt(t.estimatedTime);
      return sum + minutes;
    }, 0) / 60
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Header - More Compact */}
      <div className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-xl sticky top-20 z-40">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-cyan-400 mb-3 transition-colors group"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg blur-md opacity-40" />
              <div className="relative p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                <Boxes className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Docker Tutorials
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                Master containerization with comprehensive hands-on tutorials
              </p>
            </div>
          </div>

          {/* Stats Bar - Compact */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/30">
              <span className="text-lg font-bold text-emerald-400">
                {totalTutorials}
              </span>
              <span className="text-[11px] text-gray-400">Tutorials</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-500/10 border border-blue-500/30">
              <span className="text-lg font-bold text-blue-400">
                {totalEstimatedHours}h
              </span>
              <span className="text-[11px] text-gray-400">Content</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-purple-500/10 border border-purple-500/30">
              <span className="text-lg font-bold text-purple-400">
                {beginnerTutorials.length}
              </span>
              <span className="text-[11px] text-gray-400">Beginner</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/30">
              <span className="text-lg font-bold text-cyan-400">4.7</span>
              <span className="text-[11px] text-gray-400">Avg Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Beginner Section - Compact */}
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <Sparkles className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">Getting Started</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {beginnerTutorials.length} tutorials to learn Docker
                fundamentals
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {beginnerTutorials.map((tutorial) => (
              <DockerTutorialCard key={tutorial.slug} {...tutorial} />
            ))}
          </div>
        </section>

        {/* Intermediate Section - Compact */}
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <Zap className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">
                Practical Skills
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {intermediateTutorials.length} tutorials for real-world
                applications
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {intermediateTutorials.map((tutorial) => (
              <DockerTutorialCard key={tutorial.slug} {...tutorial} />
            ))}
          </div>
        </section>

        {/* Advanced Section - Compact */}
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30">
              <Rocket className="h-5 w-5 text-red-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">
                Advanced Mastery
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {advancedTutorials.length} tutorials for production-ready skills
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {advancedTutorials.map((tutorial) => (
              <DockerTutorialCard key={tutorial.slug} {...tutorial} />
            ))}
          </div>
        </section>

        {/* CTA Section - Compact */}
        <section className="mt-16 mb-8">
          <div className="relative rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 overflow-hidden p-6 sm:p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0 animate-pulse" />
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-2xl font-bold text-white mb-2">
                Ready to Master Docker?
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Start with beginner-friendly tutorials and progress to advanced
                production-ready patterns. Each tutorial includes practical
                examples and best practices.
              </p>
              <Link
                href="/docker-tutorials/01-what-is-docker"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                <Code2 className="h-4 w-4" />
                Start Learning
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
