import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { lldTopics } from "@/lib/topics/systemDesignTopics";
import {
  ArrowLeft,
  Star,
  Building2,
  Clock,
  Code2,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import {
  CollapsibleSection,
  ImagePlaceholder,
} from "@/components/system-design/MarkdownComponents";

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
    beginner: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    intermediate: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    advanced: "bg-red-500/10 text-red-400 border-red-500/30",
  };

  const difficultyEmojis = {
    beginner: "🌱",
    intermediate: "⚡",
    advanced: "🔥",
  };

  // Parse content into sections
  const sections = content.split(/\n## /);
  const overview = sections[0];
  const otherSections = sections.slice(1).map((section) => {
    const [title, ...rest] = section.split("\n");
    return { title: title.trim(), content: rest.join("\n") };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative border-b border-gray-300 bg-white shadow-sm">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

        <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/system-design"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to System Design
          </Link>

          {/* Title Section */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 mb-4">
              <Code2 className="h-4 w-4 text-purple-600" />
              <span className="text-xs font-medium text-purple-600">
                Low-Level Design
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              {topic.title}
            </h1>
          </div>

          {/* Metadata Bar */}
          <div className="flex flex-wrap gap-3 items-center mb-6">
            {/* Difficulty Badge */}
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium ${
                difficultyColors[topic.difficulty]
              }`}
            >
              <span>{difficultyEmojis[topic.difficulty]}</span>
              <span className="capitalize">{topic.difficulty}</span>
            </span>

            {/* Rating */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium text-gray-700">
                {topic.rating} Rating
              </span>
            </div>

            {/* Read Time */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm">
              <Clock className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                20 min read
              </span>
            </div>
          </div>

          {/* Companies */}
          <div className="border-t border-gray-300 pt-6">
            <div className="flex items-center gap-3 mb-3">
              <Building2 className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-semibold text-purple-600">
                Asked by Top Companies:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {topic.companies.map((company) => (
                <span
                  key={company}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-purple-50 text-purple-700 text-sm font-medium border border-purple-200 hover:border-purple-400 hover:bg-purple-100 transition-all"
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
        <div className="mb-8 p-6 md:p-8 rounded-2xl bg-white border border-gray-300 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gray-100">
              <Code2 className="h-5 w-5 text-gray-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Problem Statement
            </h2>
          </div>
          <div className="mb-4 p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-lg">
            <p className="text-sm font-semibold text-purple-900 mb-1">
              Design Context
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              This low-level design question evaluates your object-oriented
              programming skills and ability to create clean, maintainable code
              following SOLID principles and design patterns.
            </p>
          </div>
          <article
            className="prose prose-gray max-w-none 
            prose-headings:text-gray-900 prose-headings:font-bold
            prose-p:text-gray-800 prose-p:leading-relaxed prose-p:text-base
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-em:text-gray-700 prose-em:italic
            prose-code:text-gray-900 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-['']
            prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800
            prose-ul:text-gray-800 prose-ul:my-4
            prose-ol:text-gray-800 prose-ol:my-4
            prose-li:text-gray-800 prose-li:my-2 prose-li:leading-relaxed
            prose-blockquote:border-l-4 prose-blockquote:border-gray-400 prose-blockquote:bg-gray-50 prose-blockquote:text-gray-700 prose-blockquote:italic prose-blockquote:pl-4 prose-blockquote:py-2
          "
          >
            <ReactMarkdown>{overview}</ReactMarkdown>
          </article>
        </div>

        {/* Class Diagram Placeholder */}
        <ImagePlaceholder
          title="Class Diagram"
          description="UML class diagram showing the object-oriented design structure"
        />

        {/* Collapsible Sections */}
        <div className="space-y-6">
          {otherSections.map((section, idx) => (
            <CollapsibleSection
              key={idx}
              title={section.title}
              defaultOpen={idx < 2}
            >
              <article
                className="prose prose-gray max-w-none 
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h1:text-3xl prose-h1:text-gray-900 prose-h1:border-b prose-h1:border-gray-300 prose-h1:pb-3
                prose-h2:text-2xl prose-h2:text-gray-800 prose-h2:mt-8
                prose-h3:text-xl prose-h3:text-gray-800 prose-h3:mt-6
                prose-h4:text-lg prose-h4:text-gray-700
                prose-p:text-gray-800 prose-p:leading-relaxed prose-p:text-base
                prose-strong:text-gray-900 prose-strong:font-bold
                prose-em:text-gray-700 prose-em:italic
                prose-code:text-gray-900 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-['']
                prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-300 prose-pre:rounded-xl prose-pre:shadow-sm
                prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800
                prose-ul:text-gray-800 prose-ul:my-4
                prose-ol:text-gray-800 prose-ol:my-4
                prose-li:text-gray-800 prose-li:my-2 prose-li:leading-relaxed
                prose-table:border-gray-300 prose-table:my-8
                prose-thead:bg-gray-100 prose-thead:border-b prose-thead:border-gray-300
                prose-th:border-gray-300 prose-th:p-3 prose-th:text-gray-900 prose-th:font-bold
                prose-td:border-gray-300 prose-td:p-3 prose-td:text-gray-800
                prose-tr:border-b prose-tr:border-gray-200 hover:prose-tr:bg-gray-50
                prose-blockquote:border-l-4 prose-blockquote:border-gray-400 prose-blockquote:bg-gray-50 prose-blockquote:text-gray-700 prose-blockquote:italic prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:rounded-r-lg
                prose-img:rounded-xl prose-img:border prose-img:border-gray-300 prose-img:shadow-lg
                "
              >
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <div className="relative group my-6">
                          <div className="absolute top-0 right-0 px-3 py-1 bg-gray-200 rounded-bl-lg rounded-tr-xl border-l border-b border-gray-300">
                            <span className="text-xs text-gray-700 font-mono">
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
                              background: "#f9fafb",
                              border: "1px solid #d1d5db",
                              padding: "1.5rem",
                            }}
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        </div>
                      ) : (
                        <code
                          className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-900"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    table({ children }) {
                      return (
                        <div className="overflow-x-auto my-8 rounded-xl border border-gray-300">
                          <table className="min-w-full divide-y divide-gray-300">
                            {children}
                          </table>
                        </div>
                      );
                    },
                    h3({ children }) {
                      return (
                        <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mt-6 mb-4">
                          <span className="inline-block w-1 h-5 bg-gray-900 rounded-full" />
                          {children}
                        </h3>
                      );
                    },
                  }}
                >
                  {section.content}
                </ReactMarkdown>
              </article>

              {/* Add diagram placeholder for design pattern sections */}
              {(section.title.toLowerCase().includes("class diagram") ||
                section.title.toLowerCase().includes("pattern") ||
                section.title.toLowerCase().includes("implementation")) && (
                <ImagePlaceholder
                  title={`${section.title} Visual`}
                  description="Detailed diagram illustrating the design pattern or implementation"
                />
              )}
            </CollapsibleSection>
          ))}
        </div>

        {/* Design Patterns Tips */}
        <div className="mt-12 p-6 md:p-8 rounded-2xl bg-purple-50 border border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-100">
              <Lightbulb className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Design Best Practices
            </h3>
          </div>
          <ul className="space-y-3 text-gray-800">
            <li className="flex items-start gap-3">
              <span className="text-purple-600 mt-1 font-bold">•</span>
              <span>Follow SOLID principles for maintainable code</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 mt-1 font-bold">•</span>
              <span>
                Use appropriate design patterns to solve recurring problems
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 mt-1 font-bold">•</span>
              <span>Ensure thread-safety for concurrent operations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-600 mt-1 font-bold">•</span>
              <span>Write clean, testable, and well-documented code</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
