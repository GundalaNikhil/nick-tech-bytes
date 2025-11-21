import Link from 'next/link';
import { ArrowRight, Target, Rocket, TrendingUp } from 'lucide-react';

export function HomeSystemDesignBanner() {
  return (
    <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-gray-900 to-cyan-950/40">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-sm">
              <Target className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-300">
                Career Transformation
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-white">Targeting</span>{' '}
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Product-Based
                </span>{' '}
                <span className="text-white">Companies?</span>
              </h2>
              
              <p className="text-xl text-gray-400 max-w-xl">
                Feeling stuck in service companies? Ready to make the leap to top-tier tech giants?
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              {[
                { icon: Rocket, text: 'Master System Design for FAANG interviews' },
                { icon: TrendingUp, text: 'Learn from real-world architectures' },
                { icon: Target, text: 'Land your dream role at product companies' },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <div className="flex-shrink-0 p-2 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                    <feature.icon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/system-design"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105"
            >
              <span className="text-lg font-semibold text-white">
                Start Your Journey
              </span>
              <ArrowRight className="h-5 w-5 text-white transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">17+</div>
                <div className="text-sm text-gray-400">Topics Covered</div>
              </div>
              <div className="h-12 w-px bg-gray-700" />
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">100+</div>
                <div className="text-sm text-gray-400">Code Examples</div>
              </div>
              <div className="h-12 w-px bg-gray-700" />
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">FAANG</div>
                <div className="text-sm text-gray-400">Interview Ready</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main Card */}
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">System Design</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                  </div>

                  {/* Topics Preview */}
                  <div className="space-y-3">
                    {[
                      { title: 'URL Shortener', level: 'Intermediate', color: 'yellow' },
                      { title: 'Chat Application', level: 'Intermediate', color: 'yellow' },
                      { title: 'Video Streaming', level: 'Advanced', color: 'red' },
                      { title: 'LRU Cache', level: 'Intermediate', color: 'yellow' },
                    ].map((topic, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-emerald-500/50 transition-colors"
                      >
                        <span className="text-gray-300">{topic.title}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          topic.color === 'yellow' 
                            ? 'bg-yellow-500/10 text-yellow-400' 
                            : 'bg-red-500/10 text-red-400'
                        }`}>
                          {topic.level}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Arrow indicator */}
                  <div className="flex items-center gap-2 text-emerald-400 animate-pulse">
                    <span className="text-sm font-medium">View all topics</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 p-4 rounded-xl bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/30">
                <Rocket className="h-8 w-8 text-emerald-400" />
              </div>
              <div className="absolute -bottom-4 -left-4 p-4 rounded-xl bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/30">
                <Target className="h-8 w-8 text-cyan-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
