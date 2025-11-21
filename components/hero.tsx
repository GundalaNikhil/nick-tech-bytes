"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import RubiksCube from "./RubiksCube";

type HeroProps = {
  onExploreMore: () => void;
};

export default function Hero({ onExploreMore }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title letters
      gsap.from(".title-word", {
        duration: 1,
        opacity: 0,
        y: 100,
        rotationX: -90,
        transformOrigin: "center bottom",
        stagger: 0.2,
        ease: "back.out(1.7)",
      });

      // Animate subtitle
      gsap.from(subtitleRef.current, {
        duration: 1,
        opacity: 0,
        y: 50,
        delay: 0.8,
        ease: "power3.out",
      });

      // Animate stats cards
      gsap.from(".stat-card", {
        duration: 0.8,
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        delay: 1.2,
        ease: "back.out(1.7)",
      });

      // Continuous floating animation for blobs
      gsap.to(".blob-1", {
        x: 50,
        y: 30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".blob-2", {
        x: -30,
        y: 50,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="blob-1 absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="blob-2 absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center space-y-8">
          {/* Main Title with Split Animation */}
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight"
            style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
          >
            <span className="block overflow-hidden">
              <span className="title-word inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Byte-Sized
              </span>{" "}
              <span className="title-word inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Tech
              </span>{" "}
              <span className="title-word inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Wisdom
              </span>
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-light max-w-4xl mx-auto"
            style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
          >
            Where code meets curiosity, one byte at a time{" "}
            <motion.span
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              ⚡
            </motion.span>
          </p>

          {/* Animated Divider */}
          <div className="flex items-center justify-center space-x-2 py-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent to-cyan-500"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-2 h-2 rounded-full bg-cyan-500"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="h-px bg-gradient-to-l from-transparent to-purple-600"
            />
          </div>

          {/* Two Column Layout - Master Your Technical Interviews */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto pt-16"
          >
            {/* Left Column - Content */}
            <div className="space-y-6 text-left px-4 lg:px-8">
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
                style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
              >
                Master Your{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  Technical Interviews
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed"
                style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
              >
                Comprehensive Q&A with code examples, detailed explanations, and
                best practices for Java, Spring Boot, ReactJS, System Design,
                and Docker.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.0, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-start gap-4 pt-4"
              >
                <motion.button
                  onClick={onExploreMore}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(6, 182, 212, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 shadow-lg"
                >
                  Explore More
                </motion.button>
              </motion.div>

              {/* Feature Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white">✓</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      Real Questions
                    </div>
                    <div className="text-gray-400 text-sm">
                      From actual interviews
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white">✓</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      Code Examples
                    </div>
                    <div className="text-gray-400 text-sm">
                      Production-ready snippets
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <span className="text-white">✓</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      Best Practices
                    </div>
                    <div className="text-gray-400 text-sm">
                      Industry standards
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center">
                    <span className="text-white">✓</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Free Access</div>
                    <div className="text-gray-400 text-sm">
                      100% free forever
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Rubik's Cube */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="flex items-center justify-center min-h-[500px] lg:min-h-[600px]"
            >
              <RubiksCube />
            </motion.div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 max-w-3xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="stat-card bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                40+
              </div>
              <div
                className="text-gray-400 mt-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Interview Questions
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="stat-card bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                6
              </div>
              <div
                className="text-gray-400 mt-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Core Topics
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="stat-card bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                100%
              </div>
              <div
                className="text-gray-400 mt-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Free Content
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
