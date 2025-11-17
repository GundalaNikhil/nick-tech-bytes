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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navbar topicsList={topicsList} interviewResources={interviewResources} />

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/explore"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-2 mb-6"
          >
            <span className="text-lg">&larr;</span> Back to all topics
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
            <span className="text-6xl">
              {interviewQuestions[topicKey].icon}
            </span>
            <div>
              <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-2">
                Deep Dive
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold">{topicKey}</h1>
              <p className="text-gray-400 mt-2">
                Detailed interview questions, explanations, and code snippets
                curated for your next technical screen.
              </p>
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
