"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import {
  Users,
  Target,
  Briefcase,
  CheckCircle2,
  Star,
  Award,
  Clock,
  UserCheck,
  Shield,
  TrendingUp,
  MessageSquare,
  Zap,
  Sparkles,
  Rocket,
  Brain,
  Code2,
  Database,
  Cloud,
  GitBranch,
  Layers,
  MessageCircle,
} from "lucide-react";
import Footer from "@/components/footer";
import { companyData } from "@/components/CompanyLogos";

export default function MockInterviewsPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentRole: "",
    targetRole: "",
    experience: "",
    preferredDate: "",
    preferredTime: "",
    technicalFocus: [] as string[],
    additionalNotes: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.username || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTechnicalFocusChange = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technicalFocus: prev.technicalFocus.includes(tech)
        ? prev.technicalFocus.filter((t) => t !== tech)
        : [...prev.technicalFocus, tech],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please login to submit the form", {
        duration: 4000,
      });
      router.push("/login");
      return;
    }

    // Validate at least one technical focus area is selected
    if (formData.technicalFocus.length === 0) {
      toast.error("Please select at least one technical focus area");
      return;
    }

    setIsSubmitting(true);

    try {
      // Import API client
      const { apiClient } = await import("@/lib/api-client");

      // Prepare request data
      const requestData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        currentRole: formData.currentRole,
        targetRole: formData.targetRole,
        experience: formData.experience,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        technicalFocus: formData.technicalFocus,
        additionalNotes: formData.additionalNotes || "",
      };

      // Call API to create mock interview
      await apiClient.createMockInterview(requestData);

      toast.success(
        "Application submitted successfully! We'll reach out to you soon! 🎉",
        {
          duration: 5000,
        }
      );

      // Set form as submitted
      setFormSubmitted(true);

      // Reset form
      setFormData({
        name: user?.username || "",
        email: user?.email || "",
        phone: "",
        currentRole: "",
        targetRole: "",
        experience: "",
        preferredDate: "",
        preferredTime: "",
        technicalFocus: [],
        additionalNotes: "",
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      const errorMessage =
        error?.message || "Failed to submit application. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const technicalAreas = [
    {
      name: "Data Structures & Algorithms",
      icon: <Brain className="w-5 h-5" />,
      color: "from-purple-500 to-pink-600",
    },
    {
      name: "System Design",
      icon: <Layers className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-600",
    },
    {
      name: "Frontend Development",
      icon: <Code2 className="w-5 h-5" />,
      color: "from-orange-500 to-red-600",
    },
    {
      name: "Backend Development",
      icon: <Database className="w-5 h-5" />,
      color: "from-green-500 to-emerald-600",
    },
    {
      name: "DevOps",
      icon: <GitBranch className="w-5 h-5" />,
      color: "from-indigo-500 to-purple-600",
    },
    {
      name: "Cloud Architecture",
      icon: <Cloud className="w-5 h-5" />,
      color: "from-cyan-500 to-blue-600",
    },
    {
      name: "Database Design",
      icon: <Database className="w-5 h-5" />,
      color: "from-yellow-500 to-orange-600",
    },
    {
      name: "Behavioral Questions",
      icon: <MessageCircle className="w-5 h-5" />,
      color: "from-pink-500 to-rose-600",
    },
  ];

  const benefits = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Industry Experts",
      description:
        "Get interviewed by senior engineers from top tech companies like Microsoft, Amazon, Meta, Google, FedEx, and Qualcomm",
      gradient: "from-blue-500 to-cyan-600",
      iconBg: "from-blue-500/20 to-cyan-600/20",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Real Interview Experience",
      description:
        "Practice with actual interview questions and scenarios used by leading tech companies",
      gradient: "from-purple-500 to-pink-600",
      iconBg: "from-purple-500/20 to-pink-600/20",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Detailed Feedback",
      description:
        "Receive comprehensive feedback on your technical skills, communication, and problem-solving approach",
      gradient: "from-green-500 to-emerald-600",
      iconBg: "from-green-500/20 to-emerald-600/20",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "100% Free",
      description:
        "No hidden costs, no subscriptions. Quality interview preparation accessible to everyone",
      gradient: "from-yellow-500 to-orange-600",
      iconBg: "from-yellow-500/20 to-orange-600/20",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Flexible Scheduling",
      description:
        "Choose interview times that work best for your schedule and timezone",
      gradient: "from-indigo-500 to-purple-600",
      iconBg: "from-indigo-500/20 to-purple-600/20",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Confidential & Safe",
      description:
        "Your information is secure and sessions are completely confidential",
      gradient: "from-red-500 to-pink-600",
      iconBg: "from-red-500/20 to-pink-600/20",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-500/30">
                <Zap className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-semibold text-cyan-400">
                  Premium Mock Interviews - Completely Free
                </span>
              </div>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Scared of Interviews?
              </span>
            </h1>

            <p className="text-2xl sm:text-3xl text-gray-300 max-w-4xl mx-auto">
              Experience a real interview before your actual one!
            </p>

            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Want to ace your next technical interview? Practice makes perfect!
              Our mock interview program connects you with experienced
              interviewers from industry-leading tech companies. Get the
              confidence and skills you need to succeed in your dream job
              interview.
            </p>

            {/* Infinite Scrolling Company Carousel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-8 overflow-hidden"
            >
              <p className="text-sm text-gray-400 mb-6 text-center font-medium">
                🌟 Trusted by professionals from leading companies
              </p>
              <div className="relative">
                {/* Gradient overlays for smooth fade effect */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

                <div className="flex animate-scroll-left">
                  {[...companyData, ...companyData, ...companyData].map(
                    (company, index) => {
                      const LogoComponent = company.logo;
                      return (
                        <div
                          key={`${company.name}-${index}`}
                          className="flex-shrink-0 mx-3 group"
                        >
                          <div className="px-8 py-5 rounded-2xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-2 border-gray-700/60 backdrop-blur-md hover:border-cyan-500/70 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 relative overflow-hidden">
                            {/* Animated background gradient */}
                            <div
                              className={`absolute inset-0 bg-gradient-to-r ${company.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
                            ></div>

                            <div className="relative z-10 flex items-center gap-3">
                              <div className="transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                <LogoComponent className="w-10 h-10" />
                              </div>
                              <span
                                className={`text-xl font-extrabold bg-gradient-to-r ${company.color} bg-clip-text text-transparent`}
                              >
                                {company.name}
                              </span>
                            </div>

                            {/* Shimmer effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </motion.div>

            <style jsx>{`
              @keyframes scroll-left {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-33.333%);
                }
              }
              .animate-scroll-left {
                animation: scroll-left 30s linear infinite;
              }
              .animate-scroll-left:hover {
                animation-play-state: paused;
              }
            `}</style>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Why Choose Our Mock Interviews?
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              No compromise in quality, completely free for aspiring developers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="p-8 rounded-3xl bg-gradient-to-br from-gray-800/60 to-gray-900/80 border-2 border-gray-700/50 hover:border-cyan-500/60 transition-all duration-500 h-full backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 relative overflow-hidden">
                  {/* Animated background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  {/* Icon with gradient background */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.iconBg} border border-gray-600/30 text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10 shadow-lg`}
                  >
                    {benefit.icon}
                  </div>

                  <h3
                    className={`text-xl font-bold mb-3 bg-gradient-to-r ${benefit.gradient} bg-clip-text text-transparent relative z-10`}
                  >
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed relative z-10">
                    {benefit.description}
                  </p>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <UserCheck />,
                value: "500+",
                label: "Mock Interviews Conducted",
                gradient: "from-blue-500 to-cyan-600",
                iconBg: "from-blue-500/20 to-cyan-600/20",
              },
              {
                icon: <TrendingUp />,
                value: "95%",
                label: "Success Rate",
                gradient: "from-green-500 to-emerald-600",
                iconBg: "from-green-500/20 to-emerald-600/20",
              },
              {
                icon: <Star />,
                value: "4.9/5",
                label: "Average Rating",
                gradient: "from-yellow-500 to-orange-600",
                iconBg: "from-yellow-500/20 to-orange-600/20",
              },
              {
                icon: <Briefcase />,
                value: "50+",
                label: "Partner Companies",
                gradient: "from-purple-500 to-pink-600",
                iconBg: "from-purple-500/20 to-pink-600/20",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-gray-800/60 to-gray-900/80 border-2 border-gray-700/50 hover:border-cyan-500/60 transition-all duration-500 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 relative overflow-hidden">
                  {/* Animated background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
                  ></div>

                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.iconBg} border border-gray-600/30 mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10 shadow-lg text-white`}
                  >
                    <div
                      className={`w-8 h-8 [&>svg]:w-full [&>svg]:h-full bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                    >
                      {stat.icon}
                    </div>
                  </div>

                  <div
                    className={`text-5xl font-extrabold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent relative z-10`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-gray-400 font-medium relative z-10">
                    {stat.label}
                  </div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Apply for a Mock Interview
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Fill out the form below and we'll reach out to you soon!
            </p>
            {!isAuthenticated && (
              <p className="text-yellow-400 mt-4 text-sm">
                ⚠️ You need to be logged in to submit this form
              </p>
            )}
          </motion.div>

          {!formSubmitted ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-8 p-10 rounded-3xl bg-gradient-to-br from-gray-800/70 to-gray-900/90 border-2 border-cyan-500/40 backdrop-blur-xl shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-shadow duration-500"
            >
              {/* Name */}
              <div className="group">
                <label
                  htmlFor="name"
                  className="flex items-center gap-2 text-sm font-bold text-gray-200 mb-3"
                >
                  <span className="text-cyan-400">👤</span>
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-xl bg-gray-900/90 border-2 border-gray-700/70 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/30 text-white placeholder-gray-500 transition-all duration-300 outline-none hover:border-cyan-500/50 hover:bg-gray-900 font-medium"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div className="group">
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-bold text-gray-200 mb-3"
                >
                  <span className="text-cyan-400">📧</span>
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-xl bg-gray-900/90 border-2 border-gray-700/70 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/30 text-white placeholder-gray-500 transition-all duration-300 outline-none hover:border-cyan-500/50 hover:bg-gray-900 font-medium"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone */}
              <div className="group">
                <label
                  htmlFor="phone"
                  className="flex items-center gap-2 text-sm font-bold text-gray-200 mb-3"
                >
                  <span className="text-cyan-400">📱</span>
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-xl bg-gray-900/90 border-2 border-gray-700/70 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/30 text-white placeholder-gray-500 transition-all duration-300 outline-none hover:border-cyan-500/50 hover:bg-gray-900 font-medium"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              {/* Current Role */}
              <div className="group">
                <label
                  htmlFor="currentRole"
                  className="flex items-center gap-2 text-sm font-bold text-gray-200 mb-3"
                >
                  <span className="text-cyan-400">💼</span>
                  Current Role <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="currentRole"
                  name="currentRole"
                  required
                  value={formData.currentRole}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-xl bg-gray-900/90 border-2 border-gray-700/70 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/30 text-white placeholder-gray-500 transition-all duration-300 outline-none hover:border-cyan-500/50 hover:bg-gray-900 font-medium"
                  placeholder="e.g., Software Engineer, Student, Recent Graduate"
                />
              </div>

              {/* Target Role */}
              <div className="group">
                <label
                  htmlFor="targetRole"
                  className="flex items-center gap-2 text-sm font-bold text-gray-200 mb-3"
                >
                  <span className="text-cyan-400">🎯</span>
                  Target Role <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="targetRole"
                  name="targetRole"
                  required
                  value={formData.targetRole}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-xl bg-gray-900/90 border-2 border-gray-700/70 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/30 text-white placeholder-gray-500 transition-all duration-300 outline-none hover:border-cyan-500/50 hover:bg-gray-900 font-medium"
                  placeholder="e.g., Senior Software Engineer, Frontend Developer"
                />
              </div>

              {/* Years of Experience */}
              <div className="group">
                <label
                  htmlFor="experience"
                  className="flex items-center gap-2 text-sm font-bold text-gray-200 mb-3"
                >
                  <span className="text-cyan-400">⏱️</span>
                  Years of Experience <span className="text-red-400">*</span>
                </label>
                <select
                  id="experience"
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-xl bg-gray-900/90 border-2 border-gray-700/70 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/30 text-white transition-all duration-300 outline-none hover:border-cyan-500/50 hover:bg-gray-900 cursor-pointer font-medium"
                >
                  <option value="">Select experience level</option>
                  <option value="0-1">0-1 years (Entry Level)</option>
                  <option value="1-3">1-3 years (Junior)</option>
                  <option value="3-5">3-5 years (Mid-Level)</option>
                  <option value="5-8">5-8 years (Senior)</option>
                  <option value="8+">8+ years (Staff/Principal)</option>
                </select>
              </div>

              {/* Technical Focus Areas */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-200 mb-4">
                  <span className="text-cyan-400">🚀</span>
                  Technical Focus Areas <span className="text-red-400">*</span>
                  <span className="text-xs text-gray-400 font-normal ml-2">
                    (Select at least one)
                  </span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {technicalAreas.map((area) => (
                    <label
                      key={area.name}
                      className="flex items-center gap-4 p-5 rounded-2xl bg-gray-900/90 border-2 border-gray-700/70 hover:border-cyan-500/70 hover:bg-gray-900 cursor-pointer transition-all duration-500 group/checkbox relative overflow-hidden shadow-lg hover:shadow-cyan-500/20"
                    >
                      {/* Animated background gradient */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${area.color} opacity-0 group-hover/checkbox:opacity-10 transition-all duration-500`}
                      ></div>

                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={formData.technicalFocus.includes(area.name)}
                        onChange={() => handleTechnicalFocusChange(area.name)}
                        className="w-5 h-5 rounded-md border-2 border-gray-600 text-cyan-500 focus:ring-4 focus:ring-cyan-500/30 focus:ring-offset-0 bg-gray-800 cursor-pointer transition-all"
                      />

                      {/* Icon with gradient background */}
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${area.color} bg-opacity-20 text-white group-hover/checkbox:scale-110 transition-transform duration-500 relative z-10`}
                      >
                        {area.icon}
                      </div>

                      {/* Text */}
                      <span className="text-sm text-gray-300 group-hover/checkbox:text-white transition-colors font-semibold relative z-10 flex-1">
                        {area.name}
                      </span>

                      {/* Shimmer effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover/checkbox:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Preferred Date & Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label
                    htmlFor="preferredDate"
                    className="flex items-center gap-2 text-sm font-bold text-gray-200 mb-3"
                  >
                    <span className="text-cyan-400">📅</span>
                    Preferred Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    required
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-5 py-4 rounded-xl bg-gray-900/90 border-2 border-gray-700/70 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/30 text-white transition-all duration-300 outline-none hover:border-cyan-500/50 hover:bg-gray-900 cursor-pointer font-medium"
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="preferredTime"
                    className="flex items-center gap-2 text-sm font-bold text-gray-200 mb-3"
                  >
                    <span className="text-cyan-400">🕐</span>
                    Preferred Time <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    required
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 rounded-xl bg-gray-900/90 border-2 border-gray-700/70 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/30 text-white transition-all duration-300 outline-none hover:border-cyan-500/50 hover:bg-gray-900 cursor-pointer font-medium"
                  >
                    <option value="">Select time slot</option>
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                    <option value="evening">Evening (5 PM - 9 PM)</option>
                  </select>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="group">
                <label
                  htmlFor="additionalNotes"
                  className="flex items-center gap-2 text-sm font-bold text-gray-200 mb-3"
                >
                  <span className="text-cyan-400">📝</span>
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  rows={4}
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 rounded-xl bg-gray-900/90 border-2 border-gray-700/70 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/30 text-white placeholder-gray-500 transition-all duration-300 outline-none resize-none hover:border-cyan-500/50 hover:bg-gray-900 font-medium"
                  placeholder="Any specific topics or companies you want to focus on?"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || !isAuthenticated}
                whileHover={
                  !isSubmitting && isAuthenticated ? { scale: 1.02 } : {}
                }
                whileTap={
                  !isSubmitting && isAuthenticated ? { scale: 0.98 } : {}
                }
                className={`w-full py-5 rounded-xl font-bold text-lg transition-all duration-300 relative overflow-hidden group ${
                  isSubmitting || !isAuthenticated
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed border-2 border-gray-700"
                    : "bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 hover:from-cyan-600 hover:via-purple-700 hover:to-pink-700 text-white shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 border-2 border-transparent hover:border-cyan-400/50"
                }`}
              >
                {!isSubmitting && isAuthenticated && (
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                )}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting Your Application...
                    </>
                  ) : !isAuthenticated ? (
                    <>🔒 Please Login to Submit</>
                  ) : (
                    <>🚀 Submit Application</>
                  )}
                </span>
              </motion.button>

              {!isAuthenticated && (
                <p className="text-center text-sm text-gray-400">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/signup")}
                    className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                  >
                    Sign up here
                  </button>
                </p>
              )}
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-12 rounded-3xl bg-gradient-to-br from-green-900/40 via-cyan-900/40 to-purple-900/40 border-2 border-green-500/50 backdrop-blur-xl shadow-2xl shadow-green-500/30 text-center space-y-8 relative overflow-hidden"
            >
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-cyan-500/5 to-purple-500/5 animate-pulse"></div>

              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-500/30 to-cyan-500/30 border-4 border-green-500/50 shadow-lg shadow-green-500/50 relative z-10"
              >
                <CheckCircle2 className="w-12 h-12 text-green-400" />
              </motion.div>

              <div className="space-y-4 relative z-10">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-extrabold bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
                >
                  Application Submitted Successfully! 🎉
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl text-gray-200 font-semibold"
                >
                  Thank you for applying!
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="max-w-2xl mx-auto space-y-3"
                >
                  <p className="text-gray-300 text-lg leading-relaxed">
                    ✅ We've received your application and our team will review
                    it shortly.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    📧 You'll receive an email within{" "}
                    <span className="text-cyan-400 font-bold">48 hours</span> to
                    schedule your mock interview session.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    Check your inbox (and spam folder) for updates!
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center pt-6 relative z-10"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFormSubmitted(false)}
                  className="px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 hover:from-cyan-600 hover:via-purple-700 hover:to-pink-700 text-white font-bold shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 transition-all duration-300 border-2 border-transparent hover:border-cyan-400/50 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  <span className="relative z-10">
                    📝 Submit Another Application
                  </span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/")}
                  className="px-10 py-4 rounded-xl bg-gray-800/90 hover:bg-gray-700/90 text-white font-bold border-2 border-gray-600 hover:border-gray-500 shadow-lg transition-all duration-300"
                >
                  🏠 Back to Home
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-lg max-w-none">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Everything You Need to Know
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Comprehensive guide to mastering technical interviews with our
                expert-led mock interview program
              </p>
            </motion.div>

            {/* Content Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Card 1 */}
              <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-10 border-2 border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/20">
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-500"></div>

                {/* Icon */}
                <div className="relative mb-6 inline-flex">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h2 className="relative text-3xl font-bold mb-5 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  Master Your Technical Interviews with Industry Experts
                </h2>
                <p className="relative text-gray-300 leading-relaxed mb-4">
                  Preparing for technical interviews at top tech companies like
                  Microsoft, Amazon, Google, Meta, FedEx, and Qualcomm can be
                  daunting. Our free mock interview program bridges the gap
                  between preparation and success by providing you with
                  realistic interview experiences conducted by senior engineers
                  from these leading organizations.
                </p>
                <p className="relative text-gray-300 leading-relaxed">
                  Whether you're a fresh graduate looking for your first role, a
                  mid-level engineer aiming for senior positions, or an
                  experienced professional targeting staff or principal roles,
                  our tailored mock interviews help you identify strengths,
                  address weaknesses, and build the confidence needed to excel
                  in real interviews.
                </p>

                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
              </div>

              {/* Card 2 */}
              <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-10 border-2 border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20">
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500"></div>

                {/* Icon */}
                <div className="relative mb-6 inline-flex">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg">
                    <Layers className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h2 className="relative text-3xl font-bold mb-5 text-purple-400 group-hover:text-purple-300 transition-colors">
                  Comprehensive Interview Preparation Across Multiple Domains
                </h2>
                <p className="relative text-gray-300 leading-relaxed mb-4">
                  Our mock interview program covers all critical areas of
                  technical interviewing including data structures and
                  algorithms, system design (both high-level and low-level),
                  frontend development, backend engineering, DevOps practices,
                  cloud architecture, database design, and behavioral interview
                  questions. This comprehensive approach ensures you're prepared
                  for any question that comes your way.
                </p>
                <p className="relative text-gray-300 leading-relaxed">
                  Each mock interview session is designed to simulate real
                  interview conditions, complete with time constraints, coding
                  challenges, and technical discussions. You'll receive detailed
                  feedback on your problem-solving approach, code quality,
                  communication skills, and overall interview performance,
                  helping you continuously improve with each practice session.
                </p>

                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
              </div>

              {/* Card 3 */}
              <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-10 border-2 border-gray-700/50 hover:border-green-500/50 transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-green-500/20">
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/5 transition-all duration-500"></div>

                {/* Icon */}
                <div className="relative mb-6 inline-flex">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h2 className="relative text-3xl font-bold mb-5 text-green-400 group-hover:text-green-300 transition-colors">
                  Why Mock Interviews Are Essential for Interview Success
                </h2>
                <p className="relative text-gray-300 leading-relaxed mb-4">
                  Studies show that candidates who participate in mock
                  interviews are significantly more likely to succeed in actual
                  interviews. Mock interviews help reduce anxiety, improve time
                  management, enhance problem-solving speed, and build muscle
                  memory for common interview patterns. By practicing with
                  experienced interviewers, you gain insights into what top
                  companies actually look for in candidates.
                </p>
                <p className="relative text-gray-300 leading-relaxed">
                  Our program stands out because we don't compromise on quality.
                  Every interviewer in our network has extensive experience
                  conducting real interviews at Fortune 500 companies and
                  leading tech firms. They understand the nuances of what makes
                  a strong candidate and can provide actionable feedback that
                  translates directly to interview success. Best of all, this
                  premium service is completely free, making world-class
                  interview preparation accessible to everyone.
                </p>

                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
              </div>

              {/* Card 4 */}
              <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-10 border-2 border-gray-700/50 hover:border-yellow-500/50 transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-yellow-500/20">
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 to-orange-500/0 group-hover:from-yellow-500/5 group-hover:to-orange-500/5 transition-all duration-500"></div>

                {/* Icon */}
                <div className="relative mb-6 inline-flex">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h2 className="relative text-3xl font-bold mb-5 text-yellow-400 group-hover:text-yellow-300 transition-colors">
                  Flexible Scheduling and Personalized Experience
                </h2>
                <p className="relative text-gray-300 leading-relaxed mb-4">
                  We understand that preparing for interviews while managing
                  work, studies, or other commitments can be challenging. That's
                  why we offer flexible scheduling options across different time
                  zones and time slots. Whether you prefer morning, afternoon,
                  or evening sessions, we'll work with your schedule to ensure
                  you get the practice you need when you need it.
                </p>
                <p className="relative text-gray-300 leading-relaxed">
                  Each mock interview is personalized based on your target role,
                  experience level, and focus areas. Before your session, we
                  review your application to understand your goals and tailor
                  the interview accordingly. This personalized approach ensures
                  you're practicing the most relevant skills for your specific
                  career objectives, maximizing the value of each session.
                </p>

                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
              </div>

              {/* Card 5 */}
              <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-10 border-2 border-gray-700/50 hover:border-pink-500/50 transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-pink-500/20">
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-rose-500/0 group-hover:from-pink-500/5 group-hover:to-rose-500/5 transition-all duration-500"></div>

                {/* Icon */}
                <div className="relative mb-6 inline-flex">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h2 className="relative text-3xl font-bold mb-5 text-pink-400 group-hover:text-pink-300 transition-colors">
                  Join Hundreds of Successful Candidates
                </h2>
                <p className="relative text-gray-300 leading-relaxed mb-4">
                  Over 500 aspiring engineers have successfully completed our
                  mock interview program, with a 95% success rate in landing
                  offers at their target companies. Our candidates have gone on
                  to work at Google, Microsoft, Amazon, Meta, Netflix, Apple,
                  and many other leading tech companies. The skills and
                  confidence gained through our program have been instrumental
                  in their career advancement.
                </p>
                <p className="relative text-gray-300 leading-relaxed">
                  Don't let interview anxiety hold you back from your dream job.
                  Apply today for a free mock interview and take the first step
                  toward interview mastery. Our team will review your
                  application and reach out within 48 hours to schedule your
                  session. Join our community of successful candidates and
                  experience the difference that professional interview
                  preparation can make in your career journey.
                </p>

                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
