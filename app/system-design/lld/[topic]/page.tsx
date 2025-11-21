import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { lldTopics } from "@/lib/topics/systemDesignTopics";
import { ArrowLeft, Clock, Star, Building2 } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return lldTopics.map((topic) => ({
    topic: topic.slug,
  }));
}

export default async function LLDTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: topicSlug } = await params;
  const topic = lldTopics.find((t) => t.slug === topicSlug);

  if (!topic) {
    notFound();
  }

  // Read markdown file
  const markdownPath = path.join(
    process.cwd(),
    "lib",
    "markdown",
    "system-design",
    "lld",
    `${topicSlug}.md`
  );

  let content = "";
  try {
    content = fs.readFileSync(markdownPath, "utf-8");
  } catch (error) {
    content = `# ${topic.title}\n\nContent coming soon...`;
  }

  const difficultyColors = {
    beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    intermediate: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    advanced: 'bg-red-500/10 text-red-400 border-red-500/30',
  };

  const difficultyEmojis = {
    beginner: '🌱',
    intermediate: '⚡',
    advanced: '🔥',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/system-design"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 mb-6 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to System Design
          </Link>

          <h1 className="text-4xl font-bold text-white mb-4">{topic.title}</h1>

          <div className="flex flex-wrap gap-3 items-center">
            {/* Difficulty Badge */}
            <span
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium ${
                difficultyColors[topic.difficulty]
              }`}
            >
              <span>{difficultyEmojis[topic.difficulty]}</span>
              <span className="capitalize">{topic.difficulty}</span>
            </span>

            {/* Rating */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-700 bg-gray-800/50">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-gray-300">{topic.rating}</span>
            </div>

            {/* Category */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-700 bg-gray-800/50">
              <Building2 className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-300">{topic.category}</span>
            </div>
          </div>

          {/* Companies */}
          <div className="mt-6">
            <p className="text-sm text-gray-400 mb-2">Asked by:</p>
            <div className="flex flex-wrap gap-2">
              {topic.companies.map((company) => (
                <span
                  key={company}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-medium border border-cyan-500/30"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <article className="prose prose-invert prose-cyan max-w-none prose-headings:scroll-mt-20 prose-h1:text-3xl prose-h1:text-cyan-400 prose-h2:text-2xl prose-h2:text-white prose-h2:border-b prose-h2:border-gray-800 prose-h2:pb-2 prose-h2:mt-12 prose-h3:text-xl prose-h3:text-gray-200 prose-p:text-gray-300 prose-strong:text-white prose-code:text-cyan-400 prose-code:bg-gray-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-950 prose-pre:border prose-pre:border-gray-800 prose-pre:rounded-xl prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300 prose-li:text-gray-300 prose-table:border-gray-800 prose-th:border-gray-700 prose-td:border-gray-700 prose-th:bg-gray-800/50 prose-blockquote:border-cyan-500/50 prose-blockquote:text-gray-400">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus as any}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-xl bg-gray-950! border border-gray-800"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-gray-800/50 px-1.5 py-0.5 rounded text-sm font-mono text-cyan-400" {...props}>
                    {children}
                  </code>
                );
              },
              table({ children }) {
                return (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700 border border-gray-800 rounded-lg">{children}</table>
                  </div>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
