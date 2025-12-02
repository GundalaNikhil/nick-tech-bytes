"use client";

import { useState } from "react";
import { BookOpen, Clock, Star, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/AuthModal";
import { useRouter } from "next/navigation";

interface SpringBootTutorialCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  slug: string;
  estimatedTime: string;
  rating: number;
}

const difficultyConfig = {
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

const categoryColors: Record<string, string> = {
  foundational: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  configuration: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  web: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  data: "bg-green-500/10 text-green-400 border-green-500/20",
  testing: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  monitoring: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  advanced: "bg-red-500/10 text-red-400 border-red-500/20",
  production: "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

export function SpringBootTutorialCard({
  id,
  title,
  description,
  category,
  difficulty,
  slug,
  estimatedTime,
  rating,
}: SpringBootTutorialCardProps) {
  const difficultyInfo = difficultyConfig[difficulty];
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();

  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      router.push(`/spring-boot/${slug}`);
    }
  };

  return (
    <>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="🍃 Unlock This Tutorial!"
        message="Sign in to access this Spring Boot tutorial and master enterprise Java development!"
      />
      <div className="group relative flex flex-col rounded-lg border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-900/40 p-4 transition-all duration-300 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 backdrop-blur-sm hover:scale-[1.01]">
        {/* Gradient overlay on hover */}
        <div
          className={`absolute inset-0 rounded-lg bg-gradient-to-br ${difficultyInfo.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
        />

        <div className="relative z-10 flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono text-gray-500">#{id}</span>
              </div>
              <h3 className="text-base font-semibold text-white mb-1.5 line-clamp-2 group-hover:text-green-400 transition-colors leading-snug">
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

          {/* Description */}
          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Meta Row */}
          <div className="flex items-center justify-between gap-3 text-[11px] text-gray-500 py-2 border-y border-gray-800/50">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-green-400" />
                <span className="text-gray-400">{estimatedTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                <span className="text-gray-400 font-medium">
                  {rating.toFixed(1)}
                </span>
              </div>
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded border font-medium capitalize ${
                categoryColors[category] || categoryColors.foundational
              }`}
            >
              {category}
            </span>
          </div>

          {/* Read More Button */}
          <button
            onClick={handleReadMore}
            className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500/10 to-emerald-600/10 hover:from-green-500/20 hover:to-emerald-600/20 border border-green-500/30 hover:border-green-500/50 text-green-400 hover:text-green-300 rounded-lg transition-all text-sm font-semibold group/btn"
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
