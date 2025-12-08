"use client";

import { motion } from "framer-motion";
import {
  Copy,
  Check,
  RotateCcw,
  UploadCloud,
  SplitSquareHorizontal,
  SplitSquareVertical,
} from "lucide-react";
import LanguageSelector from "./LanguageSelector";

type Language = "javascript" | "python" | "java";
type SplitDirection = "horizontal" | "vertical";

interface EditorToolbarProps {
  selectedLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  splitDirection: SplitDirection;
  onSplitDirectionToggle: () => void;
  onUploadClick: () => void;
  onCopyCode: () => void;
  onReset: () => void;
  copied: boolean;
  isFullscreen: boolean;
  theme: "dark" | "light";
}

export default function EditorToolbar({
  selectedLanguage,
  onLanguageChange,
  splitDirection,
  onSplitDirectionToggle,
  onUploadClick,
  onCopyCode,
  onReset,
  copied,
  isFullscreen,
  theme,
}: EditorToolbarProps) {
  const borderColor = theme === "dark" ? "border-gray-800" : "border-gray-200";
  const bgSecondary = theme === "dark" ? "bg-[#1a1a1a]" : "bg-gray-50";
  const textSecondary = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const hoverBg =
    theme === "dark" ? "hover:bg-gray-800/80" : "hover:bg-gray-200";

  return (
    <div
      className={`border-b ${borderColor} px-3 sm:px-4 py-2.5 flex items-center justify-between ${bgSecondary}/50 transition-colors duration-300`}
    >
      <div className="flex items-center gap-2">
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={onLanguageChange}
          theme={theme}
        />

        {!isFullscreen && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSplitDirectionToggle}
            className={`p-2 ${hoverBg} rounded-lg transition-all ${textSecondary} hidden lg:block border ${
              theme === "dark" ? "border-gray-800" : "border-gray-300"
            }`}
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

      <div className="flex items-center gap-1.5 sm:gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onUploadClick}
          className={`p-2 ${hoverBg} rounded-lg transition-all ${textSecondary} border ${
            theme === "dark" ? "border-gray-800" : "border-gray-300"
          }`}
          title="Upload code file"
        >
          <UploadCloud className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCopyCode}
          className={`p-2 ${hoverBg} rounded-lg transition-all ${textSecondary} border ${
            theme === "dark" ? "border-gray-800" : "border-gray-300"
          }`}
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
          onClick={onReset}
          className={`p-2 ${hoverBg} rounded-lg transition-all ${textSecondary} border ${
            theme === "dark" ? "border-gray-800" : "border-gray-300"
          }`}
          title="Reset code"
        >
          <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </motion.button>
      </div>
    </div>
  );
}
