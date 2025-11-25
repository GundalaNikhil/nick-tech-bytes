import { dockerTutorials } from "@/lib/topics/dockerTutorials";
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
  Boxes,
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
  return dockerTutorials.map((tutorial) => ({
    slug: tutorial.slug,
  }));
}

export default async function DockerTutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tutorial = dockerTutorials.find((t) => t.slug === slug);

  if (!tutorial) {
    notFound();
  }

  // Read markdown file
  const markdownPath = path.join(
    process.cwd(),
    "lib",
    "markdown",
    "docker",
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
            href="/docker-tutorials"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 mb-6 transition-all duration-300 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Docker Tutorials
          </Link>

          {/* Tutorial Header */}
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4 flex-wrap">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl blur-lg opacity-50" />
                <div className="relative p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                  <Boxes className="h-10 w-10 text-cyan-400" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                  {tutorial.title}
                </h1>
                <p className="text-gray-400 text-lg mb-4">
                  {tutorial.description}
                </p>

                {/* Badges and Info */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold border shadow-lg transition-all hover:scale-105 ${
                      difficultyColors[tutorial.difficulty]
                    }`}
                  >
                    <span>{difficultyEmojis[tutorial.difficulty]}</span>
                    <span className="capitalize">{tutorial.difficulty}</span>
                  </span>

                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-300 font-medium">
                    <Clock className="h-4 w-4 text-cyan-400" />
                    {tutorial.estimatedTime}
                  </div>

                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 font-medium">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    {tutorial.rating}
                  </div>
                </div>

                {/* Companies */}
                <div className="flex flex-wrap gap-2">
                  {tutorial.companies.map((company) => (
                    <span
                      key={company}
                      className="text-xs px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-medium"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-cyan-400" />
              <span className="text-xs text-gray-400">Learning Goal</span>
            </div>
            <p className="text-sm font-semibold text-white">Master Docker</p>
          </div>
          <div className="rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-purple-400" />
              <span className="text-xs text-gray-400">Level</span>
            </div>
            <p className="text-sm font-semibold text-white capitalize">
              {tutorial.difficulty}
            </p>
          </div>
          <div className="rounded-lg bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-4 w-4 text-emerald-400" />
              <span className="text-xs text-gray-400">Duration</span>
            </div>
            <p className="text-sm font-semibold text-white">
              {tutorial.estimatedTime}
            </p>
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
            href="/docker-tutorials"
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
