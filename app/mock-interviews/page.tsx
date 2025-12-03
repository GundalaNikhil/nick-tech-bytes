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
} from "lucide-react";
import Footer from "@/components/footer";

export default function MockInterviewsPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const companies = [
    "Microsoft",
    "Amazon",
    "Google",
    "Meta",
    "FedEx",
    "Qualcomm",
    "Apple",
    "Netflix",
  ];

  const technicalAreas = [
    "Data Structures & Algorithms",
    "System Design",
    "Frontend Development",
    "Backend Development",
    "DevOps",
    "Cloud Architecture",
    "Database Design",
    "Behavioral Questions",
  ];

  const benefits = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Industry Experts",
      description:
        "Get interviewed by senior engineers from top tech companies like Microsoft, Amazon, Meta, Google, FedEx, and Qualcomm",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Real Interview Experience",
      description:
        "Practice with actual interview questions and scenarios used by leading tech companies",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Detailed Feedback",
      description:
        "Receive comprehensive feedback on your technical skills, communication, and problem-solving approach",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "100% Free",
      description:
        "No hidden costs, no subscriptions. Quality interview preparation accessible to everyone",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Flexible Scheduling",
      description:
        "Choose interview times that work best for your schedule and timezone",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Confidential & Safe",
      description:
        "Your information is secure and sessions are completely confidential",
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3 justify-center pt-4"
            >
              {companies.map((company, index) => (
                <motion.span
                  key={company}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-sm font-medium text-gray-300"
                >
                  {company}
                </motion.span>
              ))}
            </motion.div>
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
                className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-600/20 text-cyan-400 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
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
              },
              { icon: <TrendingUp />, value: "95%", label: "Success Rate" },
              { icon: <Star />, value: "4.9/5", label: "Average Rating" },
              { icon: <Briefcase />, value: "50+", label: "Partner Companies" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-600/10 border border-cyan-500/20"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-600/20 text-cyan-400 mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
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

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6 p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-cyan-500/20"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-500 transition-all outline-none"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-500 transition-all outline-none"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-500 transition-all outline-none"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Current Role */}
            <div>
              <label
                htmlFor="currentRole"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Current Role <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="currentRole"
                name="currentRole"
                required
                value={formData.currentRole}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-500 transition-all outline-none"
                placeholder="e.g., Software Engineer, Student, Recent Graduate"
              />
            </div>

            {/* Target Role */}
            <div>
              <label
                htmlFor="targetRole"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Target Role <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="targetRole"
                name="targetRole"
                required
                value={formData.targetRole}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-500 transition-all outline-none"
                placeholder="e.g., Senior Software Engineer, Frontend Developer"
              />
            </div>

            {/* Years of Experience */}
            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Years of Experience <span className="text-red-500">*</span>
              </label>
              <select
                id="experience"
                name="experience"
                required
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white transition-all outline-none"
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
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Technical Focus Areas <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {technicalAreas.map((area) => (
                  <label
                    key={area}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50 border border-gray-700 hover:border-cyan-500/50 cursor-pointer transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={formData.technicalFocus.includes(area)}
                      onChange={() => handleTechnicalFocusChange(area)}
                      className="w-5 h-5 rounded border-gray-600 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-900"
                    />
                    <span className="text-sm text-gray-300">{area}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Preferred Date & Time */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="preferredDate"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Preferred Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  required
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white transition-all outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="preferredTime"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Preferred Time <span className="text-red-500">*</span>
                </label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  required
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white transition-all outline-none"
                >
                  <option value="">Select time slot</option>
                  <option value="morning">Morning (9 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                  <option value="evening">Evening (5 PM - 9 PM)</option>
                </select>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label
                htmlFor="additionalNotes"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Additional Notes (Optional)
              </label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                rows={4}
                value={formData.additionalNotes}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-gray-500 transition-all outline-none resize-none"
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
              whileTap={!isSubmitting && isAuthenticated ? { scale: 0.98 } : {}}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                isSubmitting || !isAuthenticated
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-lg shadow-cyan-500/25"
              }`}
            >
              {isSubmitting
                ? "Submitting..."
                : !isAuthenticated
                ? "Please Login to Submit"
                : "Submit Application"}
            </motion.button>

            {!isAuthenticated && (
              <p className="text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/signup")}
                  className="text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Sign up here
                </button>
              </p>
            )}
          </motion.form>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-lg max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl p-8 border border-gray-700/50">
                <h2 className="text-3xl font-bold mb-4 text-cyan-400">
                  Master Your Technical Interviews with Industry Experts
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Preparing for technical interviews at top tech companies like
                  Microsoft, Amazon, Google, Meta, FedEx, and Qualcomm can be
                  daunting. Our free mock interview program bridges the gap
                  between preparation and success by providing you with
                  realistic interview experiences conducted by senior engineers
                  from these leading organizations.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Whether you're a fresh graduate looking for your first role, a
                  mid-level engineer aiming for senior positions, or an
                  experienced professional targeting staff or principal roles,
                  our tailored mock interviews help you identify strengths,
                  address weaknesses, and build the confidence needed to excel
                  in real interviews.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl p-8 border border-gray-700/50">
                <h2 className="text-3xl font-bold mb-4 text-purple-400">
                  Comprehensive Interview Preparation Across Multiple Domains
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Our mock interview program covers all critical areas of
                  technical interviewing including data structures and
                  algorithms, system design (both high-level and low-level),
                  frontend development, backend engineering, DevOps practices,
                  cloud architecture, database design, and behavioral interview
                  questions. This comprehensive approach ensures you're prepared
                  for any question that comes your way.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Each mock interview session is designed to simulate real
                  interview conditions, complete with time constraints, coding
                  challenges, and technical discussions. You'll receive detailed
                  feedback on your problem-solving approach, code quality,
                  communication skills, and overall interview performance,
                  helping you continuously improve with each practice session.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl p-8 border border-gray-700/50">
                <h2 className="text-3xl font-bold mb-4 text-green-400">
                  Why Mock Interviews Are Essential for Interview Success
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Studies show that candidates who participate in mock
                  interviews are significantly more likely to succeed in actual
                  interviews. Mock interviews help reduce anxiety, improve time
                  management, enhance problem-solving speed, and build muscle
                  memory for common interview patterns. By practicing with
                  experienced interviewers, you gain insights into what top
                  companies actually look for in candidates.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Our program stands out because we don't compromise on quality.
                  Every interviewer in our network has extensive experience
                  conducting real interviews at Fortune 500 companies and
                  leading tech firms. They understand the nuances of what makes
                  a strong candidate and can provide actionable feedback that
                  translates directly to interview success. Best of all, this
                  premium service is completely free, making world-class
                  interview preparation accessible to everyone.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl p-8 border border-gray-700/50">
                <h2 className="text-3xl font-bold mb-4 text-yellow-400">
                  Flexible Scheduling and Personalized Experience
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We understand that preparing for interviews while managing
                  work, studies, or other commitments can be challenging. That's
                  why we offer flexible scheduling options across different time
                  zones and time slots. Whether you prefer morning, afternoon,
                  or evening sessions, we'll work with your schedule to ensure
                  you get the practice you need when you need it.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Each mock interview is personalized based on your target role,
                  experience level, and focus areas. Before your session, we
                  review your application to understand your goals and tailor
                  the interview accordingly. This personalized approach ensures
                  you're practicing the most relevant skills for your specific
                  career objectives, maximizing the value of each session.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl p-8 border border-gray-700/50">
                <h2 className="text-3xl font-bold mb-4 text-pink-400">
                  Join Hundreds of Successful Candidates
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Over 500 aspiring engineers have successfully completed our
                  mock interview program, with a 95% success rate in landing
                  offers at their target companies. Our candidates have gone on
                  to work at Google, Microsoft, Amazon, Meta, Netflix, Apple,
                  and many other leading tech companies. The skills and
                  confidence gained through our program have been instrumental
                  in their career advancement.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Don't let interview anxiety hold you back from your dream job.
                  Apply today for a free mock interview and take the first step
                  toward interview mastery. Our team will review your
                  application and reach out within 48 hours to schedule your
                  session. Join our community of successful candidates and
                  experience the difference that professional interview
                  preparation can make in your career journey.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
