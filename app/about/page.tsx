import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Brain, Users, Target, Award, Heart, Rocket } from "lucide-react"

export default function AboutPage() {
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
            About
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              OfCourse AI
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize AI education and empower the next generation of AI professionals with
            cutting-edge knowledge, practical skills, and real-world experience.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <Target className="w-6 h-6 mr-3 text-purple-400" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                To make world-class AI education accessible to everyone, regardless of background or location. We
                believe that the future belongs to those who understand and can harness the power of artificial
                intelligence, and we're here to bridge that knowledge gap with expert-led courses, hands-on projects,
                and a supportive community.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <Rocket className="w-6 h-6 mr-3 text-pink-400" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                A world where AI literacy is as fundamental as reading and writing. We envision a future where millions
                of professionals are equipped with AI skills, driving innovation across industries and solving
                humanity's greatest challenges through intelligent technology and ethical AI development.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Story */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-16">
          <CardHeader>
            <CardTitle className="text-white text-3xl text-center mb-4">Our Story</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-300 leading-relaxed text-lg">
              OfCourse AI was founded in 2023 by a team of AI researchers, engineers, and educators who witnessed the
              explosive growth of artificial intelligence and recognized a critical gap: while AI was advancing at
              breakneck speed, quality education wasn't keeping pace.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              Having worked at leading AI companies like OpenAI, Google DeepMind, and Anthropic, our founders understood
              that the future workforce needed more than theoretical knowledge—they needed practical, hands-on
              experience with the latest AI technologies and techniques.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              Today, we've helped over 50,000 students worldwide master AI concepts, from complete beginners to seasoned
              professionals looking to stay ahead of the curve. Our courses are designed by industry experts and updated
              continuously to reflect the latest breakthroughs in AI research and development.
            </p>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  AI education should be accessible to everyone, regardless of background, location, or financial
                  situation. We offer scholarships and flexible payment options to ensure no one is left behind.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  We maintain the highest standards in our curriculum, instructors, and learning experience. Every
                  course is crafted by industry experts and continuously updated with cutting-edge content.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Learning is better together. We foster a supportive community where students collaborate, share
                  knowledge, and help each other succeed in their AI journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats */}
        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 backdrop-blur-sm mb-16">
          <CardContent className="py-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-white mb-2">50,000+</div>
                <div className="text-gray-300">Students Worldwide</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">100+</div>
                <div className="text-gray-300">Expert Instructors</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-gray-300">Hours of Content</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">95%</div>
                <div className="text-gray-300">Job Placement Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your AI Journey?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already building the future with AI. Start with our free courses and
            upgrade as you advance.
          </p>
          <Link href="/courses">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg"
            >
              Explore Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
