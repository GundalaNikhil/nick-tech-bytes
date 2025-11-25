import Link from "next/link";
import { ArrowRight, Code2, Rocket, Sparkles, Boxes } from "lucide-react";

export function DockerTutorialsBanner() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5" />
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-sm overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-8 sm:p-12">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium w-fit mb-6">
                <Sparkles className="h-4 w-4" />
                <span>New Tutorial Section</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Master Docker with
                <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Complete Learning Path
                </span>
              </h2>

              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Learn containerization from fundamentals to production-ready
                patterns. Build, deploy, and scale containerized applications
                with Docker and Kubernetes. From installation to Kubernetes
                orchestration.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
                  <Boxes className="h-5 w-5 text-cyan-400" />
                  <span className="text-sm text-gray-300">15+ Tutorials</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
                  <Rocket className="h-5 w-5 text-purple-400" />
                  <span className="text-sm text-gray-300">
                    Beginner to Advanced
                  </span>
                </div>
              </div>

              <Link
                href="/docker-tutorials"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 w-fit group"
              >
                Explore Tutorials
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Right Content - Tutorial Preview Cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-xl blur group-hover:blur-md transition-all" />
                <div className="relative p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-emerald-500/50 transition-all">
                  <div className="text-2xl mb-3">🌱</div>
                  <h3 className="text-white font-semibold mb-2">
                    Fundamentals
                  </h3>
                  <p className="text-gray-400 text-sm">Docker basics</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative group mt-8">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 rounded-xl blur group-hover:blur-md transition-all" />
                <div className="relative p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-yellow-500/50 transition-all">
                  <div className="text-2xl mb-3">⚡</div>
                  <h3 className="text-white font-semibold mb-2">
                    Practical Skills
                  </h3>
                  <p className="text-gray-400 text-sm">Real-world apps</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-xl blur group-hover:blur-md transition-all" />
                <div className="relative p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-red-500/50 transition-all">
                  <div className="text-2xl mb-3">🔥</div>
                  <h3 className="text-white font-semibold mb-2">Advanced</h3>
                  <p className="text-gray-400 text-sm">Production patterns</p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="relative group mt-8">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-xl blur group-hover:blur-md transition-all" />
                <div className="relative p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-purple-500/50 transition-all">
                  <div className="text-2xl mb-3">🎯</div>
                  <h3 className="text-white font-semibold mb-2">
                    Kubernetes Ready
                  </h3>
                  <p className="text-gray-400 text-sm">Scale to production</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
