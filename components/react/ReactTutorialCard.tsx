"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Code2, Star, TrendingUp, BookOpen } from "lucide-react";
import type { DifficultyLevel } from "@/lib/topics/reactTutorials";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/AuthModal";
import { useRouter } from "next/navigation";

interface ReactTutorialCardProps {
  title: string;
  slug: string;
  difficulty: DifficultyLevel;
  description: string;
  tags: string[];
  estimatedTime: string;
  rating: number;
  companies: string[];
}

const difficultyConfig: Record<
  DifficultyLevel,
  { emoji: string; label: string; color: string; gradient: string }
> = {
  beginner: {
    emoji: "🌱",
    label: "Beginner",
    color: "text-emerald-400 bg-emerald-500/10 border border-emerald-500/30",
    gradient: "from-emerald-500/20 to-emerald-500/5",
  },
  intermediate: {
    emoji: "⚡",
    label: "Intermediate",
    color: "text-yellow-400 bg-yellow-500/10 border border-yellow-500/30",
    gradient: "from-yellow-500/20 to-yellow-500/5",
  },
  advanced: {
    emoji: "🔥",
    label: "Advanced",
    color: "text-red-400 bg-red-500/10 border border-red-500/30",
    gradient: "from-red-500/20 to-red-500/5",
  },
};

export function ReactTutorialCard({
  title,
  slug,
  difficulty,
  description,
  tags,
  estimatedTime,
  rating,
  companies,
}: ReactTutorialCardProps) {
  const difficultyInfo = difficultyConfig[difficulty];
  const displayCompanies = companies.slice(0, 3);
  const hasMoreCompanies = companies.length > 3;
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();

  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      router.push(`/react-tutorials/${slug}`);
    }
  };

  return (
    <>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="🚀 Unlock This Tutorial!"
        message="Sign in to access this React tutorial and start building amazing components!"
      />
      <div className="group relative flex flex-col rounded-lg border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-900/40 p-4 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 backdrop-blur-sm hover:scale-[1.01]"
      >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 rounded-lg bg-gradient-to-br ${difficultyInfo.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
      />

      <div className="relative z-10 flex flex-col gap-3">
        {/* Header - Compact */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-white mb-1.5 line-clamp-2 group-hover:text-cyan-400 transition-colors leading-snug">
              {title}
            </h3>
          </div>
          <span
            className={`shrink-0 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${difficultyInfo.color}`}
          >
            <span className="text-xs">{difficultyInfo.emoji}</span>
            <span>{difficultyInfo.label}</span>
          </span>
        </div>

        {/* Description - More compact */}
        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Compact Meta Row - All in one line */}
        <div className="flex items-center justify-between gap-3 text-[11px] text-gray-500 py-2 border-y border-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-cyan-400" />
              <span className="text-gray-400">{estimatedTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
              <span className="text-gray-400 font-medium">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {displayCompanies.slice(0, 2).map((company, idx) => (
              <span
                key={idx}
                className="text-[10px] text-gray-500 px-1.5 py-0.5 bg-gray-800/30 rounded"
              >
                {company}
              </span>
            ))}
            {companies.length > 2 && (
              <span className="text-[10px] text-gray-600">
                +{companies.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Tags - Compact */}
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag, idx) => {
            const tagColors = [
              "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
              "bg-purple-500/10 text-purple-400 border-purple-500/20",
              "bg-pink-500/10 text-pink-400 border-pink-500/20",
            ];
            const colorClass = tagColors[idx % tagColors.length];
            return (
              <span
                key={tag}
                className={`rounded px-1.5 py-0.5 text-[10px] border font-medium ${colorClass}`}
              >
                {tag}
              </span>
            );
          })}
          {tags.length > 3 && (
            <span className="rounded bg-gray-800/50 px-1.5 py-0.5 text-[10px] text-gray-500 border border-gray-700/50">
              +{tags.length - 3}
            </span>
          )}
        </div>

        {/* Read More Button */}
        <button
          onClick={handleReadMore}
          className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 hover:from-cyan-500/20 hover:to-purple-600/20 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-400 hover:text-cyan-300 rounded-lg transition-all text-sm font-semibold group/btn"
        >
          <BookOpen className="w-4 h-4" />
          <span>Read Full Tutorial</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
      </div>
    </>
  );
}
