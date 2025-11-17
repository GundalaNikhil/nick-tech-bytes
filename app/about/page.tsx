import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  interviewResources,
  topicsList,
} from "@/lib/interviewData";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navbar topicsList={topicsList} interviewResources={interviewResources} />

      <main className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <header className="text-center space-y-6">
            <p className="uppercase tracking-[0.3em] text-xs text-gray-500">
              About Us
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Nick Tech Bytes — Built by Learners, for Learners
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              We&apos;re a scrappy community of night-owls, weekend grinders,
              and coffee-powered engineers turning interview dread into
              confidence. Every byte of content is research-backed, story-driven,
              and SEO-ready so more folks struggling at 2 AM can find help.
            </p>
          </header>

          <section className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 sm:p-12 space-y-6 text-gray-300 leading-relaxed">
            <p className="text-lg">
              <span className="text-cyan-400 font-semibold">
                I&apos;m one of you.
              </span>{" "}
              Someone who rewrote linked lists until sunrise, who doubted every
              design diagram, and who wanted explanations written in human
              language. Nick Tech Bytes is that translated guide.
            </p>
            <p>
              You&apos;ll find keyword-rich walkthroughs on system architecture,
              REST best practices, Docker deployments, and modern React patterns
              so search engines can connect other learners here too.
            </p>
            <p>
              Every question is curated, every explanation simplified without
              losing accuracy, and every snippet tested. This isn&apos;t just
              another prep site—it&apos;s lived experience documented to help
              you succeed faster.
            </p>
            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border-l-4 border-cyan-400 p-6 rounded-r-xl">
              <p className="text-white font-medium italic">
                &ldquo;My mission is simple: break down complex technical concepts
                into bite-sized pieces that actually make sense—because everyone
                deserves a fair shot at their dream tech career.&rdquo;
              </p>
            </div>
            <p>
              Whether you&apos;re preparing for backend architecture rounds,
              product-based React interviews, or Docker deployment questions,
              you&apos;ll get empathetic, SEO-aware content that keeps you moving
              forward.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Stat icon="🎯" title="Focused" text="Only what matters" />
              <Stat icon="💡" title="Clear" text="Plain analogies & code" />
              <Stat icon="❤️" title="Authentic" text="Born from experience" />
            </div>
            <p className="text-center text-lg">
              <span className="text-cyan-400 font-semibold">
                You&apos;ve got this.
              </span>{" "}
              We&apos;re here to support every step—from first mock interview to
              final offer celebration.
            </p>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <article className="bg-gray-900/40 border border-gray-800 rounded-2xl p-8 space-y-4">
              <h2 className="text-2xl font-bold text-white">
                The 2 AM Story
              </h2>
              <p className="text-gray-300">
                Nick Tech Bytes started in the quiet hours when interview prep felt
                lonely. We logged every confusion, every aha moment, and every
                mistake. The result? Guides that read like a teammate coaching you
                through the hard parts.
              </p>
              <p className="text-gray-400">
                Expect detailed breakdowns, realistic trade-offs, and checklists you
                can revisit before big days.
              </p>
            </article>

            <article className="bg-gray-900/40 border border-gray-800 rounded-2xl p-8 space-y-4">
              <h2 className="text-2xl font-bold text-white">
                We&apos;re A Community
              </h2>
              <p className="text-gray-300">
                From Discord chats to peer mock loops, NTB thrives on collective wins.
                Share what worked for you, add missing insights, and help the next
                engineer climb.
              </p>
              <p className="text-gray-400">
                Our roadmap includes contributor spotlights, success stories, and
                real-world system breakdowns sourced from the community.
              </p>
            </article>
          </section>

          <section className="bg-gray-900/30 border border-gray-800 rounded-2xl p-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">
              What&apos;s Coming Next
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li>✦ Weekly newsletter with curated interview news and trends</li>
              <li>✦ Deep dives into real-world production incidents and how to discuss them</li>
              <li>✦ Community-driven Q&A vault with video breakdowns</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

const Stat = ({ icon, title, text }: { icon: string; title: string; text: string }) => (
  <div className="text-center p-6 bg-gray-800/30 rounded-xl">
    <div className="text-3xl mb-2">{icon}</div>
    <div className="text-white font-semibold">{title}</div>
    <div className="text-sm text-gray-400">{text}</div>
  </div>
);

