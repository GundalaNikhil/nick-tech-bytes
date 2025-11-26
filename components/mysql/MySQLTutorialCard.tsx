import Link from "next/link";
import { ArrowRight, Clock, Star } from "lucide-react";
import type { MySQLTutorial } from "@/lib/topics/mysqlTutorials";

interface MySQLTutorialCardProps {
  tutorial: MySQLTutorial;
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

const categoryConfig: Record<string, string> = {
  fundamentals: "📚",
  queries: "🔍",
  optimization: "⚡",
  architecture: "🏗️",
  practice: "💻",
};

export default function MySQLTutorialCard({
  tutorial,
}: MySQLTutorialCardProps) {
  const difficultyInfo = difficultyConfig[tutorial.difficulty];

  return (
    <Link
      href={`/mysql-tutorials/${tutorial.slug}`}
      className="group relative flex flex-col rounded-lg border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-900/40 p-4 transition-all duration-300 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 backdrop-blur-sm hover:scale-[1.01]"
    >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 rounded-lg bg-gradient-to-br ${difficultyInfo.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
      />

      <div className="relative z-10 flex flex-col gap-3">
        {/* Header - Compact */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-white mb-1.5 line-clamp-2 group-hover:text-orange-400 transition-colors leading-snug">
              {tutorial.title}
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
          {tutorial.description}
        </p>

        {/* Compact Meta Row */}
        <div className="flex items-center justify-between gap-3 text-[11px] text-gray-500 py-2 border-y border-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-orange-400" />
              <span className="text-gray-400">{tutorial.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-base">
                {categoryConfig[tutorial.category]}
              </span>
              <span className="text-gray-400 capitalize text-[10px]">
                {tutorial.category}
              </span>
            </div>
          </div>
        </div>

        {/* Tags - Compact */}
        <div className="flex flex-wrap gap-1">
          {tutorial.tags.slice(0, 3).map((tag, idx) => {
            const tagColors = [
              "bg-orange-500/10 text-orange-400 border-orange-500/20",
              "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
              "bg-amber-500/10 text-amber-400 border-amber-500/20",
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
          {tutorial.tags.length > 3 && (
            <span className="rounded bg-gray-800/50 px-1.5 py-0.5 text-[10px] text-gray-500 border border-gray-700/50">
              +{tutorial.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
