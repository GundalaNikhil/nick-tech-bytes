import {
  ArrowLeft,
  BookOpen,
  Code2,
  Layers,
  Zap,
  Database,
  TestTube,
  Activity,
  Sparkles,
  Rocket,
  Clock,
  Star,
} from "lucide-react";
import Link from "next/link";

// Tutorial data structure
interface Tutorial {
  id: string;
  title: string;
  description: string;
  category:
    | "foundational"
    | "configuration"
    | "web"
    | "data"
    | "testing"
    | "monitoring"
    | "advanced"
    | "production";
  difficulty: "beginner" | "intermediate" | "advanced";
  lines: number;
  slug: string;
  estimatedTime: string;
  rating: number;
}

const tutorials: Tutorial[] = [
  // Foundational
  {
    id: "01",
    title: "What is Spring Boot?",
    description: "History, motivation, paradigm shift",
    category: "foundational",
    difficulty: "beginner",
    lines: 850,
    slug: "01_what_is_spring_boot",
    estimatedTime: "15 min",
    rating: 4.8,
  },
  {
    id: "02",
    title: "Key Features",
    description: "Boot features that solve Spring problems",
    category: "foundational",
    difficulty: "beginner",
    lines: 920,
    slug: "02_key_features",
    estimatedTime: "18 min",
    rating: 4.7,
  },
  {
    id: "03",
    title: "@SpringBootApplication",
    description: "Bootstrap configuration",
    category: "foundational",
    difficulty: "beginner",
    lines: 880,
    slug: "03_springbootapplication_annotation",
    estimatedTime: "17 min",
    rating: 4.6,
  },
  {
    id: "04",
    title: "Advantages",
    description: "Why use Boot vs traditional Spring",
    category: "foundational",
    difficulty: "beginner",
    lines: 750,
    slug: "04_advantages",
    estimatedTime: "14 min",
    rating: 4.5,
  },
  {
    id: "05",
    title: "Key Components",
    description: "Auto-config, starters, embedded servers",
    category: "foundational",
    difficulty: "beginner",
    lines: 920,
    slug: "05_key_components",
    estimatedTime: "18 min",
    rating: 4.7,
  },
  {
    id: "06",
    title: "Boot vs Spring",
    description: "Comparison, benefits",
    category: "foundational",
    difficulty: "intermediate",
    lines: 850,
    slug: "06_boot_vs_spring",
    estimatedTime: "16 min",
    rating: 4.6,
  },
  {
    id: "07",
    title: "Deep Dive Comparison",
    description: "Detailed architectural differences",
    category: "foundational",
    difficulty: "intermediate",
    lines: 1100,
    slug: "07_boot_vs_spring_deep_dive",
    estimatedTime: "22 min",
    rating: 4.8,
  },

  // Configuration & Setup
  {
    id: "11",
    title: "Configuration Management",
    description: "Externalized configuration",
    category: "configuration",
    difficulty: "intermediate",
    lines: 950,
    slug: "11_configuration_management",
    estimatedTime: "19 min",
    rating: 4.7,
  },
  {
    id: "12",
    title: "Auto-Configuration",
    description: "@EnableAutoConfiguration, conditional",
    category: "configuration",
    difficulty: "intermediate",
    lines: 950,
    slug: "12_auto_configuration",
    estimatedTime: "19 min",
    rating: 4.8,
  },
  {
    id: "13",
    title: "Spring Initializer",
    description: "Starting new projects quickly",
    category: "configuration",
    difficulty: "beginner",
    lines: 900,
    slug: "13_spring_initializer",
    estimatedTime: "17 min",
    rating: 4.5,
  },
  {
    id: "14",
    title: "Starters Deep Dive",
    description: "Starter dependencies explained",
    category: "configuration",
    difficulty: "advanced",
    lines: 1200,
    slug: "14_spring_boot_starters",
    estimatedTime: "24 min",
    rating: 4.9,
  },
  {
    id: "18",
    title: "Spring Boot CLI",
    description: "Command-line rapid development",
    category: "configuration",
    difficulty: "intermediate",
    lines: 950,
    slug: "18_spring_boot_cli",
    estimatedTime: "19 min",
    rating: 4.4,
  },
  {
    id: "28",
    title: "Profiles Advanced",
    description: "Environment-specific configs",
    category: "configuration",
    difficulty: "advanced",
    lines: 1050,
    slug: "28_profiles_advanced",
    estimatedTime: "20 min",
    rating: 4.7,
  },
  {
    id: "29",
    title: "YAML Configuration",
    description: "YAML vs properties deep dive",
    category: "configuration",
    difficulty: "intermediate",
    lines: 850,
    slug: "29_yaml_configuration",
    estimatedTime: "16 min",
    rating: 4.5,
  },

  // Web Development
  {
    id: "15",
    title: "Embedded Servers",
    description: "Tomcat, Jetty, Undertow",
    category: "web",
    difficulty: "intermediate",
    lines: 950,
    slug: "15_embedded_servers",
    estimatedTime: "19 min",
    rating: 4.6,
  },
  {
    id: "23",
    title: "@RestController",
    description: "Building REST APIs",
    category: "web",
    difficulty: "intermediate",
    lines: 1050,
    slug: "23_rest_controller",
    estimatedTime: "20 min",
    rating: 4.8,
  },
  {
    id: "24",
    title: "Spring Data",
    description: "Repositories, CRUD operations",
    category: "web",
    difficulty: "intermediate",
    lines: 950,
    slug: "24_spring_data_overview",
    estimatedTime: "19 min",
    rating: 4.7,
  },
  {
    id: "25",
    title: "Spring Data REST",
    description: "Auto-generate REST endpoints",
    category: "web",
    difficulty: "intermediate",
    lines: 900,
    slug: "25_spring_data_rest",
    estimatedTime: "17 min",
    rating: 4.6,
  },
  {
    id: "30",
    title: "Security",
    description: "Authentication, authorization",
    category: "web",
    difficulty: "advanced",
    lines: 1200,
    slug: "30_security_implementation",
    estimatedTime: "24 min",
    rating: 4.9,
  },

  // Data & Persistence
  {
    id: "19",
    title: "Dependency Management",
    description: "Managing dependencies, BOM",
    category: "data",
    difficulty: "intermediate",
    lines: 950,
    slug: "19_dependency_management",
    estimatedTime: "19 min",
    rating: 4.5,
  },
  {
    id: "21",
    title: "IOC Container",
    description: "Spring Container, bean lifecycle",
    category: "data",
    difficulty: "intermediate",
    lines: 1100,
    slug: "21_ioc_container",
    estimatedTime: "22 min",
    rating: 4.8,
  },
  {
    id: "31",
    title: "Transaction Management",
    description: "@Transactional, ACID, isolation",
    category: "data",
    difficulty: "advanced",
    lines: 1100,
    slug: "31_transaction_management",
    estimatedTime: "22 min",
    rating: 4.8,
  },
  {
    id: "32",
    title: "Batch Processing",
    description: "Processing large datasets",
    category: "data",
    difficulty: "advanced",
    lines: 950,
    slug: "32_batch_processing",
    estimatedTime: "19 min",
    rating: 4.7,
  },

  // Testing & Quality
  {
    id: "08",
    title: "Exception Handling",
    description: "Global handlers, error responses",
    category: "testing",
    difficulty: "intermediate",
    lines: 950,
    slug: "08_exception_handling",
    estimatedTime: "19 min",
    rating: 4.6,
  },
  {
    id: "09",
    title: "Testing",
    description: "Unit, integration, E2E testing",
    category: "testing",
    difficulty: "intermediate",
    lines: 1100,
    slug: "09_testing",
    estimatedTime: "22 min",
    rating: 4.8,
  },
  {
    id: "10",
    title: "Logging",
    description: "SLF4J, Logback, structured logging",
    category: "testing",
    difficulty: "intermediate",
    lines: 850,
    slug: "10_logging_best_practices",
    estimatedTime: "16 min",
    rating: 4.5,
  },
  {
    id: "26",
    title: "Advanced Testing",
    description: "Integration testing at scale",
    category: "testing",
    difficulty: "advanced",
    lines: 1200,
    slug: "26_advanced_integration_testing",
    estimatedTime: "24 min",
    rating: 4.9,
  },

  // Monitoring & Operations
  {
    id: "16",
    title: "Metrics & Monitoring",
    description: "Actuator, custom metrics",
    category: "monitoring",
    difficulty: "intermediate",
    lines: 1050,
    slug: "16_metrics_monitoring",
    estimatedTime: "20 min",
    rating: 4.7,
  },
  {
    id: "17",
    title: "Custom Endpoints",
    description: "Building custom monitoring",
    category: "monitoring",
    difficulty: "advanced",
    lines: 900,
    slug: "17_custom_actuators",
    estimatedTime: "17 min",
    rating: 4.6,
  },
  {
    id: "22",
    title: "@ComponentScan",
    description: "Component discovery patterns",
    category: "monitoring",
    difficulty: "intermediate",
    lines: 1100,
    slug: "22_component_scan",
    estimatedTime: "22 min",
    rating: 4.5,
  },
  {
    id: "27",
    title: "DevTools",
    description: "Live reload & development",
    category: "monitoring",
    difficulty: "beginner",
    lines: 800,
    slug: "27_devtools",
    estimatedTime: "15 min",
    rating: 4.4,
  },

  // Advanced Patterns
  {
    id: "20",
    title: "Non-Web Applications",
    description: "Background tasks, scheduled jobs",
    category: "advanced",
    difficulty: "intermediate",
    lines: 880,
    slug: "20_non_web_applications",
    estimatedTime: "17 min",
    rating: 4.6,
  },
  {
    id: "33",
    title: "Event-Driven",
    description: "Pub-sub, async processing",
    category: "advanced",
    difficulty: "advanced",
    lines: 1000,
    slug: "33_event_driven_architecture",
    estimatedTime: "20 min",
    rating: 4.8,
  },

  // Production
  {
    id: "41",
    title: "Caching",
    description: "Redis, cache invalidation",
    category: "production",
    difficulty: "advanced",
    lines: 1100,
    slug: "41_caching",
    estimatedTime: "22 min",
    rating: 4.8,
  },
  {
    id: "42",
    title: "Task Scheduling",
    description: "@Scheduled, cron expressions",
    category: "production",
    difficulty: "advanced",
    lines: 950,
    slug: "42_scheduler",
    estimatedTime: "19 min",
    rating: 4.7,
  },
];

const categoryInfo = {
  foundational: {
    name: "Foundational",
    icon: BookOpen,
    color: "cyan",
    gradient: "from-cyan-400 to-blue-400",
  },
  configuration: {
    name: "Configuration",
    icon: Code2,
    color: "purple",
    gradient: "from-purple-400 to-pink-400",
  },
  web: {
    name: "Web Development",
    icon: Layers,
    color: "emerald",
    gradient: "from-emerald-400 to-green-400",
  },
  data: {
    name: "Data & Persistence",
    icon: Database,
    color: "blue",
    gradient: "from-blue-400 to-indigo-400",
  },
  testing: {
    name: "Testing & Quality",
    icon: TestTube,
    color: "orange",
    gradient: "from-orange-400 to-red-400",
  },
  monitoring: {
    name: "Monitoring",
    icon: Activity,
    color: "teal",
    gradient: "from-teal-400 to-cyan-400",
  },
  advanced: {
    name: "Advanced Patterns",
    icon: Zap,
    color: "violet",
    gradient: "from-violet-400 to-purple-400",
  },
  production: {
    name: "Production",
    icon: Rocket,
    color: "rose",
    gradient: "from-rose-400 to-pink-400",
  },
};

export default function SpringBootPage() {
  const groupedTutorials = tutorials.reduce((acc, tutorial) => {
    if (!acc[tutorial.category]) {
      acc[tutorial.category] = [];
    }
    acc[tutorial.category].push(tutorial);
    return acc;
  }, {} as Record<string, Tutorial[]>);

  const totalTutorials = tutorials.length;
  const totalLines = tutorials.reduce((sum, t) => sum + t.lines, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-x-hidden">
      {/* Header - Non-sticky */}
      <div className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 mb-4 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
              <BookOpen className="h-8 w-8 text-green-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Spring Boot Mastery
              </h1>
              <p className="text-gray-400 mt-1">
                Comprehensive tutorials from foundational through advanced
                concepts
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-6 mt-6 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
              <span className="text-2xl font-bold text-green-400">
                {totalTutorials}
              </span>
              <span className="text-sm text-gray-400">Total Tutorials</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
              <span className="text-2xl font-bold text-emerald-400">
                {(totalLines / 1000).toFixed(1)}K
              </span>
              <span className="text-sm text-gray-400">Lines of Content</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
              <span className="text-2xl font-bold text-teal-400">5</span>
              <span className="text-sm text-gray-400">Learning Paths</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {Object.entries(groupedTutorials).map(
          ([category, categoryTutorials]) => {
            const info = categoryInfo[category as keyof typeof categoryInfo];
            const Icon = info.icon;

            return (
              <section key={category} className="mb-16">
                <div className="mb-8 flex items-center gap-4">
                  <div
                    className={`p-2 rounded-lg bg-${info.color}-500/10 border border-${info.color}-500/30`}
                  >
                    <Icon className={`h-6 w-6 text-${info.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-white">
                      {info.name}
                    </h2>
                    <p className="mt-2 text-gray-400">
                      {categoryTutorials.length} tutorials
                    </p>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {categoryTutorials.map((tutorial) => {
                    const difficultyEmoji =
                      tutorial.difficulty === "beginner"
                        ? "🌱"
                        : tutorial.difficulty === "intermediate"
                        ? "⚡"
                        : "🔥";

                    const difficultyColor =
                      tutorial.difficulty === "beginner"
                        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
                        : tutorial.difficulty === "intermediate"
                        ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/30"
                        : "text-red-400 bg-red-500/10 border-red-500/30";

                    const gradientOverlay =
                      tutorial.difficulty === "beginner"
                        ? "from-emerald-500/20 to-emerald-500/5"
                        : tutorial.difficulty === "intermediate"
                        ? "from-yellow-500/20 to-yellow-500/5"
                        : "from-red-500/20 to-red-500/5";

                    return (
                      <Link
                        key={tutorial.id}
                        href={`/spring-boot/${tutorial.slug}`}
                        className="group relative flex flex-col gap-4 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-900/40 p-6 transition-all duration-300 hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10 backdrop-blur-sm hover:scale-[1.02]"
                      >
                        {/* Gradient overlay on hover */}
                        <div
                          className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gradientOverlay} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                        />

                        <div className="relative z-10 flex flex-col gap-4">
                          {/* Header with badges */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-green-400 transition-colors">
                                {tutorial.title}
                              </h3>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span
                                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border ${difficultyColor}`}
                                >
                                  <span>{difficultyEmoji}</span>
                                  <span className="capitalize">
                                    {tutorial.difficulty}
                                  </span>
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-md bg-gray-800/50 px-2 py-1 text-xs text-gray-400 border border-gray-700/50">
                                  #{tutorial.id}
                                </span>
                              </div>
                            </div>
                            <div className="flex-shrink-0 rounded-full bg-green-500/10 p-2.5 transition-all duration-300 group-hover:bg-green-500/20 group-hover:scale-110 group-hover:rotate-12">
                              <BookOpen className="h-4 w-4 text-green-400 transition-transform duration-300" />
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                            {tutorial.description}
                          </p>

                          {/* Meta information */}
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-green-400" />
                              <span>{tutorial.estimatedTime}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                              <span className="text-gray-400 font-medium">
                                {tutorial.rating.toFixed(1)}
                              </span>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-2 border-t border-gray-800/50">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <Code2 className="h-3.5 w-3.5 text-green-400" />
                              <span>~{tutorial.lines} lines</span>
                            </div>
                            <span className="text-xs text-gray-500 group-hover:text-green-400 transition-colors font-medium">
                              Read tutorial →
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          }
        )}
      </div>
    </div>
  );
}
