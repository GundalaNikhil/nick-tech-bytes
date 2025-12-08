"use client";

import { type DSAProblem, type DifficultyLevel } from "@/lib/dsaProblems";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import Editor from "@monaco-editor/react";
import {
  Code2,
  CheckCircle2,
  Clock,
  BarChart3,
  Lightbulb,
  Play,
  RotateCcw,
  Building2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Send,
  XCircle,
  Terminal as TerminalIcon,
  ArrowLeft,
  Sun,
  Moon,
  Zap,
  Settings2,
  Upload,
  UploadCloud,
  FileCode,
  X,
  GripVertical,
  GripHorizontal,
  SplitSquareHorizontal,
  SplitSquareVertical,
} from "lucide-react";
import Link from "next/link";

type TestResult = {
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  message: string;
};

type Theme = "dark" | "light";
type SplitDirection = "horizontal" | "vertical";

const LANGUAGES = [
  {
    id: "javascript",
    name: "JavaScript",
    icon: "🟨",
    color: "bg-yellow-400/20 border-yellow-500/50 text-yellow-400",
  },
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    color: "bg-blue-400/20 border-blue-500/50 text-blue-400",
  },
  {
    id: "java",
    name: "Java",
    icon: "☕",
    color: "bg-orange-400/20 border-orange-500/50 text-orange-400",
  },
] as const;

export default function ProblemDetailClient({
  problem,
}: {
  problem: DSAProblem | undefined;
}) {
  const [selectedLanguage, setSelectedLanguage] = useState<
    "javascript" | "python" | "java"
  >("javascript");
  const [code, setCode] = useState(problem?.starterCode.javascript || "");
  const [theme, setTheme] = useState<Theme>("dark");
  const [showSolution, setShowSolution] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "description" | "editorial" | "submissions"
  >("description");
  const [activeBottomTab, setActiveBottomTab] = useState<
    "testcases" | "customtest" | "testresult" | "console"
  >("testcases");
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [splitDirection, setSplitDirection] =
    useState<SplitDirection>("vertical");
  const [splitSize, setSplitSize] = useState(45); // Percentage for left/top panel
  const [isDragging, setIsDragging] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [customInput, setCustomInput] = useState("");
  const [customOutput, setCustomOutput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Collapsible sections
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isExamplesOpen, setIsExamplesOpen] = useState(true);
  const [isConstraintsOpen, setIsConstraintsOpen] = useState(true);

  if (!problem) {
    return (
      <div
        className={`min-h-screen ${
          theme === "dark" ? "bg-[#0a0a0a]" : "bg-gray-50"
        } flex items-center justify-center transition-colors duration-300`}
      >
        <div className="text-center">
          <Code2
            className={`w-20 h-20 ${
              theme === "dark" ? "text-gray-700" : "text-gray-400"
            } mx-auto mb-4`}
          />
          <h1
            className={`text-3xl font-bold ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            } mb-2`}
          >
            Problem Not Found
          </h1>
          <Link
            href="/dsa-problems"
            className="text-orange-500 hover:text-orange-400 underline font-medium"
          >
            Back to Problems
          </Link>
        </div>
      </div>
    );
  }

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

  const getLanguageMode = () => {
    switch (selectedLanguage) {
      case "javascript":
        return "javascript";
      case "python":
        return "python";
      case "java":
        return "java";
    }
  };

  const handleLanguageChange = (lang: "javascript" | "python" | "java") => {
    setSelectedLanguage(lang);
    setCode(problem.starterCode[lang]);
    setLanguageDropdownOpen(false);
  };

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleReset = () => {
    setCode(problem.starterCode[selectedLanguage]);
    setConsoleOutput([]);
    setTestResults([]);
    setCustomInput("");
    setCustomOutput("");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setShowUploadDialog(true);
    }
  };

  const confirmFileUpload = () => {
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCode(content);
        setShowUploadDialog(false);
        setUploadedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      };
      reader.readAsText(uploadedFile);
    }
  };

  const cancelFileUpload = () => {
    setShowUploadDialog(false);
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRunCustomTest = () => {
    setIsRunning(true);
    setActiveBottomTab("customtest");

    setTimeout(() => {
      // Simulate custom test execution
      setCustomOutput(
        `✅ Custom Test Executed Successfully\n\nInput:\n${customInput}\n\nOutput:\n[Your output here]\n\n⏱️ Execution time: 0.25ms`
      );
      setIsRunning(false);
    }, 1000);
  };

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const container = containerRef.current.getBoundingClientRect();
      let newSize: number;

      if (splitDirection === "vertical") {
        newSize = ((e.clientX - container.left) / container.width) * 100;
      } else {
        newSize = ((e.clientY - container.top) / container.height) * 100;
      }

      // Limit between 20% and 80%
      newSize = Math.max(20, Math.min(80, newSize));
      setSplitSize(newSize);
    },
    [isDragging, splitDirection]
  );

  // Add mouse event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove as any);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove as any);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleRunCode = () => {
    setIsRunning(true);
    setActiveBottomTab("console");
    setConsoleOutput(["⚡ Executing code...", ""]);

    setTimeout(() => {
      setConsoleOutput([
        "⚡ Executing code...",
        "",
        "✅ Test case 1: Passed (0.12ms)",
        "✅ Test case 2: Passed (0.08ms)",
        "✅ Test case 3: Passed (0.15ms)",
        "",
        "🎉 All test cases passed!",
        "⏱️ Total runtime: 0.35ms",
      ]);
      setIsRunning(false);
    }, 1500);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setActiveBottomTab("testresult");

    setTimeout(() => {
      const results: TestResult[] = problem.examples.map((example, index) => ({
        passed: true,
        input: example.input,
        expected: example.output,
        actual: example.output,
        message: `Test case ${index + 1} passed`,
      }));
      setTestResults(results);
      setIsRunning(false);
    }, 2000);
  };

  const bgColor = theme === "dark" ? "bg-[#0a0a0a]" : "bg-white";
  const bgSecondary = theme === "dark" ? "bg-[#1a1a1a]" : "bg-gray-50";
  const bgTertiary = theme === "dark" ? "bg-[#0f0f0f]" : "bg-gray-100";
  const borderColor = theme === "dark" ? "border-gray-800" : "border-gray-200";
  const textPrimary = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const textTertiary = theme === "dark" ? "text-gray-500" : "text-gray-500";

  return (
    <div
      className={`min-h-screen ${bgColor} ${textPrimary} transition-colors duration-300`}
    >
      {/* Premium Header - Fixed extra padding */}
      <div
        className={`border-b ${borderColor} ${bgSecondary} backdrop-blur-xl sticky top-16 md:top-18 lg:top-20 z-40 transition-colors duration-300`}
      >
        <div className="max-w-[2000px] mx-auto px-3 sm:px-4 lg:px-6 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <Link href="/dsa-problems">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 ${bgTertiary} hover:bg-gray-700/50 ${borderColor} border rounded-lg transition-all text-xs sm:text-sm font-medium`}
                >
                  <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Problems</span>
                </motion.button>
              </Link>
              <div className={`h-5 w-px ${borderColor} hidden sm:block`} />
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <h1 className="text-sm sm:text-base lg:text-lg font-semibold truncate">
                  {problem.title}
                </h1>
                <span
                  className={`px-2 py-0.5 rounded-md text-xs font-semibold border shrink-0 ${getDifficultyColor(
                    problem.difficulty
                  )}`}
                >
                  {problem.difficulty}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleThemeToggle}
                className={`p-1.5 sm:p-2 ${bgTertiary} hover:bg-gray-700/50 rounded-lg transition-all`}
                title={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                {theme === "dark" ? (
                  <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" />
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFullscreen(!isFullscreen)}
                className={`p-1.5 sm:p-2 ${bgTertiary} hover:bg-gray-700/50 rounded-lg transition-all hidden sm:block`}
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

      {/* File Upload Confirmation Dialog */}
      <AnimatePresence>
        {showUploadDialog && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={cancelFileUpload}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md ${
                theme === "dark" ? "bg-gray-900" : "bg-white"
              } border ${borderColor} rounded-2xl shadow-2xl p-6`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className={`text-lg font-bold ${textPrimary} flex items-center gap-2`}
                >
                  <UploadCloud className="w-5 h-5 text-orange-500" />
                  Confirm File Upload
                </h3>
                <button
                  onClick={cancelFileUpload}
                  className={`p-1 ${
                    theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  } rounded-lg transition-colors`}
                >
                  <X className={`w-5 h-5 ${textSecondary}`} />
                </button>
              </div>

              <div
                className={`${
                  theme === "dark" ? "bg-gray-800/50" : "bg-gray-50"
                } border ${borderColor} rounded-lg p-4 mb-6`}
              >
                <div className="flex items-center gap-3">
                  <FileCode className="w-8 h-8 text-orange-500" />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-semibold ${textPrimary} truncate`}
                    >
                      {uploadedFile?.name}
                    </p>
                    <p className={`text-xs ${textTertiary}`}>
                      {uploadedFile?.size
                        ? `${(uploadedFile.size / 1024).toFixed(2)} KB`
                        : ""}
                    </p>
                  </div>
                </div>
              </div>

              <p className={`text-sm ${textSecondary} mb-6`}>
                This will replace your current code. Are you sure you want to
                continue?
              </p>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={cancelFileUpload}
                  className={`flex-1 px-4 py-2.5 ${
                    theme === "dark"
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-gray-100 hover:bg-gray-200"
                  } border ${borderColor} rounded-lg font-semibold transition-all text-sm`}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={confirmFileUpload}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-lg font-semibold transition-all text-sm shadow-lg shadow-orange-500/20"
                >
                  Upload
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-[2000px] mx-auto">
        <div
          ref={containerRef}
          className={`flex ${
            splitDirection === "vertical" ? "flex-row" : "flex-col"
          } h-[calc(100vh-120px)] md:h-[calc(100vh-130px)] lg:h-[calc(100vh-140px)]`}
          style={{ userSelect: isDragging ? "none" : "auto" }}
        >
          {/* Left/Top Panel - Problem Description */}
          {!isFullscreen && (
            <div
              className={`${
                splitDirection === "vertical" ? "h-full" : "w-full"
              } border-r ${borderColor} flex flex-col ${bgSecondary} transition-colors duration-300`}
              style={{
                [splitDirection === "vertical"
                  ? "width"
                  : "height"]: `${splitSize}%`,
              }}
            >
              {/* Tabs */}
              <div
                className={`border-b ${borderColor} px-3 py-2 flex gap-1 ${bgTertiary}/50 transition-colors duration-300`}
              >
                {["description", "editorial", "submissions"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
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

              {/* Content with Custom Scrollbar */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 custom-scrollbar">
                {activeTab === "description" && (
                  <>
                    {/* Problem Description - Collapsible */}
                    <div
                      className={`${
                        theme === "dark" ? "bg-gray-800/30" : "bg-white"
                      } border ${borderColor} rounded-xl overflow-hidden transition-all`}
                    >
                      <button
                        onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between ${
                          theme === "dark"
                            ? "hover:bg-gray-800/50"
                            : "hover:bg-gray-50"
                        } transition-colors`}
                      >
                        <h2 className="text-sm sm:text-base font-semibold flex items-center gap-2">
                          <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
                          Problem Statement
                        </h2>
                        {isDescriptionOpen ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                      <AnimatePresence>
                        {isDescriptionOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div
                              className={`px-3 sm:px-4 pb-3 sm:pb-4 ${textSecondary} text-xs sm:text-sm leading-relaxed whitespace-pre-wrap`}
                            >
                              {problem.description}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Examples - Collapsible */}
                    <div
                      className={`${
                        theme === "dark" ? "bg-gray-800/30" : "bg-white"
                      } border ${borderColor} rounded-xl overflow-hidden transition-all`}
                    >
                      <button
                        onClick={() => setIsExamplesOpen(!isExamplesOpen)}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between ${
                          theme === "dark"
                            ? "hover:bg-gray-800/50"
                            : "hover:bg-gray-50"
                        } transition-colors`}
                      >
                        <h2 className="text-sm sm:text-base font-semibold flex items-center gap-2">
                          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
                          Sample Test Cases
                        </h2>
                        {isExamplesOpen ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                      <AnimatePresence>
                        {isExamplesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-2 sm:space-y-3">
                              {problem.examples.map((example, index) => (
                                <div
                                  key={index}
                                  className={`${
                                    theme === "dark"
                                      ? "bg-gray-900/50"
                                      : "bg-gray-50"
                                  } border ${borderColor} rounded-lg p-3`}
                                >
                                  <div className="text-xs font-semibold text-orange-400 mb-2">
                                    Example {index + 1}
                                  </div>
                                  <div
                                    className={`font-mono text-xs ${
                                      theme === "dark"
                                        ? "bg-black/40"
                                        : "bg-white"
                                    } p-2.5 rounded border ${borderColor} mb-2`}
                                  >
                                    <div className="text-emerald-400 mb-1">
                                      <span className={textTertiary}>
                                        Input:{" "}
                                      </span>
                                      {example.input}
                                    </div>
                                    <div className="text-amber-400">
                                      <span className={textTertiary}>
                                        Output:{" "}
                                      </span>
                                      {example.output}
                                    </div>
                                  </div>
                                  {example.explanation && (
                                    <div
                                      className={`text-xs ${textSecondary} mt-2 pt-2 border-t ${borderColor}`}
                                    >
                                      <span className="font-semibold">
                                        Explanation:
                                      </span>{" "}
                                      {example.explanation}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Constraints - Collapsible */}
                    <div
                      className={`${
                        theme === "dark" ? "bg-gray-800/30" : "bg-white"
                      } border ${borderColor} rounded-xl overflow-hidden transition-all`}
                    >
                      <button
                        onClick={() => setIsConstraintsOpen(!isConstraintsOpen)}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between ${
                          theme === "dark"
                            ? "hover:bg-gray-800/50"
                            : "hover:bg-gray-50"
                        } transition-colors`}
                      >
                        <h2 className="text-sm sm:text-base font-semibold flex items-center gap-2">
                          <Settings2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500" />
                          Constraints
                        </h2>
                        {isConstraintsOpen ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                      <AnimatePresence>
                        {isConstraintsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                              <ul className="space-y-1.5">
                                {problem.constraints.map(
                                  (constraint, index) => (
                                    <li
                                      key={index}
                                      className={`flex items-start gap-2 ${textSecondary} text-xs sm:text-sm`}
                                    >
                                      <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-400 mt-0.5 shrink-0" />
                                      <span className="font-mono text-xs">
                                        {constraint}
                                      </span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Tags & Companies */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {problem.category.map((cat) => (
                        <span
                          key={cat}
                          className={`px-2.5 py-1 ${
                            theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                          } border ${borderColor} ${textSecondary} rounded-md text-xs font-medium`}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    {problem.companies && problem.companies.length > 0 && (
                      <div
                        className={`${
                          theme === "dark" ? "bg-blue-500/10" : "bg-blue-50"
                        } border border-blue-500/30 rounded-lg p-3`}
                      >
                        <h3 className="text-xs sm:text-sm font-semibold text-blue-400 mb-2 flex items-center gap-2">
                          <Building2 className="w-3.5 h-3.5" />
                          Asked by Companies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {problem.companies.map((company) => (
                            <span
                              key={company}
                              className="px-2.5 py-1 bg-blue-500/20 border border-blue-500/40 text-blue-300 rounded-md text-xs font-semibold"
                            >
                              {company}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {activeTab === "editorial" && (
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

                    {showSolution && problem.solution && (
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
                              theme === "dark"
                                ? "bg-purple-500/10"
                                : "bg-purple-50"
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

                        {problem.solution.code[selectedLanguage] && (
                          <div
                            className={`${
                              theme === "dark" ? "bg-gray-900/50" : "bg-gray-50"
                            } border ${borderColor} rounded-lg overflow-hidden`}
                          >
                            <div
                              className={`px-3 sm:px-4 py-2 border-b ${borderColor} flex items-center justify-between`}
                            >
                              <span className="text-xs font-semibold">
                                Solution Code
                              </span>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    problem.solution!.code[selectedLanguage]!
                                  );
                                }}
                                className="text-xs text-orange-400 hover:text-orange-300"
                              >
                                Copy
                              </button>
                            </div>
                            <pre className="p-3 sm:p-4 overflow-x-auto text-xs">
                              <code className={`${textSecondary} font-mono`}>
                                {problem.solution.code[selectedLanguage]}
                              </code>
                            </pre>
                          </div>
                        )}
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
            </div>
          )}

          {/* Resizable Divider */}
          {!isFullscreen && (
            <div
              className={`${
                splitDirection === "vertical"
                  ? "w-1.5 cursor-col-resize hover:bg-orange-500/30"
                  : "h-1.5 cursor-row-resize hover:bg-orange-500/30"
              } ${borderColor} bg-gray-800/50 transition-colors flex items-center justify-center group relative z-10`}
              onMouseDown={handleMouseDown}
            >
              <div
                className={`${
                  splitDirection === "vertical" ? "h-8" : "w-8"
                } bg-gray-700 group-hover:bg-orange-500/50 rounded-full flex items-center justify-center transition-colors`}
              >
                {splitDirection === "vertical" ? (
                  <GripVertical className="w-3 h-3 text-gray-400 group-hover:text-orange-400" />
                ) : (
                  <GripHorizontal className="w-3 h-3 text-gray-400 group-hover:text-orange-400" />
                )}
              </div>
            </div>
          )}

          {/* Right/Bottom Panel - Code Editor */}
          <div
            className={`${
              isFullscreen
                ? "w-full"
                : splitDirection === "vertical"
                ? "h-full flex-1"
                : "w-full flex-1"
            } flex flex-col ${bgColor} transition-colors duration-300`}
          >
            {/* Premium Editor Header */}
            <div
              className={`border-b ${borderColor} px-3 sm:px-4 py-2 flex items-center justify-between ${bgSecondary}/50 transition-colors duration-300`}
            >
              <div className="flex items-center gap-2">
                {/* Language Selector Dropdown - Enhanced */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setLanguageDropdownOpen(!languageDropdownOpen)
                    }
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs sm:text-sm font-semibold border ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-orange-500/10 to-rose-500/10 hover:from-orange-500/20 hover:to-rose-500/20 border-orange-500/30"
                        : "bg-gradient-to-r from-orange-50 to-rose-50 hover:from-orange-100 hover:to-rose-100 border-orange-300"
                    } ${
                      theme === "dark" ? "text-orange-300" : "text-orange-600"
                    }`}
                  >
                    <span className="text-base sm:text-lg">
                      {LANGUAGES.find((l) => l.id === selectedLanguage)?.icon}
                    </span>
                    <span className="hidden sm:inline">
                      {LANGUAGES.find((l) => l.id === selectedLanguage)?.name}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform ${
                        languageDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {languageDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute top-full left-0 mt-2 w-56 ${
                          theme === "dark" ? "bg-gray-900" : "bg-white"
                        } border ${borderColor} rounded-xl shadow-2xl overflow-hidden z-50`}
                      >
                        <div className={`p-2 space-y-1`}>
                          {LANGUAGES.map((lang) => (
                            <button
                              key={lang.id}
                              onClick={() =>
                                handleLanguageChange(lang.id as any)
                              }
                              className={`w-full px-3 py-2.5 text-left text-sm font-medium rounded-lg flex items-center gap-3 transition-all ${
                                selectedLanguage === lang.id
                                  ? `${lang.color} border`
                                  : `${
                                      theme === "dark"
                                        ? "hover:bg-gray-800"
                                        : "hover:bg-gray-50"
                                    } ${textSecondary} hover:${textPrimary}`
                              }`}
                            >
                              <span className="text-lg">{lang.icon}</span>
                              <span className="flex-1">{lang.name}</span>
                              {selectedLanguage === lang.id && (
                                <Check className="w-4 h-4" />
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Split Direction Toggle */}
                {!isFullscreen && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setSplitDirection(
                        splitDirection === "vertical"
                          ? "horizontal"
                          : "vertical"
                      )
                    }
                    className={`p-1.5 sm:p-2 ${
                      theme === "dark"
                        ? "hover:bg-gray-800"
                        : "hover:bg-gray-100"
                    } rounded-lg transition-colors ${textSecondary} hidden lg:block`}
                    title={`Switch to ${
                      splitDirection === "vertical" ? "horizontal" : "vertical"
                    } split`}
                  >
                    {splitDirection === "vertical" ? (
                      <SplitSquareHorizontal className="w-4 h-4" />
                    ) : (
                      <SplitSquareVertical className="w-4 h-4" />
                    )}
                  </motion.button>
                )}
              </div>

              {/* Editor Actions */}
              <div className="flex items-center gap-1 sm:gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".js,.py,.java,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-1.5 ${
                    theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  } rounded-md transition-colors ${textSecondary}`}
                  title="Upload code file"
                >
                  <UploadCloud className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyCode}
                  className={`p-1.5 ${
                    theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  } rounded-md transition-colors ${textSecondary}`}
                  title="Copy code"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className={`p-1.5 ${
                    theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  } rounded-md transition-colors ${textSecondary}`}
                  title="Reset code"
                >
                  <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </motion.button>
              </div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1 overflow-hidden">
              <Editor
                height="100%"
                language={getLanguageMode()}
                value={code}
                onChange={(value) => setCode(value || "")}
                theme={theme === "dark" ? "vs-dark" : "light"}
                options={{
                  fontSize: 13,
                  fontFamily:
                    "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  lineNumbers: "on",
                  glyphMargin: false,
                  folding: true,
                  lineDecorationsWidth: 10,
                  lineNumbersMinChars: 3,
                  renderLineHighlight: "all",
                  scrollbar: { vertical: "auto", horizontal: "auto" },
                  padding: { top: 12, bottom: 12 },
                  automaticLayout: true,
                  suggestOnTriggerCharacters: true,
                  quickSuggestions: true,
                  tabSize: 2,
                }}
              />
            </div>

            {/* Bottom Panel - Test Cases & Results */}
            <div
              className={`h-52 sm:h-60 border-t ${borderColor} flex flex-col ${bgSecondary} transition-colors duration-300`}
            >
              {/* Bottom Tabs */}
              <div
                className={`border-b ${borderColor} px-3 sm:px-4 py-2 flex gap-1 overflow-x-auto`}
              >
                {[
                  { id: "testcases", label: "Test Cases", icon: Code2 },
                  { id: "customtest", label: "Custom Test", icon: Zap },
                  { id: "testresult", label: "Results", icon: CheckCircle2 },
                  { id: "console", label: "Console", icon: TerminalIcon },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveBottomTab(tab.id as any)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeBottomTab === tab.id
                        ? `${
                            theme === "dark"
                              ? "bg-gray-800"
                              : "bg-white border border-gray-200"
                          } text-orange-400 shadow-sm`
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

              {/* Bottom Content */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 custom-scrollbar">
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
                        onChange={(e) => setCustomInput(e.target.value)}
                        placeholder="Enter your test input here..."
                        className={`w-full h-20 px-3 py-2 ${
                          theme === "dark" ? "bg-gray-900/50" : "bg-white"
                        } border ${borderColor} rounded-lg font-mono text-xs ${textPrimary} resize-none focus:outline-none focus:ring-2 focus:ring-orange-500/50`}
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleRunCustomTest}
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
                  <div
                    className={`font-mono text-xs ${textSecondary} space-y-1`}
                  >
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
            </div>

            {/* Premium Action Bar */}
            <div
              className={`border-t ${borderColor} px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between ${bgSecondary} transition-colors duration-300`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isRunning ? "bg-amber-400 animate-pulse" : "bg-emerald-400"
                  }`}
                />
                <span className={`text-xs ${textTertiary}`}>
                  {isRunning ? "Running..." : "Ready to execute"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 ${
                    theme === "dark"
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-gray-100 hover:bg-gray-200"
                  } border ${borderColor} ${textPrimary} rounded-lg font-semibold transition-all flex items-center gap-2 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-sm`}
                >
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Run Code</span>
                  <span className="sm:hidden">Run</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={isRunning}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
                >
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Submit</span>
                  <span className="sm:hidden">Submit</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap");

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${theme === "dark"
            ? "rgb(10 10 10)"
            : "rgb(249 250 251)"};
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${theme === "dark"
            ? "rgb(55 65 81)"
            : "rgb(209 213 219)"};
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${theme === "dark"
            ? "rgb(75 85 99)"
            : "rgb(156 163 175)"};
        }
      `}</style>
    </div>
  );
}
