"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import type { InterviewResourcesMap, TopicKey } from "@/lib/interviewData";

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
  const router = useRouter();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      const text = "NICK TECH BYTES";
      const words = text.split(" ");
      titleRef.current.innerHTML = words
        .map((word, wordIndex) => {
          const letters = word.split("");
          return `<span class="word inline-block mr-3">${letters
            .map(
              (letter, i) =>
                `<span class="letter inline-block" style="animation-delay: ${
                  (wordIndex * 5 + i) * 0.05
                }s">${letter}</span>`
            )
            .join("")}</span>`;
        })
        .join("");

      // GSAP animation for title
      gsap.from(".letter", {
        opacity: 0,
        y: -20,
        rotationX: -90,
        stagger: 0.05,
        duration: 0.8,
        ease: "back.out(1.7)",
      });
    }
  }, []);

  const handleTopicClick = (topic: TopicKey) => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    router.push(`/topic/${topic}`);
  };

  const handleTitleClick = () => {
    router.push("/");
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900/95 via-black/95 to-gray-900/95 backdrop-blur-xl border-b border-cyan-500/20 sticky top-0 z-50 shadow-2xl shadow-cyan-500/5">
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes glow {
          0%,
          100% {
            text-shadow: 0 0 10px rgba(6, 182, 212, 0.5),
              0 0 20px rgba(6, 182, 212, 0.3), 0 0 30px rgba(6, 182, 212, 0.2);
          }
          50% {
            text-shadow: 0 0 20px rgba(6, 182, 212, 0.8),
              0 0 30px rgba(6, 182, 212, 0.5), 0 0 40px rgba(6, 182, 212, 0.3);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .letter {
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          display: inline-block;
        }

        .title-hover:hover .letter {
          animation: float 0.6s ease-in-out;
          color: transparent;
        }

        .title-hover:hover .letter:nth-child(odd) {
          animation-delay: 0s;
        }

        .title-hover:hover .letter:nth-child(even) {
          animation-delay: 0.1s;
        }

        .title-hover {
          background: linear-gradient(
            90deg,
            #06b6d4,
            #3b82f6,
            #8b5cf6,
            #06b6d4
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }

        .title-hover:hover {
          animation: shimmer 1s linear infinite, glow 1.5s ease-in-out infinite;
        }

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
            className="flex items-center space-x-4"
          >
            {/* Animated Icon */}
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <span className="text-2xl font-bold text-white">N</span>
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 opacity-30 blur-md"
              />
            </motion.div>

            {/* Title */}
            <motion.h1
              ref={titleRef}
              onClick={handleTitleClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="title-hover text-2xl sm:text-3xl font-black tracking-tight cursor-pointer select-none"
            >
              NICK TECH BYTES
            </motion.h1>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden md:flex items-center space-x-2"
          >
            {/* Interview Prep Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="nav-link group px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2 hover:bg-gray-800/50"
              >
                <span className="relative">Interview Prep</span>
                <motion.svg
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-4 h-4"
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
                </motion.svg>
              </motion.button>

              {/* Curtain Dropdown */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute left-0 mt-2 w-72 rounded-2xl shadow-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-cyan-500/30 overflow-hidden backdrop-blur-xl"
                    style={{ transformOrigin: "top" }}
                  >
                    <div className="p-3 space-y-1">
                      {topicsList.map((topic, index) => (
                        <motion.button
                          key={topic}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{
                            x: 8,
                            backgroundColor: "rgba(6, 182, 212, 0.15)",
                          }}
                          onClick={() => handleTopicClick(topic)}
                          className="w-full text-left px-4 py-3 text-sm font-medium text-gray-300 hover:text-cyan-400 transition-all duration-200 rounded-xl border-l-2 border-transparent hover:border-cyan-400 flex items-center gap-3 group"
                        >
                          <span className="text-2xl group-hover:scale-110 transition-transform">
                            {interviewResources[topic].icon}
                          </span>
                          <span className="flex-1">{topic}</span>
                          <motion.svg
                            initial={{ opacity: 0, x: -10 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            className="w-4 h-4 text-cyan-400"
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
                        </motion.button>
                      ))}
                    </div>
                    <div className="bg-gradient-to-r from-cyan-500/10 to-purple-600/10 p-3 border-t border-cyan-500/20">
                      <p className="text-xs text-gray-400 text-center">
                        ✨ Select a topic to begin your journey
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* System Design Link */}
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/system-design"
                className="nav-link px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
              >
                System Design
              </Link>
            </motion.div>

            {/* Blog Link */}
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/blog"
                className="nav-link px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
              >
                Blog
              </Link>
            </motion.div>

            {/* About Link */}
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/about"
                className="nav-link px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
              >
                About Us
              </Link>
            </motion.div>

            {/* CTA Button */}
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="relative ml-3 px-6 py-2.5 rounded-xl text-sm font-bold text-white overflow-hidden group"
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
                <summary className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer list-none transition-all">
                  Interview Prep ▾
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
                href="/blog"
                className="block text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
              >
                Blog
              </Link>

              <Link
                href="/about"
                className="block text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
              >
                About Us
              </Link>

              <a
                href="#"
                className="block bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-3 rounded-xl text-sm font-bold text-center shadow-lg"
              >
                Sign In
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
