"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft, Send, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const { forgotPassword, error: authError, clearError, isLoading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      await forgotPassword({ email });
      setSuccess(true);
    } catch (err) {
      // Error is handled by auth context
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center px-4">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        </div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 max-w-md w-full"
        >
          <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 mb-6"
            >
              <CheckCircle className="w-10 h-10 text-green-400" />
            </motion.div>

            <h2 className="text-2xl font-bold text-white mb-4">
              Check Your Email
            </h2>

            <p className="text-gray-400 mb-2">
              We&apos;ve sent a password reset link to:
            </p>
            <p className="text-cyan-400 font-semibold mb-6">{email}</p>

            <p className="text-sm text-gray-500 mb-8">
              Click the link in the email to reset your password. If you
              don&apos;t see it, check your spam folder.
            </p>

            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>

          {/* Resend Option */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Didn&apos;t receive the email?{" "}
              <button
                onClick={() => {
                  setSuccess(false);
                  clearError();
                }}
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                Try again
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-b border-gray-800/50 px-8 py-8">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 mb-4">
                <Mail className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Forgot Password?
              </h2>
              <p className="text-gray-400">
                No worries, we&apos;ll send you reset instructions
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            {/* Error Alert */}
            <AnimatePresence>
              {(authError || error) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl"
                >
                  <p className="text-red-400 text-sm flex items-center gap-2">
                    <span className="text-lg">⚠️</span>
                    {authError || error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                      clearError();
                    }}
                    placeholder="you@example.com"
                    className={`w-full pl-12 pr-4 py-3.5 bg-black/40 border ${
                      error || authError
                        ? "border-red-500/50"
                        : "border-gray-700/50"
                    } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
                    required
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Enter the email associated with your account
                </p>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-cyan-500/25 relative overflow-hidden group"
              >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Send className="w-5 h-5" />
                      </motion.div>
                      Sending...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="submit"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Send Reset Link
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            {/* Back to Login */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="mt-8 text-center">
          <Link href="/" className="inline-block">
            <div className="flex items-center justify-center gap-3">
              <Image
                src="/ntb-logo.svg"
                alt="NTB Logo"
                width={40}
                height={40}
              />
              <Image
                src="/nicktechbytescom.svg"
                alt="NickTechBytes"
                width={150}
                height={36}
              />
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
