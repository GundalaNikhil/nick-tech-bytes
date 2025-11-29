"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ApiError } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Zap,
  Shield,
  ArrowRight,
  Cpu,
  Code2,
} from "lucide-react";

// Quirky welcome back messages
const welcomeBackMessages = [
  "🎯 Lock and loaded! Welcome back, code warrior!",
  "⚡ The legend returns! Time to ship some code!",
  "🔥 Back in the game! Let's make something awesome!",
  "🚀 Initiating genius mode... Welcome back!",
  "💻 Your terminal missed you! Welcome back, dev!",
  "🎨 The artist is back! Ready to paint with code?",
  "🦸 Your code sanctuary awaits! Welcome back!",
  "✨ Plot twist: You're back and ready to crush it!",
];

export default function LoginPage() {
  const { login, error: authError, clearError } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    clearError();
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleRememberMe = () => {
    setFormData((prev) => ({ ...prev, rememberMe: !prev.rememberMe }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      await login({
        emailOrUsername: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      // Show quirky welcome back message
      const randomMessage =
        welcomeBackMessages[
          Math.floor(Math.random() * welcomeBackMessages.length)
        ];
      toast.success(randomMessage, {
        duration: 5000,
        icon: "👋",
      });

      // Redirect after a short delay to show the toast
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      const apiError = err as ApiError;
      if (apiError.validationErrors) {
        const fieldErrors: Record<string, string> = {};
        apiError.validationErrors.forEach((error) => {
          fieldErrors[error.field] = error.message;
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Floating particles animation
  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center py-8 px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />

        {/* Floating Particles */}
        {particles.map((i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1920),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 1080),
            }}
            animate={{
              y: [
                null,
                Math.random() *
                  (typeof window !== "undefined" ? window.innerHeight : 1080),
              ],
              x: [
                null,
                Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1920),
              ],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Side - Branding & Features */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block space-y-8"
        >
          {/* Logo & Title */}
          <div className="space-y-6">
            {/* <Link href="/" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4"
              >
                <div className="relative w-16 h-16">
                  <Image
                    src="/ntb-logo.svg"
                    alt="NTB Logo"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
                <div className="relative h-12 w-auto">
                  <Image
                    src="/nicktechbytescom.svg"
                    alt="NickTechBytes"
                    width={200}
                    height={48}
                    className="h-full w-auto object-contain"
                    priority
                  />
                </div>
              </motion.div>
            </Link> */}

            <h1 className="text-5xl font-bold text-white leading-tight">
              Welcome Back to
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Your Learning Hub
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Continue your journey to master the art of coding and ace your
              technical interviews.
            </p>
          </div>

          {/* Feature List */}
          <div className="space-y-4">
            {[
              {
                icon: Sparkles,
                text: "Access 1000+ Interview Questions",
                color: "cyan",
              },
              {
                icon: Code2,
                text: "Hands-on React & Spring Boot Tutorials",
                color: "purple",
              },
              { icon: Shield, text: "System Design Deep Dives", color: "blue" },
              { icon: Zap, text: "Track Your Progress & Goals", color: "cyan" },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all group"
              >
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br from-${feature.color}-500/20 to-${feature.color}-600/20 border border-${feature.color}-500/30 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon
                    className={`w-6 h-6 text-${feature.color}-400`}
                  />
                </div>
                <span className="text-gray-300 font-medium">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
            {[
              { value: "10K+", label: "Learners" },
              { value: "1000+", label: "Questions" },
              { value: "50+", label: "Tutorials" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-b border-gray-800/50 px-4 sm:px-8 py-6 sm:py-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 mb-3 sm:mb-4">
                <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Welcome Back, Ninja! 🥷
              </h2>
              <p className="text-sm sm:text-base text-gray-400">
                Ready to level up your tech game?
              </p>
            </div>

            {/* Form Body */}
            <div className="px-4 sm:px-8 py-6 sm:py-8">
              {/* Error Alert */}
              <AnimatePresence>
                {authError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl"
                  >
                    <p className="text-red-400 text-sm flex items-center gap-2">
                      <span className="text-lg">⚠️</span>
                      {authError}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
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
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`w-full pl-12 pr-4 py-3.5 bg-black/40 border ${
                        errors.email
                          ? "border-red-500/50"
                          : "border-gray-700/50"
                      } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
                      required
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400 flex items-center gap-1"
                    >
                      <span>⚠️</span>
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className={`w-full pl-12 pr-12 py-3.5 bg-black/40 border ${
                        errors.password
                          ? "border-red-500/50"
                          : "border-gray-700/50"
                      } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400 flex items-center gap-1"
                    >
                      <span>⚠️</span>
                      {errors.password}
                    </motion.p>
                  )}
                </div>

                {/* Remember Me Toggle & Forgot Password */}
                <div className="flex items-center justify-between pt-2">
                  {/* Custom Toggle Switch */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={toggleRememberMe}
                      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                        formData.rememberMe
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600"
                          : "bg-gray-700"
                      }`}
                    >
                      <motion.div
                        animate={{
                          x: formData.rememberMe ? 24 : 2,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                        className={`absolute top-1 w-4 h-4 rounded-full ${
                          formData.rememberMe ? "bg-white" : "bg-gray-400"
                        }`}
                      />
                    </button>
                    <span className="text-sm text-gray-400">Remember me</span>
                  </div>

                  <Link
                    href="/forgot-password"
                    className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-cyan-500/25 relative overflow-hidden group mt-8"
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
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
                          <Cpu className="w-5 h-5" />
                        </motion.div>
                        Signing you in...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="submit"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        Let&apos;s Code! 💻
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.button>
              </form>

              {/* Switch to Sign Up */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors inline-flex items-center gap-1 group"
                  >
                    Sign Up Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </p>
              </div>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-900/50 text-gray-500">
                    Secure & Encrypted
                  </span>
                </div>
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-600 text-center leading-relaxed">
                By continuing, you agree to NickTechBytes&apos;s{" "}
                <a
                  href="#"
                  className="text-gray-500 hover:text-cyan-400 underline transition-colors"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-gray-500 hover:text-cyan-400 underline transition-colors"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>

          {/* Mobile Logo */}
          <div className="lg:hidden mt-8 text-center">
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
    </div>
  );
}
