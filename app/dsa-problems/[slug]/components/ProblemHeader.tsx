"use client";

import { motion } from "framer-motion";
import { Sun, Moon, Maximize2, Minimize2 } from "lucide-react";
import { type DSAProblem, type DifficultyLevel } from "@/lib/dsaProblems";
import Breadcrumb from "./Breadcrumb";

interface ProblemHeaderProps {
  problem: DSAProblem;
  editorTheme: "dark" | "light"; // Only for showing editor theme in toggle button
  isFullscreen: boolean;
  onThemeToggle: () => void;
  onFullscreenToggle: () => void;
}

export default function ProblemHeader({
  problem,
  editorTheme,
  isFullscreen,
  onThemeToggle,
  onFullscreenToggle,
}: ProblemHeaderProps) {
  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case "Easy":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
      case "Medium":
        return "text-amber-400 bg-amber-500/10 border-amber-500/30";
      case "Hard":
        return "text-rose-400 bg-rose-500/10 border-rose-500/30";
    }
  };

  // UI is always dark theme
  const theme = "dark";
  const borderColor = "border-gray-800";
  const bgSecondary = "bg-[#0a0a0a]/95";
  const bgTertiary = "bg-gray-800/50";
  const textColor = "text-gray-100";

  return (
    <div
      className={`border-b ${borderColor} ${bgSecondary} backdrop-blur-xl fixed top-0 left-0 right-0 z-50 transition-colors duration-300 shadow-sm h-14`}
    >
      <div className="max-w-[2000px] mx-auto px-3 sm:px-4 lg:px-6 h-full">
        <div className="flex items-center justify-between gap-4 h-full">
          {/* Left side - Breadcrumb */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Breadcrumb problem={problem} theme={theme} />
          </div>

          {/* Right side - Difficulty, Theme, and Fullscreen */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span
              className={`px-2.5 py-1 rounded-md text-xs font-medium border ${getDifficultyColor(
                problem.difficulty
              )}`}
            >
              {problem.difficulty}
            </span>

            <div className={`h-5 w-px ${borderColor} hidden sm:block`} />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onThemeToggle}
              className={`p-2 ${bgTertiary} hover:bg-gray-700/70 rounded-lg transition-all border ${borderColor}`}
              title={
                editorTheme === "dark"
                  ? "Switch editor to light mode"
                  : "Switch editor to dark mode"
              }
            >
              {editorTheme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-500" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onFullscreenToggle}
              className={`p-2 ${bgTertiary} hover:bg-gray-700/70 rounded-lg transition-all border ${borderColor} hidden sm:block`}
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
