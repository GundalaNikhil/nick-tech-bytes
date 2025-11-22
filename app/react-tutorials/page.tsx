import { ReactTutorialCard } from "@/components/react/ReactTutorialCard";
import { reactTutorials } from "@/lib/topics/reactTutorials";
import { ArrowLeft, Code2, Rocket, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

export default function ReactTutorialsPage() {
  // Group tutorials by difficulty
  const beginnerTutorials = reactTutorials.filter(
    (t) => t.difficulty === "beginner"
  );
  const intermediateTutorials = reactTutorials.filter(
    (t) => t.difficulty === "intermediate"
  );
  const advancedTutorials = reactTutorials.filter(
    (t) => t.difficulty === "advanced"
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
                <Code2 className="h-8 w-8 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                React Tutorials
              </h1>
              <p className="text-gray-400 mt-1">
                Master React with hands-on component building tutorials
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-6 mt-6 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <span className="text-2xl font-bold text-emerald-400">
                {beginnerTutorials.length}
              </span>
              <span className="text-sm text-gray-400">Beginner</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <span className="text-2xl font-bold text-yellow-400">
                {intermediateTutorials.length}
              </span>
              <span className="text-sm text-gray-400">Intermediate</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30">
              <span className="text-2xl font-bold text-red-400">
                {advancedTutorials.length}
              </span>
              <span className="text-sm text-gray-400">Advanced</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <span className="text-sm text-gray-400">
                {reactTutorials.length} Total Projects
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Beginner Section */}
        {beginnerTutorials.length > 0 && (
          <section id="beginner" className="mb-20">
            <div className="mb-8 flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/30 rounded-lg blur-md" />
                <div className="relative p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <Rocket className="h-6 w-6 text-emerald-400" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white">
                  🌱 Beginner Friendly
                </h2>
                <p className="mt-2 text-gray-400">
                  Start your React journey with fundamental component patterns
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {beginnerTutorials.map((tutorial) => (
                <ReactTutorialCard key={tutorial.slug} {...tutorial} />
              ))}
            </div>
          </section>
        )}

        {/* Intermediate Section */}
        {intermediateTutorials.length > 0 && (
          <section id="intermediate" className="mb-20">
            <div className="mb-8 flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500/30 rounded-lg blur-md" />
                <div className="relative p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                  <Zap className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white">
                  ⚡ Intermediate Challenges
                </h2>
                <p className="mt-2 text-gray-400">
                  Level up with complex state management and form handling
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {intermediateTutorials.map((tutorial) => (
                <ReactTutorialCard key={tutorial.slug} {...tutorial} />
              ))}
            </div>
          </section>
        )}

        {/* Advanced Section */}
        {advancedTutorials.length > 0 && (
          <section id="advanced">
            <div className="mb-8 flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/30 rounded-lg blur-md" />
                <div className="relative p-2 rounded-lg bg-red-500/10 border border-red-500/30">
                  <Sparkles className="h-6 w-6 text-red-400" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white">
                  🔥 Advanced Projects
                </h2>
                <p className="mt-2 text-gray-400">
                  Master complex features like file handling and image
                  processing
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {advancedTutorials.map((tutorial) => (
                <ReactTutorialCard key={tutorial.slug} {...tutorial} />
              ))}
            </div>
          </section>
        )}

        {/* Learning Path CTA */}
        <div className="mt-20 relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20 p-8 sm:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Each tutorial is designed to teach you practical React patterns
              used by top tech companies. Start from beginner and progress to
              advanced concepts.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
                <Code2 className="h-4 w-4 text-cyan-400" />
                <span className="text-sm text-gray-300">Hands-on Practice</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
                <Sparkles className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-gray-300">
                  Real-world Examples
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
                <Rocket className="h-4 w-4 text-emerald-400" />
                <span className="text-sm text-gray-300">Interview Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
