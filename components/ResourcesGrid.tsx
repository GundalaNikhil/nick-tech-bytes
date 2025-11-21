"use client";

import type { InterviewQuestionsMap, TopicKey } from "@/lib/interviewData";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type ResourcesGridProps = {
  topicsList: TopicKey[];
  interviewQuestions: InterviewQuestionsMap;
};

export default function ResourcesGrid({
  topicsList,
  interviewQuestions,
}: ResourcesGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Continuous rotation animation for icons
      gsap.to(".topic-icon", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
        stagger: {
          each: 2,
          repeat: -1,
        },
      });

      // Pulse animation for cards
      gsap.to(".resource-card", {
        boxShadow: "0 0 30px rgba(6, 182, 212, 0.2)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });

      // Scroll-triggered floating animation
      gsap.fromTo(
        sectionRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="resources"
      className="py-16 sm:py-24 bg-gradient-to-b from-black/50 to-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16 relative">
          {/* Decorative glow */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full blur-3xl"
          />

          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="uppercase text-xs text-gray-500 mb-4 relative"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="inline-block">🎯</span> Coverage Index{" "}
            <span className="inline-block">🚀</span>
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              What We Dive Into Together
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto space-y-4"
          >
            <p
              className="text-gray-300 text-lg md:text-xl leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              From foundational concepts to advanced patterns, each topic is{" "}
              <span className="text-cyan-400 font-semibold">
                structured with real interview questions
              </span>
              , clean code examples, and practical insights to accelerate your
              preparation.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm">
                <span className="text-cyan-400 font-semibold">✓</span>
                <span className="text-gray-300 text-sm">Interview-Focused</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full backdrop-blur-sm">
                <span className="text-blue-400 font-semibold">✓</span>
                <span className="text-gray-300 text-sm">
                  Production-Ready Code
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full backdrop-blur-sm">
                <span className="text-purple-400 font-semibold">✓</span>
                <span className="text-gray-300 text-sm">
                  Detailed Explanations
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topicsList.map((topic, index) => {
            const topicData = interviewQuestions[topic];
            const totalQuestions = topicData.sections.reduce(
              (sum: number, section: any) => sum + section.questions.length,
              0
            );
            const highlightedSections = topicData.sections.slice(0, 3);

            return (
              <ResourceCard
                key={topic}
                topic={topic}
                topicData={topicData}
                totalQuestions={totalQuestions}
                highlightedSections={highlightedSections}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ResourceCard({
  topic,
  topicData,
  totalQuestions,
  highlightedSections,
  index,
}: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });

  const getCardDescription = (topicName: string) => {
    const descriptions: Record<string, string> = {
      Java: "Master core Java concepts, OOP principles, collections framework, and concurrency patterns for technical interviews.",
      "Spring Boot":
        "Deep dive into Spring ecosystem, dependency injection, REST APIs, security, and microservices architecture.",
      React:
        "Build modern UIs with hooks, state management, component lifecycle, performance optimization, and best practices.",
      Docker:
        "Containerization fundamentals, image building, orchestration, networking, and production deployment strategies.",
      HLD:
        "Learn to architect scalable systems with HLD/LLD patterns, database design, caching, and distributed systems.",
      "Java 8":
        "Explore functional programming with streams, lambda expressions, Optional, method references, and modern Java features.",
    };
    return (
      descriptions[topicName] ||
      "Comprehensive interview preparation with real-world examples and best practices."
    );
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -8 }}
      className="resource-card bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl p-6 transition-all duration-300 flex flex-col group hover:border-cyan-500/50"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center mb-3"
      >
        <motion.span
          className="text-4xl mr-3 topic-icon inline-block"
          whileHover={{ scale: 1.2 }}
        >
          {topicData.icon}
        </motion.span>
        <div>
          <h3
            className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {topic}
          </h3>
          <p
            className="text-sm text-gray-400"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {totalQuestions}+ guided questions
          </p>
        </div>
      </motion.div>

      <div className="mb-4">
        <h4
          className="text-sm font-semibold text-cyan-400 mb-2"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Inside this track
        </h4>
        <ul className="space-y-2">
          {highlightedSections.map((section: any, idx: number) => (
            <motion.li
              key={section.title}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: index * 0.1 + idx * 0.1 }}
              className="flex items-start text-gray-300 text-sm"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                className="text-cyan-400 mr-2 mt-1"
              >
                •
              </motion.span>
              <div>
                <p
                  className="font-medium text-white group-hover:text-cyan-300 transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {section.title}
                </p>
                <p
                  className="text-xs text-gray-400"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {section.questions.length} Focused Questions
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="mt-auto p-4 bg-gray-900/40 rounded-lg border border-gray-800 text-sm text-gray-300 group-hover:border-cyan-500/30 transition-all leading-relaxed"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {getCardDescription(topic)}
      </motion.div>
    </motion.div>
  );
}
