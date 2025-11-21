import { SystemDesignCard } from '@/components/system-design/SystemDesignCard';
import { hldTopics, lldTopics } from '@/lib/topics/systemDesignTopics';
import { ArrowLeft, Layers, Code2 } from 'lucide-react';
import Link from 'next/link';

export default function SystemDesignPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 mb-4 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30">
              <Layers className="h-8 w-8 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                System Design Mastery
              </h1>
              <p className="text-gray-400 mt-1">
                Master HLD & LLD concepts for top product-based companies
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-6 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
              <span className="text-2xl font-bold text-emerald-400">{hldTopics.length}</span>
              <span className="text-sm text-gray-400">HLD Topics</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
              <span className="text-2xl font-bold text-cyan-400">{lldTopics.length}</span>
              <span className="text-sm text-gray-400">LLD Topics</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
              <span className="text-2xl font-bold text-blue-400">17</span>
              <span className="text-sm text-gray-400">Total Topics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* High-Level Design Section */}
        <section id="hld" className="mb-20">
          <div className="mb-8 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <Layers className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white">
                High-Level Design (HLD)
              </h2>
              <p className="mt-2 text-gray-400">
                Design scalable distributed systems and architect complex applications
              </p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {hldTopics.map((topic) => (
              <SystemDesignCard key={topic.slug} {...topic} />
            ))}
          </div>
        </section>

        {/* Low-Level Design Section */}
        <section id="lld">
          <div className="mb-8 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <Code2 className="h-6 w-6 text-cyan-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white">
                Low-Level Design (LLD)
              </h2>
              <p className="mt-2 text-gray-400">
                Master object-oriented design patterns and build robust software components
              </p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {lldTopics.map((topic) => (
              <SystemDesignCard key={topic.slug} {...topic} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
