"use client";

import type { InterviewResourcesMap, TopicKey } from "@/lib/interviewData";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Code2, Layers, BookOpen } from "lucide-react";
import Image from "next/image";

type NavbarProps = {
  topicsList: TopicKey[];
  interviewResources: InterviewResourcesMap;
};

export default function Navbar({
  topicsList,
  interviewResources,
}: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();

  // Scroll detection for navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show navbar at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
        setIsDropdownOpen(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleTopicClick = (topic: TopicKey) => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    router.push(`/topic/${topic}`);
  };

  const handleTitleClick = () => {
    router.push("/");
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-gradient-to-r from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-xl border-b border-cyan-500/20 fixed top-0 left-0 right-0 z-50 shadow-2xl shadow-cyan-500/5"
    >
      <style jsx>{`
        .nav-link {
          position: relative;
          overflow: hidden;
        }

        .nav-link::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #06b6d4, #8b5cf6);
          transform: translateX(-50%);
          transition: width 0.3s ease;
        }

        .nav-link:hover::before {
          width: 80%;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex items-center space-x-2 sm:space-x-3 md:space-x-4"
          >
            {/* Animated Logo Icon */}
            <motion.div
              onClick={handleTitleClick}
              whileHover={{ scale: 1.08, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative cursor-pointer flex-shrink-0"
            >
              <div className="relative w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-18 xl:h-18 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/ntb-logo.svg"
                  alt="NTB Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Title SVG */}
            <motion.div
              onClick={handleTitleClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer flex-shrink-0"
            >
              <div className="relative h-10 sm:h-11 md:h-12 lg:h-14 xl:h-16 w-auto">
                <Image
                  src="/nicktechbytescom.svg"
                  alt="nicktechbytes.com"
                  width={500}
                  height={100}
                  className="h-full w-auto object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden md:flex items-center space-x-2"
          >
            {/* Explore Dropdown with Curtain Effect */}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="nav-link group px-5 lg:px-6 py-3 rounded-xl text-sm lg:text-base font-semibold bg-gradient-to-r from-cyan-500/10 to-purple-600/10 hover:from-cyan-500/20 hover:to-purple-600/20 border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 transition-all duration-300 flex items-center gap-2"
              >
                <span className="relative">Explore</span>
                <motion.div
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.button>

              {/* Curtain Dropdown */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute left-0 mt-2 w-96 rounded-2xl shadow-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-cyan-500/30 overflow-hidden backdrop-blur-xl"
                    style={{ transformOrigin: "top" }}
                  >
                    {/* Interview Prep Section */}
                    <div className="p-4 border-b border-gray-700/50">
                      <div className="flex items-center gap-2 mb-3 px-2">
                        <BookOpen className="w-5 h-5 text-cyan-400" />
                        <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wide">
                          Interview Prep
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {topicsList.map((topic, index) => (
                          <motion.button
                            key={topic}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03 }}
                            whileHover={{
                              scale: 1.05,
                              backgroundColor: "rgba(6, 182, 212, 0.15)",
                            }}
                            onClick={() => handleTopicClick(topic)}
                            className="text-left px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-cyan-400 transition-all duration-200 rounded-lg border border-transparent hover:border-cyan-400/30 flex items-center gap-2 group"
                          >
                            <span className="text-xl group-hover:scale-110 transition-transform">
                              {interviewResources[topic].icon}
                            </span>
                            <span className="flex-1 truncate">{topic}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* System Design Section */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="p-4 border-b border-gray-700/50"
                    >
                      <div className="flex items-center gap-2 mb-3 px-2">
                        <Layers className="w-5 h-5 text-emerald-400" />
                        <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wide">
                          System Design
                        </h3>
                      </div>
                      <Link
                        href="/system-design"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-emerald-400 transition-all duration-200 rounded-lg border border-transparent hover:border-emerald-400/30 hover:bg-emerald-500/10"
                      >
                        <div className="flex items-center justify-between">
                          <span>Master HLD & LLD Concepts</span>
                          <motion.svg
                            whileHover={{ x: 5 }}
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </motion.svg>
                        </div>
                      </Link>
                    </motion.div>

                    {/* React Tutorials Section */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="p-4"
                    >
                      <div className="flex items-center gap-2 mb-3 px-2">
                        <Code2 className="w-5 h-5 text-purple-400" />
                        <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wide">
                          React Tutorials
                        </h3>
                      </div>
                      <Link
                        href="/react-tutorials"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-purple-400 transition-all duration-200 rounded-lg border border-transparent hover:border-purple-400/30 hover:bg-purple-500/10"
                      >
                        <div className="flex items-center justify-between">
                          <span>Build React Components</span>
                          <motion.svg
                            whileHover={{ x: 5 }}
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </motion.svg>
                        </div>
                      </Link>
                    </motion.div>

                    {/* Footer */}
                    <div className="bg-gradient-to-r from-cyan-500/10 to-purple-600/10 p-3 border-t border-cyan-500/20">
                      <p className="text-xs text-gray-400 text-center">
                        ✨ Choose your learning path
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Blog Link */}
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/blog"
                className="nav-link px-3 lg:px-5 py-2.5 rounded-xl text-xs lg:text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
              >
                Blog
              </Link>
            </motion.div>

            {/* About Link */}
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/about"
                className="nav-link px-3 lg:px-5 py-2.5 rounded-xl text-xs lg:text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 whitespace-nowrap"
              >
                About Us
              </Link>
            </motion.div>

            {/* CTA Button */}
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="relative ml-2 lg:ml-3 px-4 lg:px-6 py-2.5 rounded-xl text-xs lg:text-sm font-bold text-white overflow-hidden group"
            >
              <motion.div
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-[length:200%_100%]"
                style={{ backgroundSize: "200% 100%" }}
              />
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Sign In
              </span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ scale: 0, opacity: 1 }}
                whileHover={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </motion.a>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden pb-6 pt-2 space-y-3 overflow-hidden"
            >
              <details className="group">
                <summary className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer list-none transition-all flex items-center justify-between border border-cyan-500/30">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Interview Prep</span>
                  </div>
                  <svg
                    className="w-4 h-4 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="mt-2 ml-2 space-y-1 pl-4 border-l-2 border-cyan-500/30">
                  {topicsList.map((topic) => (
                    <motion.button
                      key={topic}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTopicClick(topic)}
                      className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-400 hover:text-cyan-400 hover:bg-gray-800/30 rounded-lg transition-all flex items-center gap-2"
                    >
                      <span className="text-xl">
                        {interviewResources[topic].icon}
                      </span>
                      {topic}
                    </motion.button>
                  ))}
                </div>
              </details>

              <Link
                href="/system-design"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 px-4 py-3 rounded-xl text-sm font-semibold transition-all border border-emerald-500/30"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Layers className="w-4 h-4" />
                <span>System Design</span>
              </Link>

              <Link
                href="/react-tutorials"
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 px-4 py-3 rounded-xl text-sm font-semibold transition-all border border-purple-500/30"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Code2 className="w-4 h-4" />
                <span>React Tutorials</span>
              </Link>

              <Link
                href="/blog"
                className="block text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>

              <Link
                href="/about"
                className="block text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>

              <motion.a
                whileTap={{ scale: 0.95 }}
                href="#"
                className="block bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-3 rounded-xl text-sm font-bold text-center shadow-lg"
              >
                Sign In
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
