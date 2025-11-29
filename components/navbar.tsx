"use client";

import type { InterviewResourcesMap, TopicKey } from "@/lib/interviewData";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  Code2,
  Layers,
  BookOpen,
  LogOut,
  User,
  UserCircle2,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();

  // Auth state
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
      toast.success("Logged out successfully! See you soon! 👋", {
        duration: 3000,
      });
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
        setIsUserMenuOpen(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isUserMenuOpen && !target.closest(".user-menu-container")) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserMenuOpen]);

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
            {/* Discover Bytes Drawer */}
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
                <span className="relative">Discover Bytes</span>
                <motion.div
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.button>

              {/* Slide-in Drawer from Top */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed left-0 right-0 top-20 mx-auto max-w-5xl px-4"
                    style={{ transformOrigin: "top" }}
                  >
                    <div className="rounded-2xl shadow-2xl bg-gradient-to-br from-gray-900/98 via-gray-800/98 to-gray-900/98 border border-cyan-500/30 overflow-hidden backdrop-blur-xl">
                      <div className="grid grid-cols-2 gap-6 p-6">
                        {/* Left Section - Learning Bytes */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 mb-4">
                            <BookOpen className="w-6 h-6 text-cyan-400" />
                            <h2 className="text-lg font-bold text-cyan-400 uppercase tracking-wide">
                              Learning Bytes
                            </h2>
                          </div>

                          {/* Interview Prep Topics */}
                          <div className="space-y-2">
                            <p className="text-xs text-gray-400 uppercase tracking-wider px-2 mb-3">
                              Interview Preparation
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              {topicsList.map((topic, index) => (
                                <motion.button
                                  key={topic}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
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
                                  <span className="flex-1 truncate">
                                    {topic}
                                  </span>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Section - Hands-On Tutorials */}
                        <div className="space-y-4 border-l border-gray-700/50 pl-6">
                          <div className="flex items-center gap-3 mb-4">
                            <Code2 className="w-6 h-6 text-purple-400" />
                            <h2 className="text-lg font-bold text-purple-400 uppercase tracking-wide">
                              Hands-On
                            </h2>
                          </div>

                          {/* System Design */}
                          <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Link
                              href="/system-design"
                              onClick={() => setIsDropdownOpen(false)}
                              className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-emerald-400 transition-all duration-200 rounded-lg border border-transparent hover:border-emerald-400/30 hover:bg-emerald-500/10 group"
                            >
                              <div className="flex items-center gap-3 mb-1">
                                <Layers className="w-5 h-5 text-emerald-400" />
                                <span className="font-semibold">
                                  System Design
                                </span>
                              </div>
                              <p className="text-xs text-gray-400 ml-8">
                                Master HLD & LLD Concepts
                              </p>
                            </Link>
                          </motion.div>

                          {/* React Tutorials */}
                          <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 }}
                          >
                            <Link
                              href="/react-tutorials"
                              onClick={() => setIsDropdownOpen(false)}
                              className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-purple-400 transition-all duration-200 rounded-lg border border-transparent hover:border-purple-400/30 hover:bg-purple-500/10 group"
                            >
                              <div className="flex items-center gap-3 mb-1">
                                <Code2 className="w-5 h-5 text-purple-400" />
                                <span className="font-semibold">
                                  React Tutorials
                                </span>
                              </div>
                              <p className="text-xs text-gray-400 ml-8">
                                Build React Components
                              </p>
                            </Link>
                          </motion.div>

                          {/* Spring Boot */}
                          <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Link
                              href="/spring-boot"
                              onClick={() => setIsDropdownOpen(false)}
                              className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-green-400 transition-all duration-200 rounded-lg border border-transparent hover:border-green-400/30 hover:bg-green-500/10 group"
                            >
                              <div className="flex items-center gap-3 mb-1">
                                <BookOpen className="w-5 h-5 text-green-400" />
                                <span className="font-semibold">
                                  Spring Boot
                                </span>
                              </div>
                              <p className="text-xs text-gray-400 ml-8">
                                Master Spring Boot
                              </p>
                            </Link>
                          </motion.div>

                          {/* Docker Tutorials */}
                          <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 }}
                          >
                            <Link
                              href="/docker-tutorials"
                              onClick={() => setIsDropdownOpen(false)}
                              className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-cyan-400 transition-all duration-200 rounded-lg border border-transparent hover:border-cyan-400/30 hover:bg-cyan-500/10 group"
                            >
                              <div className="flex items-center gap-3 mb-1">
                                <Code2 className="w-5 h-5 text-cyan-400" />
                                <span className="font-semibold">
                                  Docker Tutorials
                                </span>
                              </div>
                              <p className="text-xs text-gray-400 ml-8">
                                Master Containerization
                              </p>
                            </Link>
                          </motion.div>
                        </div>
                      </div>
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

            {/* CTA Button / User Menu */}
            {isAuthenticated ? (
              <div className="relative ml-2 lg:ml-3 user-menu-container">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-4 lg:px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-600/20 border border-purple-500/30 text-purple-300 hover:from-purple-500/30 hover:to-pink-600/30 transition-all"
                >
                  <UserCircle2 className="w-5 h-5" />
                  <span className="hidden sm:inline text-xs lg:text-sm font-semibold">
                    {user?.username || user?.email?.split("@")[0] || "User"}
                  </span>
                  <motion.div
                    animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </motion.button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-gray-900/95 border border-gray-700/50 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden z-50"
                    >
                      <div className="p-3 border-b border-gray-700/50">
                        <p className="text-xs text-gray-500">Signed in as</p>
                        <p className="text-sm text-white font-medium truncate">
                          {user?.email}
                        </p>
                      </div>

                      <div className="p-2">
                        <Link
                          href="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all"
                        >
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  router.push("/login");
                }}
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
              </motion.button>
            )}
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
                href="/spring-boot"
                className="flex items-center gap-2 text-green-400 hover:text-green-300 hover:bg-green-500/10 px-4 py-3 rounded-xl text-sm font-semibold transition-all border border-green-500/30"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <BookOpen className="w-4 h-4" />
                <span>Spring Boot</span>
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

              {isAuthenticated ? (
                <>
                  <div className="border-t border-gray-700/50 pt-3 mt-3">
                    <div className="px-4 py-2 mb-2">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm text-white font-medium truncate">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800/50 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push("/login");
                  }}
                  className="block bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-3 rounded-xl text-sm font-bold text-center shadow-lg w-full"
                >
                  Sign In
                </motion.button>
              )}

              <Link
                href="/signup"
                className="block text-center border-2 border-purple-500/50 text-purple-400 hover:bg-purple-500/10 px-4 py-3 rounded-xl text-sm font-bold transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started Free
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
