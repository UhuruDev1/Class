import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, BookOpen, Clock, Users, Star, CheckCircle, Play, Download, Brain, Target } from "lucide-react"

export default function LLMFundamentalsPage() {
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
                <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border-purple-500/30">
                  Beginner to Advanced
                </Badge>
                <Badge className="bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-200 border-green-500/30">
                  Most Popular
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                LLM Fundamentals
                <span className="block text-2xl md:text-3xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
                  Master Large Language Models
                </span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed">
                Dive deep into the world of Large Language Models. Learn how GPT, Claude, and other LLMs work under the
                hood, from transformer architecture to training methodologies. Build your own LLM applications and
                understand the cutting-edge techniques powering today's AI revolution.
              </p>

              <div className="flex items-center space-x-6 text-gray-300">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-purple-400" />
                  <span>12 weeks</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-purple-400" />
                  <span>45 lessons</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-400" />
                  <span>15,000+ students</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400 fill-current" />
                  <span>4.9/5</span>
                </div>
              </div>
            </div>

            {/* What You'll Learn */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl flex items-center">
                  <Target className="w-6 h-6 mr-3 text-purple-400" />
                  What You'll Master
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Transformer Architecture Deep Dive",
                    "Attention Mechanisms & Self-Attention",
                    "Pre-training vs Fine-tuning Strategies",
                    "Tokenization & Embedding Techniques",
                    "RLHF (Reinforcement Learning from Human Feedback)",
                    "Prompt Engineering & Chain-of-Thought",
                    "Model Evaluation & Benchmarking",
                    "Scaling Laws & Emergent Abilities",
                    "Multi-modal LLMs (Vision + Language)",
                    "LLM Safety & Alignment Techniques",
                    "Deployment & Optimization Strategies",
                    "Building LLM-powered Applications",
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
                  Comprehensive curriculum designed by AI researchers and industry experts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    module: "Module 1: Foundation",
                    lessons: 8,
                    topics: [
                      "Neural Network Basics",
                      "Deep Learning Fundamentals",
                      "NLP Preprocessing",
                      "Word Embeddings",
                    ],
                  },
                  {
                    module: "Module 2: Transformer Architecture",
                    lessons: 10,
                    topics: [
                      "Attention is All You Need",
                      "Multi-Head Attention",
                      "Positional Encoding",
                      "Layer Normalization",
                    ],
                  },
                  {
                    module: "Module 3: Pre-training & Fine-tuning",
                    lessons: 12,
                    topics: [
                      "Masked Language Modeling",
                      "Next Token Prediction",
                      "Transfer Learning",
                      "Domain Adaptation",
                    ],
                  },
                  {
                    module: "Module 4: Advanced Techniques",
                    lessons: 10,
                    topics: [
                      "RLHF Implementation",
                      "Constitutional AI",
                      "Chain-of-Thought Prompting",
                      "In-Context Learning",
                    ],
                  },
                  {
                    module: "Module 5: Production & Deployment",
                    lessons: 5,
                    topics: ["Model Optimization", "Inference Scaling", "API Development", "Monitoring & Evaluation"],
                  },
                ].map((module, index) => (
                  <div key={index} className="border border-white/10 rounded-lg p-4 bg-white/5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-semibold text-lg">{module.module}</h3>
                      <Badge className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                        {module.lessons} lessons
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2">
                      {module.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center text-gray-300 text-sm">
                          <Play className="w-3 h-3 mr-2 text-purple-400" />
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
            <Card className="bg-gradient-to-b from-purple-500/20 to-pink-500/20 border-purple-500/50 backdrop-blur-sm sticky top-6">
              <CardHeader className="text-center">
                <div className="text-4xl font-bold text-white mb-2">$499</div>
                <CardDescription className="text-gray-300">One-time payment • Lifetime access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    45 comprehensive video lessons
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Hands-on coding exercises
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Real-world projects
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Certificate of completion
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Community access
                  </div>
                  <div className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    1-on-1 mentorship sessions
                  </div>
                </div>

                <Link href="/auth/signup" className="block">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg py-3">
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
                    src="/ai-researcher-headshot.png"
                    alt="Dr. Alex Chen"
                    className="w-16 h-16 rounded-full border-2 border-white/20"
                  />
                  <div>
                    <h3 className="text-white font-semibold">Dr. Alex Chen</h3>
                    <p className="text-gray-300 text-sm">AI Research Scientist</p>
                    <p className="text-gray-400 text-xs">Former OpenAI, Google DeepMind</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  Dr. Chen has published 50+ papers on transformer architectures and led the development of several
                  breakthrough LLM techniques. PhD in Computer Science from Stanford.
                </p>
              </CardContent>
            </Card>

            {/* Course Resources */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Course Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <Download className="w-5 h-5 mr-3 text-purple-400" />
                  <span>Downloadable code examples</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Download className="w-5 h-5 mr-3 text-purple-400" />
                  <span>Research paper collection</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Download className="w-5 h-5 mr-3 text-purple-400" />
                  <span>Pre-trained model weights</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Download className="w-5 h-5 mr-3 text-purple-400" />
                  <span>Dataset access</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
