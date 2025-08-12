"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import {
  BookOpen,
  Users,
  Zap,
  Star,
  ArrowRight,
  Play,
  Clock,
  Award,
  CheckCircle,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Github,
  MessageCircle,
  Send,
  Crown,
  Brain,
  Rocket,
  Shield,
  Target,
  TrendingUp,
  Globe,
  Sparkles,
} from "lucide-react"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/lib/i18n/context"
import type { User } from "@supabase/supabase-js"

interface HomePageClientProps {
  user: User | null
}

export function HomePageClient({ user }: HomePageClientProps) {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                OfCourse AI
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              {user ? (
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg">
                    {t("nav.dashboard")}
                  </Button>
                </Link>
              ) : (
                <div className="flex space-x-2">
                  <Link href="/auth/login">
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                    >
                      {t("nav.signIn")}
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg">
                      {t("nav.getStarted")}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <Badge className="mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border-purple-500/30 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                {t("home.badge")}
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Master the Future of
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent block">
                  Artificial Intelligence
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                Join thousands of professionals learning cutting-edge AI skills through expert-led courses, live
                classrooms, and hands-on projects. Build the future with AI.
              </p>

              {/* What You'll Receive */}
              <div className="mb-8 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Crown className="w-5 h-5 mr-2 text-yellow-400" />
                  What You'll Master
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    LLM Development & Fine-tuning
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    AI Agent Architecture
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    RAG Systems & Vector DBs
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    Production AI Deployment
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg shadow-2xl border-0"
                  >
                    Start Learning Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg bg-white/5 backdrop-blur-sm"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/ai-learning-dashboard.png"
                  alt="AI Learning Platform"
                  className="rounded-2xl shadow-2xl border border-white/10"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Everything You Need to Master AI</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From beginner-friendly courses to advanced AI architectures, we provide the complete learning ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Expert-Led Courses</CardTitle>
                <CardDescription className="text-gray-300">
                  Learn from industry leaders with hands-on projects and real-world applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <Target className="w-4 h-4 mr-3 text-purple-400" />
                    50+ Comprehensive Courses
                  </li>
                  <li className="flex items-center">
                    <Award className="w-4 h-4 mr-3 text-purple-400" />
                    Industry Certifications
                  </li>
                  <li className="flex items-center">
                    <Rocket className="w-4 h-4 mr-3 text-purple-400" />
                    Project-Based Learning
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Live AI Classrooms</CardTitle>
                <CardDescription className="text-gray-300">
                  Interactive sessions with AI experts, Q&A, and collaborative learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <Clock className="w-4 h-4 mr-3 text-pink-400" />
                    Weekly Live Sessions
                  </li>
                  <li className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-3 text-pink-400" />
                    Expert Q&A Sessions
                  </li>
                  <li className="flex items-center">
                    <Globe className="w-4 h-4 mr-3 text-pink-400" />
                    Global Community
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-green-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">AI-Powered Assistant</CardTitle>
                <CardDescription className="text-gray-300">
                  24/7 intelligent help with personalized learning paths and instant support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <Zap className="w-4 h-4 mr-3 text-yellow-400" />
                    Instant AI Support
                  </li>
                  <li className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-3 text-yellow-400" />
                    Progress Tracking
                  </li>
                  <li className="flex items-center">
                    <Shield className="w-4 h-4 mr-3 text-yellow-400" />
                    Personalized Feedback
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Trusted by AI Professionals Worldwide</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands who've transformed their careers with our AI mastery programs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">
                  "The AI Mastery Academy completely transformed my understanding of machine learning. The hands-on
                  projects and expert guidance helped me land my dream job at a top tech company."
                </p>
                <div className="flex items-center">
                  <img
                    src="/sarah-chen-ai-engineer-headshot.png"
                    alt="Sarah Chen"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="text-white font-semibold">Sarah Chen</p>
                    <p className="text-gray-400 text-sm">AI Engineer at Google</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">
                  "The live classrooms and AI assistant made learning complex topics like RAG systems and vector
                  databases incredibly accessible. Best investment in my career!"
                </p>
                <div className="flex items-center">
                  <img
                    src="/marcus-johnson-headshot.png"
                    alt="Marcus Johnson"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="text-white font-semibold">Marcus Johnson</p>
                    <p className="text-gray-400 text-sm">ML Researcher at OpenAI</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">
                  "From zero AI knowledge to building production-ready AI agents in 6 months. The curriculum is
                  perfectly structured and the community support is amazing."
                </p>
                <div className="flex items-center">
                  <img src="/priya-patel-headshot.png" alt="Priya Patel" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <p className="text-white font-semibold">Priya Patel</p>
                    <p className="text-gray-400 text-sm">AI Startup Founder</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Paywall Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Choose Your AI Mastery Path</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Start free and upgrade as you advance. All plans include lifetime access to course materials.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm relative">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl mb-2">Starter</CardTitle>
                <div className="text-4xl font-bold text-white mb-2">Free</div>
                <CardDescription className="text-gray-300">Perfect for beginners exploring AI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />5 Beginner AI Courses
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Community Access
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Basic AI Assistant
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Course Certificates
                  </li>
                </ul>
                <Link href="/auth/signup" className="block">
                  <Button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white">
                    Get Started Free
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="bg-gradient-to-b from-purple-500/20 to-pink-500/20 border-purple-500/50 backdrop-blur-sm relative scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl mb-2">Professional</CardTitle>
                <div className="text-4xl font-bold text-white mb-2">
                  $99<span className="text-lg text-gray-300">/month</span>
                </div>
                <CardDescription className="text-gray-300">For serious AI practitioners</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    All 50+ AI Courses
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Live Weekly Classrooms
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Advanced AI Assistant
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    1-on-1 Mentorship
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Priority Support
                  </li>
                </ul>
                <Link href="/subscription" className="block">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    Start Pro Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm relative">
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl mb-2">Enterprise</CardTitle>
                <div className="text-4xl font-bold text-white mb-2">
                  $299<span className="text-lg text-gray-300">/month</span>
                </div>
                <CardDescription className="text-gray-300">For teams and organizations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Everything in Professional
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Custom Learning Paths
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Team Analytics
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Dedicated Success Manager
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    API Access
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Start Your AI Journey?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Have questions? Our AI experts are here to help you choose the perfect learning path.
              </p>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Email Us</p>
                    <p className="text-gray-300">support@ofcourseai.site</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-xl flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Call Us</p>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-green-500 rounded-xl flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Visit Us</p>
                    <p className="text-gray-300">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Send us a message</CardTitle>
                <CardDescription className="text-gray-300">We'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="First Name"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  />
                  <Input
                    placeholder="Last Name"
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <Input
                  placeholder="Email Address"
                  type="email"
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                />
                <Textarea
                  placeholder="Your Message"
                  rows={4}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-md py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  OfCourse AI
                </span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Empowering the next generation of AI professionals with cutting-edge education and hands-on experience.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Github className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://x.com"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://discord.com"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://whatsapp.com"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                >
                  <MessageSquare className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Courses</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LLM Fundamentals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    AI Agents
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    RAG Systems
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Fine-tuning
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">© 2024 OfCourse AI. All rights reserved.</p>
              <p className="text-gray-400">Built with ❤️ for the AI community</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
