import Link from "next/link";
import { ArrowRight, Clock, Code2, Star, TrendingUp } from "lucide-react";
import type { DifficultyLevel } from "@/lib/topics/reactTutorials";

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

  return (
    <Link
      href={`/react-tutorials/${slug}`}
      className="group relative flex flex-col gap-4 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-900/40 p-6 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 backdrop-blur-sm hover:scale-[1.02]"
    >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${difficultyInfo.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
      />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Header with difficulty badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
              {title}
            </h3>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${difficultyInfo.color}`}
            >
              <span>{difficultyInfo.emoji}</span>
              <span>{difficultyInfo.label}</span>
            </span>
          </div>
          <div className="flex-shrink-0 rounded-full bg-cyan-500/10 p-2.5 transition-all duration-300 group-hover:bg-cyan-500/20 group-hover:scale-110 group-hover:rotate-12">
            <ArrowRight className="h-4 w-4 text-cyan-400 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Meta information */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            <span>{estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-gray-400 font-medium">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-md bg-gray-800/50 px-2 py-1 text-xs text-gray-400 border border-gray-700/50"
            >
              <Code2 className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>

        {/* Company Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-800/50">
          <TrendingUp className="h-3.5 w-3.5 text-purple-400" />
          {displayCompanies.map((company) => (
            <span
              key={company}
              className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-300 border border-purple-500/20"
            >
              {company}
            </span>
          ))}
          {hasMoreCompanies && (
            <span className="text-xs text-gray-500">
              +{companies.length - 3} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
