import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import QuestionsPanel from "../../../components/QuestionsPanel";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-slate-900 text-white">
      <Navbar topicsList={topicsList} interviewResources={interviewResources} />

      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/explore"
            className="text-sm text-slate-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-2 mb-8 group"
          >
            <span className="text-lg group-hover:-translate-x-1 transition-transform">
              &larr;
            </span>
            <span>Back to Topics</span>
          </Link>

          {/* Header Section */}
          <div className="mb-10">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center text-5xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                {topicData.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {topicKey}
                  </h1>
                  <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-semibold">
                    Free
                  </span>
                </div>
                <p className="text-slate-400 text-base max-w-3xl leading-relaxed">
                  Master {topicKey} with{" "}
                  <span className="text-cyan-400 font-semibold">
                    {totalQuestions} curated questions
                  </span>
                  , detailed explanations, and practical code examples.
                  <span className="text-purple-400">
                    {" "}
                    Perfect for interview preparation
                  </span>{" "}
                  and skill enhancement.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
              <div className="relative bg-slate-900/80 border border-cyan-500/30 rounded-xl p-5 backdrop-blur-sm">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent">
                  {totalQuestions}
                </div>
                <div className="text-xs text-slate-400 mt-1.5 font-medium">
                  Interview Questions
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
              <div className="relative bg-slate-900/80 border border-purple-500/30 rounded-xl p-5 backdrop-blur-sm">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {topicData.sections.length}
                </div>
                <div className="text-xs text-slate-400 mt-1.5 font-medium">
                  Topic Categories
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
              <div className="relative bg-slate-900/80 border border-emerald-500/30 rounded-xl p-5 backdrop-blur-sm">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  100%
                </div>
                <div className="text-xs text-slate-400 mt-1.5 font-medium">
                  Free Access
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl blur-sm group-hover:blur-md transition-all"></div>
              <div className="relative bg-slate-900/80 border border-orange-500/30 rounded-xl p-5 backdrop-blur-sm">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  2024
                </div>
                <div className="text-xs text-slate-400 mt-1.5 font-medium">
                  Last Updated
                </div>
              </div>
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
