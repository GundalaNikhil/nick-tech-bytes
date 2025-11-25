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
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-xl sticky top-20 z-40">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 mb-4 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl blur-lg opacity-50" />
              <div className="relative p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                <Boxes className="h-8 w-8 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Docker Tutorials
              </h1>
              <p className="text-gray-400 mt-1">
                Master containerization with comprehensive hands-on tutorials
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-6 mt-6 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <span className="text-2xl font-bold text-emerald-400">
                {totalTutorials}
              </span>
              <span className="text-sm text-gray-400">Tutorials</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <span className="text-2xl font-bold text-blue-400">
                {totalEstimatedHours}
              </span>
              <span className="text-sm text-gray-400">Hours of Content</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <span className="text-2xl font-bold text-purple-400">
                {beginnerTutorials.length}
              </span>
              <span className="text-sm text-gray-400">Beginner Friendly</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <span className="text-2xl font-bold text-cyan-400">4.7</span>
              <span className="text-sm text-gray-400">Avg Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Beginner Section */}
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <Sparkles className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white">Getting Started</h2>
              <p className="mt-2 text-gray-400">
                {beginnerTutorials.length} tutorials to learn Docker
                fundamentals
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {beginnerTutorials.map((tutorial) => (
              <DockerTutorialCard key={tutorial.slug} {...tutorial} />
            ))}
          </div>
        </section>

        {/* Intermediate Section */}
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <Zap className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white">
                Practical Skills
              </h2>
              <p className="mt-2 text-gray-400">
                {intermediateTutorials.length} tutorials for real-world
                applications
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {intermediateTutorials.map((tutorial) => (
              <DockerTutorialCard key={tutorial.slug} {...tutorial} />
            ))}
          </div>
        </section>

        {/* Advanced Section */}
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <Rocket className="h-6 w-6 text-red-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white">
                Advanced Mastery
              </h2>
              <p className="mt-2 text-gray-400">
                {advancedTutorials.length} tutorials for production-ready skills
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {advancedTutorials.map((tutorial) => (
              <DockerTutorialCard key={tutorial.slug} {...tutorial} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-20 mb-10">
          <div className="relative rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 overflow-hidden p-8 sm:p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0 animate-pulse" />
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-3xl font-bold text-white mb-3">
                Ready to Master Docker?
              </h3>
              <p className="text-gray-400 mb-6">
                Start with beginner-friendly tutorials and progress to advanced
                production-ready patterns. Each tutorial includes practical
                examples and best practices.
              </p>
              <Link
                href="/docker-tutorials/01-what-is-docker"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
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
