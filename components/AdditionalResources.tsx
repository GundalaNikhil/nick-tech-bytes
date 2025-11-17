"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AdditionalResources() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Continuous floating animation for emojis
      gsap.to(".emoji-float", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.2,
          repeat: -1,
        },
      });

      // Pulse animation for cards
      gsap.to(".feature-card", {
        boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-ntb"
      className="py-16 sm:py-24 bg-black/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div ref={titleRef} className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Heart of NTB
          </motion.p>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Why Choose Nick Tech Bytes?
            </span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 mt-3 max-w-3xl mx-auto text-lg"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Bite-sized clarity for big interviews. Learn the way real engineers
            talk—no fluff, no gatekeeping, just guided momentum.
          </motion.p>
        </div>

        <div className="feature-cards-container grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            emoji="📚"
            title="Simplified Explanations"
            text="Complex concepts broken into everyday analogies so you can retell them during interviews without memorizing scripts."
            gradient="from-cyan-500/10 to-blue-600/10 border-cyan-500/30"
            index={0}
          />
          <Card
            emoji="💻"
            title="Practical Code Examples"
            text="Clean snippets with notes on performance, trade-offs, and how to extend them—perfect for live coding or whiteboard moments."
            gradient="from-purple-500/10 to-pink-600/10 border-purple-500/30"
            index={1}
          />
          <Card
            emoji="🎯"
            title="Interview-Focused"
            text="Curated prompts inspired by FAANG and startup loops, grouped by intent (conceptual, scenario, code) for targeted practice."
            gradient="from-blue-500/10 to-cyan-600/10 border-blue-500/30"
            index={2}
          />
        </div>

        <div className="emotion-cards-container grid grid-cols-1 md:grid-cols-2 gap-8">
          <EmotionCard
            emoji="😰"
            title="Scared of Interviews?"
            accent="text-yellow-400"
            border="border-yellow-500/30 hover:border-yellow-500/60"
            text="Trust me, I've felt that knot in the stomach minutes before a panel. These walkthroughs were written to calm nerves and build real confidence."
            highlight="Good news: you're not alone. We'll untangle each topic together."
            index={0}
          />
          <EmotionCard
            emoji="🚀"
            title="Overwhelmed by Resources?"
            accent="text-cyan-400"
            border="border-cyan-500/30 hover:border-cyan-500/60"
            text="Too many tabs, conflicting advice, zero context? Same. NTB distills the essentials into a single guided path."
            highlight="Solution: one hub for code, context, and next steps."
            index={1}
          />
          <EmotionCard
            emoji="⏰"
            title="2 AM Panic Sessions?"
            accent="text-pink-400"
            border="border-pink-500/30 hover:border-pink-500/60"
            text="Those late-night 'do I even know this?' spirals birthed this project. Each section is the explanation I wish I had when I was stuck at 2 AM."
            highlight="Read it, breathe, try again. The story sticks because it's real."
            index={2}
          />
          <EmotionCard
            emoji="🤝"
            title="We're A Community"
            accent="text-green-400"
            border="border-green-500/30 hover:border-green-500/60"
            text="Nick Tech Bytes is built with input from peers who share wins, rejections, and aha moments."
            highlight="We learn together, celebrate together, and ship together."
            index={3}
          />
        </div>
      </div>
    </section>
  );
}

type CardProps = {
  emoji: string;
  title: string;
  text: string;
  gradient: string;
  index: number;
};

const Card = ({ emoji, title, text, gradient, index }: CardProps) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`feature-card bg-gradient-to-br ${gradient} rounded-xl p-8 border transition-all duration-300`}
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mb-6 mx-auto text-3xl emoji-float"
      >
        {emoji}
      </motion.div>
      <h3
        className="text-xl font-bold text-white mb-3 text-center"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {title}
      </h3>
      <p
        className="text-gray-300 text-center"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {text}
      </p>
    </motion.div>
  );
};

type EmotionCardProps = {
  emoji: string;
  title: string;
  accent: string;
  border: string;
  text: string;
  highlight: string;
  index: number;
};

const EmotionCard = ({
  emoji,
  title,
  accent,
  border,
  text,
  highlight,
  index,
}: EmotionCardProps) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
      }
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, borderColor: "rgba(6, 182, 212, 0.6)" }}
      className={`emotion-card bg-gray-800/40 backdrop-blur-sm border-2 ${border} rounded-2xl p-8 transition-all duration-300`}
    >
      <div className="flex items-start space-x-4">
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="text-5xl flex-shrink-0 emoji-float"
        >
          {emoji}
        </motion.div>
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className={`text-2xl font-bold ${accent} mb-3`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="text-gray-300 mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {text}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            className="text-gray-300"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="text-cyan-400 font-semibold">Remember:</span>{" "}
            {highlight}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};
