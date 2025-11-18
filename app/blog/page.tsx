import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { interviewResources, topicsList } from "@/lib/interviewData";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navbar topicsList={topicsList} interviewResources={interviewResources} />

      <main className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="uppercase tracking-[0.3em] text-xs text-gray-500">
            Blog
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Coming Soon…
            </span>
          </h1>
          <p className="text-gray-300 text-lg">
            We&apos;re crafting deep-dive issues on newsletter-worthy interview
            insights, real-world incident breakdowns, and practical
            problem-solving stories. Stay tuned for launch updates.
          </p>
          <div className="bg-gray-800/30 border border-gray-700 rounded-2xl p-8 text-left space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              What to expect:
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li>
                ✦ Weekly newsletter featuring curated interview news and
                patterns
              </li>
              <li>
                ✦ Issue-based essays on real-world system failures and
                recoveries
              </li>
              <li>
                ✦ Real-world problem breakdowns you can reference during
                interviews
              </li>
              <li>
                ✦ Community shout-outs and stories that keep us all motivated
              </li>
            </ul>
          </div>
          <p className="text-gray-400">
            Want to know the moment we launch? Follow the newsletter banner
            (coming soon) or drop a note in our community.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
