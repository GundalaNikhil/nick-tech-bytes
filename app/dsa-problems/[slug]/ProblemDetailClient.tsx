// filepath: /Users/nikhilgundala/Desktop/NTB/nick-tech-bytes/app/dsa-problems/[slug]/ProblemDetailClient.tsx
"use client";

import { type DSAProblem } from "@/lib/dsaProblems";
import { AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import Link from "next/link";
import ProblemHeader from "./components/ProblemHeader";
import ProblemDescription from "./components/ProblemDescription";
import EditorToolbar from "./components/EditorToolbar";
import EditorBottomPanel from "./components/EditorBottomPanel";
import EditorActionBar from "./components/EditorActionBar";
import FileUploadDialog from "./components/FileUploadDialog";
import ResizableDivider, {
  useResizablePanel,
} from "./components/ResizablePanel";
import { Code2 } from "lucide-react";

type TestResult = {
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
  message: string;
};

type Theme = "dark" | "light";
type SplitDirection = "horizontal" | "vertical";
type Language = "javascript" | "python" | "java";
type ActiveTab = "description" | "editorial" | "submissions";
type ActiveBottomTab = "testcases" | "customtest" | "testresult" | "console";

export default function ProblemDetailClient({
  problem,
}: {
  problem: DSAProblem | undefined;
}) {
  // Language & Code State
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>("javascript");
  const [code, setCode] = useState(problem?.starterCode.javascript || "");

  // UI State
  const [editorTheme, setEditorTheme] = useState<Theme>("dark"); // Only for code editor
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("description");
  const [activeBottomTab, setActiveBottomTab] =
    useState<ActiveBottomTab>("testcases");

  // Execution State
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

  // Split Panel State
  const [splitDirection, setSplitDirection] =
    useState<SplitDirection>("vertical");
  const containerRef = useRef<HTMLDivElement>(null);
  const { splitSize, isDragging, handleMouseDown } = useResizablePanel({
    splitDirection,
    containerRef,
  });

  // File Upload State
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Custom Test State
  const [customInput, setCustomInput] = useState("");
  const [customOutput, setCustomOutput] = useState("");

  if (!problem) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <Code2 className="w-20 h-20 text-gray-700 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-400 mb-2">
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

  // Handlers
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

  const handleLanguageChange = (lang: Language) => {
    setSelectedLanguage(lang);
    setCode(problem.starterCode[lang]);
  };

  const handleThemeToggle = () => {
    setEditorTheme(editorTheme === "dark" ? "light" : "dark");
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
      setCustomOutput(
        `✅ Custom Test Executed Successfully\n\nInput:\n${customInput}\n\nOutput:\n[Your output here]\n\n⏱️ Execution time: 0.25ms`
      );
      setIsRunning(false);
    }, 1000);
  };

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

  // Theme colors - UI is always dark
  const theme = "dark"; // UI theme is always dark
  const bgColor = "bg-[#0a0a0a]";
  const bgSecondary = "bg-[#1a1a1a]";
  const borderColor = "border-gray-800";

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300`}>
      {/* Header with Breadcrumb */}
      <ProblemHeader
        problem={problem}
        editorTheme={editorTheme}
        isFullscreen={isFullscreen}
        onThemeToggle={handleThemeToggle}
        onFullscreenToggle={() => setIsFullscreen(!isFullscreen)}
      />

      {/* File Upload Dialog */}
      <AnimatePresence>
        {showUploadDialog && (
          <FileUploadDialog
            isOpen={showUploadDialog}
            file={uploadedFile}
            onConfirm={confirmFileUpload}
            onCancel={cancelFileUpload}
            theme={theme}
          />
        )}
      </AnimatePresence>

      {/* Main Content - Use absolute positioning to avoid layout shifts */}
      <div className="fixed top-14 left-0 right-0 bottom-0 max-w-[2000px] mx-auto overflow-hidden">
        <div
          ref={containerRef}
          className={`flex ${
            splitDirection === "vertical" ? "flex-row" : "flex-col"
          } h-full overflow-hidden`}
          style={{ userSelect: isDragging ? "none" : "auto" }}
        >
          {/* Left/Top Panel - Problem Description */}
          {!isFullscreen && (
            <div
              className={`${
                splitDirection === "vertical" ? "h-full" : "w-full"
              } border-r ${borderColor} flex flex-col ${bgSecondary} shrink-0 transition-colors duration-300`}
              style={{
                [splitDirection === "vertical"
                  ? "width"
                  : "height"]: `${splitSize}%`,
                flexShrink: 0,
                flexGrow: 0,
              }}
            >
              <ProblemDescription
                problem={problem}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                theme={theme}
              />
            </div>
          )}

          {/* Resizable Divider */}
          {!isFullscreen && (
            <ResizableDivider
              direction={splitDirection}
              onMouseDown={handleMouseDown}
              theme={theme}
            />
          )}

          {/* Right/Bottom Panel - Code Editor */}
          <div
            className={`${
              isFullscreen
                ? "w-full"
                : splitDirection === "vertical"
                ? "h-full flex-1 min-w-0"
                : "w-full flex-1 min-h-0"
            } flex flex-col ${bgColor} transition-colors duration-300 overflow-hidden`}
            style={{
              flexShrink: 1,
              flexGrow: 1,
            }}
          >
            {/* Editor Toolbar */}
            <EditorToolbar
              selectedLanguage={selectedLanguage}
              onLanguageChange={handleLanguageChange}
              splitDirection={splitDirection}
              onSplitDirectionToggle={() =>
                setSplitDirection(
                  splitDirection === "vertical" ? "horizontal" : "vertical"
                )
              }
              onUploadClick={() => fileInputRef.current?.click()}
              onCopyCode={handleCopyCode}
              onReset={handleReset}
              copied={copied}
              isFullscreen={isFullscreen}
              theme={theme}
            />

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".js,.py,.java,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* Monaco Editor */}
            <div className="flex-1 overflow-hidden">
              <Editor
                height="100%"
                language={getLanguageMode()}
                value={code}
                onChange={(value) => setCode(value || "")}
                theme={editorTheme === "dark" ? "vs-dark" : "light"}
                options={{
                  fontSize: 14,
                  fontFamily:
                    "'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace",
                  fontLigatures: true,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  lineNumbers: "on",
                  glyphMargin: false,
                  folding: true,
                  lineDecorationsWidth: 10,
                  lineNumbersMinChars: 3,
                  renderLineHighlight: "all",
                  scrollbar: { vertical: "auto", horizontal: "auto" },
                  padding: { top: 16, bottom: 16 },
                  automaticLayout: true,
                  suggestOnTriggerCharacters: true,
                  quickSuggestions: true,
                  tabSize: 2,
                  smoothScrolling: true,
                  cursorBlinking: "smooth",
                  cursorSmoothCaretAnimation: "on",
                }}
              />
            </div>

            {/* Bottom Panel - Test Cases & Results */}
            <EditorBottomPanel
              activeBottomTab={activeBottomTab}
              onTabChange={setActiveBottomTab}
              problem={problem}
              testResults={testResults}
              consoleOutput={consoleOutput}
              customInput={customInput}
              customOutput={customOutput}
              onCustomInputChange={setCustomInput}
              onRunCustomTest={handleRunCustomTest}
              isRunning={isRunning}
              theme={theme}
            />

            {/* Action Bar */}
            <EditorActionBar
              isRunning={isRunning}
              onRunCode={handleRunCode}
              onSubmit={handleSubmit}
              theme={theme}
            />
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgb(10 10 10);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(55 65 81);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(75 85 99);
        }

        /* Better font rendering for dark theme */
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Code font */
        code,
        pre,
        .font-mono {
          font-family: var(--font-jetbrains-mono), "Monaco", "Consolas",
            monospace !important;
        }
      `}</style>
    </div>
  );
}
