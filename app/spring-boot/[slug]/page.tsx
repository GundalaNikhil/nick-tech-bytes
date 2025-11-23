import { ArrowLeft, BookOpen, Calendar, Clock } from "lucide-react";
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
      {/* Header - Non-sticky */}
      <div className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/spring-boot"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 mb-4 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Spring Boot Tutorials
          </Link>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
              <BookOpen className="h-6 w-6 text-green-400" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                {metadata.title}
              </h1>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                  <BookOpen className="h-3.5 w-3.5" />
                  {metadata.category}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${
                    metadata.difficulty === "Beginner"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : metadata.difficulty === "Intermediate"
                      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      : "bg-red-500/20 text-red-400 border-red-500/30"
                  } border`}
                >
                  {metadata.difficulty}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-700/50 border border-gray-600 text-gray-300 text-sm">
                  <Clock className="h-3.5 w-3.5" />
                  {metadata.estimatedTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <article className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="text-4xl font-bold text-white mb-6 mt-8"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-3xl font-bold text-white mb-4 mt-8 border-b border-gray-800 pb-2"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-2xl font-bold text-white mb-3 mt-6"
                  {...props}
                />
              ),
              h4: ({ node, ...props }) => (
                <h4
                  className="text-xl font-semibold text-white mb-2 mt-4"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p className="text-gray-300 mb-4 leading-relaxed" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="list-disc list-inside text-gray-300 mb-4 space-y-2"
                  {...props}
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="list-decimal list-inside text-gray-300 mb-4 space-y-2"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li className="text-gray-300" {...props} />
              ),
              code: ({ node, inline, className, children, ...props }: any) => {
                if (inline) {
                  return (
                    <code
                      className="bg-gray-800 text-green-400 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-700/50"
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
                  <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: "1rem",
                      background: "transparent",
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
                );
              },
              pre: ({ node, children, ...props }) => (
                <div className="my-6 rounded-xl border border-gray-800 overflow-hidden bg-gray-950 shadow-2xl">
                  {/* macOS-style window header */}
                  <div className="px-4 py-3 bg-gray-900 border-b border-gray-800 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
                    </div>
                    <span className="text-xs text-gray-500 ml-2 font-mono">
                      code
                    </span>
                  </div>
                  <div className="bg-gray-950">{children}</div>
                </div>
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-green-500 pl-4 italic text-gray-400 my-4"
                  {...props}
                />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-green-400 hover:text-green-300 underline"
                  {...props}
                />
              ),
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto mb-4">
                  <table
                    className="min-w-full border border-gray-700 rounded-lg"
                    {...props}
                  />
                </div>
              ),
              thead: ({ node, ...props }) => (
                <thead className="bg-gray-800" {...props} />
              ),
              tbody: ({ node, ...props }) => (
                <tbody className="divide-y divide-gray-700" {...props} />
              ),
              tr: ({ node, ...props }) => (
                <tr className="hover:bg-gray-800/50" {...props} />
              ),
              th: ({ node, ...props }) => (
                <th
                  className="px-4 py-2 text-left text-sm font-semibold text-white"
                  {...props}
                />
              ),
              td: ({ node, ...props }) => (
                <td className="px-4 py-2 text-sm text-gray-300" {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
