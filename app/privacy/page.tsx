import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Brain, Shield, Eye, Lock, Database, UserCheck } from "lucide-react"

export default function PrivacyPolicyPage() {
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-300">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-gray-400 mt-2">Last updated: January 15, 2025</p>
        </div>

        <div className="space-y-8">
          {/* Information We Collect */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <Database className="w-6 h-6 mr-3 text-purple-400" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-white font-semibold mb-2">Personal Information</h3>
                <p>
                  When you create an account, we collect your name, email address, and profile information. For paid
                  courses, we also collect billing information through our secure payment processor.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Learning Data</h3>
                <p>
                  We track your course progress, quiz results, and learning preferences to personalize your experience
                  and provide better recommendations.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Usage Information</h3>
                <p>
                  We collect information about how you use our platform, including pages visited, time spent on courses,
                  and interaction patterns to improve our services.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Your Information */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <UserCheck className="w-6 h-6 mr-3 text-blue-400" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Provide and improve our educational services and platform functionality</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Personalize your learning experience with course recommendations and adaptive content</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Process payments and manage your subscription or course purchases</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Send important updates about courses, new features, and platform changes</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Provide customer support and respond to your inquiries</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Analyze usage patterns to improve our courses and platform performance</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <Eye className="w-6 h-6 mr-3 text-green-400" />
                Information Sharing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information
                only in the following circumstances:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    <strong>Service Providers:</strong> With trusted third-party services that help us operate our
                    platform (payment processing, email delivery, analytics)
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    <strong>Legal Requirements:</strong> When required by law or to protect our rights and the safety of
                    our users
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets (with
                    advance notice to users)
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <Lock className="w-6 h-6 mr-3 text-yellow-400" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>We implement industry-standard security measures to protect your personal information:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>SSL/TLS encryption for all data transmission</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Secure database storage with encryption at rest</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Regular security audits and vulnerability assessments</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Access controls and authentication for our team members</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Secure payment processing through PCI-compliant providers</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>You have the following rights regarding your personal information:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    <strong>Access:</strong> Request a copy of the personal information we have about you
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    <strong>Correction:</strong> Update or correct inaccurate personal information
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    <strong>Deletion:</strong> Request deletion of your personal information (subject to legal
                    requirements)
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    <strong>Portability:</strong> Request your data in a machine-readable format
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>
                    <strong>Opt-out:</strong> Unsubscribe from marketing communications at any time
                  </span>
                </li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at{" "}
                <a href="mailto:support@ofcourseai.site" className="text-purple-400 hover:text-purple-300">
                  support@ofcourseai.site
                </a>
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="py-8 text-center">
              <h2 className="text-white text-2xl font-semibold mb-4">Questions About This Policy?</h2>
              <p className="text-gray-300 mb-6">
                If you have any questions about this Privacy Policy or how we handle your data, please don't hesitate to
                contact us.
              </p>
              <div className="space-y-2 text-gray-300">
                <p>
                  Email:{" "}
                  <a href="mailto:support@ofcourseai.site" className="text-purple-400 hover:text-purple-300">
                    support@ofcourseai.site
                  </a>
                </p>
                <p>Address: 123 AI Street, Tech City, TC 12345</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
