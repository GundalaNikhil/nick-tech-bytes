"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Rocket, Zap, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export function AuthModal({
  isOpen,
  onClose,
  title = "🔒 Premium Content Unlocked!",
  message = "Sign in to access this amazing tutorial and level up your skills!",
}: AuthModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleSignIn = () => {
    onClose();
    router.push("/login");
  };

  const handleSignUp = () => {
    onClose();
    router.push("/signup");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-all z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="relative p-8 pt-12">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/30 flex items-center justify-center"
                >
                  <Lock className="w-10 h-10 text-purple-400" />
                </motion.div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
                  {title}
                </h2>

                {/* Message */}
                <p className="text-gray-400 text-center mb-8 text-sm sm:text-base leading-relaxed">
                  {message}
                </p>

                {/* Benefits */}
                <div className="space-y-3 mb-8">
                  {[
                    {
                      icon: Rocket,
                      text: "Access 1000+ Premium Tutorials",
                      color: "purple",
                    },
                    {
                      icon: Zap,
                      text: "Track Your Learning Progress",
                      color: "cyan",
                    },
                    {
                      icon: Sparkles,
                      text: "Join Our Developer Community",
                      color: "pink",
                    },
                  ].map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div
                        className={`p-2 rounded-lg bg-${benefit.color}-500/20 border border-${benefit.color}-500/30`}
                      >
                        <benefit.icon
                          className={`w-4 h-4 text-${benefit.color}-400`}
                        />
                      </div>
                      <span className="text-sm text-gray-300">
                        {benefit.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSignUp}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-purple-500/25"
                  >
                    Create Free Account 🚀
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSignIn}
                    className="w-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600 text-white font-semibold py-4 rounded-xl transition-all"
                  >
                    Sign In
                  </motion.button>
                </div>

                {/* Footer */}
                <p className="text-xs text-gray-600 text-center mt-6">
                  100% Free • No Credit Card Required • Cancel Anytime
                </p>
              </div>

              {/* Decorative Gradient Orb */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
