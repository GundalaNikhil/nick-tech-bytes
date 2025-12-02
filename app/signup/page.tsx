"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ApiError, apiClient } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useLoadingStore } from "@/lib/loading-store";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  UserPlus,
  ArrowRight,
  Cpu,
  Rocket,
  Target,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";

// Quirky welcome messages
const welcomeMessages = [
  "🚀 Houston, we have a developer! Welcome aboard!",
  "🎉 Achievement Unlocked: Tech Ninja Status!",
  "⚡ Buckle up, buttercup! Your coding journey starts now!",
  "🔥 Welcome to the byte side! We have cookies... and code!",
  "🎯 You're in! Time to turn coffee into code!",
  "✨ Welcome, future tech legend! Let's make magic happen!",
  "🦾 Initiating awesome mode... Welcome to NickTechBytes!",
  "🌟 Plot twist: You just leveled up your career game!",
];

export default function SignUpPage() {
  const { register, error: authError, clearError } = useAuth();
  const router = useRouter();
  const setLoading = useLoadingStore((state) => state.setLoading);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<
    "idle" | "checking" | "available" | "taken"
  >("idle");
  const [usernameCheckTimeout, setUsernameCheckTimeout] =
    useState<NodeJS.Timeout | null>(null);

  const checkUsernameAvailability = useCallback(async (username: string) => {
    if (!username || username.length < 3) {
      setUsernameStatus("idle");
      return;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      setUsernameStatus("idle");
      return;
    }

    try {
      setUsernameStatus("checking");
      const isAvailable = await apiClient.checkUsernameAvailability(username);
      setUsernameStatus(isAvailable ? "available" : "taken");

      if (!isAvailable) {
        setErrors((prev) => ({
          ...prev,
          username: "Username is already taken",
        }));
      } else {
        setErrors((prev) => {
          const { username: _, ...rest } = prev;
          return rest;
        });
      }
    } catch (error) {
      console.error("Error checking username:", error);
      setUsernameStatus("idle");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    clearError();
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Check username availability with debounce
    if (name === "username") {
      setUsernameStatus("idle");
      if (usernameCheckTimeout) {
        clearTimeout(usernameCheckTimeout);
      }

      const timeout = setTimeout(() => {
        checkUsernameAvailability(value);
      }, 500);

      setUsernameCheckTimeout(timeout);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (formData.username.length > 50) {
      newErrors.username = "Username must not exceed 50 characters";
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
      newErrors.username =
        "Username can only contain letters, numbers, underscores, and hyphens";
    } else if (usernameStatus === "taken") {
      newErrors.username = "Username is already taken";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (formData.password.length > 72) {
      newErrors.password = "Password must not exceed 72 characters";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      setLoading(true, "Creating your account...");

      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Show quirky welcome message
      const randomMessage =
        welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
      toast.success(randomMessage, {
        duration: 5000,
        icon: "🎉",
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
      setLoading(false);
    }
  };

  // Floating particles animation
  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center py-8 px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -right-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 -left-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />

        {/* Floating Particles */}
        {particles.map((i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
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
        {/* Left Side - Branding & Benefits */}
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
              Start Your Journey to
              <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                Tech Mastery
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Join thousands of developers mastering interviews, system design,
              and modern development.
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-4">
            {[
              {
                icon: Rocket,
                text: "Launch Your Career with Confidence",
                color: "purple",
              },
              {
                icon: Target,
                text: "Master Interview Questions & Patterns",
                color: "pink",
              },
              {
                icon: TrendingUp,
                text: "Track Your Learning Progress",
                color: "blue",
              },
              {
                icon: UserPlus,
                text: "Join Our Growing Community",
                color: "purple",
              },
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all group"
              >
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br from-${benefit.color}-500/20 to-${benefit.color}-600/20 border border-${benefit.color}-500/30 group-hover:scale-110 transition-transform`}
                >
                  <benefit.icon
                    className={`w-6 h-6 text-${benefit.color}-400`}
                  />
                </div>
                <span className="text-gray-300 font-medium">
                  {benefit.text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Success Stories */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                  ⭐
                </div>
              </div>
              <div>
                <p className="text-gray-300 italic mb-2">
                  &quot;NickTechBytes helped me land my dream job at a FAANG
                  company!&quot;
                </p>
                <p className="text-sm text-gray-500">
                  — Sarah K., Software Engineer
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-b border-gray-800/50 px-4 sm:px-8 py-6 sm:py-8 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 mb-4">
                <Image
                  src="/icons/signup-header-bitmoji.png?v=2"
                  alt="Join Us"
                  width={96}
                  height={96}
                  className="object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Join the Tech Revolution! 🚀
              </h2>
              <p className="text-sm sm:text-base text-gray-400">
                Let&apos;s turn your dreams into deployments!
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
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-300 ml-1"
                  >
                    Username
                  </label>
                  <div className="relative group">
                    {/* Glow effect on focus */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-500" />
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Image
                          src="/icons/user-bitmoji.png?v=2"
                          alt="User"
                          width={40}
                          height={40}
                          className="object-contain opacity-80 group-focus-within:opacity-100 group-focus-within:scale-110 transition-all duration-300"
                        />
                      </div>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="johndoe"
                        className={`w-full pl-16 pr-12 py-3.5 bg-black/40 border ${
                          errors.username
                            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                            : usernameStatus === "available"
                            ? "border-green-500/50 focus:border-green-500 focus:ring-green-500/20"
                            : "border-gray-800 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/10"
                        } rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:border-gray-700 hover:bg-black/60`}
                        required
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        {usernameStatus === "checking" && (
                          <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                        )}
                        {usernameStatus === "available" && (
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        )}
                        {usernameStatus === "taken" && (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                    </div>
                  </div>
                  {errors.username && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400 flex items-center gap-1.5 ml-1"
                    >
                      <span className="w-1 h-1 rounded-full bg-red-400" />
                      {errors.username}
                    </motion.p>
                  )}
                  {usernameStatus === "available" && !errors.username && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-green-400 flex items-center gap-1.5 ml-1"
                    >
                      <span className="w-1 h-1 rounded-full bg-green-400" />
                      Username is available!
                    </motion.p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 ml-1"
                  >
                    Email Address
                  </label>
                  <div className="relative group">
                    {/* Glow effect on focus */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-500" />
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Image
                          src="/icons/mail-bitmoji.png?v=2"
                          alt="Email"
                          width={40}
                          height={40}
                          className="object-contain opacity-80 group-focus-within:opacity-100 group-focus-within:scale-110 transition-all duration-300"
                        />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`w-full pl-16 pr-4 py-3.5 bg-black/40 border ${
                          errors.email
                            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                            : "border-gray-800 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/10"
                        } rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:border-gray-700 hover:bg-black/60`}
                        required
                      />
                    </div>
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400 flex items-center gap-1.5 ml-1"
                    >
                      <span className="w-1 h-1 rounded-full bg-red-400" />
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 ml-1"
                  >
                    Password
                  </label>
                  <div className="relative group">
                    {/* Glow effect on focus */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-focus-within:opacity-20 blur transition-opacity duration-500" />
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Image
                          src="/icons/lock-bitmoji.png?v=2"
                          alt="Password"
                          width={40}
                          height={40}
                          className="object-contain opacity-80 group-focus-within:opacity-100 group-focus-within:scale-110 transition-all duration-300"
                        />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a strong password"
                        className={`w-full pl-16 pr-12 py-3.5 bg-black/40 border ${
                          errors.password
                            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                            : "border-gray-800 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/10"
                        } rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:border-gray-700 hover:bg-black/60`}
                        required
                      />
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-400 transition-colors p-1.5 rounded-lg hover:bg-purple-500/10"
                      >
                        <AnimatePresence mode="wait">
                          {showPassword ? (
                            <motion.div
                              key="hide"
                              initial={{ rotate: -90, opacity: 0 }}
                              animate={{ rotate: 0, opacity: 1 }}
                              exit={{ rotate: 90, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <EyeOff className="w-4 h-4" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="show"
                              initial={{ rotate: -90, opacity: 0 }}
                              animate={{ rotate: 0, opacity: 1 }}
                              exit={{ rotate: 90, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Eye className="w-4 h-4" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </div>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400 flex items-center gap-1.5 ml-1"
                    >
                      <span className="w-1 h-1 rounded-full bg-red-400" />
                      {errors.password}
                    </motion.p>
                  )}

                  {/* Password Strength Checklist */}
                  {formData.password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="pt-2"
                    >
                      <div className="p-3 bg-white/5 border border-white/5 rounded-lg space-y-2">
                        <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2">
                          Password Requirements
                        </p>
                        <div className="space-y-1.5">
                          {[
                            {
                              check: formData.password.length >= 8,
                              label: "At least 8 characters",
                            },
                            {
                              check: /[A-Z]/.test(formData.password),
                              label: "One uppercase letter",
                            },
                            {
                              check: /[a-z]/.test(formData.password),
                              label: "One lowercase letter",
                            },
                            {
                              check: /\d/.test(formData.password),
                              label: "One number",
                            },
                            {
                              check: /[@$!%*?&]/.test(formData.password),
                              label: "One special character",
                            },
                          ].map((req, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 text-xs"
                            >
                              <div
                                className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                                  req.check
                                    ? "bg-green-500/20 border-green-500/50 text-green-400"
                                    : "bg-gray-800 border-gray-700 text-transparent"
                                } transition-all duration-300`}
                              >
                                <span className="text-[10px]">✓</span>
                              </div>
                              <span
                                className={
                                  req.check
                                    ? "text-gray-300 transition-colors"
                                    : "text-gray-500 transition-colors"
                                }
                              >
                                {req.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{
                    scale: isSubmitting ? 1 : 1.02,
                    boxShadow: isSubmitting
                      ? "0 0 0 rgba(168, 85, 247, 0)"
                      : "0 20px 40px rgba(168, 85, 247, 0.4)",
                  }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 relative overflow-hidden group mt-8"
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
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
                        Compiling your profile...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="submit"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-2"
                      >
                        git commit -m &quot;New Beginning&quot;
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
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

              {/* Switch to Sign In */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-400">
                  Already a Wizard?{" "}
                  <Link
                    href="/login"
                    className="text-purple-400 hover:text-purple-300 font-semibold transition-colors inline-flex items-center gap-1 group"
                  >
                    Log In
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
                    100% Free to Start
                  </span>
                </div>
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-600 text-center leading-relaxed">
                By signing up, you agree to NickTechBytes&apos;s{" "}
                <a
                  href="#"
                  className="text-gray-500 hover:text-purple-400 underline transition-colors"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-gray-500 hover:text-purple-400 underline transition-colors"
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
