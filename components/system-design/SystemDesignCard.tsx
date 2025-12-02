"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/AuthModal";
import { useRouter } from "next/navigation";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

interface SystemDesignCardProps {
  title: string;
  category: "High-Level Design" | "Low-Level Design";
  difficulty: DifficultyLevel;
  companies: string[];
  rating: number;
  slug: string;
}

const difficultyConfig: Record<
  DifficultyLevel,
  { emoji: string; label: string; color: string }
> = {
  beginner: {
    emoji: "🌱",
    label: "Beginner",
    color: "text-emerald-400 bg-emerald-500/10 border border-emerald-500/30",
  },
  intermediate: {
    emoji: "⚡",
    label: "Intermediate",
    color: "text-yellow-400 bg-yellow-500/10 border border-yellow-500/30",
  },
  advanced: {
    emoji: "🔥",
    label: "Advanced",
    color: "text-red-400 bg-red-500/10 border border-red-500/30",
  },
};

export function SystemDesignCard({
  title,
  category,
  difficulty,
  companies,
  rating,
  slug,
}: SystemDesignCardProps) {
  const difficultyInfo = difficultyConfig[difficulty];
  const displayCompanies = companies.slice(0, 2);
  const hasMoreCompanies = companies.length > 2;
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();

  const basePath =
    category === "High-Level Design"
      ? "/system-design/hld"
      : "/system-design/lld";

  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      router.push(`${basePath}/${slug}`);
    }
  };

  return (
    <>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="🏗️ Unlock This System Design!"
        message={`Sign in to access "${title}" and master ${category} concepts!`}
      />
      <div className="group relative flex flex-col rounded-lg border border-gray-800 bg-gray-900/50 p-4 transition-all hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 backdrop-blur-sm hover:scale-[1.01]">
        <div className="flex flex-col gap-3">
          {/* Header - Compact */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="flex-1 text-base font-semibold text-white line-clamp-2 group-hover:text-emerald-400 transition-colors leading-snug">
              {title}
            </h3>
            <span
              className={`shrink-0 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${difficultyInfo.color}`}
            >
              <span className="text-xs">{difficultyInfo.emoji}</span>
              <span>{difficultyInfo.label}</span>
            </span>
          </div>

          {/* Compact Meta Row */}
          <div className="flex items-center justify-between gap-3 text-[11px] py-2 border-y border-gray-800/50">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-xs ${
                    i < Math.floor(rating) ? "text-yellow-400" : "text-gray-700"
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="text-[11px] font-medium text-gray-400 ml-1">
                {rating.toFixed(1)}
              </span>
            </div>
            <span className="text-[10px] font-medium text-gray-500">
              {category}
            </span>
          </div>

          {/* Company Tags - Compact */}
          <div className="flex flex-wrap gap-1.5">
            {displayCompanies.map((company) => (
              <span
                key={company}
                className="inline-flex items-center rounded bg-gray-800 border border-gray-700 px-2 py-0.5 text-[10px] font-medium text-gray-300 group-hover:border-emerald-500/30 transition-colors"
              >
                {company}
              </span>
            ))}
            {hasMoreCompanies && (
              <span className="inline-flex items-center rounded bg-gray-800 border border-gray-700 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                +{companies.length - 2}
              </span>
            )}
          </div>

          {/* Read More Button */}
          <button
            onClick={handleReadMore}
            className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500/10 to-cyan-600/10 hover:from-emerald-500/20 hover:to-cyan-600/20 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400 hover:text-emerald-300 rounded-lg transition-all text-sm font-semibold group/btn"
          >
            <BookOpen className="w-4 h-4" />
            <span>Read Full Design</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </>
  );
}
