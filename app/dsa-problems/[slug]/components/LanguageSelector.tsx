"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

type Language = "javascript" | "python" | "java";

interface LanguageOption {
  id: Language;
  name: string;
}

const LANGUAGES: LanguageOption[] = [
  { id: "javascript", name: "JavaScript" },
  { id: "python", name: "Python" },
  { id: "java", name: "Java" },
];

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  theme: "dark" | "light";
}

export default function LanguageSelector({
  selectedLanguage,
  onLanguageChange,
  theme,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (lang: Language) => {
    onLanguageChange(lang);
    setIsOpen(false);
  };

  const selectedLang = LANGUAGES.find((l) => l.id === selectedLanguage);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-xs sm:text-sm font-medium border ${
          theme === "dark"
            ? "bg-gray-800 hover:bg-gray-700 border-gray-700 text-gray-100"
            : "bg-white hover:bg-gray-50 border-gray-300 text-gray-800"
        }`}
      >
        <span>{selectedLang?.name}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop to close dropdown */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className={`absolute top-full left-0 mt-2 w-48 ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } border ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              } rounded-lg shadow-xl overflow-hidden z-50`}
            >
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => handleSelect(lang.id)}
                  className={`w-full px-4 py-2.5 text-left text-sm font-medium flex items-center justify-between transition-all ${
                    selectedLanguage === lang.id
                      ? theme === "dark"
                        ? "bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-400"
                        : "bg-emerald-50 text-emerald-600 border-l-2 border-emerald-500"
                      : theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700/80"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{lang.name}</span>
                  {selectedLanguage === lang.id && (
                    <Check className="w-4 h-4" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
