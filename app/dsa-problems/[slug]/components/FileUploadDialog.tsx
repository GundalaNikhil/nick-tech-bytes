"use client";

import { motion } from "framer-motion";
import { UploadCloud, FileCode, X } from "lucide-react";

interface FileUploadDialogProps {
  isOpen: boolean;
  file: File | null;
  onConfirm: () => void;
  onCancel: () => void;
  theme: "dark" | "light";
}

export default function FileUploadDialog({
  isOpen,
  file,
  onConfirm,
  onCancel,
  theme,
}: FileUploadDialogProps) {
  if (!isOpen) return null;

  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const borderColor = theme === "dark" ? "border-gray-800" : "border-gray-200";
  const textPrimary = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const textTertiary = theme === "dark" ? "text-gray-500" : "text-gray-500";

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onCancel}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md ${bgColor} border ${borderColor} rounded-2xl shadow-2xl p-6`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3
            className={`text-lg font-bold ${textPrimary} flex items-center gap-2`}
          >
            <UploadCloud className="w-5 h-5 text-orange-500" />
            Confirm File Upload
          </h3>
          <button
            onClick={onCancel}
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
              <p className={`text-sm font-semibold ${textPrimary} truncate`}>
                {file?.name}
              </p>
              <p className={`text-xs ${textTertiary}`}>
                {file?.size ? `${(file.size / 1024).toFixed(2)} KB` : ""}
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
            onClick={onCancel}
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
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-lg font-semibold transition-all text-sm shadow-lg shadow-orange-500/20"
          >
            Upload
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
