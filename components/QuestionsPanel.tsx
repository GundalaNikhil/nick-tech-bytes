"use client";

import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Code,
  Filter,
  Search,
} from "lucide-react";
import type {
  InterviewQuestionsMap,
  TopicKey,
  Answer,
} from "@/lib/interviewData";

type QuestionsPanelProps = {
  topicKey: TopicKey;
  interviewQuestions: InterviewQuestionsMap;
};

export default function QuestionsPanel({
  topicKey,
  interviewQuestions,
}: QuestionsPanelProps) {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const topic = interviewQuestions[topicKey];

  if (!topic) {
    return null;
  }

  const filteredSections = topic.sections
    .map((section) => ({
      ...section,
      questions: section.questions.filter((q) =>
        searchQuery
          ? q.question.toLowerCase().includes(searchQuery.toLowerCase())
          : true
      ),
    }))
    .filter((section) =>
      selectedSection === "all" ? true : section.title === selectedSection
    )
    .filter((section) => section.questions.length > 0);

  return (
    <div className="space-y-6">
      {/* Filter and Search Bar */}
      <div className="sticky top-20 z-10 bg-[#0a0a0a]/95 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-8 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors appearance-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {topic.sections.map((section, idx) => (
                <option key={idx} value={section.title}>
                  {section.title} ({section.questions.length})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(searchQuery || selectedSection !== "all") && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-800">
            <span className="text-xs text-gray-500">Active filters:</span>
            {searchQuery && (
              <span className="text-xs bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded border border-cyan-500/30">
                Search: "{searchQuery}"
              </span>
            )}
            {selectedSection !== "all" && (
              <span className="text-xs bg-purple-500/10 text-purple-400 px-2 py-1 rounded border border-purple-500/30">
                {selectedSection}
              </span>
            )}
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSection("all");
              }}
              className="text-xs text-gray-400 hover:text-white ml-auto transition-colors"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Questions */}
      {filteredSections.length > 0 ? (
        filteredSections.map((section, idx) => (
          <TopicSection
            key={idx}
            title={section.title}
            icon={topic.icon}
            questions={section.questions}
            openQuestion={openQuestion}
            setOpenQuestion={setOpenQuestion}
          />
        ))
      ) : (
        <div className="text-center py-12 bg-gray-900/30 border border-gray-800 rounded-lg">
          <p className="text-gray-400">
            No questions found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedSection("all");
            }}
            className="mt-4 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Pro Tip */}
      <div className="bg-gradient-to-r from-cyan-500/5 to-purple-600/5 border border-cyan-500/20 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-white font-semibold mb-2 text-sm">Pro Tip</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Practice these questions out loud and try to explain concepts as
              if you&apos;re teaching someone. This will help you articulate
              your knowledge clearly during interviews.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

type TopicSectionProps = {
  title: string;
  icon: string;
  questions: { question: string; answer: Answer }[];
  openQuestion: string | null;
  setOpenQuestion: (value: string | null) => void;
};

const TopicSection = ({
  title,
  icon,
  questions,
  openQuestion,
  setOpenQuestion,
}: TopicSectionProps) => (
  <div className="space-y-3">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-lg flex items-center justify-center text-xl border border-cyan-500/30">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <span className="ml-auto text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
        {questions.length} questions
      </span>
    </div>

    <div className="space-y-2">
      {questions.map((q, idx) => (
        <QuestionCard
          key={idx}
          question={q.question}
          answer={q.answer}
          index={idx + 1}
          isOpen={openQuestion === `${title}-${idx}`}
          onToggle={() =>
            setOpenQuestion(
              openQuestion === `${title}-${idx}` ? null : `${title}-${idx}`
            )
          }
        />
      ))}
    </div>
  </div>
);

type QuestionCardProps = {
  question: string;
  answer: Answer;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

const QuestionCard = ({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: QuestionCardProps) => (
  <div
    className={`bg-gray-900/50 border rounded-lg overflow-hidden transition-all duration-200 ${
      isOpen
        ? "border-cyan-500/50 shadow-lg shadow-cyan-500/10"
        : "border-gray-800 hover:border-gray-700"
    }`}
  >
    <button
      onClick={onToggle}
      className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-900/70 transition-colors"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span
          className={`shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-xs font-semibold ${
            isOpen
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
              : "bg-gray-800 text-gray-400"
          }`}
        >
          {index}
        </span>
        <h4 className="text-white font-medium text-sm sm:text-base truncate">
          {question}
        </h4>
      </div>
      {isOpen ? (
        <ChevronUp className="w-5 h-5 text-cyan-400 shrink-0 ml-2" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-500 shrink-0 ml-2" />
      )}
    </button>

    {isOpen && (
      <div className="px-5 pb-5">
        <div className="pt-4 border-t border-gray-800">
          <AnswerContent answer={answer} />
        </div>
      </div>
    )}
  </div>
);

const AnswerContent = ({ answer }: { answer: Answer }) => (
  <div className="space-y-4">
    {answer.text && (
      <div className="text-gray-300 leading-relaxed text-sm">
        {answer.text.split("\n").map((paragraph, idx) => (
          <p key={idx} className="mb-2">
            {paragraph}
          </p>
        ))}
      </div>
    )}

    {answer.points && (
      <ul className="space-y-2.5">
        {answer.points.map((point, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="text-cyan-400 mt-1 shrink-0">•</span>
            <span className="text-gray-300 text-sm leading-relaxed">
              {point}
            </span>
          </li>
        ))}
      </ul>
    )}

    {answer.code && (
      <CodeBlock code={answer.code} language={answer.language || "java"} />
    )}

    {answer.note && (
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4 mt-4">
        <p className="text-amber-200/90 text-sm">
          <span className="font-semibold">💡 Note: </span>
          {answer.note}
        </p>
      </div>
    )}
  </div>
);

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800">
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900/80 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-cyan-400" />
          <span className="text-xs text-gray-400 font-mono">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded hover:bg-cyan-500/20 transition-colors border border-cyan-500/20"
        >
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-gray-300 font-mono">{code}</code>
      </pre>
    </div>
  );
};
