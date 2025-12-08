"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Zap,
  Settings2,
  Building2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Clock,
  BarChart3,
  Upload,
  Tag,
} from "lucide-react";
import { type DSAProblem } from "@/lib/dsaProblems";

type ActiveTab = "description" | "editorial" | "submissions";

interface ProblemDescriptionProps {
  problem: DSAProblem;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  theme: "dark" | "light";
}

export default function ProblemDescription({
  problem,
  activeTab,
  onTabChange,
  theme,
}: ProblemDescriptionProps) {
  const [showSolution, setShowSolution] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isExamplesOpen, setIsExamplesOpen] = useState(true);
  const [isConstraintsOpen, setIsConstraintsOpen] = useState(true);
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);
  const [isCompaniesOpen, setIsCompaniesOpen] = useState(false);

  const borderColor = theme === "dark" ? "border-gray-800" : "border-gray-200";
  const bgTertiary = theme === "dark" ? "bg-[#0f0f0f]" : "bg-gray-100";
  const textPrimary = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const textTertiary = theme === "dark" ? "text-gray-500" : "text-gray-500";

  return (
    <>
      {/* Tabs */}
      <div
        className={`border-b ${borderColor} px-3 py-2 flex gap-1 ${bgTertiary}/50 transition-colors duration-300`}
      >
        {(["description", "editorial", "submissions"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
              activeTab === tab
                ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/20"
                : `${textSecondary} hover:${textPrimary} ${
                    theme === "dark"
                      ? "hover:bg-gray-800/50"
                      : "hover:bg-gray-200/50"
                  }`
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 custom-scrollbar">
        {activeTab === "description" && (
          <>
            {/* Problem Description Section */}
            <CollapsibleSection
              title="Problem Statement"
              icon={
                <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
              }
              isOpen={isDescriptionOpen}
              onToggle={() => setIsDescriptionOpen(!isDescriptionOpen)}
              theme={theme}
            >
              <div
                className={`px-3 sm:px-4 pb-3 sm:pb-4 ${textSecondary} text-xs sm:text-sm leading-relaxed whitespace-pre-wrap`}
              >
                {problem.description}
              </div>
            </CollapsibleSection>

            {/* Examples Section */}
            <CollapsibleSection
              title="Sample Test Cases"
              icon={
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
              }
              isOpen={isExamplesOpen}
              onToggle={() => setIsExamplesOpen(!isExamplesOpen)}
              theme={theme}
            >
              <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-2 sm:space-y-3">
                {problem.examples.map((example, index) => (
                  <div
                    key={index}
                    className={`${
                      theme === "dark" ? "bg-gray-900/50" : "bg-gray-50"
                    } border ${borderColor} rounded-lg p-3`}
                  >
                    <div className="text-xs font-semibold text-orange-400 mb-2">
                      Example {index + 1}
                    </div>
                    <div
                      className={`font-mono text-xs ${
                        theme === "dark" ? "bg-black/40" : "bg-white"
                      } p-2.5 rounded border ${borderColor} mb-2`}
                    >
                      <div className="text-emerald-400 mb-1">
                        <span className={textTertiary}>Input: </span>
                        {example.input}
                      </div>
                      <div className="text-amber-400">
                        <span className={textTertiary}>Output: </span>
                        {example.output}
                      </div>
                    </div>
                    {example.explanation && (
                      <div
                        className={`text-xs ${textSecondary} mt-2 pt-2 border-t ${borderColor}`}
                      >
                        <span className="font-semibold">Explanation:</span>{" "}
                        {example.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            {/* Constraints Section */}
            <CollapsibleSection
              title="Constraints"
              icon={
                <Settings2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500" />
              }
              isOpen={isConstraintsOpen}
              onToggle={() => setIsConstraintsOpen(!isConstraintsOpen)}
              theme={theme}
            >
              <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                <ul className="space-y-2">
                  {problem.constraints.map((constraint, index) => (
                    <li
                      key={index}
                      className={`flex items-start gap-2.5 ${
                        theme === "dark"
                          ? "bg-cyan-500/5 border-cyan-500/20"
                          : "bg-cyan-50 border-cyan-200"
                      } border rounded-lg p-2.5`}
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                      <span className="font-mono text-xs sm:text-sm text-cyan-300 font-medium leading-relaxed">
                        {constraint}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </CollapsibleSection>

            {/* Topics Section - Collapsible */}
            <CollapsibleSection
              title="Related Topics"
              icon={
                <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
              }
              isOpen={isTopicsOpen}
              onToggle={() => setIsTopicsOpen(!isTopicsOpen)}
              theme={theme}
              badge={problem.category.length}
            >
              <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                <div className="flex flex-wrap gap-2">
                  {problem.category.map((cat) => (
                    <motion.span
                      key={cat}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1.5 ${
                        theme === "dark"
                          ? "bg-purple-500/10 border-purple-500/30 text-purple-300"
                          : "bg-purple-50 border-purple-200 text-purple-700"
                      } border rounded-lg text-xs font-semibold cursor-default shadow-sm hover:shadow-md transition-all`}
                    >
                      {cat}
                    </motion.span>
                  ))}
                </div>
              </div>
            </CollapsibleSection>

            {/* Companies Section - Collapsible */}
            {problem.companies && problem.companies.length > 0 && (
              <CollapsibleSection
                title="Asked by Companies"
                icon={
                  <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
                }
                isOpen={isCompaniesOpen}
                onToggle={() => setIsCompaniesOpen(!isCompaniesOpen)}
                theme={theme}
                badge={problem.companies.length}
              >
                <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {problem.companies.map((company) => (
                      <motion.div
                        key={company}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className={`px-3 py-2.5 ${
                          theme === "dark"
                            ? "bg-blue-500/10 border-blue-500/30"
                            : "bg-blue-50 border-blue-200"
                        } border rounded-lg text-center cursor-default shadow-sm hover:shadow-lg transition-all group`}
                      >
                        <div className="text-xs font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
                          {company}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CollapsibleSection>
            )}
          </>
        )}

        {activeTab === "editorial" && problem.solution && (
          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowSolution(!showSolution)}
              className="mb-6 px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-lg font-semibold transition-all flex items-center gap-2 text-sm shadow-lg shadow-orange-500/20"
            >
              <Lightbulb className="w-4 h-4" />
              {showSolution ? "Hide Solution" : "Show Solution"}
            </motion.button>

            {showSolution && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 sm:space-y-6"
              >
                <div
                  className={`${
                    theme === "dark" ? "bg-gray-800/30" : "bg-white"
                  } border ${borderColor} rounded-xl p-3 sm:p-4`}
                >
                  <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3">
                    Approach
                  </h3>
                  <p
                    className={`${textSecondary} text-xs sm:text-sm leading-relaxed`}
                  >
                    {problem.solution.approach}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div
                    className={`${
                      theme === "dark" ? "bg-blue-500/10" : "bg-blue-50"
                    } border border-blue-500/30 rounded-lg p-3 sm:p-4`}
                  >
                    <Clock className="w-4 h-4 text-blue-400 mb-2" />
                    <div className="text-xs text-blue-300 mb-1">
                      Time Complexity
                    </div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-blue-400">
                      {problem.solution.timeComplexity}
                    </div>
                  </div>
                  <div
                    className={`${
                      theme === "dark" ? "bg-purple-500/10" : "bg-purple-50"
                    } border border-purple-500/30 rounded-lg p-3 sm:p-4`}
                  >
                    <BarChart3 className="w-4 h-4 text-purple-400 mb-2" />
                    <div className="text-xs text-purple-300 mb-1">
                      Space Complexity
                    </div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-purple-400">
                      {problem.solution.spaceComplexity}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {activeTab === "submissions" && (
          <div className="text-center py-12 sm:py-20">
            <Upload
              className={`w-12 h-12 sm:w-16 sm:h-16 ${textTertiary} mx-auto mb-4`}
            />
            <h3
              className={`text-base sm:text-lg font-semibold ${textSecondary} mb-2`}
            >
              No Submissions Yet
            </h3>
            <p className={`${textTertiary} text-xs sm:text-sm`}>
              Submit your solution to track your progress
            </p>
          </div>
        )}
      </div>
    </>
  );
}

// Helper component
function CollapsibleSection({
  title,
  icon,
  isOpen,
  onToggle,
  theme,
  children,
  badge,
}: {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  theme: "dark" | "light";
  children: React.ReactNode;
  badge?: number;
}) {
  const borderColor = theme === "dark" ? "border-gray-800" : "border-gray-200";

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-800/30" : "bg-white"
      } border ${borderColor} rounded-xl overflow-hidden transition-all shadow-sm hover:shadow-md`}
    >
      <button
        onClick={onToggle}
        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between ${
          theme === "dark" ? "hover:bg-gray-800/50" : "hover:bg-gray-50"
        } transition-colors group`}
      >
        <h2 className="text-sm sm:text-base font-bold flex items-center gap-2 text-gray-100">
          <span className="group-hover:scale-110 transition-transform">
            {icon}
          </span>
          <span className="bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
            {title}
          </span>
          {badge !== undefined && (
            <span className="px-2 py-0.5 bg-orange-500/20 border border-orange-500/30 text-orange-400 rounded-full text-xs font-semibold">
              {badge}
            </span>
          )}
        </h2>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-200 transition-colors" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
