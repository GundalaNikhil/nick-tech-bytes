"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Users, Target, Award, ArrowRight } from "lucide-react";

export default function MockInterviewsBanner() {
  const router = useRouter();

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-emerald-900/20 via-teal-900/20 to-emerald-900/20 rounded-3xl border border-emerald-500/30 overflow-hidden backdrop-blur-sm"
        >
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 p-8 lg:p-12">
            {/* Left Content */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/40"
              >
                <Users className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400">
                  Free Mock Interviews
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
              >
                Scared of{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Interviews?
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-300 leading-relaxed"
              >
                Practice with an interview before your actual interview! Get
                interviewed by industry experts from Microsoft, Amazon, Google,
                Meta, FedEx, and Qualcomm.
              </motion.p>

              <motion.ul
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="space-y-3"
              >
                {[
                  "Real interview experience with tech leaders",
                  "Detailed feedback on your performance",
                  "100% Free - No hidden costs",
                  "Flexible scheduling options",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <div className="mt-1 flex-shrink-0">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      </div>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </motion.ul>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/mock-interviews")}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-lg shadow-emerald-500/25 transition-all duration-300"
              >
                Apply for Mock Interview
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            {/* Right Features */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-emerald-500/20"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-emerald-500/20">
                    <Target className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Industry Experts
                    </h3>
                    <p className="text-gray-400">
                      Get interviewed by senior engineers from top tech
                      companies. No compromise in quality.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-emerald-500/20"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-teal-500/20">
                    <Award className="w-6 h-6 text-teal-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Complete Preparation
                    </h3>
                    <p className="text-gray-400">
                      Cover all aspects: DSA, System Design, Behavioral, and
                      domain-specific questions.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30"
              >
                <p className="text-center text-emerald-400 font-semibold">
                  Join 500+ candidates who aced their interviews! 🎯
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
