"use client";

import { motion } from "framer-motion";
import { Play, Send } from "lucide-react";

interface EditorActionBarProps {
  isRunning: boolean;
  onRunCode: () => void;
  onSubmit: () => void;
  theme: "dark" | "light";
}

export default function EditorActionBar({
  isRunning,
  onRunCode,
  onSubmit,
  theme,
}: EditorActionBarProps) {
  const borderColor = theme === "dark" ? "border-gray-800" : "border-gray-200";
  const bgSecondary = theme === "dark" ? "bg-[#1a1a1a]" : "bg-gray-50";
  const textPrimary = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const textTertiary = theme === "dark" ? "text-gray-400" : "text-gray-500";

  return (
    <div
      className={`border-t ${borderColor} px-3 sm:px-4 py-3 sm:py-3.5 flex items-center justify-between ${bgSecondary} transition-colors duration-300`}
    >
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            isRunning ? "bg-amber-400 animate-pulse" : "bg-emerald-400"
          }`}
        />
        <span className={`text-xs font-medium ${textTertiary}`}>
          {isRunning ? "Running..." : "Ready to execute"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRunCode}
          disabled={isRunning}
          title="Run code with test cases"
          className={`px-3 sm:px-5 py-2 sm:py-2.5 font-medium ${
            theme === "dark"
              ? "bg-gray-800 hover:bg-gray-700 text-gray-100 border border-gray-700"
              : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
          } rounded-lg transition-all flex items-center gap-2 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-sm`}
        >
          <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Run Code</span>
          <span className="sm:hidden">Run</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit}
          disabled={isRunning}
          title="Submit your solution"
          className="px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
        >
          <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Submit</span>
          <span className="sm:hidden">Submit</span>
        </motion.button>
      </div>
    </div>
  );
}
