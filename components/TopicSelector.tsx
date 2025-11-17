import Link from "next/link";
import type {
  InterviewQuestionsMap,
  InterviewResourcesMap,
  TopicKey,
} from "@/lib/interviewData";

type TopicSelectorProps = {
  topicsList: TopicKey[];
  interviewQuestions: InterviewQuestionsMap;
  interviewResources: InterviewResourcesMap;
  getTopicHref?: (topic: TopicKey) => string;
};

export default function TopicSelector({
  topicsList,
  interviewQuestions,
  interviewResources,
  getTopicHref = (topic) => `/topic/${topic}`,
}: TopicSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {topicsList.map((topic) => (
        <Link
          key={topic}
          href={getTopicHref(topic)}
          className="p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 bg-gray-800/30 border-gray-700 hover:border-gray-600"
        >
          <div className="text-5xl mb-4">{interviewResources[topic].icon}</div>
          <h3 className="text-xl font-bold text-white mb-2">{topic}</h3>
          <p className="text-gray-400 text-sm">
            {interviewQuestions[topic].sections.reduce(
              (acc, section) => acc + section.questions.length,
              0
            )}{" "}
            Questions
          </p>
        </Link>
      ))}
    </div>
  );
}
