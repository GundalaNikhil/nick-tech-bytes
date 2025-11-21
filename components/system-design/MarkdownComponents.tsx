'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';

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
  level = 2 
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const headingClasses = level === 2 
    ? 'text-2xl font-bold text-gray-100'
    : 'text-xl font-semibold text-gray-200';

  return (
    <div className="border border-gray-700/50 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300 shadow-xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-gray-800/30 transition-all duration-300 group"
      >
        <div className={`${headingClasses} flex items-center gap-3 m-0`}>
          <span className="inline-block w-1.5 h-6 bg-gradient-to-b from-emerald-400 to-blue-400 rounded-full shadow-lg shadow-emerald-500/20" />
          {title}
        </div>
        <div className="shrink-0 ml-4">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 group-hover:text-emerald-400 transition-colors duration-300" />
          )}
        </div>
      </button>
      
      {isOpen && (
        <div className="p-4 md:p-6 pt-0 border-t border-gray-800/50 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
}

export function ImagePlaceholder({ 
  title, 
  description 
}: { 
  title: string; 
  description?: string;
}) {
  return (
    <div className="my-8 rounded-xl border-2 border-dashed border-gray-700/50 bg-gradient-to-br from-gray-900/30 to-gray-800/30 p-8 md:p-12 flex flex-col items-center justify-center text-center hover:border-emerald-500/50 transition-all duration-300 group backdrop-blur-sm">
      <div className="p-4 rounded-full bg-gray-800/50 group-hover:bg-emerald-500/10 transition-all duration-300 mb-4 border border-gray-700/30">
        <ImageIcon className="h-12 w-12 text-gray-600 group-hover:text-emerald-400 transition-colors duration-300" />
      </div>
      <h4 className="text-lg font-semibold text-gray-300 group-hover:text-gray-100 transition-colors duration-300 mb-2">
        {title}
      </h4>
      {description && (
        <p className="text-sm text-gray-500 group-hover:text-gray-400 max-w-md transition-colors duration-300">
          {description}
        </p>
      )}
    </div>
  );
}

export function CodeBlock({ 
  code, 
  language = 'typescript',
  title
}: { 
  code: string; 
  language?: string;
  title?: string;
}) {
  return (
    <div className="my-6 rounded-xl border border-gray-800 overflow-hidden bg-gray-950 shadow-2xl">
      {title && (
        <div className="px-4 py-2 bg-gray-900 border-b border-gray-800 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <span className="text-xs text-gray-400 ml-2 font-mono">{title}</span>
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className={`language-${language} text-sm text-gray-300`}>
          {code}
        </code>
      </pre>
    </div>
  );
}

export function InfoBox({ 
  type = 'info',
  title,
  children 
}: { 
  type?: 'info' | 'warning' | 'success' | 'tip';
  title?: string;
  children: React.ReactNode;
}) {
  const styles = {
    info: 'border-blue-500/30 bg-blue-500/5',
    warning: 'border-yellow-500/30 bg-yellow-500/5',
    success: 'border-emerald-500/30 bg-emerald-500/5',
    tip: 'border-purple-500/30 bg-purple-500/5',
  };

  const iconColors = {
    info: 'text-blue-400',
    warning: 'text-yellow-400',
    success: 'text-emerald-400',
    tip: 'text-purple-400',
  };

  return (
    <div className={`my-6 rounded-xl border ${styles[type]} p-4 md:p-6 backdrop-blur-sm`}>
      {title && (
        <h4 className={`font-semibold mb-2 ${iconColors[type]}`}>
          {title}
        </h4>
      )}
      <div className="text-gray-300 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
