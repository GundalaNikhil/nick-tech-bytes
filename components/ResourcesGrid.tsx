import type { InterviewQuestionsMap, TopicKey } from "@/lib/interviewData";

type ResourcesGridProps = {
  topicsList: TopicKey[];
  interviewQuestions: InterviewQuestionsMap;
};

export default function ResourcesGrid({
  topicsList,
  interviewQuestions,
}: ResourcesGridProps) {
  return (
    <section
      id="resources"
      className="py-16 sm:py-24 bg-gradient-to-b from-black/50 to-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-3">
            Coverage Index
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              What We Dive Into Together
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Every topic is broken into digestible sections with curated
            questions, code, and notes so you know exactly what&apos;s covered
            before you jump in.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topicsList.map((topic) => {
            const topicData = interviewQuestions[topic];
            const totalQuestions = topicData.sections.reduce(
              (sum, section) => sum + section.questions.length,
              0
            );
            const highlightedSections = topicData.sections.slice(0, 3);

            return (
              <div
                key={topic}
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center mb-3">
                  <span className="text-4xl mr-3">{topicData.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{topic}</h3>
                    <p className="text-sm text-gray-400">
                      {totalQuestions}+ guided questions
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-cyan-400 mb-2">
                    Inside this track
                  </h4>
                  <ul className="space-y-2">
                    {highlightedSections.map((section) => (
                      <li
                        key={section.title}
                        className="flex items-start text-gray-300 text-sm"
                      >
                        <span className="text-cyan-400 mr-2 mt-1">•</span>
                        <div>
                          <p className="font-medium text-white">
                            {section.title}
                          </p>
                          <p className="text-xs text-gray-400">
                            {section.questions.length} focused prompts
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto p-4 bg-gray-900/40 rounded-lg border border-gray-800 text-sm text-gray-300">
                  Built for learners who want clarity, confidence, and
                  ready-to-use interview stories.
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
