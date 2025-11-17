"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
      const letters = titleRef.current.textContent?.split("") || [];
      titleRef.current.innerHTML = letters
        .map((letter, i) => 
          letter === " " 
            ? "<span class='inline-block'>&nbsp;</span>" 
            : `<span class="letter inline-block" style="animation-delay: ${i * 0.03}s">${letter}</span>`
        )
        .join("");
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
    <nav className="bg-black/50 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
      <style jsx>{`
        @keyframes letterPop {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .letter {
          transition: all 0.3s ease;
        }
        
        .title-hover:hover .letter {
          animation: letterPop 0.5s ease;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <motion.h1
              ref={titleRef}
              onClick={handleTitleClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="title-hover text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent cursor-pointer select-none"
            >
              NICK TECH BYTES
            </motion.h1>
          </motion.div>

          {/* Desktop Menu */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center space-x-1"
          >
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              >
                Interview Prep ▾
              </motion.button>
              
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  className="absolute left-0 mt-2 w-64 rounded-xl shadow-2xl bg-gray-900 border border-gray-800 ring-1 ring-black ring-opacity-5 z-10 overflow-hidden"
                >
                  <div className="py-2">
                    {topicsList.map((topic, index) => (
                      <motion.button
                        key={topic}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 5, backgroundColor: "rgba(6, 182, 212, 0.1)" }}
                        onClick={() => handleTopicClick(topic)}
                        className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white transition-all duration-200 border-l-2 border-transparent hover:border-cyan-400"
                      >
                        {interviewResources[topic].icon} {topic}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/blog"
                className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              >
                Blog
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/about"
                className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              >
                About Us
              </Link>
            </motion.div>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-cyan-500/50"
            >
              Sign In/Up
            </motion.a>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
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
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden pb-4 space-y-2"
          >
            <details className="group">
              <summary className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-3 rounded-lg text-sm font-medium cursor-pointer list-none">
                Interview Prep ▾
              </summary>
              <div className="mt-2 ml-4 space-y-1">
                {topicsList.map((topic) => (
                  <motion.button
                    key={topic}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTopicClick(topic)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800/30 rounded-lg"
                  >
                    {interviewResources[topic].icon} {topic}
                  </motion.button>
                ))}
              </div>
            </details>
            
            <Link
              href="/blog"
              className="block text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-3 rounded-lg text-sm font-medium"
            >
              Blog
            </Link>
            
            <Link
              href="/about"
              className="block text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-3 rounded-lg text-sm font-medium"
            >
              About Us
            </Link>
            
            <a
              href="#"
              className="block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-3 rounded-lg text-sm font-semibold text-center"
            >
              Sign In/Up
            </a>
          </motion.div>
        )}
      </div>
    </nav>
  );
}