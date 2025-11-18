"use client";

import React, { useState, useMemo } from "react";
import type {
  InterviewQuestionsMap,
  TopicKey,
  DifficultyLevel,
} from "../lib/interviewTypes";
import {
  Search,
  Filter,
  Sparkles,
  TrendingUp,
  Award,
  MessageSquare,
  CheckCircle2,
  Code2,
  Lightbulb,
  Copy,
  Check,
  Database,
  Box,
  Layers,
  Zap,
  Target,
  Rocket,
  Settings,
  Cloud,
  Library,
  X,
} from "lucide-react";

interface QuestionsPanelProps {
  topicKey: TopicKey;
  interviewQuestions: InterviewQuestionsMap;
}

const QuestionsPanel: React.FC<QuestionsPanelProps> = ({
  topicKey,
  interviewQuestions,
}) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const topicData = interviewQuestions[topicKey];

  const toggleExpanded = (sectionTitle: string, questionIndex: number) => {
    const key = `${sectionTitle}-${questionIndex}`;
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Icon mapping for sections
  const getSectionIcon = (title: string, defaultIcon: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      "JVM Architecture & Memory Management": <Database className="w-6 h-6" />,
      "Object-Oriented Programming": <Box className="w-6 h-6" />,
      "Collections Framework": <Layers className="w-6 h-6" />,
      "Lambda Expressions": <Zap className="w-6 h-6" />,
      "Stream API": <Target className="w-6 h-6" />,
      "Optional Class": <CheckCircle2 className="w-6 h-6" />,
      "Method References": <Rocket className="w-6 h-6" />,
      "Default and Static Methods in Interfaces": (
        <Settings className="w-6 h-6" />
      ),
      "Date and Time API": <Cloud className="w-6 h-6" />,
      "Collectors and Grouping": <Library className="w-6 h-6" />,
    };
    return iconMap[title] || <span className="text-2xl">{defaultIcon}</span>;
  };

  // Difficulty badge component
  const DifficultyBadge = ({
    difficulty,
  }: {
    difficulty?: DifficultyLevel;
  }) => {
    if (!difficulty) return null;

    const styles = {
      beginner: {
        icon: <Sparkles className="w-3.5 h-3.5" />,
        className:
          "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
        label: "Beginner",
      },
      intermediate: {
        icon: <TrendingUp className="w-3.5 h-3.5" />,
        className:
          "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20",
        label: "Intermediate",
      },
      advanced: {
        icon: <Award className="w-3.5 h-3.5" />,
        className:
          "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20",
        label: "Advanced",
      },
    }[difficulty];

    return (
      <span className={styles.className}>
        {styles.icon}
        {styles.label}
      </span>
    );
  };

  // Copy code functionality
  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Filter questions
  const filteredSections = useMemo(() => {
    return topicData.sections
      .map((section) => ({
        ...section,
        questions: section.questions.filter((q) => {
          const matchesSearch =
            searchQuery === "" ||
            q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.answer.text?.toLowerCase().includes(searchQuery.toLowerCase());

          const matchesDifficulty =
            difficultyFilter === "all" || q.difficulty === difficultyFilter;

          return matchesSearch && matchesDifficulty;
        }),
      }))
      .filter(
        (section) =>
          categoryFilter === "all" || section.title === categoryFilter
      )
      .filter((section) => section.questions.length > 0);
  }, [topicData.sections, searchQuery, categoryFilter, difficultyFilter]);

  // Answer content component with color-coded sections
  const AnswerContent = ({
    answer,
    sectionTitle,
    questionIdx,
  }: {
    answer: any;
    sectionTitle: string;
    questionIdx: number;
  }) => {
    const codeId = `${sectionTitle}-${questionIdx}`;

    return (
      <div className="space-y-4">
        {/* Answer Text - Emerald */}
        {answer.text && (
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                Answer
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">{answer.text}</p>
          </div>
        )}

        {/* Key Points - Blue */}
        {answer.points && answer.points.length > 0 && (
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">
                Key Points
              </span>
            </div>
            <ul className="space-y-2">
              {answer.points.map((point: string, pidx: number) => (
                <li
                  key={pidx}
                  className="flex items-start gap-3 text-slate-300"
                >
                  <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Code Block - Purple */}
        {answer.code && (
          <div className="bg-slate-950 border border-purple-500/30 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700/50">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-wide">
                  Code Example
                </span>
              </div>
              <button
                onClick={() => copyCode(answer.code, codeId)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors"
              >
                {copiedCode === codeId ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm text-slate-200">
              <code>{answer.code}</code>
            </pre>
          </div>
        )}

        {/* Important Notes - Amber */}
        {answer.note && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
                Important Note
              </span>
            </div>
            <p className="text-amber-200/90 leading-relaxed italic">
              {answer.note}
            </p>
          </div>
        )}

        {/* Examples */}
        {answer.examples && answer.examples.length > 0 && (
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-slate-200 mb-3">
              Examples:
            </h4>
            <ul className="space-y-2">
              {answer.examples.map((example: string, eidx: number) => (
                <li
                  key={eidx}
                  className="flex items-start gap-3 text-slate-300"
                >
                  <span className="text-cyan-400 mt-1 flex-shrink-0">→</span>
                  <span className="leading-relaxed">{example}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    categoryFilter !== "all" ||
    difficultyFilter !== "all";

  return (
    <div className="space-y-6">
      {/* Enhanced Filter Bar - Sticky with Backdrop Blur */}
      <div className="sticky top-20 z-10 bg-gradient-to-br from-slate-900/95 to-gray-900/95 backdrop-blur-md border border-slate-700/50 rounded-xl p-5 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {topicData.sections.map((section) => (
                <option key={section.title} value={section.title}>
                  {section.title}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="relative">
            <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Active Filters Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-700/50">
            <span className="text-xs text-slate-400">Active filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full">
                Search: "{searchQuery}"
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:bg-cyan-500/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {categoryFilter !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs bg-purple-500/10 text-purple-400 border border-purple-500/30 rounded-full">
                Category: {categoryFilter}
                <button
                  onClick={() => setCategoryFilter("all")}
                  className="hover:bg-purple-500/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {difficultyFilter !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full">
                Difficulty: {difficultyFilter}
                <button
                  onClick={() => setDifficultyFilter("all")}
                  className="hover:bg-blue-500/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery("");
                setCategoryFilter("all");
                setDifficultyFilter("all");
              }}
              className="ml-auto text-xs text-slate-400 hover:text-white transition-colors"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Questions Sections */}
      {filteredSections.length === 0 ? (
        <div className="text-center py-16 bg-gradient-to-br from-slate-900/50 to-gray-900/30 border border-slate-800 rounded-xl">
          <MessageSquare className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-300 mb-2">
            No questions found
          </h3>
          <p className="text-slate-400 mb-4">
            Try adjusting your filters or search query
          </p>
          {hasActiveFilters && (
            <button
              onClick={() => {
                setSearchQuery("");
                setCategoryFilter("all");
                setDifficultyFilter("all");
              }}
              className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {filteredSections.map((section) => (
            <div
              key={section.title}
              className="bg-gradient-to-br from-slate-900/60 to-gray-900/40 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm shadow-xl"
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30">
                  {getSectionIcon(section.title, section.icon || "📚")}
                </div>
                <h2 className="text-xl font-bold text-white">
                  {section.title}
                </h2>
                <span className="ml-auto text-sm text-slate-400">
                  {section.questions.length}{" "}
                  {section.questions.length === 1 ? "question" : "questions"}
                </span>
              </div>

              {/* Questions */}
              <div className="space-y-3">
                {section.questions.map((question, idx) => {
                  const key = `${section.title}-${idx}`;
                  const isExpanded = expanded[key];
                  return (
                    <div
                      key={idx}
                      className={`bg-gradient-to-br from-slate-900/60 to-gray-900/40 border rounded-xl overflow-hidden transition-all duration-300 ${
                        isExpanded
                          ? "border-cyan-500/50 ring-2 ring-cyan-500/20 shadow-lg shadow-cyan-500/10"
                          : "border-slate-700/30 hover:border-slate-600/50"
                      }`}
                    >
                      {/* Question Header */}
                      <button
                        onClick={() => toggleExpanded(section.title, idx)}
                        className="w-full text-left p-4 hover:bg-slate-800/30 transition-colors flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span
                            className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold transition-all ${
                              isExpanded
                                ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                                : "bg-slate-800/50 text-slate-400"
                            }`}
                          >
                            {idx + 1}
                          </span>
                          <span className="text-white font-medium flex-1">
                            {question.question}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <DifficultyBadge difficulty={question.difficulty} />
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                              isExpanded
                                ? "bg-cyan-500/20 text-cyan-400"
                                : "bg-slate-800/50 text-slate-400"
                            }`}
                          >
                            <span className="text-xl leading-none">
                              {isExpanded ? "−" : "+"}
                            </span>
                          </div>
                        </div>
                      </button>

                      {/* Answer Content */}
                      {isExpanded && (
                        <div className="px-4 pb-4">
                          <div className="pt-4 border-t border-slate-700/30">
                            <AnswerContent
                              answer={question.answer}
                              sectionTitle={section.title}
                              questionIdx={idx}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pro Tip */}
      {filteredSections.length > 0 && (
        <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30 flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Pro Tip</h3>
              <p className="text-slate-300 leading-relaxed">
                Use the difficulty filter to practice progressively. Start with
                beginner questions to build a solid foundation, then move to
                intermediate and advanced topics to master complex concepts.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionsPanel;
