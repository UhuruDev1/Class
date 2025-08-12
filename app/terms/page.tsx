import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Brain, FileText, Scale, CreditCard, UserX, AlertTriangle } from "lucide-react"

export default function TermsOfServicePage() {
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
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-300">
            Please read these terms carefully before using our platform and services.
          </p>
          <p className="text-gray-400 mt-2">Last updated: January 15, 2025</p>
        </div>

        <div className="space-y-8">
          {/* Acceptance of Terms */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <Scale className="w-6 h-6 mr-3 text-purple-400" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                By accessing and using OfCourse AI ("the Platform"), you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p>
                These Terms of Service ("Terms") govern your use of our website located at https://ofcourseai.site and
                all related services, features, content, and applications offered by OfCourse AI ("we," "us," or "our").
              </p>
            </CardContent>
          </Card>

          {/* Use of Service */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Use of Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-white font-semibold mb-2">Eligibility</h3>
                <p>
                  You must be at least 13 years old to use our service. If you are under 18, you must have parental
                  consent to use our platform.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Account Registration</h3>
                <p>
                  You must provide accurate and complete information when creating an account. You are responsible for
                  maintaining the security of your account credentials.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Acceptable Use</h3>
                <p>
                  You agree to use our service only for lawful purposes and in accordance with these Terms. You may not:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Share your account credentials with others</li>
                  <li>Use the service for any illegal or unauthorized purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt the service or servers</li>
                  <li>Upload malicious code or content</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Course Content and Intellectual Property */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Course Content and Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-white font-semibold mb-2">Our Content</h3>
                <p>
                  All course materials, videos, text, graphics, and other content on our platform are owned by OfCourse
                  AI or our content partners and are protected by copyright and other intellectual property laws.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">License to Use</h3>
                <p>
                  We grant you a limited, non-exclusive, non-transferable license to access and use our course content
                  for your personal, non-commercial educational purposes only.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Restrictions</h3>
                <p>You may not:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Download, copy, or redistribute course content</li>
                  <li>Share course materials with non-enrolled users</li>
                  <li>Use content for commercial purposes</li>
                  <li>Remove copyright or proprietary notices</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Payment and Billing */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <CreditCard className="w-6 h-6 mr-3 text-green-400" />
                Payment and Billing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-white font-semibold mb-2">Course Purchases</h3>
                <p>
                  Course prices are listed in USD and may change at any time. Payment is required before accessing paid
                  course content.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Subscriptions</h3>
                <p>
                  Subscription fees are billed in advance on a monthly or annual basis. Subscriptions automatically
                  renew unless cancelled before the renewal date.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Refund Policy</h3>
                <p>
                  We offer a 30-day money-back guarantee for course purchases. Refund requests must be submitted within
                  30 days of purchase. Subscription refunds are prorated based on unused time.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Payment Processing</h3>
                <p>
                  Payments are processed securely through third-party payment processors. We do not store your payment
                  information on our servers.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Account Termination */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <UserX className="w-6 h-6 mr-3 text-red-400" />
                Account Termination
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-white font-semibold mb-2">Termination by You</h3>
                <p>
                  You may terminate your account at any time by contacting our support team. Upon termination, your
                  access to paid content will cease, but you may retain access to free content.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Termination by Us</h3>
                <p>
                  We may terminate or suspend your account immediately if you violate these Terms or engage in
                  prohibited activities. We will provide notice when possible.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Effect of Termination</h3>
                <p>
                  Upon termination, your right to use the service will cease immediately. We may delete your account
                  data after a reasonable period, subject to legal requirements.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimers and Limitations */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-yellow-400" />
                Disclaimers and Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-white font-semibold mb-2">Service Availability</h3>
                <p>
                  We strive to maintain high availability but cannot guarantee uninterrupted service. We may perform
                  maintenance that temporarily affects service availability.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Educational Content</h3>
                <p>
                  Our courses are for educational purposes only. We do not guarantee specific outcomes, job placement,
                  or career advancement from completing our courses.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Limitation of Liability</h3>
                <p>
                  To the maximum extent permitted by law, OfCourse AI shall not be liable for any indirect, incidental,
                  special, or consequential damages arising from your use of our service.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of significant changes via
                email or platform notifications. Continued use of the service after changes constitutes acceptance of
                the new Terms.
              </p>
              <p>We encourage you to review these Terms periodically to stay informed of any updates.</p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="py-8 text-center">
              <h2 className="text-white text-2xl font-semibold mb-4">Questions About These Terms?</h2>
              <p className="text-gray-300 mb-6">
                If you have any questions about these Terms of Service, please contact us.
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
