"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Zap,
  CheckCircle2,
  Terminal as TerminalIcon,
  Play,
  XCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { type DSAProblem } from "@/lib/dsaProblems";

type ActiveBottomTab = "testcases" | "customtest" | "testresult" | "console";

type TestResult = {
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  message: string;
};

interface EditorBottomPanelProps {
  activeBottomTab: ActiveBottomTab;
  onTabChange: (tab: ActiveBottomTab) => void;
  problem: DSAProblem;
  testResults: TestResult[];
  consoleOutput: string[];
  customInput: string;
  customOutput: string;
  onCustomInputChange: (value: string) => void;
  onRunCustomTest: () => void;
  isRunning: boolean;
  theme: "dark" | "light";
}

export default function EditorBottomPanel({
  activeBottomTab,
  onTabChange,
  problem,
  testResults,
  consoleOutput,
  customInput,
  customOutput,
  onCustomInputChange,
  onRunCustomTest,
  isRunning,
  theme,
}: EditorBottomPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const borderColor = theme === "dark" ? "border-gray-800" : "border-gray-200";
  const bgSecondary = theme === "dark" ? "bg-[#1a1a1a]" : "bg-gray-50";
  const textPrimary = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const textTertiary = theme === "dark" ? "text-gray-500" : "text-gray-400";

  const tabs = [
    { id: "testcases" as const, label: "Test Cases", icon: Code2 },
    { id: "customtest" as const, label: "Custom Test", icon: Zap },
    { id: "testresult" as const, label: "Results", icon: CheckCircle2 },
    { id: "console" as const, label: "Console", icon: TerminalIcon },
  ];

  return (
    <div
      className={`${
        isCollapsed ? "h-10" : "h-52 sm:h-60"
      } border-t ${borderColor} flex flex-col ${bgSecondary} transition-all duration-300`}
    >
      {/* Tabs with Collapse Button */}
      <div
        className={`border-b ${borderColor} px-3 sm:px-4 py-2 flex items-center justify-between gap-2`}
      >
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                onTabChange(tab.id);
                if (isCollapsed) setIsCollapsed(false);
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeBottomTab === tab.id
                  ? `${
                      theme === "dark"
                        ? "bg-gray-800"
                        : "bg-white border border-gray-200"
                    } text-emerald-400 shadow-sm`
                  : `${textSecondary} ${
                      theme === "dark"
                        ? "hover:bg-gray-800/50"
                        : "hover:bg-gray-100/50"
                    }`
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Collapse/Expand Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1.5 ${
            theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"
          } rounded-lg transition-colors ${textSecondary} shrink-0`}
          title={isCollapsed ? "Expand panel" : "Collapse panel"}
        >
          {isCollapsed ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </motion.button>
      </div>

      {/* Content with Animation */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 overflow-hidden"
          >
            <div className="h-full overflow-y-auto p-3 sm:p-4 custom-scrollbar">
              {activeBottomTab === "testcases" && (
                <div className="space-y-2 sm:space-y-3">
                  {problem.examples.map((example, index) => (
                    <div
                      key={index}
                      className={`${
                        theme === "dark" ? "bg-gray-800/50" : "bg-gray-50"
                      } border ${borderColor} rounded-lg p-2.5 sm:p-3`}
                    >
                      <div className="text-xs font-semibold text-orange-400 mb-2">
                        Test Case {index + 1}
                      </div>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <div>
                          <div className={`text-xs ${textTertiary} mb-1`}>
                            Input
                          </div>
                          <div className="font-mono text-xs text-emerald-400">
                            {example.input}
                          </div>
                        </div>
                        <div>
                          <div className={`text-xs ${textTertiary} mb-1`}>
                            Expected
                          </div>
                          <div className="font-mono text-xs text-amber-400">
                            {example.output}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeBottomTab === "customtest" && (
                <div className="space-y-3">
                  <div>
                    <label
                      className={`text-xs font-semibold ${textSecondary} mb-2 block`}
                    >
                      Custom Input
                    </label>
                    <textarea
                      value={customInput}
                      onChange={(e) => onCustomInputChange(e.target.value)}
                      placeholder="Enter your test input here..."
                      className={`w-full h-20 px-3 py-2 ${
                        theme === "dark" ? "bg-gray-900/50" : "bg-white"
                      } border ${borderColor} rounded-lg font-mono text-xs ${textPrimary} resize-none focus:outline-none focus:ring-2 focus:ring-orange-500/50`}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onRunCustomTest}
                    disabled={isRunning || !customInput}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-lg font-semibold transition-all flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20"
                  >
                    <Play className="w-4 h-4" />
                    Run Custom Test
                  </motion.button>
                  {customOutput && (
                    <div>
                      <label
                        className={`text-xs font-semibold ${textSecondary} mb-2 block`}
                      >
                        Output
                      </label>
                      <div
                        className={`w-full px-3 py-2 ${
                          theme === "dark" ? "bg-gray-900/50" : "bg-white"
                        } border ${borderColor} rounded-lg font-mono text-xs ${textSecondary} whitespace-pre-wrap`}
                      >
                        {customOutput}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeBottomTab === "testresult" && (
                <div>
                  {testResults.length === 0 ? (
                    <div
                      className={`text-center py-6 sm:py-8 ${textTertiary} text-xs sm:text-sm`}
                    >
                      Click "Run Code" or "Submit" to see test results
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {testResults.map((result, index) => (
                        <div
                          key={index}
                          className={`p-2.5 sm:p-3 rounded-lg border ${
                            result.passed
                              ? `${
                                  theme === "dark"
                                    ? "bg-emerald-500/10"
                                    : "bg-emerald-50"
                                } border-emerald-500/30`
                              : `${
                                  theme === "dark"
                                    ? "bg-rose-500/10"
                                    : "bg-rose-50"
                                } border-rose-500/30`
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {result.passed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-400" />
                            )}
                            <span
                              className={`text-xs sm:text-sm font-semibold ${
                                result.passed
                                  ? "text-emerald-400"
                                  : "text-rose-400"
                              }`}
                            >
                              {result.message}
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div>
                              <div className={textTertiary}>Input:</div>
                              <div className={`font-mono ${textSecondary}`}>
                                {result.input}
                              </div>
                            </div>
                            <div>
                              <div className={textTertiary}>Expected:</div>
                              <div className="font-mono text-amber-400">
                                {result.expected}
                              </div>
                            </div>
                            <div>
                              <div className={textTertiary}>Actual:</div>
                              <div
                                className={`font-mono ${
                                  result.passed
                                    ? "text-emerald-400"
                                    : "text-rose-400"
                                }`}
                              >
                                {result.actual}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeBottomTab === "console" && (
                <div className={`font-mono text-xs ${textSecondary} space-y-1`}>
                  {consoleOutput.length === 0 ? (
                    <div className={textTertiary}>
                      Console output will appear here...
                    </div>
                  ) : (
                    consoleOutput.map((line, index) => (
                      <div
                        key={index}
                        className={
                          line.includes("✅")
                            ? "text-emerald-400"
                            : line.includes("❌")
                            ? "text-rose-400"
                            : ""
                        }
                      >
                        {line}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
