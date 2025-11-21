import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

  const basePath =
    category === "High-Level Design"
      ? "/system-design/hld"
      : "/system-design/lld";

  return (
    <Link
      href={`${basePath}/${slug}`}
      className="group relative flex flex-col gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-all hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-emerald-400 transition-colors">
          {title}
        </h3>
        <div className="flex-shrink-0 rounded-full bg-emerald-500/10 p-2 transition-all group-hover:bg-emerald-500/20 group-hover:scale-110">
          <ArrowRight className="h-4 w-4 text-emerald-400 transition-transform group-hover:translate-x-1" />
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-sm ${
                i < Math.floor(rating) ? "text-yellow-400" : "text-gray-700"
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <span className="text-sm font-medium text-gray-400">
          {rating.toFixed(1)}
        </span>
      </div>

      {/* Difficulty Badge */}
      <div className="inline-flex items-center gap-2 self-start">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${difficultyInfo.color}`}
        >
          <span>{difficultyInfo.emoji}</span>
          <span>{difficultyInfo.label}</span>
        </span>
      </div>

      {/* Company Tags */}
      <div className="flex flex-wrap gap-2">
        {displayCompanies.map((company) => (
          <span
            key={company}
            className="inline-flex items-center rounded-full bg-gray-800 border border-gray-700 px-3 py-1 text-xs font-medium text-gray-300 group-hover:border-emerald-500/30 transition-colors"
          >
            {company}
          </span>
        ))}
        {hasMoreCompanies && (
          <span className="inline-flex items-center rounded-full bg-gray-800 border border-gray-700 px-3 py-1 text-xs font-medium text-gray-500">
            +{companies.length - 2} more
          </span>
        )}
      </div>

      {/* Category Label */}
      <div className="mt-auto pt-2">
        <span className="text-xs font-medium text-gray-500">{category}</span>
      </div>
    </Link>
  );
}
