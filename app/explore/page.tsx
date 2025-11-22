import TopicSelector from "@/components/TopicSelector";
import Footer from "@/components/footer";
import {
  interviewQuestions,
  interviewResources,
  topicsList,
} from "@/lib/interviewData";

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <section className="py-16 sm:py-24 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-4">
              Explore
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Choose Your Interview Topic
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Jump into curated interview prep tracks. Select a topic to view
              detailed Q&A, explanations, and pro tips.
            </p>
          </div>

          <TopicSelector
            topicsList={topicsList}
            interviewQuestions={interviewQuestions}
            interviewResources={interviewResources}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
