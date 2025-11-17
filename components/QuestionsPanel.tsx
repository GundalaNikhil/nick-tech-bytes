"use client";

import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, Code } from "lucide-react";
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
  const topic = interviewQuestions[topicKey];

  if (!topic) {
    return null;
  }

  return (
    <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sm:p-8 animate-slideDown">
      <div className="flex items-center mb-8">
        <span className="text-5xl mr-4">{topic.icon}</span>
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            {topicKey}
          </h3>
          <p className="text-gray-400">Complete Interview Q&A Collection</p>
        </div>
      </div>

      <div className="mb-8 p-6 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/30 rounded-xl">
        <h4 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          What&apos;s Covered in {topicKey}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {topic.sections.map((section, idx) => (
            <div key={idx} className="flex items-start space-x-2">
              <span className="text-cyan-400 mt-1">✓</span>
              <div>
                <p className="text-white font-medium text-sm">{section.title}</p>
                <p className="text-gray-400 text-xs">
                  {section.questions.length} questions
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {topic.sections.map((section, idx) => (
        <TopicSection
          key={idx}
          title={section.title}
          icon={topic.icon}
          questions={section.questions}
          openQuestion={openQuestion}
          setOpenQuestion={setOpenQuestion}
        />
      ))}

      <div className="mt-8 p-6 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/30 rounded-xl">
        <div className="flex items-start">
          <BookOpen className="w-6 h-6 text-cyan-400 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h4 className="text-white font-semibold mb-2">Pro Tip</h4>
            <p className="text-gray-300 text-sm">
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
  <div className="mb-12">
    <div className="flex items-center space-x-3 mb-6">
      <span className="text-4xl">{icon}</span>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h3>
    </div>

    <div className="space-y-4">
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
  <div className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-cyan-500/50">
    <button
      onClick={onToggle}
      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors"
    >
      <div className="flex items-center space-x-3 flex-1">
        <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
          {index}
        </span>
        <h4 className="text-white font-semibold text-lg">{question}</h4>
      </div>
      {isOpen ? (
        <ChevronUp className="w-5 h-5 text-cyan-400 flex-shrink-0 ml-2" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
      )}
    </button>

    {isOpen && (
      <div className="px-6 pb-6 animate-slideDown">
        <div className="mt-4 pt-4 border-t border-gray-700">
          <AnswerContent answer={answer} />
        </div>
      </div>
    )}
  </div>
);

const AnswerContent = ({ answer }: { answer: Answer }) => (
  <div className="space-y-4">
    {answer.text && (
      <div className="text-gray-300 leading-relaxed">
        {answer.text.split("\n").map((paragraph, idx) => (
          <p key={idx} className="mb-3">
            {paragraph}
          </p>
        ))}
      </div>
    )}

    {answer.points && (
      <ul className="space-y-2">
        {answer.points.map((point, idx) => (
          <li key={idx} className="flex items-start">
            <span className="text-cyan-400 mr-3 mt-1">•</span>
            <span className="text-gray-300 flex-1">{point}</span>
          </li>
        ))}
      </ul>
    )}

    {answer.code && (
      <CodeBlock code={answer.code} language={answer.language || "java"} />
    )}

    {answer.note && (
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-4">
        <p className="text-yellow-200 text-sm">
          <span className="font-semibold">Note: </span>
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
    <div className="relative bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Code className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-gray-400">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded hover:bg-cyan-500/30 transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-gray-300">{code}</code>
      </pre>
    </div>
  );
};
