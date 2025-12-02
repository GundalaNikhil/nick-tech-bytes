import { reactTutorials } from "@/lib/topics/reactTutorials";
import { ReactIcon } from "@/components/icons";
import { TutorialContent } from "@/components/TutorialContent";
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
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkGfm from "remark-gfm";

// Allow inline styles and additional attributes for HTML rendering
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    div: [...(defaultSchema.attributes?.div || []), ["style"], ["className"]],
    table: [
      ...(defaultSchema.attributes?.table || []),
      ["style"],
      ["className"],
    ],
    thead: [...(defaultSchema.attributes?.thead || []), ["style"]],
    tbody: [...(defaultSchema.attributes?.tbody || []), ["style"]],
    tr: [...(defaultSchema.attributes?.tr || []), ["style"]],
    th: [...(defaultSchema.attributes?.th || []), ["style"]],
    td: [...(defaultSchema.attributes?.td || []), ["style"]],
    span: [...(defaultSchema.attributes?.span || []), ["style"]],
    ul: [...(defaultSchema.attributes?.ul || []), ["style"]],
    li: [...(defaultSchema.attributes?.li || []), ["style"]],
    h3: [...(defaultSchema.attributes?.h3 || []), ["style"]],
    h4: [...(defaultSchema.attributes?.h4 || []), ["style"]],
  },
};

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
    <TutorialContent tutorialTitle={tutorial.title}>
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
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Enhanced Quick Insights with Box Shadow */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 p-5 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 shadow-2xl shadow-black/20">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 shrink-0">
                <Target className="h-5 w-5 text-cyan-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">
                  Goal
                </p>
                <p className="text-sm font-bold text-white truncate">
                  Master React
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/30 shrink-0">
                <TrendingUp className="h-5 w-5 text-purple-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">
                  Level
                </p>
                <p className="text-sm font-bold text-white capitalize truncate">
                  {tutorial.difficulty}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 shrink-0">
                <Lightbulb className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">
                  Time
                </p>
                <p className="text-sm font-bold text-white truncate">
                  {tutorial.estimatedTime}
                </p>
              </div>
            </div>
          </div>

          {/* Markdown Content with Enhanced Styling */}
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <div className="my-6 rounded-xl overflow-hidden border border-gray-700/50 shadow-2xl shadow-black/20">
                      <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 px-4 py-2.5 border-b border-gray-700 flex items-center justify-between backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <Code2 className="h-4 w-4 text-cyan-400" />
                          <span className="text-xs font-mono text-gray-300 uppercase tracking-wider">
                            {match[1]}
                          </span>
                        </div>
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500/60" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                          <div className="w-3 h-3 rounded-full bg-green-500/60" />
                        </div>
                      </div>
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          padding: "1.5rem",
                          background: "rgba(17, 24, 39, 0.6)",
                          fontSize: "0.875rem",
                        }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code
                      className="bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/20 text-sm font-mono"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-white mb-6 mt-10 flex items-center gap-3 pb-3 border-b-2 border-cyan-500/30">
                    <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                      <BookOpen className="h-6 w-6 text-cyan-400" />
                    </div>
                    {children}
                  </h1>
                ),
                h2: ({ children }) => {
                  const text = String(children);
                  const isQuestion =
                    text.toLowerCase().includes("question") ||
                    text.toLowerCase().includes("introduction") ||
                    text.toLowerCase().includes("understanding") ||
                    text.toLowerCase().includes("how to solve") ||
                    text.toLowerCase().includes("visual representation") ||
                    text.toLowerCase().includes("what are we trying");

                  if (isQuestion) {
                    return (
                      <div className="mt-10 mb-6 p-5 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-l-4 border-cyan-500 shadow-lg shadow-cyan-500/10">
                        <h2 className="text-2xl font-bold text-cyan-300 flex items-center gap-3 m-0">
                          <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40">
                            <Rocket className="h-5 w-5 text-cyan-400" />
                          </div>
                          {children}
                        </h2>
                      </div>
                    );
                  }

                  return (
                    <h2 className="text-2xl font-bold text-white mb-4 mt-8 pb-3 border-b border-gray-700 flex items-center gap-2">
                      <Rocket className="h-5 w-5 text-cyan-400" />
                      {children}
                    </h2>
                  );
                },
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold text-white mb-4 mt-8 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-purple-400" />
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-lg font-semibold text-gray-200 mb-3 mt-6 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-400" />
                    {children}
                  </h4>
                ),
                p: ({ children }) => {
                  const text = String(children);
                  const isImportant =
                    text
                      .toLowerCase()
                      .startsWith("what we're trying to achieve") ||
                    text.toLowerCase().startsWith("goal/aim") ||
                    text.toLowerCase().startsWith("we need to understand") ||
                    text.toLowerCase().startsWith("the problem") ||
                    text.toLowerCase().includes("react is") ||
                    text.toLowerCase().includes("key concept") ||
                    (text.includes("✅") && text.split("\n").length > 1) ||
                    (text.includes("❌") && text.split("\n").length > 1);

                  if (isImportant) {
                    return (
                      <div className="my-5 p-5 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 shadow-lg shadow-black/10">
                        <p className="text-gray-100 text-base leading-relaxed m-0">
                          {children}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <p className="text-gray-300 text-base leading-relaxed mb-4">
                      {children}
                    </p>
                  );
                },
                ul: ({ children }) => (
                  <ul className="list-disc list-outside text-gray-300 text-base space-y-2 mb-5 ml-6 pl-2">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-outside text-gray-300 text-base space-y-2 mb-5 ml-6 pl-2">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-gray-300 text-base leading-relaxed pl-2">
                    {children}
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="text-white font-bold">{children}</strong>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-cyan-500 bg-gradient-to-r from-cyan-500/10 to-transparent pl-5 py-4 my-6 italic text-gray-200 text-base rounded-r-xl shadow-lg shadow-cyan-500/5">
                    {children}
                  </blockquote>
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
                    <table className="min-w-full border border-gray-700/50 rounded-lg overflow-hidden text-sm shadow-lg">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-gray-800/80">{children}</thead>
                ),
                tbody: ({ children }) => (
                  <tbody className="divide-y divide-gray-700/50">
                    {children}
                  </tbody>
                ),
                tr: ({ children }) => (
                  <tr className="hover:bg-gray-800/30 transition-colors">
                    {children}
                  </tr>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-3 text-left text-xs font-semibold text-cyan-400 border-b border-gray-700">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-3 text-sm text-gray-300 border-b border-gray-800/50">
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
    </TutorialContent>
  );
}
