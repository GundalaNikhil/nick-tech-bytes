"use client";

import {
  dsaProblems,
  type DifficultyLevel,
  type ProblemCategory,
} from "@/lib/dsaProblems";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Code2,
  Filter,
  Search,
  TrendingUp,
  CheckCircle2,
  Clock,
  BarChart3,
  Trophy,
  Sparkles,
} from "lucide-react";

export default function DSAProblemsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    DifficultyLevel | "All"
  >("All");
  const [selectedCategory, setSelectedCategory] = useState<
    ProblemCategory | "All"
  >("All");

  const difficulties: (DifficultyLevel | "All")[] = [
    "All",
    "Easy",
    "Medium",
    "Hard",
  ];
  const categories: (ProblemCategory | "All")[] = [
    "All",
    "Array",
    "String",
    "Linked List",
    "Tree",
    "Dynamic Programming",
    "Hash Table",
    "Two Pointers",
  ];

  const filteredProblems = useMemo(() => {
    return dsaProblems.filter((problem) => {
      const matchesSearch =
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.category.some((cat) =>
          cat.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesDifficulty =
        selectedDifficulty === "All" ||
        problem.difficulty === selectedDifficulty;
      const matchesCategory =
        selectedCategory === "All" ||
        problem.category.includes(selectedCategory);

      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [searchQuery, selectedDifficulty, selectedCategory]);

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400 bg-green-500/10 border-green-500/30";
      case "Medium":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
      case "Hard":
        return "text-red-400 bg-red-500/10 border-red-500/30";
    }
  };

  const stats = {
    total: dsaProblems.length,
    easy: dsaProblems.filter((p) => p.difficulty === "Easy").length,
    medium: dsaProblems.filter((p) => p.difficulty === "Medium").length,
    hard: dsaProblems.filter((p) => p.difficulty === "Hard").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20 px-4 md:px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Code2 className="w-12 h-12 md:w-16 md:h-16 text-orange-400" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                DSA Problems
              </h1>
            </div>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto px-4">
              Master Data Structures & Algorithms with our curated collection of
              coding challenges
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              {
                label: "Total Problems",
                value: stats.total,
                icon: Trophy,
                color: "orange",
              },
              {
                label: "Easy",
                value: stats.easy,
                icon: CheckCircle2,
                color: "green",
              },
              {
                label: "Medium",
                value: stats.medium,
                icon: TrendingUp,
                color: "yellow",
              },
              {
                label: "Hard",
                value: stats.hard,
                icon: Sparkles,
                color: "red",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-${stat.color}-500/20 rounded-xl p-6 text-center`}
              >
                <stat.icon
                  className={`w-8 h-8 text-${stat.color}-400 mx-auto mb-3`}
                />
                <div
                  className={`text-3xl font-bold text-${stat.color}-400 mb-1`}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-12">
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 md:p-6">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-orange-400" />
            <h2 className="text-xl font-bold text-orange-400">
              Filter Problems
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) =>
                setSelectedDifficulty(e.target.value as DifficultyLevel | "All")
              }
              className="px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
            >
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff} Difficulty
                </option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value as ProblemCategory | "All")
              }
              className="px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 text-sm text-gray-400">
            Showing {filteredProblems.length} of {dsaProblems.length} problems
          </div>
        </div>
      </section>

      {/* Problems List */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12 md:pb-20">
        <div className="space-y-4">
          {filteredProblems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Code2 className="w-20 h-20 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-400 mb-2">
                No problems found
              </h3>
              <p className="text-gray-500">Try adjusting your filters</p>
            </motion.div>
          ) : (
            filteredProblems.map((problem, index) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/dsa-problems/${problem.slug}`}>
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 group cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-gray-500 font-mono text-sm">
                            #{problem.id}
                          </span>
                          <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                            {problem.title}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(
                              problem.difficulty
                            )}`}
                          >
                            {problem.difficulty}
                          </span>
                        </div>

                        <p className="text-gray-400 mb-4 line-clamp-2">
                          {problem.description.substring(0, 150)}...
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {problem.category.map((cat) => (
                            <span
                              key={cat}
                              className="px-3 py-1 bg-gray-700/50 border border-gray-600/50 rounded-lg text-xs text-gray-300"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>

                        {problem.companies && (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <BarChart3 className="w-4 h-4" />
                            <span>
                              Asked by:{" "}
                              {problem.companies.slice(0, 3).join(", ")}
                            </span>
                          </div>
                        )}
                      </div>

                      {problem.acceptance && (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">
                            {problem.acceptance.toFixed(1)}%
                          </div>
                          <div className="text-xs text-gray-500">
                            Acceptance
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
