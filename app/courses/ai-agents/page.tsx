import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, BookOpen, Clock, Users, Star, CheckCircle, Play, Brain, Bot } from "lucide-react"

export default function AIAgentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                OfCourse AI
              </span>
            </Link>
            <Link href="/courses">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Badge className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-200 border-blue-500/30">
                  Intermediate to Advanced
                </Badge>
                <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-200 border-orange-500/30">
                  Hot Topic
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                AI Agents Architecture
                <span className="block text-2xl md:text-3xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mt-2">
                  Build Autonomous AI Systems
                </span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed">
                Master the art of building intelligent, autonomous AI agents that can reason, plan, and act in complex
                environments. Learn cutting-edge techniques from ReAct to AutoGPT, and build agents that can use tools,
                browse the web, and collaborate with other agents to solve real-world problems.
              </p>

              <div className="flex items-center space-x-6 text-gray-300">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-400" />
                  <span>10 weeks</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
                  <span>38 lessons</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-400" />
                  <span>8,500+ students</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400 fill-current" />
                  <span>4.8/5</span>
                </div>
              </div>
            </div>

            {/* What You'll Learn */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center">
                  <Bot className="w-6 h-6 mr-3 text-blue-400" />
                  What You'll Master
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Agent Architecture Patterns",
                    "ReAct (Reasoning + Acting) Framework",
                    "Tool Use & Function Calling",
                    "Memory Systems & Context Management",
                    "Planning & Goal Decomposition",
                    "Multi-Agent Coordination",
                    "Web Browsing & Information Retrieval",
                    "Code Generation & Execution",
                    "Agent Safety & Alignment",
                    "Evaluation & Benchmarking",
                    "Production Deployment Strategies",
                    "Human-Agent Collaboration",
                  ].map((skill, index) => (
                    <div key={index} className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 mr-3 text-green-400 flex-shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Curriculum */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Course Curriculum</CardTitle>
                <CardDescription className="text-gray-300">
                  Build from simple reactive agents to complex multi-agent systems
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    module: "Module 1: Agent Fundamentals",
                    lessons: 6,
                    topics: [
                      "Agent Architectures",
                      "Perception-Action Loops",
                      "State Representation",
                      "Basic Reasoning",
                    ],
                  },
                  {
                    module: "Module 2: Tool-Using Agents",
                    lessons: 8,
                    topics: ["Function Calling", "API Integration", "Web Scraping", "Code Execution"],
                  },
                  {
                    module: "Module 3: Planning & Reasoning",
                    lessons: 10,
                    topics: ["Goal Decomposition", "Chain-of-Thought", "Tree of Thoughts", "Self-Reflection"],
                  },
                  {
                    module: "Module 4: Memory & Context",
                    lessons: 8,
                    topics: ["Short-term Memory", "Long-term Memory", "Vector Databases", "Context Windows"],
                  },
                  {
                    module: "Module 5: Multi-Agent Systems",
                    lessons: 6,
                    topics: [
                      "Agent Communication",
                      "Coordination Protocols",
                      "Swarm Intelligence",
                      "Emergent Behavior",
                    ],
                  },
                ].map((module, index) => (
                  <div key={index} className="border border-white/10 rounded-lg p-4 bg-white/5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-semibold text-lg">{module.module}</h3>
                      <Badge className="bg-blue-500/20 text-blue-200 border-blue-500/30">
                        {module.lessons} lessons
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2">
                      {module.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center text-gray-300 text-sm">
                          <Play className="w-3 h-3 mr-2 text-blue-400" />
                          {topic}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <Card className="bg-gradient-to-b from-blue-500/20 to-cyan-500/20 border-blue-500/50 backdrop-blur-sm sticky top-6">
              <CardHeader className="text-center">
                <div className="text-4xl font-bold text-white mb-2">$599</div>
                <CardDescription className="text-gray-300">One-time payment • Lifetime access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    38 hands-on video lessons
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Build 5 complete agents
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Agent framework templates
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Production deployment guide
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Expert community access
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Weekly office hours
                  </div>
                </div>

                <Link href="/auth/signup" className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-lg py-3">
                    Enroll Now
                  </Button>
                </Link>

                <p className="text-center text-gray-400 text-sm">30-day money-back guarantee</p>
              </CardContent>
            </Card>

            {/* Instructor */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Your Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src="/ai-agent-expert-headshot.png"
                    alt="Dr. Maya Patel"
                    className="w-16 h-16 rounded-full border-2 border-white/20"
                  />
                  <div>
                    <h3 className="text-white font-semibold">Dr. Maya Patel</h3>
                    <p className="text-gray-300 text-sm">AI Agent Researcher</p>
                    <p className="text-gray-400 text-xs">Former Anthropic, UC Berkeley</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  Dr. Patel pioneered several breakthrough agent architectures and has 8+ years building autonomous
                  systems. Lead researcher on multi-agent coordination at top AI labs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
