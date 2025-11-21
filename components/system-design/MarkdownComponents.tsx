"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Image as ImageIcon } from "lucide-react";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  level?: 2 | 3;
}

export function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
  level = 2,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const headingClasses =
    level === 2
      ? "text-2xl font-bold text-gray-900"
      : "text-xl font-semibold text-gray-800";

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-gray-50 transition-colors group"
      >
        <div className={`${headingClasses} flex items-center gap-3 m-0`}>
          <span className="inline-block w-1 h-6 bg-gray-900 rounded-full" />
          {title}
        </div>
        <div className="shrink-0 ml-4">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-700 group-hover:text-gray-900 transition-colors" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 md:p-6 pt-0 border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
}

export function ImagePlaceholder({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="my-8 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 md:p-12 flex flex-col items-center justify-center text-center hover:border-blue-400 transition-colors group">
      <div className="p-4 rounded-full bg-gray-200 group-hover:bg-blue-50 transition-colors mb-4">
        <ImageIcon className="h-12 w-12 text-gray-500 group-hover:text-blue-600 transition-colors" />
      </div>
      <h4 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors mb-2">
        {title}
      </h4>
      {description && (
        <p className="text-sm text-gray-600 max-w-md">{description}</p>
      )}
    </div>
  );
}

export function CodeBlock({
  code,
  language = "typescript",
  title,
}: {
  code: string;
  language?: string;
  title?: string;
}) {
  return (
    <div className="my-6 rounded-xl border border-gray-800 overflow-hidden bg-gray-950">
      {title && (
        <div className="px-4 py-2 bg-gray-900 border-b border-gray-800 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <span className="text-xs text-gray-400 ml-2">{title}</span>
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className={`language-${language} text-sm`}>{code}</code>
      </pre>
    </div>
  );
}

export function InfoBox({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "warning" | "success" | "tip";
  title?: string;
  children: React.ReactNode;
}) {
  const styles = {
    info: "border-blue-500/30 bg-blue-500/5",
    warning: "border-yellow-500/30 bg-yellow-500/5",
    success: "border-emerald-500/30 bg-emerald-500/5",
    tip: "border-purple-500/30 bg-purple-500/5",
  };

  const iconColors = {
    info: "text-blue-400",
    warning: "text-yellow-400",
    success: "text-emerald-400",
    tip: "text-purple-400",
  };

  return (
    <div className={`my-6 rounded-xl border ${styles[type]} p-4 md:p-6`}>
      {title && (
        <h4 className={`font-semibold mb-2 ${iconColors[type]}`}>{title}</h4>
      )}
      <div className="text-gray-300 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
