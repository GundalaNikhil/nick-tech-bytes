"use client";

type HeroProps = {
  onExploreMore: () => void;
};

export default function Hero({ onExploreMore }: HeroProps) {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
              Byte-Sized Tech Wisdom
            </span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-light max-w-4xl mx-auto">
            Where code meets curiosity, one byte at a time{" "}
            <span className="inline-block animate-bounce">⚡</span>
          </p>

          <div className="flex items-center justify-center space-x-2 py-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500"></div>
            <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-600"></div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Master Your{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Technical Interviews
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
            Comprehensive Q&A with code examples, detailed explanations, and
            best practices for Java, Spring Boot, ReactJS, System Design, and
            Docker.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button
              onClick={onExploreMore}
              className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-cyan-500/50 hover:scale-105"
            >
              Explore More
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 max-w-3xl mx-auto">
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                40+
              </div>
              <div className="text-gray-400 mt-2">Interview Questions</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                6
              </div>
              <div className="text-gray-400 mt-2">Core Topics</div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-gray-400 mt-2">Free Content</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
