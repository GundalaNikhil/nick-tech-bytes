import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Code2,
  Lightbulb,
  Rocket,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { SpringIcon } from "@/components/icons";
import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Tutorial metadata
const tutorialMetadata: Record<
  string,
  { title: string; category: string; difficulty: string; estimatedTime: string }
> = {
  "01_what_is_spring_boot": {
    title: "What is Spring Boot?",
    category: "Foundational",
    difficulty: "Beginner",
    estimatedTime: "15 min",
  },
  "02_key_features": {
    title: "Key Features",
    category: "Foundational",
    difficulty: "Beginner",
    estimatedTime: "20 min",
  },
  "03_springbootapplication_annotation": {
    title: "@SpringBootApplication",
    category: "Foundational",
    difficulty: "Beginner",
    estimatedTime: "15 min",
  },
  "04_advantages": {
    title: "Advantages",
    category: "Foundational",
    difficulty: "Beginner",
    estimatedTime: "10 min",
  },
  "05_key_components": {
    title: "Key Components",
    category: "Foundational",
    difficulty: "Beginner",
    estimatedTime: "20 min",
  },
  "06_boot_vs_spring": {
    title: "Boot vs Spring",
    category: "Foundational",
    difficulty: "Intermediate",
    estimatedTime: "15 min",
  },
  "07_boot_vs_spring_deep_dive": {
    title: "Deep Dive Comparison",
    category: "Foundational",
    difficulty: "Intermediate",
    estimatedTime: "30 min",
  },
  "08_exception_handling": {
    title: "Exception Handling",
    category: "Testing & Quality",
    difficulty: "Intermediate",
    estimatedTime: "25 min",
  },
  "09_testing": {
    title: "Testing",
    category: "Testing & Quality",
    difficulty: "Intermediate",
    estimatedTime: "30 min",
  },
  "10_logging_best_practices": {
    title: "Logging",
    category: "Testing & Quality",
    difficulty: "Intermediate",
    estimatedTime: "20 min",
  },
  "11_configuration_management": {
    title: "Configuration Management",
    category: "Configuration",
    difficulty: "Intermediate",
    estimatedTime: "25 min",
  },
  "12_auto_configuration": {
    title: "Auto-Configuration",
    category: "Configuration",
    difficulty: "Intermediate",
    estimatedTime: "25 min",
  },
  "13_spring_initializer": {
    title: "Spring Initializer",
    category: "Configuration",
    difficulty: "Beginner",
    estimatedTime: "20 min",
  },
  "14_spring_boot_starters": {
    title: "Starters Deep Dive",
    category: "Configuration",
    difficulty: "Advanced",
    estimatedTime: "35 min",
  },
  "15_embedded_servers": {
    title: "Embedded Servers",
    category: "Web Development",
    difficulty: "Intermediate",
    estimatedTime: "25 min",
  },
  "16_metrics_monitoring": {
    title: "Metrics & Monitoring",
    category: "Monitoring",
    difficulty: "Intermediate",
    estimatedTime: "30 min",
  },
  "17_custom_actuators": {
    title: "Custom Endpoints",
    category: "Monitoring",
    difficulty: "Advanced",
    estimatedTime: "25 min",
  },
  "18_spring_boot_cli": {
    title: "Spring Boot CLI",
    category: "Configuration",
    difficulty: "Intermediate",
    estimatedTime: "25 min",
  },
  "19_dependency_management": {
    title: "Dependency Management",
    category: "Data & Persistence",
    difficulty: "Intermediate",
    estimatedTime: "20 min",
  },
  "20_non_web_applications": {
    title: "Non-Web Applications",
    category: "Advanced Patterns",
    difficulty: "Intermediate",
    estimatedTime: "20 min",
  },
  "21_ioc_container": {
    title: "IOC Container",
    category: "Data & Persistence",
    difficulty: "Intermediate",
    estimatedTime: "30 min",
  },
  "22_component_scan": {
    title: "@ComponentScan",
    category: "Monitoring",
    difficulty: "Intermediate",
    estimatedTime: "30 min",
  },
  "23_rest_controller": {
    title: "@RestController",
    category: "Web Development",
    difficulty: "Intermediate",
    estimatedTime: "30 min",
  },
  "24_spring_data_overview": {
    title: "Spring Data",
    category: "Web Development",
    difficulty: "Intermediate",
    estimatedTime: "25 min",
  },
  "25_spring_data_rest": {
    title: "Spring Data REST",
    category: "Web Development",
    difficulty: "Intermediate",
    estimatedTime: "20 min",
  },
  "26_advanced_integration_testing": {
    title: "Advanced Testing",
    category: "Testing & Quality",
    difficulty: "Advanced",
    estimatedTime: "35 min",
  },
  "27_devtools": {
    title: "DevTools",
    category: "Monitoring",
    difficulty: "Beginner",
    estimatedTime: "15 min",
  },
  "28_profiles_advanced": {
    title: "Profiles Advanced",
    category: "Configuration",
    difficulty: "Advanced",
    estimatedTime: "30 min",
  },
  "29_yaml_configuration": {
    title: "YAML Configuration",
    category: "Configuration",
    difficulty: "Intermediate",
    estimatedTime: "15 min",
  },
  "30_security_implementation": {
    title: "Security",
    category: "Web Development",
    difficulty: "Advanced",
    estimatedTime: "35 min",
  },
  "31_transaction_management": {
    title: "Transaction Management",
    category: "Data & Persistence",
    difficulty: "Advanced",
    estimatedTime: "30 min",
  },
  "32_batch_processing": {
    title: "Batch Processing",
    category: "Data & Persistence",
    difficulty: "Advanced",
    estimatedTime: "25 min",
  },
  "33_event_driven_architecture": {
    title: "Event-Driven",
    category: "Advanced Patterns",
    difficulty: "Advanced",
    estimatedTime: "30 min",
  },
  "41_caching": {
    title: "Caching",
    category: "Production",
    difficulty: "Advanced",
    estimatedTime: "30 min",
  },
  "42_scheduler": {
    title: "Task Scheduling",
    category: "Production",
    difficulty: "Advanced",
    estimatedTime: "25 min",
  },
};

// Generate static params for all tutorials
export async function generateStaticParams() {
  return Object.keys(tutorialMetadata).map((slug) => ({
    slug,
  }));
}

export default async function SpringBootTutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Read markdown file
  const filePath = path.join(
    process.cwd(),
    "lib",
    "markdown",
    "spring-boot",
    `${slug}.md`
  );

  let content: string;
  try {
    content = fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    notFound();
  }

  const metadata = tutorialMetadata[slug];
  if (!metadata) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-x-hidden">
      {/* Header - Sticky & Compact */}
      <div className="sticky top-20 z-40 border-b border-gray-800 bg-gray-900/95 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/spring-boot"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-green-400 mb-3 transition-colors group"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Spring Boot Tutorials
          </Link>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 shrink-0">
              <SpringIcon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 truncate">
                {metadata.title}
              </h1>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-medium">
                  <BookOpen className="h-3 w-3" />
                  {metadata.category}
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium ${
                    metadata.difficulty === "Beginner"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : metadata.difficulty === "Intermediate"
                      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      : "bg-red-500/20 text-red-400 border-red-500/30"
                  } border`}
                >
                  {metadata.difficulty}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-700/50 border border-gray-600 text-gray-300 text-[10px] font-medium">
                  <Clock className="h-3 w-3" />
                  {metadata.estimatedTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Insights with Box Shadow */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 shadow-2xl shadow-black/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-green-500/10 border border-green-500/30 shrink-0">
              <Target className="h-5 w-5 text-green-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">
                Category
              </p>
              <p className="text-sm font-bold text-white truncate">
                {metadata.category}
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
              <p className="text-sm font-bold text-white truncate">
                {metadata.difficulty}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 shrink-0">
              <Clock className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-0.5">
                Duration
              </p>
              <p className="text-sm font-bold text-white truncate">
                {metadata.estimatedTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Enhanced Typography with Better Spacing */}
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <article className="prose prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, children, ...props }) => (
                <h1
                  className="text-3xl font-bold text-white mb-6 mt-10 flex items-center gap-3 pb-3 border-b-2 border-green-500/30"
                  {...props}
                >
                  <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/30">
                    <BookOpen className="h-6 w-6 text-green-400" />
                  </div>
                  {children}
                </h1>
              ),
              h2: ({ node, children, ...props }) => {
                const text = String(children);
                const isQuestion = text.toLowerCase().includes("question");

                if (isQuestion) {
                  return (
                    <div className="mt-10 mb-6 p-5 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-l-4 border-green-500 shadow-lg shadow-green-500/10">
                      <h2 className="text-2xl font-bold text-green-300 flex items-center gap-3 m-0">
                        <div className="p-2 rounded-lg bg-green-500/20 border border-green-500/40">
                          <Rocket className="h-5 w-5 text-green-400" />
                        </div>
                        {children}
                      </h2>
                    </div>
                  );
                }

                return (
                  <h2
                    className="text-2xl font-bold text-white mb-4 mt-8 pb-3 border-b border-gray-700 flex items-center gap-2"
                    {...props}
                  >
                    <Rocket className="h-5 w-5 text-green-400" />
                    {children}
                  </h2>
                );
              },
              h3: ({ node, children, ...props }) => (
                <h3
                  className="text-xl font-semibold text-white mb-4 mt-8 flex items-center gap-2"
                  {...props}
                >
                  <Zap className="h-5 w-5 text-purple-400" />
                  {children}
                </h3>
              ),
              h4: ({ node, children, ...props }) => (
                <h4
                  className="text-lg font-semibold text-gray-200 mb-3 mt-6 flex items-center gap-2"
                  {...props}
                >
                  <Lightbulb className="h-4 w-4 text-yellow-400" />
                  {children}
                </h4>
              ),
              p: ({ node, children, ...props }) => {
                const text = String(children);
                const isAnswer =
                  text
                    .toLowerCase()
                    .startsWith("what we're trying to achieve") ||
                  text.toLowerCase().startsWith("goal/aim");

                if (isAnswer) {
                  return (
                    <div className="my-5 p-5 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 shadow-lg shadow-black/10">
                      <p className="text-gray-100 text-base leading-relaxed m-0">
                        {children}
                      </p>
                    </div>
                  );
                }

                return (
                  <p
                    className="text-base text-gray-300 mb-4 leading-relaxed"
                    {...props}
                  >
                    {children}
                  </p>
                );
              },
              ul: ({ node, children, ...props }) => (
                <ul
                  className="list-disc list-outside text-base text-gray-300 mb-5 space-y-2 ml-6 pl-2"
                  {...props}
                >
                  {children}
                </ul>
              ),
              ol: ({ node, children, ...props }) => (
                <ol
                  className="list-decimal list-outside text-base text-gray-300 mb-5 space-y-2 ml-6 pl-2"
                  {...props}
                >
                  {children}
                </ol>
              ),
              li: ({ node, children, ...props }) => (
                <li
                  className="text-base text-gray-300 leading-relaxed pl-2"
                  {...props}
                >
                  {children}
                </li>
              ),
              strong: ({ children }) => (
                <strong className="text-white font-bold">{children}</strong>
              ),
              code: ({ node, inline, className, children, ...props }: any) => {
                if (inline) {
                  return (
                    <code
                      className="bg-green-500/10 text-green-300 px-2 py-0.5 rounded border border-green-500/20 text-sm font-mono"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }
                // Extract language from className (format: language-xyz)
                const match = /language-(\w+)/.exec(className || "");
                const language = match ? match[1] : "text";

                return (
                  <div className="my-6 rounded-xl overflow-hidden border border-gray-700/50 shadow-2xl shadow-black/20">
                    <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 px-4 py-2.5 border-b border-gray-700 flex items-center justify-between backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <Code2 className="h-4 w-4 text-green-400" />
                        <span className="text-xs font-mono text-gray-300 uppercase tracking-wider">
                          {language}
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                      </div>
                    </div>
                    <SyntaxHighlighter
                      language={language}
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        padding: "1.5rem",
                        background: "rgba(17, 24, 39, 0.6)",
                        fontSize: "0.875rem",
                      }}
                      codeTagProps={{
                        style: {
                          fontFamily:
                            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                        },
                      }}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </div>
                );
              },
              pre: ({ node, children, ...props }) => <>{children}</>,
              blockquote: ({ node, children, ...props }) => (
                <blockquote
                  className="border-l-4 border-green-500 bg-gradient-to-r from-green-500/10 to-transparent pl-5 py-4 my-6 italic text-gray-200 text-base rounded-r-xl shadow-lg shadow-green-500/5"
                  {...props}
                >
                  {children}
                </blockquote>
              ),
              a: ({ node, children, ...props }) => (
                <a
                  className="text-green-400 hover:text-green-300 underline underline-offset-2 transition-colors"
                  {...props}
                >
                  {children}
                </a>
              ),
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-6">
                  <table
                    className="min-w-full text-sm border border-gray-700 rounded-lg overflow-hidden"
                    {...props}
                  />
                </div>
              ),
              thead: ({ node, ...props }) => (
                <thead className="bg-gray-800/80" {...props} />
              ),
              tbody: ({ node, ...props }) => (
                <tbody className="divide-y divide-gray-700/50" {...props} />
              ),
              tr: ({ node, ...props }) => (
                <tr
                  className="hover:bg-gray-800/30 transition-colors"
                  {...props}
                />
              ),
              th: ({ node, children, ...props }) => (
                <th
                  className="px-4 py-3 text-left text-xs font-semibold text-green-400"
                  {...props}
                >
                  {children}
                </th>
              ),
              td: ({ node, children, ...props }) => (
                <td className="px-4 py-3 text-sm text-gray-300" {...props}>
                  {children}
                </td>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>

        {/* Navigation Footer */}
        <div className="mt-12 pt-6 border-t border-gray-800">
          <Link
            href="/spring-boot"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 text-green-400 text-sm hover:from-green-500/20 hover:to-emerald-500/20 transition-all duration-300 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to all Spring Boot tutorials
          </Link>
        </div>
      </div>
    </div>
  );
}
