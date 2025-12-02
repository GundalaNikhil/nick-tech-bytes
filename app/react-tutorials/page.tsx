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
                <Code2 className="h-5 w-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                React Tutorials
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                Master React with hands-on component building tutorials
              </p>
            </div>
          </div>

          {/* Stats Bar - Compact */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/30">
              <span className="text-lg font-bold text-emerald-400">
                {beginnerTutorials.length}
              </span>
              <span className="text-[11px] text-gray-400">Beginner</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-yellow-500/10 border border-yellow-500/30">
              <span className="text-lg font-bold text-yellow-400">
                {intermediateTutorials.length}
              </span>
              <span className="text-[11px] text-gray-400">Intermediate</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-500/10 border border-red-500/30">
              <span className="text-lg font-bold text-red-400">
                {advancedTutorials.length}
              </span>
              <span className="text-[11px] text-gray-400">Advanced</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-purple-500/10 border border-purple-500/30">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-[11px] text-gray-400">
                {reactTutorials.length} Total Projects
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Beginner Section - Compact */}
        {beginnerTutorials.length > 0 && (
          <section id="beginner" className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/30 rounded-lg blur-md" />
                <div className="relative p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <Rocket className="h-5 w-5 text-emerald-400" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">
                  🌱 Beginner Friendly
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Start your React journey with fundamental component patterns
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {beginnerTutorials.map((tutorial) => (
                <ReactTutorialCard key={tutorial.slug} {...tutorial} />
              ))}
            </div>
          </section>
        )}

        {/* Intermediate Section - Compact */}
        {intermediateTutorials.length > 0 && (
          <section id="intermediate" className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500/30 rounded-lg blur-md" />
                <div className="relative p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                  <Zap className="h-5 w-5 text-yellow-400" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">
                  ⚡ Intermediate Challenges
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Level up with complex state management and form handling
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {intermediateTutorials.map((tutorial) => (
                <ReactTutorialCard key={tutorial.slug} {...tutorial} />
              ))}
            </div>
          </section>
        )}

        {/* Advanced Section - Compact */}
        {advancedTutorials.length > 0 && (
          <section id="advanced">
            <div className="mb-6 flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/30 rounded-lg blur-md" />
                <div className="relative p-2 rounded-lg bg-red-500/10 border border-red-500/30">
                  <Sparkles className="h-5 w-5 text-red-400" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">
                  🔥 Advanced Projects
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Master complex features like file handling and image
                  processing
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {advancedTutorials.map((tutorial) => (
                <ReactTutorialCard key={tutorial.slug} {...tutorial} />
              ))}
            </div>
          </section>
        )}

        {/* Learning Path CTA - Compact */}
        <div className="mt-16 relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20 p-6 sm:p-8">
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-xs text-gray-400 mb-4 max-w-2xl mx-auto">
              Each tutorial is designed to teach you practical React patterns
              used by top tech companies. Start from beginner and progress to
              advanced concepts.
            </p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/50 border border-gray-700">
                <Code2 className="h-3.5 w-3.5 text-cyan-400" />
                <span className="text-xs text-gray-300">Hands-on Practice</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/50 border border-gray-700">
                <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                <span className="text-xs text-gray-300">
                  Real-world Examples
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/50 border border-gray-700">
                <Rocket className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-xs text-gray-300">Interview Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
