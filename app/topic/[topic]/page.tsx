import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import QuestionsPanel from "@/components/QuestionsPanel";
import Footer from "@/components/footer";
import {
  interviewQuestions,
  interviewResources,
  topicsList,
  TopicKey,
} from "@/lib/interviewData";

type TopicPageProps = {
  params: Promise<{
    topic: string;
  }>;
};

const resolveTopicKey = (param: string): TopicKey | null => {
  const normalized = decodeURIComponent(param);
  return (
    topicsList.find(
      (topic) => topic.toLowerCase() === normalized.toLowerCase()
    ) ?? null
  );
};

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic } = await params;
  const topicKey = resolveTopicKey(topic);

  if (!topicKey) {
    notFound();
  }

  const topicData = interviewQuestions[topicKey];
  const totalQuestions = topicData.sections.reduce(
    (sum, section) => sum + section.questions.length,
    0
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar topicsList={topicsList} interviewResources={interviewResources} />

      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/explore"
            className="text-sm text-gray-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-2 mb-6"
          >
            <span className="text-lg">&larr;</span> Back to Topics
          </Link>

          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-xl flex items-center justify-center text-4xl border border-cyan-500/30">
                {topicData.icon}
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {topicKey}
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  {totalQuestions} interview questions
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-base max-w-3xl">
              Master {topicKey} with curated interview questions, detailed
              explanations, and practical code examples. Perfect for interview
              preparation and skill enhancement.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-400">
                {totalQuestions}
              </div>
              <div className="text-xs text-gray-500 mt-1">Total Questions</div>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-400">
                {topicData.sections.length}
              </div>
              <div className="text-xs text-gray-500 mt-1">Categories</div>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400">100%</div>
              <div className="text-xs text-gray-500 mt-1">Free Access</div>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-400">Updated</div>
              <div className="text-xs text-gray-500 mt-1">2024</div>
            </div>
          </div>

          <QuestionsPanel
            topicKey={topicKey}
            interviewQuestions={interviewQuestions}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
