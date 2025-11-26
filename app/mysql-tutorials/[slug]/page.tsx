import { mysqlTutorials } from "@/lib/topics/mysqlTutorials";
import fs from "fs";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Code2,
  Database,
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
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  return mysqlTutorials.map((tutorial) => ({
    slug: tutorial.slug,
  }));
}

export default async function MySQLTutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tutorial = mysqlTutorials.find((t) => t.slug === slug);

  if (!tutorial) {
    notFound();
  }

  // Read markdown file
  const markdownPath = path.join(
    process.cwd(),
    "lib",
    "markdown",
    "mysql",
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
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/mysql-tutorials"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-orange-400 mb-3 transition-all duration-300 group"
          >
            <ArrowLeft className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to MySQL Tutorials
          </Link>

          {/* Compact Tutorial Header */}
          <div className="flex items-start gap-3">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg blur-md opacity-40" />
              <div className="relative p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/30">
                <Database className="h-5 w-5 text-orange-400" />
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
                  <Clock className="h-3 w-3 text-orange-400" />
                  {tutorial.readTime}
                </div>

                <span className="text-[10px] px-2 py-1 rounded bg-orange-500/10 border border-orange-500/30 text-orange-300 font-medium capitalize">
                  {tutorial.category}
                </span>

                {/* Tags */}
                {tutorial.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-1 rounded bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
                {tutorial.tags.length > 2 && (
                  <span className="text-[10px] text-gray-500">
                    +{tutorial.tags.length - 2} more
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
            <div className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/30 shrink-0">
              <Target className="h-5 w-5 text-orange-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">
                Goal
              </p>
              <p className="text-sm font-bold text-white truncate">
                Master MySQL
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-yellow-500/10 border border-yellow-500/30 shrink-0">
              <TrendingUp className="h-5 w-5 text-yellow-400" />
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
                {tutorial.readTime}
              </p>
            </div>
          </div>
        </div>

        {/* Markdown Content with Enhanced Styling */}
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              // Let ALL raw HTML pass through unchanged
              div: (props: any) => <div {...props} />,
              span: (props: any) => <span {...props} />,
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");

                return !inline && match ? (
                  <div className="my-6 rounded-xl overflow-hidden border border-gray-700/50 shadow-2xl shadow-black/20">
                    <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 px-4 py-2.5 border-b border-gray-700 flex items-center justify-between backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <Code2 className="h-4 w-4 text-orange-400" />
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
                    className="bg-orange-500/10 text-orange-300 px-2 py-0.5 rounded border border-orange-500/20 text-sm font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              h1: ({ node, ...props }: any) => {
                // Only apply custom styling if it's plain markdown (no style/class attributes)
                if (
                  !props.style &&
                  !props.className &&
                  Object.keys(props).filter(
                    (k) => k !== "children" && k !== "node"
                  ).length === 0
                ) {
                  return (
                    <h1 className="text-3xl font-bold text-white mb-6 mt-10 flex items-center gap-3 pb-3 border-b-2 border-orange-500/30">
                      <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/30">
                        <BookOpen className="h-6 w-6 text-orange-400" />
                      </div>
                      {props.children}
                    </h1>
                  );
                }
                return <h1 {...props} />;
              },
              h2: ({ node, ...props }: any) => {
                // Only apply custom styling if it's plain markdown
                if (
                  !props.style &&
                  !props.className &&
                  Object.keys(props).filter(
                    (k) => k !== "children" && k !== "node"
                  ).length === 0
                ) {
                  const text = String(props.children);
                  const isQuestion =
                    text.toLowerCase().includes("question") ||
                    text.toLowerCase().includes("introduction") ||
                    text.toLowerCase().includes("understanding") ||
                    text.toLowerCase().includes("overview") ||
                    text.toLowerCase().includes("what is");

                  if (isQuestion) {
                    return (
                      <div className="mt-10 mb-6 p-5 rounded-xl bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-l-4 border-orange-500 shadow-lg shadow-orange-500/10">
                        <h2 className="text-2xl font-bold text-orange-300 flex items-center gap-3 m-0">
                          <div className="p-2 rounded-lg bg-orange-500/20 border border-orange-500/40">
                            <Rocket className="h-5 w-5 text-orange-400" />
                          </div>
                          {props.children}
                        </h2>
                      </div>
                    );
                  }

                  return (
                    <h2 className="text-2xl font-bold text-white mb-4 mt-8 pb-3 border-b border-gray-700 flex items-center gap-2">
                      <Rocket className="h-5 w-5 text-orange-400" />
                      {props.children}
                    </h2>
                  );
                }
                return <h2 {...props} />;
              },
              h3: ({ node, ...props }: any) => {
                // Only apply custom styling if it's plain markdown
                if (
                  !props.style &&
                  !props.className &&
                  Object.keys(props).filter(
                    (k) => k !== "children" && k !== "node"
                  ).length === 0
                ) {
                  return (
                    <h3 className="text-xl font-semibold text-white mb-4 mt-8 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-400" />
                      {props.children}
                    </h3>
                  );
                }
                return <h3 {...props} />;
              },
              h4: ({ node, ...props }: any) => {
                // Only apply custom styling if it's plain markdown
                if (
                  !props.style &&
                  !props.className &&
                  Object.keys(props).filter(
                    (k) => k !== "children" && k !== "node"
                  ).length === 0
                ) {
                  return (
                    <h4
                      className="text-lg font-semibold text-white mb-3 mt-6"
                      {...props}
                    />
                  );
                }
                return <h4 {...props} />;
              },
              h5: ({ node, ...props }: any) => {
                // Only apply custom styling if it's plain markdown
                if (
                  !props.style &&
                  !props.className &&
                  Object.keys(props).filter(
                    (k) => k !== "children" && k !== "node"
                  ).length === 0
                ) {
                  return (
                    <h5
                      className="text-base font-semibold text-white mb-2 mt-4"
                      {...props}
                    />
                  );
                }
                return <h5 {...props} />;
              },
              p: ({ node, ...props }: any) => {
                // Only apply custom styling if it's plain markdown
                if (
                  !props.style &&
                  !props.className &&
                  Object.keys(props).filter(
                    (k) => k !== "children" && k !== "node"
                  ).length === 0
                ) {
                  return (
                    <p className="text-gray-300 text-base leading-relaxed mb-4">
                      {props.children}
                    </p>
                  );
                }
                return <p {...props} />;
              },
              ul: ({ node, ...props }: any) => {
                // Only apply custom styling if it's plain markdown
                if (
                  !props.style &&
                  !props.className &&
                  Object.keys(props).filter(
                    (k) => k !== "children" && k !== "node"
                  ).length === 0
                ) {
                  return (
                    <ul className="list-disc list-outside text-gray-300 text-base space-y-2 mb-5 ml-6 pl-2">
                      {props.children}
                    </ul>
                  );
                }
                return <ul {...props} />;
              },
              ol: ({ node, ...props }: any) => {
                // Only apply custom styling if it's plain markdown
                if (
                  !props.style &&
                  !props.className &&
                  Object.keys(props).filter(
                    (k) => k !== "children" && k !== "node"
                  ).length === 0
                ) {
                  return (
                    <ol className="list-decimal list-outside text-gray-300 text-base space-y-2 mb-5 ml-6 pl-2">
                      {props.children}
                    </ol>
                  );
                }
                return <ol {...props} />;
              },
              li: ({ node, ...props }: any) => {
                // Only apply custom styling if it's plain markdown
                if (
                  !props.style &&
                  !props.className &&
                  Object.keys(props).filter(
                    (k) => k !== "children" && k !== "node"
                  ).length === 0
                ) {
                  return (
                    <li className="text-gray-300 text-base leading-relaxed pl-2">
                      {props.children}
                    </li>
                  );
                }
                return <li {...props} />;
              },
              strong: ({ node, ...props }: any) => {
                // Only apply custom styling if it's plain markdown
                if (
                  !props.style &&
                  !props.className &&
                  Object.keys(props).filter(
                    (k) => k !== "children" && k !== "node"
                  ).length === 0
                ) {
                  return (
                    <strong className="text-white font-bold">
                      {props.children}
                    </strong>
                  );
                }
                return <strong {...props} />;
              },
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-orange-500 bg-gradient-to-r from-orange-500/10 to-transparent pl-5 py-4 my-6 italic text-gray-200 text-base rounded-r-xl shadow-lg shadow-orange-500/5">
                  {children}
                </blockquote>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              table: ({ node, ...props }: any) => {
                // Only apply custom styling if it's plain markdown
                if (
                  !props.style &&
                  !props.className &&
                  Object.keys(props).filter(
                    (k) => k !== "children" && k !== "node"
                  ).length === 0
                ) {
                  return (
                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full border border-gray-700/50 rounded-lg overflow-hidden text-sm shadow-lg">
                        {props.children}
                      </table>
                    </div>
                  );
                }
                return <table {...props} />;
              },
              thead: ({ node, ...props }: any) => {
                // Only apply custom styling if it's plain markdown
                if (
                  !props.style &&
                  !props.className &&
                  Object.keys(props).filter(
                    (k) => k !== "children" && k !== "node"
                  ).length === 0
                ) {
                  return (
                    <thead className="bg-gray-800/80">{props.children}</thead>
                  );
                }
                return <thead {...props} />;
              },
              tbody: ({ node, ...props }: any) => {
                // Only apply custom styling if it's plain markdown
                if (
                  !props.style &&
                  !props.className &&
                  Object.keys(props).filter(
                    (k) => k !== "children" && k !== "node"
                  ).length === 0
                ) {
                  return (
                    <tbody className="divide-y divide-gray-700/50">
                      {props.children}
                    </tbody>
                  );
                }
                return <tbody {...props} />;
              },
              tr: ({ node, ...props }: any) => {
                // Only apply custom styling if it's plain markdown
                if (
                  !props.style &&
                  !props.className &&
                  Object.keys(props).filter(
                    (k) => k !== "children" && k !== "node"
                  ).length === 0
                ) {
                  return (
                    <tr className="hover:bg-gray-800/30 transition-colors">
                      {props.children}
                    </tr>
                  );
                }
                return <tr {...props} />;
              },
              th: ({ node, ...props }: any) => {
                // Only apply custom styling if it's plain markdown
                if (
                  !props.style &&
                  !props.className &&
                  Object.keys(props).filter(
                    (k) => k !== "children" && k !== "node"
                  ).length === 0
                ) {
                  return (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-orange-400 border-b border-gray-700">
                      {props.children}
                    </th>
                  );
                }
                return <th {...props} />;
              },
              td: ({ node, ...props }: any) => {
                // Only apply custom styling if it's plain markdown
                if (
                  !props.style &&
                  !props.className &&
                  Object.keys(props).filter(
                    (k) => k !== "children" && k !== "node"
                  ).length === 0
                ) {
                  return (
                    <td className="px-4 py-3 text-sm text-gray-300 border-b border-gray-800/50">
                      {props.children}
                    </td>
                  );
                }
                return <td {...props} />;
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Navigation Footer - Next/Previous Articles */}
        <div className="mt-12 pt-8 border-t border-gray-800/50">
          {/* Next/Previous Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Previous Article */}
            {(() => {
              const currentIndex = mysqlTutorials.findIndex(
                (t) => t.slug === slug
              );
              const previousTutorial =
                currentIndex > 0 ? mysqlTutorials[currentIndex - 1] : null;

              return previousTutorial ? (
                <Link
                  href={`/mysql-tutorials/${previousTutorial.slug}`}
                  className="group flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10"
                >
                  <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/30 shrink-0 group-hover:bg-orange-500/20 transition-colors">
                    <ArrowLeft className="h-4 w-4 text-orange-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                      Previous
                    </p>
                    <p className="text-sm font-semibold text-white truncate group-hover:text-orange-400 transition-colors">
                      {previousTutorial.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="p-4 rounded-xl bg-gray-900/30 border border-gray-800/50 opacity-50">
                  <p className="text-xs text-gray-600">No previous tutorial</p>
                </div>
              );
            })()}

            {/* Next Article */}
            {(() => {
              const currentIndex = mysqlTutorials.findIndex(
                (t) => t.slug === slug
              );
              const nextTutorial =
                currentIndex < mysqlTutorials.length - 1
                  ? mysqlTutorials[currentIndex + 1]
                  : null;

              return nextTutorial ? (
                <Link
                  href={`/mysql-tutorials/${nextTutorial.slug}`}
                  className="group flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10"
                >
                  <div className="flex-1 min-w-0 text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                      Next
                    </p>
                    <p className="text-sm font-semibold text-white truncate group-hover:text-orange-400 transition-colors">
                      {nextTutorial.title}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/30 shrink-0 group-hover:bg-orange-500/20 transition-colors">
                    <ArrowLeft className="h-4 w-4 text-orange-400 rotate-180" />
                  </div>
                </Link>
              ) : (
                <div className="p-4 rounded-xl bg-gray-900/30 border border-gray-800/50 opacity-50 text-right">
                  <p className="text-xs text-gray-600">No next tutorial</p>
                </div>
              );
            })()}
          </div>

          {/* Back to All Tutorials */}
          <div className="text-center">
            <Link
              href="/mysql-tutorials"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 text-orange-400 text-sm font-medium hover:from-orange-500/20 hover:to-yellow-500/20 transition-all duration-300 group shadow-lg shadow-orange-500/5"
            >
              <Database className="h-4 w-4" />
              View All MySQL Tutorials
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/30">
                {mysqlTutorials.length}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
