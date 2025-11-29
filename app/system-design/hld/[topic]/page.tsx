import {
  CollapsibleSection,
  ImagePlaceholder,
} from "@/components/system-design/MarkdownComponents";
import { hldTopics } from "@/lib/topics/systemDesignTopics";
import { TutorialContent } from "@/components/TutorialContent";
import fs from "fs";
import { ArrowLeft, BookOpen, Building2, Clock, Star, Zap } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

// Custom sanitize schema that allows inline styles
const customSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    div: [...(defaultSchema.attributes?.div || []), "style"],
    span: [...(defaultSchema.attributes?.span || []), "style"],
  },
};

export async function generateStaticParams() {
  return hldTopics.map((topic) => ({
    topic: topic.slug,
  }));
}

export default async function HLDTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: topicSlug } = await params;
  const topic = hldTopics.find((t) => t.slug === topicSlug);

  if (!topic) {
    notFound();
  }

  // Read markdown file
  const markdownPath = path.join(
    process.cwd(),
    "lib",
    "markdown",
    "system-design",
    "hld",
    `${topicSlug}.md`
  );

  let content = "";
  try {
    content = fs.readFileSync(markdownPath, "utf-8");
  } catch (error) {
    content = `# ${topic.title}\n\nContent coming soon...`;
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

  // Parse content into sections
  const sections = content.split(/\n## /);
  const overview = sections[0];
  const otherSections = sections
    .slice(1)
    .map((section) => {
      const [title, ...rest] = section.split("\n");
      return { title: title.trim(), content: rest.join("\n") };
    })
    .filter((section) => section.title.toLowerCase() !== "overview");

  return (
    <TutorialContent tutorialTitle={topic.title}>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        {/* Hero Header */}
        <div className="relative border-b border-gray-800/50 bg-gradient-to-r from-gray-900/95 via-gray-950/95 to-gray-900/95 backdrop-blur-xl">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <Link
              href="/system-design"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 mb-6 transition-all duration-300 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="group-hover:underline">
                Back to System Design
              </span>
            </Link>

            {/* Title Section */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4 backdrop-blur-sm">
                <BookOpen className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-medium text-emerald-400 tracking-wide">
                  High-Level Design
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 bg-clip-text text-transparent leading-tight">
                {topic.title}
              </h1>
            </div>

            {/* Metadata Bar */}
            <div className="flex flex-wrap gap-3 items-center mb-6">
              {/* Difficulty Badge */}
              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium shadow-lg transition-all duration-300 hover:scale-105 ${
                  difficultyColors[topic.difficulty]
                }`}
              >
                <span>{difficultyEmojis[topic.difficulty]}</span>
                <span className="capitalize">{topic.difficulty}</span>
              </span>

              {/* Rating */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm shadow-lg shadow-black/20 transition-all duration-300 hover:border-yellow-500/30">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium text-gray-200">
                  {topic.rating} Rating
                </span>
              </div>

              {/* Read Time */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm shadow-lg shadow-black/20">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-200">
                  15 min read
                </span>
              </div>
            </div>

            {/* Companies */}
            <div className="border-t border-gray-800/50 pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Building2 className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400">
                  Asked by Top Companies:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {topic.companies.map((company) => (
                  <span
                    key={company}
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500/10 to-blue-500/10 text-gray-200 text-sm font-medium border border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/20 transition-all duration-300 hover:scale-105 cursor-default shadow-lg shadow-black/10"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Overview Section (always visible) */}
          <div className="mb-8 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 backdrop-blur-sm shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Zap className="h-5 w-5 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Overview</h2>
            </div>
            <div className="mb-4 p-4 bg-blue-500/10 border-l-4 border-blue-500/50 rounded-r-lg backdrop-blur-sm">
              <p className="text-sm font-semibold text-blue-200 mb-1">
                Problem Context
              </p>
              <p className="text-sm text-gray-100 leading-relaxed">
                This high-level design question tests your ability to architect
                scalable distributed systems. Focus on defining components, data
                flow, and trade-offs while considering scalability, reliability,
                and performance.
              </p>
            </div>
            <article
              className="prose prose-invert max-w-none text-gray-100 p-6 rounded-xl bg-gray-800/30 border border-gray-700/30
            [&>*]:!text-gray-100 [&_*]:!text-gray-100
            prose-headings:!text-white prose-headings:font-bold
            prose-p:!text-gray-100 prose-p:leading-relaxed prose-p:text-base
            prose-strong:!text-white prose-strong:font-semibold
            prose-em:!text-emerald-300 prose-em:italic
            prose-code:!text-emerald-300 prose-code:bg-gray-800/80 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-['']
            prose-a:!text-emerald-400 prose-a:underline hover:prose-a:text-emerald-300
            prose-ul:!text-gray-100 prose-ul:my-4
            prose-ol:!text-gray-100 prose-ol:my-4
            prose-li:!text-gray-100 prose-li:my-2 prose-li:leading-relaxed
            prose-blockquote:border-l-4 prose-blockquote:border-emerald-500/50 prose-blockquote:bg-gray-800/30 prose-blockquote:!text-gray-100 prose-blockquote:italic prose-blockquote:pl-4 prose-blockquote:py-2
          "
            >
              <div className="text-gray-100 [&_*]:text-gray-100">
                <ReactMarkdown>{overview}</ReactMarkdown>
              </div>
            </article>
          </div>

          {/* Collapsible Sections */}
          <div className="space-y-6">
            {otherSections.map((section, idx) => (
              <CollapsibleSection
                key={idx}
                title={section.title}
                defaultOpen={idx < 2}
              >
                <article
                  className="prose prose-invert max-w-none text-gray-100 p-6 rounded-xl bg-gray-800/30 border border-gray-700/30
                [&>*]:!text-gray-100 [&_*]:!text-gray-100
                prose-headings:!text-white prose-headings:font-bold
                prose-h1:text-3xl prose-h1:!text-white prose-h1:border-b prose-h1:border-gray-700 prose-h1:pb-3
                prose-h2:text-2xl prose-h2:!text-gray-100 prose-h2:mt-8
                prose-h3:text-xl prose-h3:!text-gray-100 prose-h3:mt-6
                prose-h4:text-lg prose-h4:!text-gray-200
                prose-p:!text-gray-100 prose-p:leading-relaxed prose-p:text-base
                prose-strong:!text-white prose-strong:font-bold
                prose-em:!text-emerald-300 prose-em:italic
                prose-code:!text-emerald-300 prose-code:bg-gray-800/80 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-['']
                prose-pre:bg-gray-950 prose-pre:border prose-pre:border-gray-800 prose-pre:rounded-xl prose-pre:shadow-2xl prose-pre:!text-gray-100
                prose-a:!text-emerald-400 prose-a:underline hover:prose-a:text-emerald-300
                prose-ul:!text-gray-100 prose-ul:my-4 prose-ul:list-disc prose-ul:ml-6
                prose-ol:!text-gray-100 prose-ol:my-4 prose-ol:list-decimal prose-ol:ml-6
                prose-li:!text-gray-100 prose-li:my-2 prose-li:leading-relaxed
                prose-table:border-gray-700 prose-table:my-8
                prose-thead:bg-gray-800/50 prose-thead:border-b prose-thead:border-gray-700
                prose-th:border-gray-700 prose-th:p-4 prose-th:!text-emerald-300 prose-th:font-bold prose-th:text-left
                prose-td:border-gray-700 prose-td:p-4 prose-td:!text-gray-100
                prose-tr:border-b prose-tr:border-gray-800 hover:prose-tr:bg-gray-800/30
                prose-blockquote:border-l-4 prose-blockquote:border-emerald-500/50 prose-blockquote:bg-gray-800/30 prose-blockquote:!text-gray-100 prose-blockquote:italic prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:rounded-r-lg
                prose-img:rounded-xl prose-img:border prose-img:border-gray-800 prose-img:shadow-2xl
                "
                >
                  <div className="text-gray-100 [&_*]:text-gray-100">
                    <ReactMarkdown
                      rehypePlugins={[
                        rehypeRaw,
                        [rehypeSanitize, customSchema],
                      ]}
                      components={{
                        code({
                          node,
                          inline,
                          className,
                          children,
                          ...props
                        }: any) {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline && match ? (
                            <div className="relative group my-6">
                              <div className="absolute top-0 right-0 px-3 py-1.5 bg-gray-800/90 rounded-bl-lg rounded-tr-xl border-l border-b border-gray-700/50 backdrop-blur-sm">
                                <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
                                  {match[1]}
                                </span>
                              </div>
                              <SyntaxHighlighter
                                style={vscDarkPlus as any}
                                language={match[1]}
                                PreTag="div"
                                customStyle={{
                                  margin: 0,
                                  borderRadius: "0.75rem",
                                  background: "#0a0a0a",
                                  border: "1px solid #1f2937",
                                  padding: "1.5rem",
                                  paddingTop: "2.5rem",
                                  fontSize: "0.9rem",
                                  lineHeight: "1.6",
                                }}
                                {...props}
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            </div>
                          ) : (
                            <code
                              className="bg-gray-800/80 px-2 py-1 rounded text-sm font-mono text-emerald-400 border border-gray-700/30"
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                        table({ children }) {
                          return (
                            <div className="overflow-x-auto my-8 rounded-xl border border-gray-700/50 shadow-2xl">
                              <table className="min-w-full divide-y divide-gray-700">
                                {children}
                              </table>
                            </div>
                          );
                        },
                        h3({ children }) {
                          return (
                            <h3 className="flex items-center gap-3 text-xl font-bold text-gray-100 mt-8 mb-4">
                              <span className="inline-block w-1.5 h-6 bg-gradient-to-b from-emerald-400 to-blue-400 rounded-full shadow-lg shadow-emerald-500/20" />
                              {children}
                            </h3>
                          );
                        },
                      }}
                    >
                      {section.content}
                    </ReactMarkdown>
                  </div>
                </article>

                {/* Add diagram placeholder for certain sections */}
                {(section.title.toLowerCase().includes("architecture") ||
                  section.title.toLowerCase().includes("flow") ||
                  section.title.toLowerCase().includes("design")) && (
                  <ImagePlaceholder
                    title={`${section.title} Diagram`}
                    description="Detailed visual diagram for this section"
                  />
                )}
              </CollapsibleSection>
            ))}
          </div>

          {/* Quick Tips Section */}
          <div className="mt-12 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-blue-900/20 border border-emerald-500/30 backdrop-blur-sm shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                <Star className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Interview Tips</h3>
            </div>
            <ul className="space-y-3 text-gray-100">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1 font-bold text-lg">
                  •
                </span>
                <span className="leading-relaxed text-base">
                  Start with clarifying requirements before jumping into design
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1 font-bold text-lg">
                  •
                </span>
                <span className="leading-relaxed">
                  Always discuss trade-offs between different approaches
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1 font-bold text-lg">
                  •
                </span>
                <span className="leading-relaxed">
                  Consider scalability, reliability, and maintainability
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1 font-bold text-lg">
                  •
                </span>
                <span className="leading-relaxed">
                  Draw diagrams to visualize your design
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </TutorialContent>
  );
}
