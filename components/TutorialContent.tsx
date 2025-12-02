"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/AuthModal";
import { motion } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";

interface TutorialContentProps {
  children: React.ReactNode;
  tutorialTitle: string;
}

export function TutorialContent({
  children,
  tutorialTitle,
}: TutorialContentProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (!isLoading && !hasChecked) {
      setHasChecked(true);
      if (!isAuthenticated) {
        // Small delay for better UX
        setTimeout(() => {
          setShowAuthModal(true);
        }, 500);
      }
    }
  }, [isAuthenticated, isLoading, hasChecked]);

  // Show loading state while checking auth
  if (isLoading || !hasChecked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
          />
          <p className="text-gray-400">Loading tutorial...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show locked preview
  if (!isAuthenticated) {
    return (
      <>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          title="🔒 Tutorial Locked"
          message={`Sign in to access "${tutorialTitle}" and unlock all premium content!`}
        />
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
          {/* Blurred Preview */}
          <div className="relative">
            <div className="blur-sm pointer-events-none select-none opacity-50">
              {children}
            </div>

            {/* Lock Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent via-black/50 to-black/80">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center max-w-md mx-4 p-8 bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/30 flex items-center justify-center"
                >
                  <Lock className="w-10 h-10 text-purple-400" />
                </motion.div>

                <h2 className="text-2xl font-bold text-white mb-3">
                  Premium Content 🚀
                </h2>
                <p className="text-gray-400 mb-6">
                  Sign in to unlock this tutorial and access our entire library
                  of premium content!
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg"
                  >
                    Unlock Now - It&apos;s Free! ✨
                  </button>

                  <div className="flex items-center gap-2 justify-center text-xs text-gray-500">
                    <Sparkles className="w-3 h-3" />
                    <span>Join 10,000+ developers learning with us</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Authenticated - show full content
  return <>{children}</>;
}
