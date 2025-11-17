"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
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

  const handleTopicClick = (topic: TopicKey) => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    router.push(`/topic/${topic}`);
  };

  return (
    <nav className="bg-black/50 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              NICK TECH BYTES
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <div className="relative">
              <button
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              >
                Interview Prep ▾
              </button>
              {isDropdownOpen && (
                <div
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  className="absolute left-0 mt-2 w-64 rounded-xl shadow-2xl bg-gray-900 border border-gray-800 ring-1 ring-black ring-opacity-5 z-10 overflow-hidden"
                >
                  <div className="py-2">
                    {topicsList.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => handleTopicClick(topic)}
                        className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-purple-600/10 hover:text-white transition-all duration-200 border-l-2 border-transparent hover:border-cyan-400"
                      >
                        {interviewResources[topic].icon} {topic}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/blog"
              className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              About Us
            </Link>
            <a
              href="#"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-cyan-500/50"
            >
              Sign In/Up
            </a>
          </div>

          <div className="md:hidden">
            <button
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
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <details className="group">
              <summary className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-3 rounded-lg text-sm font-medium cursor-pointer list-none">
                Interview Prep ▾
              </summary>
              <div className="mt-2 ml-4 space-y-1">
                {topicsList.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleTopicClick(topic)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800/30 rounded-lg"
                  >
                    {interviewResources[topic].icon} {topic}
                  </button>
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
          </div>
        )}
      </div>
    </nav>
  );
}
