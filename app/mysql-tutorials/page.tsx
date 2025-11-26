import MySQLTutorialCard from "@/components/mysql/MySQLTutorialCard";
import { mysqlTutorials } from "@/lib/topics/mysqlTutorials";
import {
  ArrowLeft,
  Code2,
  Database,
  Rocket,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "MySQL Tutorials | Nick Tech Bytes",
  description:
    "Master MySQL from basics to advanced concepts. Learn SQL queries, performance optimization, replication, and production-level database design.",
};

export default function MySQLTutorialsPage() {
  const beginnerTutorials = mysqlTutorials.filter(
    (t) => t.difficulty === "beginner"
  );
  const intermediateTutorials = mysqlTutorials.filter(
    (t) => t.difficulty === "intermediate"
  );
  const advancedTutorials = mysqlTutorials.filter(
    (t) => t.difficulty === "advanced"
  );

  const totalTutorials = mysqlTutorials.length;
  const totalEstimatedHours = Math.round(
    mysqlTutorials.reduce((sum, t) => {
      const minutes = parseInt(t.readTime);
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
            className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-orange-400 mb-3 transition-colors group"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg blur-md opacity-40" />
              <div className="relative p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/30">
                <Database className="h-5 w-5 text-orange-400" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                MySQL Tutorials
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                Master MySQL from basics to production-level database design
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
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-orange-500/10 border border-orange-500/30">
              <span className="text-lg font-bold text-orange-400">
                {totalEstimatedHours}h
              </span>
              <span className="text-[11px] text-gray-400">Content</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-yellow-500/10 border border-yellow-500/30">
              <span className="text-lg font-bold text-yellow-400">
                {beginnerTutorials.length}
              </span>
              <span className="text-[11px] text-gray-400">Beginner</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-orange-500/10 border border-orange-500/30">
              <span className="text-lg font-bold text-orange-400">
                MySQL 8+
              </span>
              <span className="text-[11px] text-gray-400">Version</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Beginner Section */}
        {beginnerTutorials.length > 0 && (
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <Sparkles className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">
                  Getting Started
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {beginnerTutorials.length} tutorials to learn MySQL
                  fundamentals
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {beginnerTutorials.map((tutorial) => (
                <MySQLTutorialCard key={tutorial.id} tutorial={tutorial} />
              ))}
            </div>
          </section>
        )}

        {/* Intermediate Section */}
        {intermediateTutorials.length > 0 && (
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
                <MySQLTutorialCard key={tutorial.id} tutorial={tutorial} />
              ))}
            </div>
          </section>
        )}

        {/* Advanced Section */}
        {advancedTutorials.length > 0 && (
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
                  {advancedTutorials.length} tutorials for production-ready
                  skills
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {advancedTutorials.map((tutorial) => (
                <MySQLTutorialCard key={tutorial.id} tutorial={tutorial} />
              ))}
            </div>
          </section>
        )}

        {/* Learning Path Section */}
        <section className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-orange-500/20 border border-orange-500/30">
              <Code2 className="h-6 w-6 text-orange-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Recommended Learning Path
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Follow this path to master MySQL from scratch
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-orange-500/30 transition-colors">
              <div className="text-4xl mb-4">1️⃣</div>
              <h3 className="font-bold text-lg text-white mb-2">
                Fundamentals
              </h3>
              <p className="text-sm text-gray-400">
                Learn MySQL basics, data types, and SQL syntax
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-yellow-500/30 transition-colors">
              <div className="text-4xl mb-4">2️⃣</div>
              <h3 className="font-bold text-lg text-white mb-2">Queries</h3>
              <p className="text-sm text-gray-400">
                Master joins, subqueries, and window functions
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-orange-500/30 transition-colors">
              <div className="text-4xl mb-4">3️⃣</div>
              <h3 className="font-bold text-lg text-white mb-2">
                Optimization
              </h3>
              <p className="text-sm text-gray-400">
                Learn indexing, query optimization, and performance tuning
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-yellow-500/30 transition-colors">
              <div className="text-4xl mb-4">4️⃣</div>
              <h3 className="font-bold text-lg text-white mb-2">Production</h3>
              <p className="text-sm text-gray-400">
                Master replication, scaling, and production deployments
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
