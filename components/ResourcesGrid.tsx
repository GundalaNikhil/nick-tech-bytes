"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { InterviewQuestionsMap, TopicKey } from "@/lib/interviewData";

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
        <div ref={titleRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Coverage Index
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              What We Dive Into Together
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-3xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Every topic is broken into digestible sections with curated
            questions, code, and notes so you know exactly what's covered before
            you jump in.
          </motion.p>
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
                  {section.questions.length} focused prompts
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="mt-auto p-4 bg-gray-900/40 rounded-lg border border-gray-800 text-sm text-gray-300 group-hover:border-cyan-500/30 transition-all"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Built for learners who want clarity, confidence, and ready-to-use
        interview stories.
      </motion.div>
    </motion.div>
  );
}
