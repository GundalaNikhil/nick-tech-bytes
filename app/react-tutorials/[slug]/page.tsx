import { reactTutorials } from "@/lib/topics/reactTutorials";
import { ReactIcon } from "@/components/icons";
import fs from "fs";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Code2,
  Lightbulb,
  Rocket,
  Star,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  return reactTutorials.map((tutorial) => ({
    slug: tutorial.slug,
  }));
}

export default async function ReactTutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tutorial = reactTutorials.find((t) => t.slug === slug);

  if (!tutorial) {
    notFound();
  }

  // Read markdown file
  const markdownPath = path.join(
    process.cwd(),
    "lib",
    "markdown",
    "react",
    `${slug}.md`
  );

  let content = "";
  try {
    content = fs.readFileSync(markdownPath, "utf-8");
  } catch (error) {
    content = `# ${tutorial.title}\n\nContent coming soon...`;
  }

  const difficultyColors = {
    beginner:
      "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-emerald-500/10",
    intermediate:
      "bg-yellow-500/15 text-yellow-300 border-yellow-500/30 shadow-yellow-500/10",
    advanced: "bg-red-500/15 text-red-300 border-red-500/30 shadow-red-500/10",
  };

  const difficultyEmojis = {
    beginner: "🌱",
    intermediate: "⚡",
    advanced: "🔥",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Compact Hero Header */}
      <div className="relative border-b border-gray-800/50 bg-gradient-to-r from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl sticky top-20 z-40">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/react-tutorials"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-cyan-400 mb-3 transition-all duration-300 group"
          >
            <ArrowLeft className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to React Tutorials
          </Link>

          {/* Compact Tutorial Header */}
          <div className="flex items-start gap-3">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg blur-md opacity-40" />
              <div className="relative p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                <ReactIcon className="h-5 w-5 text-cyan-400" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                {tutorial.title}
              </h1>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                {tutorial.description}
              </p>

              {/* Compact Badges and Info */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-semibold border ${
                    difficultyColors[tutorial.difficulty]
                  }`}
                >
                  <span>{difficultyEmojis[tutorial.difficulty]}</span>
                  <span className="capitalize">{tutorial.difficulty}</span>
                </span>

                <div className="flex items-center gap-1 px-2 py-1 rounded bg-gray-800/50 border border-gray-700/50 text-gray-300 text-[10px] font-medium">
                  <Clock className="h-3 w-3 text-cyan-400" />
                  {tutorial.estimatedTime}
                </div>

                <div className="flex items-center gap-1 px-2 py-1 rounded bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-[10px] font-medium">
                  <Star className="h-3 w-3 fill-yellow-400" />
                  {tutorial.rating}
                </div>

                {/* Compact Companies */}
                {tutorial.companies.slice(0, 3).map((company) => (
                  <span
                    key={company}
                    className="text-[10px] px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-medium"
                  >
                    {company}
                  </span>
                ))}
                {tutorial.companies.length > 3 && (
                  <span className="text-[10px] text-gray-500">
                    +{tutorial.companies.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Compact Quick Insights */}
        <div className="grid grid-cols-3 gap-3 mb-8 p-3 rounded-lg bg-gray-900/50 border border-gray-800">
          <div className="flex items-center gap-2">
            <Target className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-gray-500 uppercase tracking-wide">
                Goal
              </p>
              <p className="text-xs font-semibold text-white truncate">
                Master React
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5 text-purple-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-gray-500 uppercase tracking-wide">
                Level
              </p>
              <p className="text-xs font-semibold text-white capitalize truncate">
                {tutorial.difficulty}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-gray-500 uppercase tracking-wide">
                Time
              </p>
              <p className="text-xs font-semibold text-white truncate">
                {tutorial.estimatedTime}
              </p>
            </div>
          </div>
        </div>

        {/* Markdown Content */}
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <div className="my-4 rounded-lg overflow-hidden border border-gray-800 shadow-xl">
                    <div className="bg-gray-800/50 px-3 py-1.5 border-b border-gray-700 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-gray-400 uppercase">
                        {match[1]}
                      </span>
                      <Code2 className="h-3 w-3 text-cyan-400" />
                    </div>
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        padding: "1rem",
                        background: "rgba(17, 24, 39, 0.5)",
                        fontSize: "0.75rem",
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code
                    className="bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/20 text-xs font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold text-white mb-4 mt-6 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-cyan-400" />
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-bold text-white mb-3 mt-8 pb-2 border-b border-gray-800 flex items-center gap-2">
                  <Rocket className="h-4 w-4 text-cyan-400" />
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold text-white mb-2 mt-6 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-400" />
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-base font-semibold text-gray-200 mb-2 mt-4 flex items-center gap-1.5">
                  <Lightbulb className="h-3.5 w-3.5 text-yellow-400" />
                  {children}
                </h4>
              ),
              p: ({ children }) => (
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1.5 mb-3 ml-4">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside text-gray-300 text-sm space-y-1.5 mb-3 ml-4">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-300 text-sm leading-relaxed">
                  {children}
                </li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-cyan-500 bg-cyan-500/5 pl-3 py-2 my-3 italic text-gray-300 text-sm rounded-r-lg">
                  {children}
                </blockquote>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-cyan-400">
                  {children}
                </strong>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full border border-gray-800 rounded-lg overflow-hidden text-sm">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-gray-800/50">{children}</thead>
              ),
              th: ({ children }) => (
                <th className="px-3 py-2 text-left text-xs font-semibold text-cyan-400 border-b border-gray-700">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-3 py-2 text-xs text-gray-300 border-b border-gray-800">
                  {children}
                </td>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Navigation Footer */}
        <div className="mt-12 pt-6 border-t border-gray-800">
          <Link
            href="/react-tutorials"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-cyan-400 text-sm hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300 group"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to All Tutorials
          </Link>
        </div>
      </div>
    </div>
  );
}
