import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Check, Zap, Crown, Star } from "lucide-react"

export default async function SubscriptionPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  const plans = [
    {
      name: "Free",
      price: 0,
      description: "Perfect for getting started",
      features: ["Access to free courses", "Basic AI help desk", "Community access", "Course certificates"],
      current: profile?.subscription_status === "free",
    },
    {
      name: "Premium",
      price: 29,
      description: "Unlock your full potential",
      features: [
        "Access to all courses",
        "Priority AI help desk",
        "Live classroom sessions",
        "Advanced certificates",
        "1-on-1 mentorship",
        "Early access to new content",
      ],
      current: profile?.subscription_status === "premium",
      popular: true,
    },
    {
      name: "Enterprise",
      price: 99,
      description: "For teams and organizations",
      features: [
        "Everything in Premium",
        "Team management",
        "Custom learning paths",
        "Analytics dashboard",
        "Dedicated support",
        "API access",
      ],
      current: profile?.subscription_status === "enterprise",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AI Mastery Academy</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Learning Plan</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Unlock your AI potential with the right plan for your learning journey
          </p>
        </div>

        {/* Current Plan Status */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2">
            <Crown className="w-5 h-5 text-yellow-400" />
            <span className="text-white">
              Current Plan: <span className="font-semibold capitalize">{profile?.subscription_status || "Free"}</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`bg-white/5 border-white/10 backdrop-blur-sm relative ${
                plan.popular ? "ring-2 ring-purple-500" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                <CardDescription className="text-gray-300">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-300">/month</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-2">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.current ? (
                  <Button disabled className="w-full bg-green-600 text-white">
                    <Check className="w-4 h-4 mr-2" />
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        : "bg-white/10 hover:bg-white/20"
                    } text-white`}
                  >
                    {plan.price === 0 ? "Downgrade" : "Upgrade"} to {plan.name}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Can I cancel anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Yes, you can cancel your subscription at any time. You'll continue to have access until the end of
                  your billing period.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  We accept all major credit cards, PayPal, and other payment methods through our secure Stripe
                  integration.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Do you offer refunds?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll refund your
                  payment.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Can I upgrade or downgrade?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take
                  effect at the next billing cycle.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
