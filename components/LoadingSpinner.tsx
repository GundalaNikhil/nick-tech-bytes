"use client";

import { motion } from "framer-motion";
import { Cpu, Zap, Code2, Terminal } from "lucide-react";

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  message?: string;
  size?: "sm" | "md" | "lg";
}

const loadingMessages = [
  "Compiling awesome...",
  "Brewing coffee ☕",
  "Debugging the matrix...",
  "Loading epicness...",
  "Fetching data from the cloud...",
  "Initializing coolness...",
  "Running npm install...",
  "Git pushing to production...",
  "Deploying vibes...",
  "Sudo loading...",
];

export default function LoadingSpinner({
  fullScreen = false,
  message,
  size = "md",
}: LoadingSpinnerProps) {
  const randomMessage =
    message ||
    loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      >
        <div className="text-center space-y-6">
          {/* Animated Spinner with Icons */}
          <div className="relative flex items-center justify-center">
            {/* Outer Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className={`${sizeClasses[size]} border-4 border-cyan-500/20 border-t-cyan-500 rounded-full`}
            />

            {/* Inner Glow */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl"
            />

            {/* Center Icon - Rotating */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute"
            >
              <Cpu className={`${iconSizes[size]} text-cyan-400`} />
            </motion.div>

            {/* Orbiting Icons */}
            {[
              { Icon: Zap, angle: 0, delay: 0 },
              { Icon: Code2, angle: 120, delay: 0.3 },
              { Icon: Terminal, angle: 240, delay: 0.6 },
            ].map(({ Icon, angle, delay }, idx) => (
              <motion.div
                key={idx}
                animate={{
                  rotate: [angle, angle + 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay,
                }}
                className="absolute"
                style={{
                  transformOrigin: `0px ${
                    size === "lg" ? "60px" : size === "md" ? "40px" : "24px"
                  }`,
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: delay,
                  }}
                >
                  <Icon className="w-4 h-4 text-purple-400" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-lg font-semibold text-white"
            >
              {randomMessage}
            </motion.p>

            {/* Animated Dots */}
            <div className="flex items-center justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-2 h-2 bg-cyan-400 rounded-full"
                />
              ))}
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-full w-1/3 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
            />
          </div>
        </div>
      </motion.div>
    );
  }

  // Inline Spinner (for smaller use cases)
  return (
    <div className="flex items-center justify-center gap-3">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`${sizeClasses[size]} border-3 border-cyan-500/20 border-t-cyan-500 rounded-full`}
      />
      {message && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm text-gray-400"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}
