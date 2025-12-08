"use client";

import { motion } from "framer-motion";
import { ChevronRight, Code2 } from "lucide-react";
import Link from "next/link";
import { type DSAProblem } from "@/lib/dsaProblems";

interface BreadcrumbProps {
  problem: DSAProblem;
  theme: "dark" | "light";
}

export default function Breadcrumb({ problem, theme }: BreadcrumbProps) {
  const textColor = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const textHover =
    theme === "dark" ? "hover:text-gray-200" : "hover:text-gray-900";
  const textActive = theme === "dark" ? "text-gray-100" : "text-gray-900";

  return (
    <nav className="flex items-center gap-2 text-sm">
      <Link href="/" title="Go to homepage">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-1.5 ${textColor} ${textHover} transition-colors`}
        >
          {/* NTB Logo */}
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-orange-500 to-rose-500 flex items-center justify-center font-bold text-white text-xs shadow-lg shadow-orange-500/20">
            NTB
          </div>
        </motion.div>
      </Link>

      <ChevronRight className={`w-4 h-4 ${textColor}`} />

      <Link href="/dsa-problems" title="Go to all problems">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-1.5 ${textColor} ${textHover} transition-colors`}
        >
          <Code2 className="w-4 h-4" />
          <span>Problems</span>
        </motion.div>
      </Link>

      <ChevronRight className={`w-4 h-4 ${textColor}`} />

      <span
        className={`${textActive} font-medium truncate max-w-[200px] sm:max-w-[300px] md:max-w-none`}
      >
        {problem.title}
      </span>
    </nav>
  );
}
