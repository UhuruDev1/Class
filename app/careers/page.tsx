import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Brain, MapPin, Clock, DollarSign, Users, Zap, Heart, Globe } from "lucide-react"

export default function CareersPage() {
  const openPositions = [
    {
      title: "Senior AI Curriculum Developer",
      department: "Education",
      location: "Remote",
      type: "Full-time",
      salary: "$120k - $160k",
      description:
        "Design and develop cutting-edge AI courses with industry experts. Create engaging content for LLMs, agents, and emerging AI technologies.",
    },
    {
      title: "AI Research Engineer",
      department: "R&D",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$140k - $180k",
      description:
        "Research and implement state-of-the-art AI techniques. Collaborate with top researchers to push the boundaries of AI education.",
    },
    {
      title: "Full-Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$100k - $140k",
      description:
        "Build and scale our learning platform. Work with React, Next.js, and AI APIs to create exceptional user experiences.",
    },
    {
      title: "Community Manager",
      department: "Community",
      location: "Remote",
      type: "Full-time",
      salary: "$70k - $90k",
      description:
        "Foster our global community of AI learners. Organize events, moderate discussions, and support student success.",
    },
    {
      title: "AI Safety Researcher",
      department: "R&D",
      location: "Remote",
      type: "Contract",
      salary: "$80k - $120k",
      description:
        "Research AI alignment and safety techniques. Develop educational content on responsible AI development and deployment.",
    },
    {
      title: "Marketing Manager",
      department: "Marketing",
      location: "New York, NY",
      type: "Full-time",
      salary: "$90k - $120k",
      description:
        "Drive growth through strategic marketing campaigns. Focus on AI community engagement and thought leadership.",
    },
  ]

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
            <Link href="/">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Join Our
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Mission
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Help us democratize AI education and shape the future of learning. We're looking for passionate individuals
            who want to make AI accessible to everyone.
          </p>
          <div className="flex justify-center space-x-4">
            <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border-purple-500/30 px-4 py-2">
              <Globe className="w-4 h-4 mr-2" />
              Remote-First
            </Badge>
            <Badge className="bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-200 border-green-500/30 px-4 py-2">
              <Heart className="w-4 h-4 mr-2" />
              Great Benefits
            </Badge>
            <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-200 border-yellow-500/30 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Fast Growth
            </Badge>
          </div>
        </div>

        {/* Why Work With Us */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Why Work With Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Cutting-Edge Work</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Work on the latest AI technologies and educational innovations. Collaborate with top researchers and
                  industry experts to push the boundaries of what's possible.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Amazing Team</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Join a diverse team of passionate individuals from top AI companies and universities. Learn from the
                  best while making a meaningful impact on education.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Global Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Your work will directly impact thousands of students worldwide. Help democratize AI education and
                  shape the future of technology learning.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Benefits */}
        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 backdrop-blur-sm mb-16">
          <CardHeader>
            <CardTitle className="text-white text-3xl text-center">Benefits & Perks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Competitive Salary</h3>
                <p className="text-gray-300 text-sm">Top-tier compensation packages with equity options</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Health & Wellness</h3>
                <p className="text-gray-300 text-sm">Comprehensive health, dental, and vision coverage</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Remote-First</h3>
                <p className="text-gray-300 text-sm">Work from anywhere with flexible hours</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Learning Budget</h3>
                <p className="text-gray-300 text-sm">$5,000 annual budget for courses and conferences</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Open Positions</h2>
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-white text-xl font-semibold">{position.title}</h3>
                        <Badge className="bg-purple-500/20 text-purple-200 border-purple-500/30">
                          {position.department}
                        </Badge>
                      </div>
                      <p className="text-gray-300 mb-3">{position.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {position.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {position.type}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {position.salary}
                        </div>
                      </div>
                    </div>
                    <div className="lg:ml-6">
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Don't See Your Role?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We're always looking for exceptional talent. Send us your resume and tell us how you'd like to contribute to
            democratizing AI education.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg"
          >
            Send Your Resume
          </Button>
        </div>
      </div>
    </div>
  )
}
