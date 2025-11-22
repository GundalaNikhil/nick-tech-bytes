import { reactTutorials } from "@/lib/topics/reactTutorials";
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
      {/* Hero Header */}
      <div className="relative border-b border-gray-800/50 bg-gradient-to-r from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/react-tutorials"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 mb-6 transition-all duration-300 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to React Tutorials
          </Link>

          {/* Tutorial Header */}
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4 flex-wrap">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl blur-lg opacity-50" />
                <div className="relative p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                  <Code2 className="h-10 w-10 text-cyan-400" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                  {tutorial.title}
                </h1>
                <p className="text-gray-400 text-lg mb-4">
                  {tutorial.description}
                </p>

                {/* Meta Information Bar */}
                <div className="flex flex-wrap items-center gap-4">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border shadow-lg ${
                      difficultyColors[tutorial.difficulty]
                    }`}
                  >
                    <span className="text-lg">
                      {difficultyEmojis[tutorial.difficulty]}
                    </span>
                    <span className="capitalize">{tutorial.difficulty}</span>
                  </span>

                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
                    <Clock className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm text-gray-300">
                      {tutorial.estimatedTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-semibold text-gray-300">
                      {tutorial.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags and Companies */}
            <div className="flex flex-col gap-4 p-6 rounded-xl bg-gray-800/30 border border-gray-700/50 backdrop-blur-sm">
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2">
                <Target className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <span className="text-sm text-gray-400 font-medium">
                  Key Topics:
                </span>
                {tutorial.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-md bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300 border border-cyan-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Companies */}
              <div className="flex flex-wrap items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-400 flex-shrink-0" />
                <span className="text-sm text-gray-400 font-medium">
                  Asked by:
                </span>
                {tutorial.companies.map((company) => (
                  <span
                    key={company}
                    className="inline-flex items-center rounded-md bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300 border border-purple-500/20"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Tutorial Content */}
        <div className="prose prose-invert prose-cyan max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold text-white mb-6 mt-8 flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-cyan-400" />
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-bold text-white mb-4 mt-12 pb-3 border-b border-gray-800 flex items-center gap-3">
                  <Rocket className="h-7 w-7 text-cyan-400" />
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-semibold text-white mb-3 mt-8 flex items-center gap-2">
                  <Zap className="h-6 w-6 text-purple-400" />
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-xl font-semibold text-gray-200 mb-2 mt-6 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  {children}
                </h4>
              ),
              p: ({ children }) => (
                <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
              ),
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <div className="my-6 rounded-lg overflow-hidden border border-gray-800 shadow-2xl">
                    <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
                      <span className="text-xs font-mono text-gray-400 uppercase">
                        {match[1]}
                      </span>
                      <Code2 className="h-4 w-4 text-cyan-400" />
                    </div>
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        padding: "1.5rem",
                        background: "rgba(17, 24, 39, 0.5)",
                        fontSize: "0.875rem",
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code
                    className="bg-cyan-500/10 text-cyan-300 px-2 py-1 rounded border border-cyan-500/20 text-sm font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4 ml-4">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-300 leading-relaxed">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-cyan-500 bg-cyan-500/5 pl-4 py-3 my-4 italic text-gray-300 rounded-r-lg">
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
                <div className="overflow-x-auto my-6">
                  <table className="min-w-full border border-gray-800 rounded-lg overflow-hidden">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-gray-800/50">{children}</thead>
              ),
              th: ({ children }) => (
                <th className="px-4 py-3 text-left text-sm font-semibold text-cyan-400 border-b border-gray-700">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-4 py-3 text-sm text-gray-300 border-b border-gray-800">
                  {children}
                </td>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Navigation Footer */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <Link
            href="/react-tutorials"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-cyan-400 hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to All Tutorials
          </Link>
        </div>
      </div>
    </div>
  );
}
